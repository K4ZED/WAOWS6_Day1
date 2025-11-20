const PREVIEW_CUSTOMERS = document.querySelector("#preview-customers");
const PREVIEW_PRODUCTS = document.querySelector("#preview-products");

const METRIC_CUSTOMERS = document.querySelector("#metric-customers");
const METRIC_PRODUCTS = document.querySelector("#metric-products");
const METRIC_TRANSACTIONS = document.querySelector("#metric-transactions");
const METRIC_SALES = document.querySelector("#metric-sales");

async function loadPreviewCustomers() {
  if (!PREVIEW_CUSTOMERS) return;

  try {
    PREVIEW_CUSTOMERS.innerHTML =
      '<li class="preview-empty">Loading customers...</li>';

    const res = await fetch("/api/customers");
    if (!res.ok) throw new Error("Failed to fetch customers");

    const data = await res.json();
    const top5 = data.slice(0, 5);

    if (METRIC_CUSTOMERS) {
      METRIC_CUSTOMERS.textContent = data.length;
    }

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
        <div class="preview-main">#${c.CustomerID} · ${c.Gender}</div>
        <div class="preview-meta">Age ${c.Age} — Score ${c.Spending_Score}</div>
      `;
      PREVIEW_CUSTOMERS.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    PREVIEW_CUSTOMERS.innerHTML =
      '<li class="preview-empty">Failed to load customers.</li>';
    if (METRIC_CUSTOMERS) METRIC_CUSTOMERS.textContent = "0";
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

    if (METRIC_PRODUCTS) {
      METRIC_PRODUCTS.textContent = data.length;
    }

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
        <div class="preview-meta">$${p.Price} · Stock ${p.Stock}</div>
      `;
      PREVIEW_PRODUCTS.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    PREVIEW_PRODUCTS.innerHTML =
      '<li class="preview-empty">Failed to load products.</li>';
    if (METRIC_PRODUCTS) METRIC_PRODUCTS.textContent = "0";
  }
}

async function loadTransactionMetrics() {
  if (!METRIC_TRANSACTIONS && !METRIC_SALES) return;

  try {
    const res = await fetch("/api/transactions");
    if (!res.ok) throw new Error("Failed to fetch transactions");

    const data = await res.json();

    if (METRIC_TRANSACTIONS) {
      METRIC_TRANSACTIONS.textContent = data.length;
    }

    let total = 0;
    for (const t of data) {
      const val =
        t.TotalAmount ??
        t.Amount ??
        t.Total ??
        0;
      const num = Number(val);
      if (!Number.isNaN(num)) total += num;
    }

    if (METRIC_SALES) {
      METRIC_SALES.textContent = "$" + total.toFixed(2);
    }
  } catch (err) {
    console.error(err);
    if (METRIC_TRANSACTIONS) METRIC_TRANSACTIONS.textContent = "0";
    if (METRIC_SALES) METRIC_SALES.textContent = "$0";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPreviewCustomers();
  loadPreviewProducts();
  loadTransactionMetrics();
});
