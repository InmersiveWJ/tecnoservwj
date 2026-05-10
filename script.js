const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");
const quoteForm = document.querySelector("#quoteForm");

if (year) year.textContent = new Date().getFullYear();

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => navLinks.classList.remove("open")));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const service = document.querySelector("#service").value;
    const message = document.querySelector("#message").value.trim();
    const text = ["Hola TecnoServWJ, quiero cotizar un servicio.", name ? `Mi nombre es: ${name}.` : "", `Servicio requerido: ${service}.`, message ? `Detalle: ${message}` : ""].filter(Boolean).join("%0A");
    window.open(`https://wa.me/51916074052?text=${text}`, "_blank", "noopener");
  });
}

let currentRetailFilter = "todos";

function getProducts() {
  return typeof productosTecnoServ !== "undefined" ? productosTecnoServ : [];
}

function formatPrice(product) {
  if (product.precio === null || product.precio === undefined) return "Cotizar";
  return `${product.moneda || "S/"} ${Number(product.precio).toLocaleString("es-PE")}`;
}

function oldPrice(product) {
  if (!product.precioAnterior) return "";
  return `${product.moneda || "S/"} ${Number(product.precioAnterior).toLocaleString("es-PE")}`;
}

function productLink(product) {
  return `product.html?id=${encodeURIComponent(product.id)}`;
}

function productWhatsappLink(product) {
  const text = ["Hola TecnoServWJ, quiero consultar por este producto:", product.nombre, `Modelo: ${product.modelo || "No especificado"}`, `Precio: ${formatPrice(product)}`, `Estado: ${product.estado}`, `Stock: ${Number(product.stock) > 0 ? product.stock : "Consultar disponibilidad"}`].join("%0A");
  return `https://wa.me/51916074052?text=${text}`;
}

function selectedStates() {
  return Array.from(document.querySelectorAll(".state-filter:checked")).map((item) => item.value);
}

function productMatches(product) {
  const query = (document.querySelector("#searchInput")?.value || "").trim().toLowerCase();
  const states = selectedStates();
  const searchable = [product.nombre, product.marca, product.modelo, product.estado, product.etiqueta, product.descripcion, ...Object.values(product.especificaciones || {})].join(" ").toLowerCase();
  const matchesQuery = !query || searchable.includes(query);
  const matchesState = !states.length || states.includes(product.estado);

  let matchesFilter = true;
  if (currentRetailFilter === "laptops") matchesFilter = product.categoria === "laptops";
  if (currentRetailFilter === "gamer") matchesFilter = searchable.includes("gamer") || searchable.includes("gaming") || searchable.includes("rtx");
  if (currentRetailFilter === "oferta") matchesFilter = Boolean(product.precioAnterior);
  if (currentRetailFilter === "stock") matchesFilter = Number(product.stock) > 0;

  return matchesQuery && matchesState && matchesFilter;
}

function sortProducts(products) {
  const sort = document.querySelector("#sortSelect")?.value || "destacados";
  const list = [...products];
  if (sort === "precio-menor") list.sort((a, b) => (a.precio ?? 9999999) - (b.precio ?? 9999999));
  else if (sort === "precio-mayor") list.sort((a, b) => (b.precio ?? -1) - (a.precio ?? -1));
  else if (sort === "stock") list.sort((a, b) => Number(b.stock) - Number(a.stock));
  else list.sort((a, b) => Number(b.destacado) - Number(a.destacado));
  return list;
}

function renderProducts() {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;
  const products = sortProducts(getProducts().filter(productMatches));
  const counter = document.querySelector("#productCounter");
  if (counter) counter.textContent = `${products.length} producto${products.length === 1 ? "" : "s"}`;

  if (!products.length) {
    grid.innerHTML = `<div class="empty-products"><h3>No se encontraron productos</h3><p>Prueba quitando filtros o buscando otro término.</p></div>`;
    return;
  }

  grid.innerHTML = products.map((product) => {
    const specs = Object.entries(product.especificaciones || {}).slice(0, 4).map(([key, value]) => `<span><strong>${key}:</strong> ${value}</span>`).join("");
    return `
      <article class="retail-product-card">
        <a class="retail-product-image" href="${productLink(product)}">
          <img src="${product.imagen}" alt="${product.nombre}" />
          <span class="retail-badge">${product.etiqueta || product.estado}</span>
          <span class="retail-stock">${Number(product.stock) > 0 ? `Stock: ${product.stock}` : "Consultar"}</span>
        </a>
        <div class="retail-product-body">
          <p class="retail-product-brand">${product.marca || "TecnoServWJ"}</p>
          <a href="${productLink(product)}" class="product-title-link"><h3>${product.nombre}</h3></a>
          <div class="retail-rating">★ ${product.rating || "4.5"} <span>(${product.totalResenas || 0} reseñas)</span></div>
          <div class="retail-price-row"><strong>${formatPrice(product)}</strong>${product.precioAnterior ? `<span>${oldPrice(product)}</span>` : ""}</div>
          <div class="retail-specs">${specs}</div>
          <div class="retail-card-actions">
            <a class="btn btn-secondary" href="${productLink(product)}">Ver producto</a>
            <a class="btn btn-primary" href="${productWhatsappLink(product)}" target="_blank" rel="noopener">Consultar</a>
          </div>
        </div>
      </article>`;
  }).join("");
}

function initRetailFilters() {
  document.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      currentRetailFilter = button.dataset.filter || "todos";
      renderProducts();
    });
  });
  document.querySelectorAll(".state-filter").forEach((input) => input.addEventListener("change", renderProducts));
  document.querySelector("#sortSelect")?.addEventListener("change", renderProducts);
  document.querySelector("#searchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderProducts();
  });
  document.querySelector("#searchInput")?.addEventListener("input", renderProducts);
}

function renderProductDetailPage() {
  const detail = document.querySelector("#productDetail");
  if (!detail) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const product = getProducts().find((item) => item.id === id) || getProducts()[0];
  if (!product) {
    detail.innerHTML = `<div class="empty-products"><h2>Producto no encontrado</h2><a class="btn btn-primary" href="tienda.html">Volver a tienda</a></div>`;
    return;
  }
  document.title = `${product.nombre} | TecnoServWJ`;
  const specs = Object.entries(product.especificaciones || {}).map(([key, value]) => `<div><strong>${key}</strong><span>${value}</span></div>`).join("");
  const includes = (product.incluye || []).map((item) => `<li>${item}</li>`).join("");
  const payments = (product.metodosPago || []).map((item) => `<li>${item}</li>`).join("");
  const reviews = (product.resenas || []).length ? product.resenas.map((review) => `<div class="review-card"><strong>${review.autor}</strong><p>${review.comentario}</p></div>`).join("") : `<p class="product-muted">Aún no hay reseñas registradas para este producto.</p>`;
  const gallery = product.galeria && product.galeria.length ? product.galeria : [product.imagen];

  detail.innerHTML = `
    <div class="product-page-grid">
      <div class="product-page-gallery">
        <div class="product-page-main-image"><img id="productMainImage" src="${gallery[0]}" alt="${product.nombre}" /></div>
        <div class="product-page-thumbs">${gallery.map((src, index) => `<button class="${index === 0 ? "active" : ""}" onclick="changeProductImage('${src}', this)"><img src="${src}" alt="${product.nombre} ${index + 1}" /></button>`).join("")}</div>
      </div>
      <div class="product-page-info">
        <p class="retail-kicker">${product.marca} • ${product.estado}</p>
        <h1>${product.nombre}</h1>
        <p class="product-model">Modelo: ${product.modelo || "No especificado"}</p>
        <div class="retail-rating">★ ${product.rating || "4.5"} <span>(${product.totalResenas || 0} reseñas)</span></div>
        <div class="product-page-price"><strong>${formatPrice(product)}</strong>${product.precioAnterior ? `<span>${oldPrice(product)}</span>` : ""}</div>
        <p class="product-description">${product.descripcion}</p>
        <div class="product-purchase-box">
          <p><strong>Stock:</strong> ${Number(product.stock) > 0 ? product.stock : "Consultar disponibilidad"}</p>
          <p><strong>Entrega:</strong> ${product.envio || "Coordinación por WhatsApp"}</p>
          <p><strong>Garantía:</strong> ${product.garantia}</p>
          <a class="btn btn-primary btn-full" href="${productWhatsappLink(product)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
          <a class="btn btn-secondary btn-full" href="tienda.html">Volver a tienda</a>
        </div>
      </div>
    </div>
    <div class="product-page-sections">
      <section class="product-info-card"><h2>Especificaciones técnicas</h2><div class="spec-table">${specs}</div></section>
      <section class="product-info-card"><h2>Incluye</h2><ul class="detail-list">${includes}</ul></section>
      <section class="product-info-card"><h2>Métodos de pago</h2><ul class="detail-list">${payments}</ul></section>
      <section class="product-info-card"><h2>Reseñas</h2>${reviews}</section>
    </div>`;
}

function changeProductImage(src, button) {
  const image = document.querySelector("#productMainImage");
  if (!image) return;
  image.src = src;
  document.querySelectorAll(".product-page-thumbs button").forEach((item) => item.classList.remove("active"));
  if (button) button.classList.add("active");
}

initRetailFilters();
renderProducts();
renderProductDetailPage();
