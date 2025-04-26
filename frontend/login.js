// ✅ Global JS error trap (pro move)
window.addEventListener("error", (e) => {
    console.error("🔥 Global JS Error:", e.message, "at", e.filename, ":", e.lineno);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("🔥 login.js loaded");
  
    const loginForm = document.getElementById("login-form");
    const submitBtn = document.getElementById("submit-btn");
    const errorElement = document.getElementById("error-message");
  
    // ✅ Ensure form exists
    if (!loginForm) {
      console.error("❌ login-form not found");
      return;
    }
  
    // ✅ Handle form submission
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorElement.style.display = "none";
  
      submitBtn.disabled = true;
      document.querySelector(".btn-text").classList.add("hidden");
      document.querySelector(".spinner").classList.remove("hidden");
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
  
      if (!email || !password) {
        return showError("⚠️ Please fill in all fields.");
      }
        
      try {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
            
        const data = await res.json();
  
        if (!res.ok) throw new Error(data.error || "Login failed");
  
        localStorage.setItem("token", data.token);
        window.location.href = "choose-plan.html";
      } catch (error) {
        console.error("❌ Login error:", error);
        showError(error.message || "Something went wrong. Try again.");
      } finally {
        submitBtn.disabled = false;
        document.querySelector(".btn-text").classList.remove("hidden");
        document.querySelector(".spinner").classList.add("hidden");
      }
    });
  
    // 👁️ Toggle password visibility
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
  
    function showError(message) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
      submitBtn.disabled = false;
      document.querySelector(".btn-text").classList.remove("hidden");
      document.querySelector(".spinner").classList.add("hidden");
      window.scrollTo(0, 0);
    }
  });

  