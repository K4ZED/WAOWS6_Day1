const CUSTOMER_API = "/api/customers";
const customerTableBody = document.querySelector("#customers-table tbody");
const customerForm = document.querySelector("#customer-form");

async function loadCustomers() {
  const res = await fetch(CUSTOMER_API);
  const data = await res.json();
  customerTableBody.innerHTML = "";
  data.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.CustomerID}</td>
      <td>${c.Gender}</td>
      <td>${c.Age}</td>
      <td>${c.Annual_Income}</td>
      <td>${c.Spending_Score}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" data-edit="${c.CustomerID}">Edit</button>
        <button class="btn btn-sm btn-danger" data-delete="${c.CustomerID}">Delete</button>
      </td>
    `;
    customerTableBody.appendChild(tr);
  });
}

customerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#customer-id").value;
  const payload = {
    Gender: document.querySelector("#gender").value,
    Age: Number(document.querySelector("#age").value),
    Annual_Income: Number(document.querySelector("#income").value),
    Spending_Score: Number(document.querySelector("#score").value),
  };

  if (!id) {
    await fetch(CUSTOMER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(`${CUSTOMER_API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  customerForm.reset();
  document.querySelector("#customer-id").value = "";
  loadCustomers();
});

customerTableBody.addEventListener("click", async (e) => {
  if (e.target.dataset.edit) {
    const row = e.target.closest("tr").children;
    document.querySelector("#customer-id").value = e.target.dataset.edit;
    document.querySelector("#gender").value = row[1].textContent;
    document.querySelector("#age").value = row[2].textContent;
    document.querySelector("#income").value = row[3].textContent;
    document.querySelector("#score").value = row[4].textContent;
  }

  if (e.target.dataset.delete) {
    await fetch(`${CUSTOMER_API}/${e.target.dataset.delete}`, { method: "DELETE" });
    loadCustomers();
  }
});

loadCustomers();
