document.addEventListener("DOMContentLoaded", () => {
  const logoContainer = document.querySelector(".loginNav_logo-container");

  logoContainer.addEventListener("click", () => {
    window.location.href = "/effism-login";
  });
});
