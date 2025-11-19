const PRODUCT_API = "/api/products";

const productTableBody = document.querySelector("#products-table tbody");
const productForm = document.querySelector("#product-form");

const productIdInput = document.querySelector("#product-id");
const categoryInput = document.querySelector("#category");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const stockInput = document.querySelector("#stock");
const saveProductBtn = document.querySelector("#save-product-btn");
const resetProductBtn = document.querySelector("#reset-product-btn");

function clearProductForm() {
  productIdInput.value = "";
  categoryInput.value = "";
  nameInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
  saveProductBtn.textContent = "Add Product";
}

async function loadProducts() {
  try {
    productTableBody.innerHTML =
      '<tr><td colspan="6" class="empty-row">Loading products...</td></tr>';

    const res = await fetch(PRODUCT_API);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    productTableBody.innerHTML = "";

    if (!data.length) {
      productTableBody.innerHTML =
        '<tr><td colspan="6" class="empty-row">No products yet. Add one above.</td></tr>';
      return;
    }

    data.forEach((p) => {
      const tr = document.createElement("tr");
      tr.classList.add("fade-row");
      tr.innerHTML = `
        <td>${p.ProductID}</td>
        <td>${p.CategoryID}</td>
        <td>${p.Name}</td>
        <td>${p.Price}</td>
        <td>${p.Stock}</td>
        <td class="col-actions">
          <button class="btn-outline btn-small" data-edit="${p.ProductID}">Edit</button>
          <button class="btn-danger btn-small" data-delete="${p.ProductID}">Delete</button>
        </td>
      `;
      productTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    productTableBody.innerHTML =
      '<tr><td colspan="6" class="error-row">Failed to load products.</td></tr>';
  }
}

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    CategoryID: Number(categoryInput.value),
    Name: nameInput.value.trim(),
    Price: Number(priceInput.value),
    Stock: Number(stockInput.value),
  };

  if (!payload.CategoryID || !payload.Name || isNaN(payload.Price) || isNaN(payload.Stock)) {
    alert("Please fill in all product fields.");
    return;
  }

  const isUpdate = Boolean(productIdInput.value);
  const url = isUpdate ? `${PRODUCT_API}/${productIdInput.value}` : PRODUCT_API;
  const method = isUpdate ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to save product", await res.text());
      alert("Failed to save product.");
      return;
    }

    clearProductForm();
    await loadProducts();
  } catch (err) {
    console.error(err);
    alert("Network error while saving product.");
  }
});

resetProductBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearProductForm();
});

// Edit / Delete lewat event delegation
document
  .querySelector("#products-table")
  .addEventListener("click", async (e) => {
    const editId = e.target.dataset.edit;
    const deleteId = e.target.dataset.delete;

    if (editId) {
      const row = e.target.closest("tr").children;
      productIdInput.value = editId;
      categoryInput.value = row[1].textContent;
      nameInput.value = row[2].textContent;
      priceInput.value = row[3].textContent;
      stockInput.value = row[4].textContent;
      saveProductBtn.textContent = "Update Product";

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (deleteId) {
      const ok = confirm("Delete this product?");
      if (!ok) return;

      try {
        const res = await fetch(`${PRODUCT_API}/${deleteId}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          alert("Failed to delete product.");
          return;
        }
        await loadProducts();
      } catch (err) {
        console.error(err);
        alert("Network error while deleting.");
      }
    }
  });

document.addEventListener("DOMContentLoaded", loadProducts);
