// ✅ Modular Firebase Initialization
import { auth, provider } from "./firebase-init.js";

// ✅ Global JS error trap
window.addEventListener("error", (e) => {
  console.error("🧨 Global JS Error:", e.message, "at", e.filename, ":", e.lineno);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 register.js loaded");

  const signupForm = document.getElementById("signup-form");
  const submitBtn = document.getElementById("submit-btn");
  const errorElement = document.getElementById("error-message");

  if (!signupForm) {
    console.error("❌ signup-form not found — JS failed to load before DOM");
    return;
  }

  // ✅ Form Submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorElement.style.display = 'none';

    submitBtn.disabled = true;
    document.querySelector(".btn-text").classList.add("hidden");
    document.querySelector(".spinner").classList.remove("hidden");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
      return showError("⚠️ Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return showError("⚠️ Passwords do not match.");
    }

    if (password.length < 8) {
      return showError("⚠️ Password must be at least 8 characters.");
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      localStorage.setItem("token", data.token);
      window.location.href = "choose-plan.html";
    } catch (error) {
      console.error("❌ Registration Error:", error);
      showError(error.message || "Something went wrong.");
    } finally {
      submitBtn.disabled = false;
      document.querySelector(".btn-text").classList.remove("hidden");
      document.querySelector(".spinner").classList.add("hidden");
    }
  });

  // ✅ Google Sign-In
  const googleBtn = document.querySelector(".google-signin-btn");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      googleBtn.disabled = true;
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;

          try {
            const res = await fetch("http://localhost:5000/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.displayName || "",
                email: user.email,
                password: "google-oauth"
              })
            });

            const data = await res.json();

            if (res.ok) {
              localStorage.setItem("token", data.token);
              window.location.href = "dashboard.html";
            } else {
              console.warn("⚠️ Google user already exists:", data.error);
              window.location.href = "login.html";
            }
          } catch (err) {
            console.error("❌ Error saving Google user:", err);
            alert("Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("❌ Google sign-in failed:", error);
          alert("Google sign-in failed.");
        })
        .finally(() => {
          googleBtn.disabled = false;
        });
    });
  }

  // ✅ Password Visibility Toggle
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".password-toggle i");

  if (toggleIcon && passwordInput) {
    document.querySelector(".password-toggle").addEventListener("click", (e) => {
      e.preventDefault();
      const isVisible = passwordInput.type === "text";
      passwordInput.type = isVisible ? "password" : "text";
      toggleIcon.classList.toggle("fa-eye");
      toggleIcon.classList.toggle("fa-eye-slash");
    });
  }

  // ✅ Error Display
  function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    submitBtn.disabled = false;
    document.querySelector(".btn-text").classList.remove("hidden");
    document.querySelector(".spinner").classList.add("hidden");
    window.scrollTo(0, 0);
  }
});
