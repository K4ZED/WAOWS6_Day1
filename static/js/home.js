const PREVIEW_CUSTOMERS = document.querySelector("#preview-customers");
const PREVIEW_PRODUCTS = document.querySelector("#preview-products");

const METRIC_CUSTOMERS = document.querySelector("#metric-customers");
const METRIC_PRODUCTS = document.querySelector("#metric-products");
const METRIC_TRANSACTIONS = document.querySelector("#metric-transactions");
const METRIC_SALES = document.querySelector("#metric-sales");

const ANALYTICS_TOP_CUSTOMERS = document.querySelector(
  "#analytics-top-customers"
);
const ANALYTICS_PAYMENT = document.querySelector("#analytics-payment");

let customersCache = [];
let productsCache = [];

async function loadPreviewCustomers() {
  if (!PREVIEW_CUSTOMERS) return;

  try {
    PREVIEW_CUSTOMERS.innerHTML =
      '<li class="preview-empty">Loading customers...</li>';

    const res = await fetch("/api/customers");
    if (!res.ok) throw new Error("Failed to fetch customers");

    const data = await res.json();
    customersCache = data;
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
    productsCache = data;
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

function labelForCustomer(id) {
  const c = customersCache.find((x) => x.CustomerID === id);
  if (!c) return `Customer #${id}`;
  return `#${c.CustomerID} · ${c.Gender}`;
}

async function loadTransactionMetricsAndAnalytics() {
  try {
    const res = await fetch("/api/transactions");
    if (!res.ok) throw new Error("Failed to fetch transactions");

    const data = await res.json();

    let totalAmount = 0;
    data.forEach((t) => {
      totalAmount += Number(t.TotalAmount || 0);
    });

    if (METRIC_TRANSACTIONS) {
      METRIC_TRANSACTIONS.textContent = data.length;
    }
    if (METRIC_SALES) {
      METRIC_SALES.textContent = "$" + totalAmount.toFixed(2);
    }

    if (ANALYTICS_TOP_CUSTOMERS) {
      const agg = {};
      data.forEach((t) => {
        const cid = t.CustomerID;
        if (!cid) return;
        const amount = Number(t.TotalAmount || 0);
        if (!agg[cid]) agg[cid] = { id: cid, total: 0, count: 0 };
        agg[cid].total += amount;
        agg[cid].count += 1;
      });

      const top = Object.values(agg)
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

      ANALYTICS_TOP_CUSTOMERS.innerHTML = "";

      if (!top.length) {
        ANALYTICS_TOP_CUSTOMERS.innerHTML =
          '<li class="preview-empty">No transactions yet.</li>';
      } else {
        const maxTotal = top[0].total || 1;
        top.forEach((c) => {
          const percent = Math.max(8, (c.total / maxTotal) * 100);
          const li = document.createElement("li");
          li.className = "analytics-item";
          li.innerHTML = `
            <div class="analytics-main">
              <span class="analytics-label">${labelForCustomer(
                c.id
              )}</span>
              <span class="analytics-value">$${c.total.toFixed(2)}</span>
            </div>
            <div class="analytics-meta">${c.count} transaction${
            c.count > 1 ? "s" : ""
          }</div>
            <div class="analytics-bar">
              <span style="width:${percent}%;"></span>
            </div>
          `;
          ANALYTICS_TOP_CUSTOMERS.appendChild(li);
        });
      }
    }

    if (ANALYTICS_PAYMENT) {
      const aggPay = {};
      data.forEach((t) => {
        const key = t.PaymentMethod || "unknown";
        aggPay[key] = (aggPay[key] || 0) + 1;
      });

      ANALYTICS_PAYMENT.innerHTML = "";

      if (!data.length) {
        ANALYTICS_PAYMENT.innerHTML =
          '<li class="preview-empty">No transactions yet.</li>';
      } else {
        const totalTx = data.length;
        Object.entries(aggPay)
          .sort((a, b) => b[1] - a[1])
          .forEach(([method, count]) => {
            const pct = (count / totalTx) * 100;
            const label =
              method === "unknown" ? "Unknown / N/A" : method.toUpperCase();
            const li = document.createElement("li");
            li.className = "analytics-item";
            li.innerHTML = `
              <div class="analytics-main">
                <span class="analytics-label">${label}</span>
                <span class="analytics-value">${count}</span>
              </div>
              <div class="analytics-meta">${pct.toFixed(1)}% of transactions</div>
              <div class="analytics-bar analytics-bar-alt">
                <span style="width:${pct}%;"></span>
              </div>
            `;
            ANALYTICS_PAYMENT.appendChild(li);
          });
      }
    }
  } catch (err) {
    console.error(err);
    if (METRIC_TRANSACTIONS) METRIC_TRANSACTIONS.textContent = "0";
    if (METRIC_SALES) METRIC_SALES.textContent = "$0";
    if (ANALYTICS_TOP_CUSTOMERS) {
      ANALYTICS_TOP_CUSTOMERS.innerHTML =
        '<li class="preview-empty">Failed to load data.</li>';
    }
    if (ANALYTICS_PAYMENT) {
      ANALYTICS_PAYMENT.innerHTML =
        '<li class="preview-empty">Failed to load data.</li>';
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPreviewCustomers();
  loadPreviewProducts();
  loadTransactionMetricsAndAnalytics();
});
