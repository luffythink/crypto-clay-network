document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("#navbar");
  const navbarNav = document.querySelector("#navbarNav");
  const navbarToggle = document.querySelector(".navbar-toggler");

  if (!navbar || !navbarNav || !navbarToggle) return;

  const setMobileNav = (isOpen) => {
    navbarNav.classList.toggle("show", isOpen);
    navbarToggle.classList.toggle("collapsed", !isOpen);
    navbarToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navbarToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
    navbarNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
  };

  const closeMobileNav = () => {
    if (window.matchMedia("(max-width: 767.98px)").matches) setMobileNav(false);
  };

  navbarToggle.addEventListener("click", () => {
    setMobileNav(!navbarNav.classList.contains("show"));
  });

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) closeMobileNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
      navbarToggle.focus();
    }
  });

  navbarNav.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  const syncViewportState = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      navbarNav.classList.remove("show");
      navbarToggle.classList.add("collapsed");
      navbarToggle.setAttribute("aria-expanded", "false");
      navbarToggle.setAttribute("aria-label", "打开导航");
      navbarNav.setAttribute("aria-hidden", "false");
    } else if (!navbarNav.classList.contains("show")) {
      navbarNav.setAttribute("aria-hidden", "true");
    }
  };

  window.addEventListener("resize", syncViewportState);
  syncViewportState();
});
