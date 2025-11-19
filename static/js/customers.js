const CUSTOMER_API = "/api/customers";

const tableBody = document.querySelector("#customers-table tbody");
const form = document.querySelector("#customer-form");

const idInput = document.querySelector("#customer-id");
const genderInput = document.querySelector("#gender");
const ageInput = document.querySelector("#age");
const incomeInput = document.querySelector("#income");
const scoreInput = document.querySelector("#score");
const saveBtn = document.querySelector("#save-btn");
const resetBtn = document.querySelector("#reset-btn");

function clearForm() {
  idInput.value = "";
  genderInput.value = "";
  ageInput.value = "";
  incomeInput.value = "";
  scoreInput.value = "";
  saveBtn.textContent = "Add Customer";
}

async function loadCustomers() {
  try {
    tableBody.innerHTML =
      '<tr><td colspan="6" class="empty-row">Loading customers...</td></tr>';

    const res = await fetch(CUSTOMER_API);
    if (!res.ok) throw new Error("Failed to fetch customers");

    const data = await res.json();
    tableBody.innerHTML = "";

    if (!data.length) {
      tableBody.innerHTML =
        '<tr><td colspan="6" class="empty-row">No customers yet. Add one above.</td></tr>';
      return;
    }

    data.forEach((c) => {
      const tr = document.createElement("tr");
      tr.classList.add("fade-row");
      tr.innerHTML = `
        <td>${c.CustomerID}</td>
        <td>${c.Gender}</td>
        <td>${c.Age}</td>
        <td>${c.Annual_Income}</td>
        <td>${c.Spending_Score}</td>
        <td class="col-actions">
          <button class="btn-outline btn-small" data-edit="${c.CustomerID}">Edit</button>
          <button class="btn-danger btn-small" data-delete="${c.CustomerID}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML =
      '<tr><td colspan="6" class="error-row">Failed to load customers.</td></tr>';
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    Gender: genderInput.value.trim(),
    Age: Number(ageInput.value),
    Annual_Income: Number(incomeInput.value),
    Spending_Score: Number(scoreInput.value),
  };

  if (!payload.Gender || !payload.Age || !payload.Annual_Income || !payload.Spending_Score) {
    alert("Please fill in all fields.");
    return;
  }

  const isUpdate = Boolean(idInput.value);
  const url = isUpdate ? `${CUSTOMER_API}/${idInput.value}` : CUSTOMER_API;
  const method = isUpdate ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to save customer", await res.text());
      alert("Failed to save customer.");
      return;
    }

    clearForm();
    await loadCustomers();
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearForm();
});

// Edit / Delete via event delegation
document
  .querySelector("#customers-table")
  .addEventListener("click", async (e) => {
    const editId = e.target.dataset.edit;
    const deleteId = e.target.dataset.delete;

    if (editId) {
      const row = e.target.closest("tr").children;
      idInput.value = editId;
      genderInput.value = row[1].textContent;
      ageInput.value = row[2].textContent;
      incomeInput.value = row[3].textContent;
      scoreInput.value = row[4].textContent;
      saveBtn.textContent = "Update Customer";

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (deleteId) {
      const ok = confirm("Delete this customer?");
      if (!ok) return;

      try {
        const res = await fetch(`${CUSTOMER_API}/${deleteId}`, { method: "DELETE" });
        if (!res.ok) {
          alert("Failed to delete customer.");
          return;
        }
        await loadCustomers();
      } catch (err) {
        console.error(err);
        alert("Network error while deleting.");
      }
    }
  });

document.addEventListener("DOMContentLoaded", loadCustomers);
