const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

let PRODUCTS = [];
let PRODUCTS_BY_ID = {};

function fmtMoney(value) {
  const num = Number(value) || 0;
  return currency.format(num);
}

async function loadCustomers() {
  const select = document.getElementById("tx-customer");
  if (!select) return;

  try {
    const res = await fetch("/api/customers");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to load customers", data);
      return;
    }

    select.innerHTML = `<option value="">Pilih Customer</option>`;
    data.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.CustomerID;
      opt.textContent = `#${c.CustomerID} — ${c.Gender || "Unknown"} (${c.Age})`;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading customers", err);
  }
}

async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to load products", data);
      return;
    }

    PRODUCTS = data;
    PRODUCTS_BY_ID = {};
    data.forEach((p) => {
      PRODUCTS_BY_ID[p.ProductID] = p;
    });

    if (!document.querySelector(".tx-item-row")) {
      addItemRow();
    } else {
      refreshAllProductSelects();
    }
  } catch (err) {
    console.error("Error loading products", err);
  }
}

function createProductSelect() {
  const select = document.createElement("select");
  select.className = "input tx-item-product";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Pilih Product";
  select.appendChild(placeholder);

  PRODUCTS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.ProductID;
    opt.textContent = `${p.Name} (#${p.ProductID})`;
    select.appendChild(opt);
  });

  return select;
}

function refreshAllProductSelects() {
  const selects = document.querySelectorAll(".tx-item-product");
  selects.forEach((oldSel) => {
    const currentValue = oldSel.value;
    const newSel = createProductSelect();
    newSel.value = currentValue;
    newSel.addEventListener("change", onProductChange);
    oldSel.replaceWith(newSel);
  });
}

function addItemRow() {
  const container = document.getElementById("items-container");
  if (!container) return;

  const row = document.createElement("div");
  row.className = "tx-item-row";

  const productSelect = createProductSelect();
  productSelect.addEventListener("change", onProductChange);

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = "1";
  qtyInput.value = "1";
  qtyInput.className = "input tx-item-qty";
  qtyInput.addEventListener("input", () => updateRowSubtotal(row));

  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.min = "0";
  priceInput.step = "0.01";
  priceInput.value = "";
  priceInput.className = "input tx-item-price";
  priceInput.addEventListener("input", () => updateRowSubtotal(row));

  const subtotalInput = document.createElement("input");
  subtotalInput.type = "text";
  subtotalInput.readOnly = true;
  subtotalInput.className = "input tx-item-subtotal";
  subtotalInput.value = "0.00";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn-danger btn-xs tx-item-remove";
  removeBtn.textContent = "Hapus";
  removeBtn.addEventListener("click", () => {
    row.remove();
    updateSummary();
  });

  row.appendChild(productSelect);
  row.appendChild(qtyInput);
  row.appendChild(priceInput);
  row.appendChild(subtotalInput);
  row.appendChild(removeBtn);

  container.appendChild(row);

  updateSummary();
}

function onProductChange(e) {
  const select = e.target;
  const row = select.closest(".tx-item-row");
  if (!row) return;

  const productId = select.value;
  const priceInput = row.querySelector(".tx-item-price");

  if (productId && PRODUCTS_BY_ID[productId]) {
    priceInput.value = PRODUCTS_BY_ID[productId].Price;
  } else {
    priceInput.value = "";
  }

  updateRowSubtotal(row);
}

function updateRowSubtotal(row) {
  const qtyInput = row.querySelector(".tx-item-qty");
  const priceInput = row.querySelector(".tx-item-price");
  const subtotalInput = row.querySelector(".tx-item-subtotal");

  const qty = Number(qtyInput.value) || 0;
  const price = Number(priceInput.value) || 0;
  const subtotal = qty * price;

  subtotalInput.value = subtotal.toFixed(2);

  updateSummary();
}

function updateSummary() {
  const rows = document.querySelectorAll(".tx-item-row");
  let totalItems = 0;
  let totalAmount = 0;

  rows.forEach((row) => {
    const qty = Number(row.querySelector(".tx-item-qty").value) || 0;
    const subtotal = Number(row.querySelector(".tx-item-subtotal").value) || 0;
    totalItems += qty;
    totalAmount += subtotal;
  });

  const itemsSpan = document.getElementById("summary-items");
  const amountSpan = document.getElementById("summary-amount");

  if (itemsSpan) itemsSpan.textContent = totalItems;
  if (amountSpan) amountSpan.textContent = fmtMoney(totalAmount);
}

async function handleTransactionSubmit(e) {
  e.preventDefault();

  const customerId = document.getElementById("tx-customer").value;
  const payment = document.getElementById("tx-payment").value;
  const rows = document.querySelectorAll(".tx-item-row");

  if (!customerId) {
    alert("Silakan pilih customer terlebih dahulu.");
    return;
  }
  if (!payment) {
    alert("Silakan pilih metode pembayaran.");
    return;
  }
  if (rows.length === 0) {
    alert("Tambahkan minimal satu item.");
    return;
  }

  const items = [];
  rows.forEach((row) => {
    const productId = row.querySelector(".tx-item-product").value;
    const qty = Number(row.querySelector(".tx-item-qty").value) || 0;
    const unitPrice = Number(row.querySelector(".tx-item-price").value) || 0;

    if (!productId || qty <= 0 || unitPrice < 0) return;

    items.push({
      ProductID: Number(productId),
      Quantity: qty,
      UnitPrice: unitPrice
    });
  });

  if (items.length === 0) {
    alert("Item belum lengkap. Pastikan product, qty, dan price terisi.");
    return;
  }

  const payload = {
    CustomerID: Number(customerId),
    PaymentMethod: payment,
    Items: items
  };

  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Create transaction failed", data);
      alert(data.error || "Gagal membuat transaksi.");
      return;
    }

    alert("Transaksi berhasil dibuat.");
    document.getElementById("transaction-form").reset();
    const container = document.getElementById("items-container");
    if (container) container.innerHTML = "";
    addItemRow();
    updateSummary();
    loadTransactions();
  } catch (err) {
    console.error("Error creating transaction", err);
    alert("Terjadi kesalahan jaringan saat membuat transaksi.");
  }
}

async function loadTransactions() {
  const tableBody = document.querySelector("#transactions-table tbody");
  if (!tableBody) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="7" class="empty-row">Loading transactions...</td>
    </tr>
  `;

  try {
    const res = await fetch("/api/transactions");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to load transactions", data);
      tableBody.innerHTML = `
        <tr><td colspan="7" class="empty-row">Gagal memuat transaksi.</td></tr>
      `;
      return;
    }

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr><td colspan="7" class="empty-row">Belum ada transaksi.</td></tr>
      `;
      updateMetrics([], 0, 0);
      return;
    }

    tableBody.innerHTML = "";
    let totalSales = 0;
    let totalItemsAll = 0;

    data.forEach((tx) => {
      const tr = document.createElement("tr");

      const amount = Number(tx.TotalAmount) || 0;
      const itemsCount = Number(tx.TotalItems) || 0;
      totalSales += amount;
      totalItemsAll += itemsCount;

      tr.innerHTML = `
        <td>${tx.TransactionID}</td>
        <td>#${tx.CustomerID}</td>
        <td>${tx.TransactionDate || ""}</td>
        <td>${itemsCount}</td>
        <td>${fmtMoney(amount)}</td>
        <td>${tx.PaymentMethod || ""}</td>
        <td>
          <button
            type="button"
            class="btn-soft btn-xs tx-view-items"
            data-id="${tx.TransactionID}"
          >
            View Items
          </button>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    updateMetrics(data, totalSales, totalItemsAll);
  } catch (err) {
    console.error("Error loading transactions", err);
    tableBody.innerHTML = `
      <tr><td colspan="7" class="empty-row">Error saat memuat transaksi.</td></tr>
    `;
  }
}

function updateMetrics(transactions, totalSales) {
  const totalCount = Array.isArray(transactions) ? transactions.length : 0;
  const avg = totalCount > 0 ? totalSales / totalCount : 0;

  const totalSalesEl = document.getElementById("tx-total-sales");
  const totalCountEl = document.getElementById("tx-total-count");
  const avgAmountEl = document.getElementById("tx-avg-amount");

  if (totalSalesEl) totalSalesEl.textContent = fmtMoney(totalSales);
  if (totalCountEl) totalCountEl.textContent = totalCount;
  if (avgAmountEl) avgAmountEl.textContent = fmtMoney(avg);
}

function openItemsModal(txId) {
  const overlay = document.getElementById("items-modal");
  if (!overlay) return;

  const title = document.getElementById("items-modal-title");
  const body = document.getElementById("items-modal-body");

  if (title) title.textContent = `Transaction #${txId} Items`;
  if (body) {
    body.innerHTML = `
      <tr><td colspan="4" class="empty-row">Loading...</td></tr>
    `;
  }

  overlay.classList.remove("hidden");

  fetch(`/api/transactions/${txId}`)
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!body) return;
      if (!ok) {
        console.error("Failed to load transaction detail", data);
        body.innerHTML = `
          <tr><td colspan="4" class="empty-row">Gagal memuat item.</td></tr>
        `;
        return;
      }

      const items = Array.isArray(data.Items) ? data.Items : [];
      if (items.length === 0) {
        body.innerHTML = `
          <tr><td colspan="4" class="empty-row">No items.</td></tr>
        `;
        return;
      }

      body.innerHTML = "";
      items.forEach((it) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${it.Name || `#${it.ProductID}`}</td>
          <td>${it.Quantity}</td>
          <td>${fmtMoney(it.UnitPrice)}</td>
          <td>${fmtMoney(it.Subtotal)}</td>
        `;
        body.appendChild(tr);
      });
    })
    .catch((err) => {
      console.error("Error loading transaction detail", err);
      if (body) {
        body.innerHTML = `
          <tr><td colspan="4" class="empty-row">Error saat memuat item.</td></tr>
        `;
      }
    });
}

function closeItemsModal() {
  const overlay = document.getElementById("items-modal");
  if (!overlay) return;
  overlay.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("transaction-form");
  const itemsContainer = document.getElementById("items-container");
  if (!form || !itemsContainer) return;

  loadCustomers();
  loadProducts();
  loadTransactions();

  const addItemBtn = document.getElementById("add-item-btn");
  if (addItemBtn) {
    addItemBtn.addEventListener("click", () => {
      addItemRow();
    });
  }

  form.addEventListener("submit", handleTransactionSubmit);

  const txTable = document.getElementById("transactions-table");
  if (txTable) {
    txTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".tx-view-items");
      if (!btn) return;
      const txId = btn.getAttribute("data-id");
      if (!txId) return;
      openItemsModal(txId);
    });
  }

  const closeBtn = document.getElementById("items-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeItemsModal);
  }
  const overlay = document.getElementById("items-modal");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeItemsModal();
      }
    });
  }
});
