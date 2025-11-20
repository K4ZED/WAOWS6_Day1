// ==========================
// USER LOGIN
// ==========================
async function handleLogin(e) {
  e.preventDefault();

  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value;
  const msg = document.querySelector("#auth-message");

  msg.textContent = "Logging in...";
  msg.style.color = "#64748b";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || "Login gagal.";
      msg.style.color = "#dc2626";
      return;
    }

    msg.textContent = "Login berhasil, mengalihkan...";
    msg.style.color = "#16a34a";

    setTimeout(() => {
      window.location.href = "/";
    }, 700);

  } catch (err) {
    console.error(err);
    msg.textContent = "Terjadi kesalahan jaringan.";
    msg.style.color = "#dc2626";
  }
}



// ==========================
// REGISTER (USER BIASA)
// ==========================
async function handleRegister(e) {
  e.preventDefault();

  const email = document.querySelector("#reg-email").value.trim();
  const password = document.querySelector("#reg-password").value;
  const msg = document.querySelector("#register-message");

  msg.textContent = "Registering...";
  msg.style.color = "#64748b";

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || "Registrasi gagal.";
      msg.style.color = "#dc2626";
      return;
    }

    msg.textContent = "Registrasi berhasil, mengalihkan...";
    msg.style.color = "#16a34a";

    setTimeout(() => {
      window.location.href = "/";
    }, 700);

  } catch (err) {
    console.error(err);
    msg.textContent = "Terjadi kesalahan jaringan.";
    msg.style.color = "#dc2626";
  }
}



// ==========================
// ADMIN LOGIN
// ==========================
async function handleAdminLogin(e) {
  e.preventDefault();

  const email = document.querySelector("#admin-email").value.trim();
  const password = document.querySelector("#admin-password").value;
  const msg = document.querySelector("#admin-auth-message");

  msg.textContent = "Checking admin credentials...";
  msg.style.color = "#64748b";

  try {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || "Admin login gagal.";
      msg.style.color = "#dc2626";
      return;
    }

    msg.textContent = "Admin login success, membuka halaman rahasia...";
    msg.style.color = "#16a34a";

    setTimeout(() => {
      window.location.href = "/user";
    }, 700);

  } catch (err) {
    console.error(err);
    msg.textContent = "Terjadi kesalahan jaringan.";
    msg.style.color = "#dc2626";
  }
}



// ==========================
// FORM BINDING
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // User Login
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // User Register
  const registerForm = document.querySelector("#register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  // Admin Login
  const adminLoginForm = document.querySelector("#admin-login-form");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", handleAdminLogin);
  }
});
