const PRODUCT_API = "/api/products";

const productForm = document.querySelector("#product-form");
const productTableBody = document.querySelector("#products-table tbody");
const productMessage = document.querySelector("#products-message");

function resetProductForm() {
  document.querySelector("#product-id").value = "";
  document.querySelector("#product-category").value = "";
  document.querySelector("#product-name").value = "";
  document.querySelector("#product-price").value = "";
  document.querySelector("#product-stock").value = "";
  if (productMessage) {
    productMessage.textContent = "";
    productMessage.style.color = "";
  }
}

async function loadProducts() {
  if (!productTableBody) return;

  productTableBody.innerHTML = `<tr><td colspan="6">Loading products...</td></tr>`;
  if (productMessage) productMessage.textContent = "";

  try {
    const res = await fetch(PRODUCT_API);
    const data = await res.json();

    if (!res.ok) {
      productTableBody.innerHTML = `<tr><td colspan="6">Gagal memuat products.</td></tr>`;
      if (productMessage) {
        productMessage.textContent = data.error || "Gagal memuat data products.";
        productMessage.style.color = "#dc2626";
      }
      return;
    }

    if (!Array.isArray(data) || data.length === 0) {
      productTableBody.innerHTML = `<tr><td colspan="6">Belum ada product.</td></tr>`;
      return;
    }

    productTableBody.innerHTML = "";
    data.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.ProductID}</td>
        <td>${p.CategoryID}</td>
        <td>${p.Name}</td>
        <td>${Number(p.Price).toFixed(2)}</td>
        <td>${p.Stock}</td>
        <td class="col-actions">
          <button class="btn-soft btn-xs" data-action="edit" data-id="${p.ProductID}">Edit</button>
          <button class="btn-danger btn-xs" data-action="delete" data-id="${p.ProductID}">Delete</button>
        </td>
      `;
      productTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    productTableBody.innerHTML = `<tr><td colspan="6">Error saat memuat products.</td></tr>`;
    if (productMessage) {
      productMessage.textContent = "Terjadi kesalahan jaringan.";
      productMessage.style.color = "#dc2626";
    }
  }
}

async function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = document.querySelector("#product-id").value;
  const categoryId = document.querySelector("#product-category").value.trim();
  const name = document.querySelector("#product-name").value.trim();
  const price = document.querySelector("#product-price").value.trim();
  const stock = document.querySelector("#product-stock").value.trim();

  if (!productMessage) return;

  if (!categoryId || !name || !price || !stock) {
    productMessage.textContent = "Semua field wajib diisi.";
    productMessage.style.color = "#dc2626";
    return;
  }

  const payload = {
    CategoryID: parseInt(categoryId, 10),
    Name: name,
    Price: parseFloat(price),
    Stock: parseInt(stock, 10)
  };

  const isEdit = !!id;
  const url = isEdit ? `${PRODUCT_API}/${id}` : PRODUCT_API;
  const method = isEdit ? "PUT" : "POST";

  productMessage.textContent = isEdit ? "Updating product..." : "Creating product...";
  productMessage.style.color = "#64748b";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok) {
      productMessage.textContent =
        data.error || (isEdit ? "Gagal update product." : "Gagal membuat product.");
      productMessage.style.color = "#dc2626";
      return;
    }

    productMessage.textContent = isEdit ? "Product updated." : "Product created.";
    productMessage.style.color = "#16a34a";

    await loadProducts();
    resetProductForm();
  } catch (err) {
    console.error(err);
    productMessage.textContent = "Terjadi kesalahan jaringan.";
    productMessage.style.color = "#dc2626";
  }
}

function startEditProduct(btn) {
  const tr = btn.closest("tr");
  if (!tr) return;

  const cells = tr.querySelectorAll("td");
  const id = btn.getAttribute("data-id");

  document.querySelector("#product-id").value = id;
  document.querySelector("#product-category").value = cells[1].textContent.trim();
  document.querySelector("#product-name").value = cells[2].textContent.trim();
  document.querySelector("#product-price").value = cells[3].textContent.trim();
  document.querySelector("#product-stock").value = cells[4].textContent.trim();

  if (productMessage) {
    productMessage.textContent = "";
    productMessage.style.color = "";
  }
}

async function deleteProduct(id) {
  if (!confirm("Yakin ingin menghapus product ini?")) return;
  if (!productMessage) return;

  productMessage.textContent = "Deleting product...";
  productMessage.style.color = "#64748b";

  try {
    const res = await fetch(`${PRODUCT_API}/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      productMessage.textContent = data.error || "Gagal menghapus product.";
      productMessage.style.color = "#dc2626";
      return;
    }

    productMessage.textContent = "Product deleted.";
    productMessage.style.color = "#16a34a";
    await loadProducts();
  } catch (err) {
    console.error(err);
    productMessage.textContent = "Terjadi kesalahan jaringan.";
    productMessage.style.color = "#dc2626";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!productForm || !productTableBody) return;

  loadProducts();
  resetProductForm();

  productForm.addEventListener("submit", handleProductFormSubmit);

  const clearBtn = document.querySelector("#product-clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", e => {
      e.preventDefault();
      resetProductForm();
    });
  }

  productTableBody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.getAttribute("data-id");
    const action = btn.getAttribute("data-action");

    if (action === "edit") {
      startEditProduct(btn);
    } else if (action === "delete") {
      deleteProduct(id);
    }
  });
});
