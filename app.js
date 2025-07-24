// JavaScript for smooth scrolling navigation and active link highlighting
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const currentYearSpan = document.getElementById("current-year");

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Function to update active nav link
  const updateActiveNavLink = () => {
    let current = "";
    sections.forEach((section) => {
      // Adjusted offset for fixed navbar height
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active", "text-indigo-700", "font-semibold"); // Remove active class
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active", "text-indigo-700", "font-semibold"); // Add active class
      }
    });
  };

  // Initial call and on scroll
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Adjust for fixed navbar height
          behavior: "smooth",
        });
        // Update URL hash without page reload
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  // Handle initial hash on load
  if (window.location.hash) {
    const initialTargetId = window.location.hash.substring(1);
    const initialTargetSection = document.getElementById(initialTargetId);
    if (initialTargetSection) {
      // Use a timeout to ensure page layout is stable before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: initialTargetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }, 100);
    }
  }
});
