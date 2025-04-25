// Register Swiper modules using the CDN bundle.
Swiper.use([Swiper.Navigation, Swiper.Autoplay]);

// Expose the initialization function for the login-hero module.
function loginHeroInit() {
  // --- Form Switching Functionality ---
  const loginHeroFormContainer = document.querySelector(
    ".loginHero-form-container"
  );
  const loginFormSubmit = document.getElementById("loginFormSubmit");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
  const goBackToLoginBtn = document.getElementById("goBackToLoginBtn");
  const loginTitle = document.querySelector(".LoginHero_title");

  function switchToForgotPassword() {
    loginFormSubmit.classList.add("fade-out");
    loginTitle.classList.add("fade-out");

    setTimeout(() => {
      loginFormSubmit.style.display = "none";
      loginTitle.style.display = "none";
      forgotPasswordForm.style.display = "block";
      forgotPasswordForm.classList.remove("fade-out");
      forgotPasswordForm.classList.add("fade-in");
    }, 300);
  }

  function switchToLogin() {
    forgotPasswordForm.classList.add("fade-out");

    setTimeout(() => {
      forgotPasswordForm.style.display = "none";
      loginFormSubmit.style.display = "flex";
      loginTitle.style.display = "block";
      loginFormSubmit.classList.remove("fade-out");
      loginFormSubmit.classList.add("fade-in");
      loginTitle.classList.remove("fade-out");
      loginTitle.classList.add("fade-in");
    }, 300);
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener("click", switchToForgotPassword);
  }
  if (goBackToLoginBtn) {
    goBackToLoginBtn.addEventListener("click", switchToLogin);
  }

  // --- Form Submission Handlers ---
  loginFormSubmit.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "http://localhost:8000/ReactController.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            action: "login",
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  const forgotPasswordFormSubmit = document.getElementById(
    "forgotPasswordFormSubmit"
  );
  forgotPasswordFormSubmit.addEventListener("submit", async function (e) {
    e.preventDefault();
    const forgotUsername = document.getElementById("forgotUsername").value;

    try {
      const response = await fetch(
        "http://localhost:8000/ReactController.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: forgotUsername,
            action: "forgot_password",
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error(
          "Forgot password submission failed:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error submitting forgot password form:", error);
    }
  });

  // --- Swiper Initialization ---
  const swiper = new Swiper("#loginSwiper", {
    navigation: {
      nextEl: "#swiperNextBtn",
      prevEl: "#swiperPrevBtn",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 1.1,
    spaceBetween: 30,
  });
}
