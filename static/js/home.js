const PREVIEW_CUSTOMERS = document.querySelector("#preview-customers");
const PREVIEW_PRODUCTS = document.querySelector("#preview-products");

async function loadPreviewCustomers() {
  if (!PREVIEW_CUSTOMERS) return;

  try {
    PREVIEW_CUSTOMERS.innerHTML =
      '<li class="preview-empty">Loading customers...</li>';

    const res = await fetch("/api/customers");
    if (!res.ok) throw new Error("Failed to fetch customers");

    const data = await res.json();
    const top5 = data.slice(0, 5);

    if (!top5.length) {
      PREVIEW_CUSTOMERS.innerHTML =
        '<li class="preview-empty">No customers found yet.</li>';
      return;
    }

    PREVIEW_CUSTOMERS.innerHTML = "";
    top5.forEach((c) => {
      const li = document.createElement("li");
      li.className = "preview-item";
      li.innerHTML = `
        <div class="preview-main">#${c.CustomerID} &middot; ${c.Gender}</div>
        <div class="preview-meta">Age ${c.Age} &mdash; Score ${c.Spending_Score}</div>
      `;
      PREVIEW_CUSTOMERS.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    PREVIEW_CUSTOMERS.innerHTML =
      '<li class="preview-empty">Failed to load customers.</li>';
  }
}

async function loadPreviewProducts() {
  if (!PREVIEW_PRODUCTS) return;

  try {
    PREVIEW_PRODUCTS.innerHTML =
      '<li class="preview-empty">Loading products...</li>';

    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const top5 = data.slice(0, 5);

    if (!top5.length) {
      PREVIEW_PRODUCTS.innerHTML =
        '<li class="preview-empty">No products found yet.</li>';
      return;
    }

    PREVIEW_PRODUCTS.innerHTML = "";
    top5.forEach((p) => {
      const li = document.createElement("li");
      li.className = "preview-item";
      li.innerHTML = `
        <div class="preview-main">${p.Name}</div>
        <div class="preview-meta">$${p.Price} &middot; Stock ${p.Stock}</div>
      `;
      PREVIEW_PRODUCTS.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    PREVIEW_PRODUCTS.innerHTML =
      '<li class="preview-empty">Failed to load products.</li>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPreviewCustomers();
  loadPreviewProducts();
});
