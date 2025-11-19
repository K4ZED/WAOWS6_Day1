const PRODUCT_API = "/api/products";
const productTableBody = document.querySelector("#products-table tbody");
const productForm = document.querySelector("#product-form");

async function loadProducts() {
  const res = await fetch(PRODUCT_API);
  const data = await res.json();
  productTableBody.innerHTML = "";
  data.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.ProductID}</td>
      <td>${p.CategoryID}</td>
      <td>${p.Name}</td>
      <td>${p.Price}</td>
      <td>${p.Stock}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" data-edit="${p.ProductID}">Edit</button>
        <button class="btn btn-sm btn-danger" data-delete="${p.ProductID}">Delete</button>
      </td>
    `;
    productTableBody.appendChild(tr);
  });
}

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#product-id").value;
  const payload = {
    CategoryID: Number(document.querySelector("#category-id").value),
    Name: document.querySelector("#name").value,
    Price: Number(document.querySelector("#price").value),
    Stock: Number(document.querySelector("#stock").value),
  };

  if (!id) {
    await fetch(PRODUCT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(`${PRODUCT_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  productForm.reset();
  document.querySelector("#product-id").value = "";
  loadProducts();
});

productTableBody.addEventListener("click", async (e) => {
  if (e.target.dataset.edit) {
    const row = e.target.closest("tr").children;
    document.querySelector("#product-id").value = e.target.dataset.edit;
    document.querySelector("#category-id").value = row[1].textContent;
    document.querySelector("#name").value = row[2].textContent;
    document.querySelector("#price").value = row[3].textContent;
    document.querySelector("#stock").value = row[4].textContent;
  }

  if (e.target.dataset.delete) {
    await fetch(`${PRODUCT_API}/${e.target.dataset.delete}`, { method: "DELETE" });
    loadProducts();
  }
});

loadProducts();
