const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");
const quoteForm = document.querySelector("#quoteForm");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const service = document.querySelector("#service").value;
  const message = document.querySelector("#message").value.trim();

  const text = [
    "Hola TecnoServWJ, quiero cotizar un servicio.",
    name ? `Mi nombre es: ${name}.` : "",
    `Servicio requerido: ${service}.`,
    message ? `Detalle: ${message}` : ""
  ].filter(Boolean).join("%0A");

  window.open(`https://wa.me/51916074052?text=${text}`, "_blank", "noopener");
});
