let editingUserId = null;

function showUserForm(show) {
  const card = document.querySelector("#user-form-card");
  if (!card) return;
  card.style.display = show ? "block" : "none";
}

function resetUserForm() {
  editingUserId = null;
  document.querySelector("#user-id").value = "";
  document.querySelector("#user-email").value = "";
  document.querySelector("#user-password").value = "";
  document.querySelector("#user-role").value = "user";
  document.querySelector("#user-active").value = "1";
  document.querySelector("#user-submit-btn").textContent = "Save User";
  document.querySelector("#user-form-message").textContent = "";
}

/* =========================
   LOAD USERS
   ========================= */
async function loadUsers() {
  const tbody = document.querySelector("#users-tbody");
  const msg = document.querySelector("#users-message");

  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="5">Loading users...</td></tr>`;
  msg.textContent = "";

  try {
    const res = await fetch("/api/users");
    const data = await res.json();

    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="5">Gagal memuat users.</td></tr>`;
      msg.textContent = data.error || "Gagal memuat data users.";
      msg.style.color = "#dc2626";
      return;
    }

    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">Belum ada user terdaftar.</td></tr>`;
      return;
    }

    tbody.innerHTML = "";
    data.forEach(user => {
      const tr = document.createElement("tr");

      const statusLabel = user.IsActive ? "Active" : "Inactive";
      const statusClass = user.IsActive ? "badge-success" : "badge-muted";

      tr.innerHTML = `
        <td>${user.UserId}</td>
        <td>${user.Email}</td>
        <td>
          <span class="badge badge-role">${user.Role}</span>
        </td>
        <td>
          <span class="badge ${statusClass}">${statusLabel}</span>
        </td>
        <td>
          <button class="btn-soft btn-xs" data-action="edit" data-id="${user.UserId}">Edit</button>
          <button class="btn-danger btn-xs" data-action="delete" data-id="${user.UserId}">Delete</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="5">Error saat memuat users.</td></tr>`;
    msg.textContent = "Terjadi kesalahan jaringan.";
    msg.style.color = "#dc2626";
  }
}

/* =========================
   CREATE / UPDATE USER
   ========================= */
async function handleUserFormSubmit(e) {
  e.preventDefault();

  const id = document.querySelector("#user-id").value || editingUserId;
  const email = document.querySelector("#user-email").value.trim();
  const password = document.querySelector("#user-password").value;
  const role = document.querySelector("#user-role").value;
  const isActive = document.querySelector("#user-active").value === "1";
  const msg = document.querySelector("#user-form-message");

  if (!email) {
    msg.textContent = "Email wajib diisi.";
    msg.style.color = "#dc2626";
    return;
  }

  const payload = {
    Email: email,
    Role: role,
    IsActive: isActive
  };

  // password hanya dikirim kalau diisi
  if (password) {
    payload.Password = password;
  } else if (!id) {
    msg.textContent = "Password wajib untuk user baru.";
    msg.style.color = "#dc2626";
    return;
  }

  const isEdit = !!id;
  const url = isEdit ? `/api/users/${id}` : "/api/users";
  const method = isEdit ? "PUT" : "POST";

  msg.textContent = isEdit ? "Updating user..." : "Creating user...";
  msg.style.color = "#64748b";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || (isEdit ? "Gagal update user." : "Gagal membuat user.");
      msg.style.color = "#dc2626";
      return;
    }

    msg.textContent = isEdit ? "User updated." : "User created.";
    msg.style.color = "#16a34a";

    await loadUsers();
    setTimeout(() => {
      showUserForm(false);
      resetUserForm();
    }, 600);

  } catch (err) {
    console.error(err);
    msg.textContent = "Terjadi kesalahan jaringan.";
    msg.style.color = "#dc2626";
  }
}

/* =========================
   EDIT USER
   ========================= */
async function startEditUser(id) {
  const msg = document.querySelector("#user-form-message");

  try {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || "Gagal mengambil data user.";
      msg.style.color = "#dc2626";
      showUserForm(true);
      return;
    }

    editingUserId = data.UserId;
    document.querySelector("#user-id").value = data.UserId;
    document.querySelector("#user-email").value = data.Email;
    document.querySelector("#user-password").value = "";
    document.querySelector("#user-role").value = data.Role || "user";
    document.querySelector("#user-active").value = data.IsActive ? "1" : "0";
    document.querySelector("#user-submit-btn").textContent = "Update User";
    msg.textContent = "";
    msg.style.color = "";

    showUserForm(true);

  } catch (err) {
    console.error(err);
    msg.textContent = "Terjadi kesalahan jaringan saat mengambil data user.";
    msg.style.color = "#dc2626";
    showUserForm(true);
  }
}

/* =========================
   DELETE USER
   ========================= */
async function deleteUser(id) {
  const msg = document.querySelector("#users-message");
  if (!confirm("Yakin ingin menghapus / menonaktifkan user ini?")) return;

  msg.textContent = "Deleting user...";
  msg.style.color = "#64748b";

  try {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || "Gagal menghapus user.";
      msg.style.color = "#dc2626";
      return;
    }

    msg.textContent = "User deleted / deactivated.";
    msg.style.color = "#16a34a";
    await loadUsers();

  } catch (err) {
    console.error(err);
    msg.textContent = "Terjadi kesalahan jaringan saat menghapus user.";
    msg.style.color = "#dc2626";
  }
}

/* =========================
   INIT
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const usersPage = document.querySelector("#users-tbody");
  if (!usersPage) return; // bukan di halaman /user

  loadUsers();

  const btnNew = document.querySelector("#btn-new-user");
  const btnCancel = document.querySelector("#user-cancel-btn");
  const form = document.querySelector("#user-form");
  const tbody = document.querySelector("#users-tbody");

  if (btnNew) {
    btnNew.addEventListener("click", () => {
      resetUserForm();
      showUserForm(true);
    });
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      resetUserForm();
      showUserForm(false);
    });
  }

  if (form) {
    form.addEventListener("submit", handleUserFormSubmit);
  }

  // event delegation untuk tombol Edit/Delete di tabel
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const id = btn.getAttribute("data-id");
      const action = btn.getAttribute("data-action");

      if (action === "edit") {
        startEditUser(id);
      } else if (action === "delete") {
        deleteUser(id);
      }
    });
  }
});
