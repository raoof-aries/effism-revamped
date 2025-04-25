document.addEventListener("DOMContentLoaded", () => {
  const modules = [
    {
      id: "header-module",
      path: "modules/login-modules/header.html",
      initFunction: "headerInit",
    },
    {
      id: "login-hero-module",
      path: "modules/login-modules/login-hero.html",
      initFunction: "loginHeroInit",
    },
    {
      id: "best-employee-module",
      path: "modules/login-modules/best-employee.html",
      initFunction: "bestEmployeeInit",
    },
    {
      id: "fun-facts-module",
      path: "modules/login-modules/fun-facts.html",
      initFunction: "funFactsInit",
    },
    {
      id: "latest-news-module",
      path: "modules/login-modules/latest-news.html",
      initFunction: "latestNewsInit",
    },
    {
      id: "footer-module",
      path: "modules/login-modules/footer.html",
      initFunction: "footerInit",
    },
  ];

  modules.forEach((module) => {
    fetch(module.path)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById(module.id).innerHTML = html;

        // Load the corresponding script
        const scriptPath = `scripts/login-scripts/${module.path
          .split("/")
          .pop()
          .replace(".html", ".js")}`;
        const script = document.createElement("script");
        script.src = scriptPath;

        // When the module's script loads, call its init function if available
        script.onload = () => {
          if (
            module.initFunction &&
            typeof window[module.initFunction] === "function"
          ) {
            window[module.initFunction]();
          }
        };

        document.body.appendChild(script);
      })
      .catch((error) => console.error(`Error loading ${module.path}:`, error));
  });
});
