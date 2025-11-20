const txCustomerSelect = document.querySelector("#tx-customer");
const txPaymentSelect = document.querySelector("#tx-payment");
const itemsContainer = document.querySelector("#items-container");
const addItemBtn = document.querySelector("#add-item-btn");
const txForm = document.querySelector("#transaction-form");

const summaryItems = document.querySelector("#summary-items");
const summaryAmount = document.querySelector("#summary-amount");

const txTableBody = document.querySelector("#transactions-table tbody");

const metricTotalSales = document.querySelector("#tx-total-sales");
const metricTotalCount = document.querySelector("#tx-total-count");
const metricAvgAmount = document.querySelector("#tx-avg-amount");

const itemsModal = document.querySelector("#items-modal");
const itemsModalClose = document.querySelector("#items-modal-close");
const itemsModalTitle = document.querySelector("#items-modal-title");
const itemsModalBody = document.querySelector("#items-modal-body");

let productsCache = [];
let customersCache = [];

async function loadCustomers() {
  const res = await fetch("/api/customers");
  if (!res.ok) return;
  customersCache = await res.json();

  customersCache.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.CustomerID;
    opt.textContent = `#${c.CustomerID} - ${c.Gender}`;
    txCustomerSelect.appendChild(opt);
  });
}

async function loadProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) return;
  productsCache = await res.json();
}

function createItemRow() {
  const row = document.createElement("div");
  row.className = "item-row";

  const productSelect = document.createElement("select");
  productSelect.className = "input item-product";
  productSelect.innerHTML = `<option value="">Pilih Product</option>`;
  productsCache.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.ProductID;
    opt.textContent = p.Name;
    productSelect.appendChild(opt);
  });

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = "1";
  qtyInput.value = "1";
  qtyInput.className = "input item-qty";

  const priceDiv = document.createElement("div");
  priceDiv.className = "item-price";
  priceDiv.textContent = "0.00";

  const subtotalDiv = document.createElement("div");
  subtotalDiv.className = "item-subtotal";
  subtotalDiv.textContent = "0.00";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn-danger btn-small item-remove";
  removeBtn.textContent = "Hapus";

  row.appendChild(productSelect);
  row.appendChild(qtyInput);
  row.appendChild(priceDiv);
  row.appendChild(subtotalDiv);
  row.appendChild(removeBtn);

  itemsContainer.appendChild(row);

  productSelect.addEventListener("change", recalcTotals);
  qtyInput.addEventListener("input", recalcTotals);
  removeBtn.addEventListener("click", () => {
    row.remove();
    recalcTotals();
  });

  recalcTotals();
}

function recalcTotals() {
  let totalItems = 0;
  let totalAmount = 0;

  const rows = itemsContainer.querySelectorAll(".item-row");
  rows.forEach((row) => {
    const productSelect = row.querySelector(".item-product");
    const qtyInput = row.querySelector(".item-qty");
    const priceDiv = row.querySelector(".item-price");
    const subtotalDiv = row.querySelector(".item-subtotal");

    const productId = Number(productSelect.value);
    const qty = Number(qtyInput.value) || 0;
    const product = productsCache.find((p) => p.ProductID === productId);
    const unitPrice = product ? Number(product.Price) : 0;
    const subtotal = unitPrice * qty;

    priceDiv.textContent = unitPrice.toFixed(2);
    subtotalDiv.textContent = subtotal.toFixed(2);

    totalItems += qty;
    totalAmount += subtotal;
  });

  summaryItems.textContent = totalItems;
  summaryAmount.textContent = "$" + totalAmount.toFixed(2);
}

async function loadTransactions() {
  try {
    txTableBody.innerHTML =
      '<tr><td colspan="7" class="empty-row">Loading transactions...</td></tr>';

    const res = await fetch("/api/transactions");
    if (!res.ok) throw new Error("failed");

    const data = await res.json();
    txTableBody.innerHTML = "";

    if (!data.length) {
      txTableBody.innerHTML =
        '<tr><td colspan="7" class="empty-row">No transactions yet.</td></tr>';
    }

    let totalAmount = 0;
    data.forEach((t) => {
      const tr = document.createElement("tr");
      const amount = Number(t.TotalAmount || 0);
      totalAmount += amount;

      const date = t.TransactionDate
        ? new Date(t.TransactionDate).toLocaleDateString()
        : "-";

      const customerLabel =
        t.CustomerID || t.CustomerID === 0 ? `#${t.CustomerID}` : "Unknown";

      tr.innerHTML = `
        <td>${t.TransactionID}</td>
        <td>${customerLabel}</td>
        <td>${date}</td>
        <td>${t.TotalItems}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${t.PaymentMethod || "-"}</td>
        <td class="col-actions">
          <button class="btn-outline btn-small" data-view-items="${t.TransactionID}">
            View Items
          </button>
        </td>
      `;
      txTableBody.appendChild(tr);
    });

    if (metricTotalCount) {
      metricTotalCount.textContent = data.length;
    }
    if (metricTotalSales) {
      metricTotalSales.textContent = "$" + totalAmount.toFixed(2);
    }
    if (metricAvgAmount) {
      const avg = data.length ? totalAmount / data.length : 0;
      metricAvgAmount.textContent = "$" + avg.toFixed(2);
    }
  } catch (err) {
    console.error(err);
    txTableBody.innerHTML =
      '<tr><td colspan="7" class="error-row">Failed to load transactions.</td></tr>';
    if (metricTotalCount) metricTotalCount.textContent = "0";
    if (metricTotalSales) metricTotalSales.textContent = "$0.00";
    if (metricAvgAmount) metricAvgAmount.textContent = "$0.00";
  }
}

async function openItemsModal(transactionId) {
  try {
    const res = await fetch(`/api/transactions/${transactionId}`);
    if (!res.ok) throw new Error("failed detail");

    const data = await res.json();

    itemsModalTitle.textContent = `Transaction #${data.TransactionID}`;
    const items = data.Items || [];

    itemsModalBody.innerHTML = "";

    if (!items.length) {
      itemsModalBody.innerHTML =
        '<tr><td colspan="4" class="empty-row">No items for this transaction.</td></tr>';
    } else {
      items.forEach((item) => {
        const tr = document.createElement("tr");
        const unit = Number(item.UnitPrice || 0);
        const sub = Number(item.Subtotal || 0);

        tr.innerHTML = `
          <td>${item.Name || item.ProductID}</td>
          <td>${item.Quantity}</td>
          <td>$${unit.toFixed(2)}</td>
          <td>$${sub.toFixed(2)}</td>
        `;
        itemsModalBody.appendChild(tr);
      });
    }

    itemsModal.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Failed to load transaction items.");
  }
}

txForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const customerId = txCustomerSelect.value || null;
  const paymentMethod = txPaymentSelect.value || null;

  const rows = itemsContainer.querySelectorAll(".item-row");
  const items = [];

  rows.forEach((row) => {
    const productSelect = row.querySelector(".item-product");
    const qtyInput = row.querySelector(".item-qty");
    const priceDiv = row.querySelector(".item-price");
    const subtotalDiv = row.querySelector(".item-subtotal");

    const productId = Number(productSelect.value);
    const qty = Number(qtyInput.value) || 0;
    const unitPrice = Number(priceDiv.textContent) || 0;
    const subtotal = Number(subtotalDiv.textContent) || 0;

    if (productId && qty > 0) {
      items.push({
        ProductID: productId,
        Quantity: qty,
        UnitPrice: unitPrice,
        Subtotal: subtotal,
      });
    }
  });

  if (!items.length) {
    alert("Tambahkan minimal satu item.");
    return;
  }

  const payload = {
    CustomerID: customerId,
    PaymentMethod: paymentMethod,
    Items: items,
  };

  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(await res.text());
      alert("Gagal membuat transaksi.");
      return;
    }

    itemsContainer.innerHTML = "";
    createItemRow();
    summaryItems.textContent = "0";
    summaryAmount.textContent = "$0.00";
    txPaymentSelect.value = "";
    txCustomerSelect.value = "";

    await loadTransactions();
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
});

txTableBody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-view-items]");
  if (!btn) return;
  const id = btn.getAttribute("data-view-items");
  if (!id) return;
  openItemsModal(id);
});

itemsModalClose.addEventListener("click", () => {
  itemsModal.classList.add("hidden");
});

itemsModal.addEventListener("click", (e) => {
  if (e.target === itemsModal) {
    itemsModal.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadCustomers(), loadProducts()]);
  createItemRow();
  loadTransactions();
});
