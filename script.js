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


/* Tienda de productos */
const productGrid = document.querySelector("#productGrid");
const productFilter = document.querySelector("#productFilter");
const productModal = document.querySelector("#productModal");
const productModalContent = document.querySelector("#productModalContent");

function formatPrice(product) {
  if (product.precio === null || product.precio === undefined) {
    return "Cotizar";
  }
  return `${product.moneda || "S/"} ${product.precio}`;
}

function productMatchesFilter(product, filter) {
  if (filter === "todos") return true;
  if (filter === "nuevo") return product.estado.toLowerCase().includes("nuevo");
  if (filter === "usado") return product.estado.toLowerCase().includes("usado");
  if (filter === "oferta") return Boolean(product.precioAnterior);
  if (filter === "stock") return Number(product.stock) > 0;
  return true;
}

function productWhatsappLink(product) {
  const text = [
    "Hola TecnoServWJ, quiero consultar por este producto:",
    product.nombre,
    `Precio: ${formatPrice(product)}`,
    `Estado: ${product.estado}`,
    `Stock: ${Number(product.stock) > 0 ? product.stock : "Consultar disponibilidad"}`
  ].join("%0A");

  return `https://wa.me/51916074052?text=${text}`;
}

function renderProducts(filter = "todos") {
  if (!productGrid || typeof productosTecnoServ === "undefined") return;

  const products = productosTecnoServ.filter((product) => productMatchesFilter(product, filter));

  if (!products.length) {
    productGrid.innerHTML = `<p class="product-meta">No hay productos para este filtro.</p>`;
    return;
  }

  productGrid.innerHTML = products.map((product) => {
    const specs = product.especificaciones || {};
    const miniSpecs = Object.entries(specs).slice(0, 3).map(([key, value]) => {
      return `<span><strong>${key}:</strong> ${value}</span>`;
    }).join("");

    const image = product.imagen
      ? `<img src="${product.imagen}" alt="${product.nombre}">`
      : `<div class="product-placeholder" aria-hidden="true"></div>`;

    const oldPrice = product.precioAnterior
      ? `<span class="product-old-price">${product.moneda || "S/"} ${product.precioAnterior}</span>`
      : "";

    const stockText = Number(product.stock) > 0 ? `Stock: ${product.stock}` : "Consultar";

    return `
      <article class="product-card reveal visible">
        <div class="product-image">
          ${image}
          <span class="product-badge">${product.etiqueta}</span>
          <span class="product-stock">${stockText}</span>
        </div>
        <div class="product-content">
          <h3>${product.nombre}</h3>
          <p class="product-meta">${product.estado} • ${product.garantia}</p>
          <div class="product-price-row">
            <span class="product-price">${formatPrice(product)}</span>
            ${oldPrice}
          </div>
          <div class="product-specs-mini">${miniSpecs}</div>
          <div class="product-actions">
            <button class="btn btn-secondary" type="button" onclick="openProductDetail('${product.id}')">Ver detalles</button>
            <a class="btn btn-primary" href="${productWhatsappLink(product)}" target="_blank" rel="noopener">Consultar</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function openProductDetail(productId) {
  const product = productosTecnoServ.find((item) => item.id === productId);
  if (!product || !productModal || !productModalContent) return;

  const specsHtml = Object.entries(product.especificaciones || {}).map(([key, value]) => {
    return `<div><strong>${key}</strong><span>${value}</span></div>`;
  }).join("");

  const includesHtml = (product.incluye || []).map((item) => `<li>${item}</li>`).join("");
  const paymentHtml = (product.metodosPago || []).map((item) => `<li>${item}</li>`).join("");
  const reviewsHtml = (product.resenas || []).length
    ? product.resenas.map((review) => `
        <div class="review-card">
          <strong>${review.autor}</strong>
          <p>${review.comentario}</p>
        </div>
      `).join("")
    : `<p>Aún no hay reseñas registradas para este producto.</p>`;

  const gallery = product.galeria && product.galeria.length ? product.galeria : (product.imagen ? [product.imagen] : []);
  const image = gallery.length
    ? `<img id="modalMainImage" src="${gallery[0]}" alt="${product.nombre}">`
    : `<div class="product-placeholder" aria-hidden="true"></div>`;

  const galleryThumbs = gallery.length > 1
    ? `<div class="modal-thumbs">${gallery.map((src, index) => `
        <button type="button" class="${index === 0 ? "active" : ""}" onclick="changeModalImage('${src}', this)">
          <img src="${src}" alt="${product.nombre} imagen ${index + 1}">
        </button>
      `).join("")}</div>`
    : "";

  const oldPrice = product.precioAnterior
    ? `<span class="product-old-price">${product.moneda || "S/"} ${product.precioAnterior}</span>`
    : "";

  productModalContent.innerHTML = `
    <div class="modal-detail">
      <div><div class="modal-gallery-main">${image}</div>${galleryThumbs}</div>
      <div class="modal-info">
        <p class="eyebrow">${product.estado} • ${product.etiqueta}</p>
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>

        <div class="product-price-row">
          <span class="product-price">${formatPrice(product)}</span>
          ${oldPrice}
        </div>

        <a class="btn btn-primary btn-full" href="${productWhatsappLink(product)}" target="_blank" rel="noopener">Consultar este producto por WhatsApp</a>

        <div class="detail-section">
          <h4>Especificaciones técnicas</h4>
          <div class="spec-table">${specsHtml}</div>
        </div>

        <div class="detail-section">
          <h4>Stock y garantía</h4>
          <ul class="detail-list">
            <li>Stock: ${Number(product.stock) > 0 ? product.stock : "Consultar disponibilidad"}</li>
            <li>Garantía: ${product.garantia}</li>
          </ul>
        </div>

        <div class="detail-section">
          <h4>Incluye</h4>
          <ul class="detail-list">${includesHtml}</ul>
        </div>

        <div class="detail-section">
          <h4>Métodos de pago</h4>
          <ul class="detail-list">${paymentHtml}</ul>
        </div>

        <div class="detail-section">
          <h4>Reseñas</h4>
          ${reviewsHtml}
        </div>
      </div>
    </div>
  `;

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
}

if (productFilter) {
  productFilter.addEventListener("change", () => renderProducts(productFilter.value));
}

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProductModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProductModal();
});

renderProducts();


function changeModalImage(src, button) {
  const mainImage = document.querySelector("#modalMainImage");
  if (!mainImage) return;
  mainImage.src = src;

  document.querySelectorAll(".modal-thumbs button").forEach((item) => item.classList.remove("active"));
  if (button) button.classList.add("active");
}


/* =========================================================
   Lógica tienda retail / e-commerce estático
   ========================================================= */
let retailCart = [];
let currentRetailFilter = "todos";

function retailFormatPrice(product) {
  if (product.precio === null || product.precio === undefined) return "Cotizar";
  return `${product.moneda || "S/"} ${product.precio.toLocaleString("es-PE")}`;
}

function retailWhatsappLink(product) {
  const text = [
    "Hola TecnoServWJ, quiero consultar por este producto:",
    product.nombre,
    `Modelo: ${product.modelo || "No especificado"}`,
    `Precio: ${retailFormatPrice(product)}`,
    `Estado: ${product.estado}`,
    `Stock: ${Number(product.stock) > 0 ? product.stock : "Consultar disponibilidad"}`
  ].join("%0A");
  return `https://wa.me/51916074052?text=${text}`;
}

function getSelectedStates() {
  return Array.from(document.querySelectorAll(".state-filter:checked")).map((item) => item.value);
}

function retailProductMatches(product) {
  const query = (document.querySelector("#searchInput")?.value || "").trim().toLowerCase();
  const states = getSelectedStates();

  const text = [
    product.nombre,
    product.marca,
    product.modelo,
    product.estado,
    product.descripcion,
    ...Object.values(product.especificaciones || {})
  ].join(" ").toLowerCase();

  const matchQuery = !query || text.includes(query);
  const matchState = !states.length || states.includes(product.estado);

  let matchFilter = true;
  if (currentRetailFilter === "laptops") matchFilter = product.categoria === "laptops";
  if (currentRetailFilter === "gamer") matchFilter = text.includes("gamer") || text.includes("gaming") || text.includes("rtx");
  if (currentRetailFilter === "oferta") matchFilter = Boolean(product.precioAnterior);
  if (currentRetailFilter === "stock") matchFilter = Number(product.stock) > 0;

  return matchQuery && matchState && matchFilter;
}

function sortRetailProducts(products) {
  const sort = document.querySelector("#sortSelect")?.value || "destacados";
  const copy = [...products];

  if (sort === "precio-menor") {
    copy.sort((a, b) => (a.precio ?? 999999) - (b.precio ?? 999999));
  } else if (sort === "precio-mayor") {
    copy.sort((a, b) => (b.precio ?? -1) - (a.precio ?? -1));
  } else if (sort === "stock") {
    copy.sort((a, b) => Number(b.stock) - Number(a.stock));
  } else {
    copy.sort((a, b) => Number(b.destacado) - Number(a.destacado));
  }

  return copy;
}

function renderProducts() {
  const grid = document.querySelector("#productGrid");
  if (!grid || typeof productosTecnoServ === "undefined") return;

  const filtered = sortRetailProducts(productosTecnoServ.filter(retailProductMatches));
  const counter = document.querySelector("#productCounter");
  if (counter) counter.textContent = `${filtered.length} producto${filtered.length === 1 ? "" : "s"}`;

  if (!filtered.length) {
    grid.innerHTML = `<div class="store-note"><p>No se encontraron productos con esos filtros.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map((product) => {
    const specs = Object.entries(product.especificaciones || {}).slice(0, 4)
      .map(([key, value]) => `<span><strong>${key}:</strong> ${value}</span>`)
      .join("");

    const oldPrice = product.precioAnterior
      ? `<span>${product.moneda || "S/"} ${product.precioAnterior.toLocaleString("es-PE")}</span>`
      : "";

    const stockText = Number(product.stock) > 0 ? `Stock: ${product.stock}` : "Consultar";
    const image = product.imagen
      ? `<img src="${product.imagen}" alt="${product.nombre}">`
      : `<div class="product-placeholder" aria-hidden="true"></div>`;

    return `
      <article class="retail-product-card">
        <div class="retail-product-image">
          ${image}
          <span class="retail-badge">${product.etiqueta || product.estado}</span>
          <span class="retail-stock">${stockText}</span>
        </div>
        <div class="retail-product-body">
          <p class="retail-product-brand">${product.marca || "TecnoServWJ"}</p>
          <h3>${product.nombre}</h3>
          <div class="retail-rating">★ ${product.rating || "4.5"} <span>(${product.totalResenas || 0})</span></div>
          <div class="retail-price-row">
            <strong>${retailFormatPrice(product)}</strong>
            ${oldPrice}
          </div>
          <div class="retail-specs">${specs}</div>
          <div class="retail-card-actions">
            <button class="btn btn-secondary" type="button" onclick="openProductDetail('${product.id}')">Ver ficha</button>
            <button class="btn btn-primary" type="button" onclick="addToRetailCart('${product.id}')">Agregar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function openProductDetail(productId) {
  const product = productosTecnoServ.find((item) => item.id === productId);
  const modal = document.querySelector("#productModal");
  const content = document.querySelector("#productModalContent");
  if (!product || !modal || !content) return;

  const gallery = product.galeria && product.galeria.length ? product.galeria : (product.imagen ? [product.imagen] : []);
  const mainImage = gallery.length
    ? `<img id="modalMainImage" src="${gallery[0]}" alt="${product.nombre}">`
    : `<div class="product-placeholder" aria-hidden="true"></div>`;

  const thumbs = gallery.length > 1
    ? `<div class="modal-thumbs">${gallery.map((src, index) => `
        <button type="button" class="${index === 0 ? "active" : ""}" onclick="changeModalImage('${src}', this)">
          <img src="${src}" alt="${product.nombre} imagen ${index + 1}">
        </button>`).join("")}</div>`
    : "";

  const specs = Object.entries(product.especificaciones || {})
    .map(([key, value]) => `<div><strong>${key}</strong><span>${value}</span></div>`)
    .join("");

  const includes = (product.incluye || []).map((item) => `<li>${item}</li>`).join("");
  const payments = (product.metodosPago || []).map((item) => `<li>${item}</li>`).join("");
  const reviews = (product.resenas || []).length
    ? product.resenas.map((review) => `<div class="review-card"><strong>${review.autor}</strong><p>${review.comentario}</p></div>`).join("")
    : `<p>Aún no hay reseñas registradas para este producto.</p>`;

  const oldPrice = product.precioAnterior
    ? `<span class="product-old-price">${product.moneda || "S/"} ${product.precioAnterior.toLocaleString("es-PE")}</span>`
    : "";

  content.innerHTML = `
    <div class="modal-detail">
      <div>
        <div class="modal-gallery-main">${mainImage}</div>
        ${thumbs}
      </div>
      <div class="modal-info">
        <p class="eyebrow">${product.marca || "TecnoServWJ"} • ${product.estado} • ${product.etiqueta || ""}</p>
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>

        <div class="product-price-row">
          <span class="product-price">${retailFormatPrice(product)}</span>
          ${oldPrice}
        </div>

        <div class="product-actions">
          <button class="btn btn-secondary" type="button" onclick="addToRetailCart('${product.id}')">Agregar a consulta</button>
          <a class="btn btn-primary" href="${retailWhatsappLink(product)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>

        <div class="detail-section">
          <h4>Especificaciones técnicas</h4>
          <div class="spec-table">${specs}</div>
        </div>

        <div class="detail-section">
          <h4>Compra y entrega</h4>
          <ul class="detail-list">
            <li>Stock: ${Number(product.stock) > 0 ? product.stock : "Consultar disponibilidad"}</li>
            <li>Garantía: ${product.garantia}</li>
            <li>Entrega: ${product.envio || "Coordinación por WhatsApp"}</li>
          </ul>
        </div>

        <div class="detail-section"><h4>Incluye</h4><ul class="detail-list">${includes}</ul></div>
        <div class="detail-section"><h4>Métodos de pago</h4><ul class="detail-list">${payments}</ul></div>
        <div class="detail-section"><h4>Reseñas</h4>${reviews}</div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function changeModalImage(src, button) {
  const mainImage = document.querySelector("#modalMainImage");
  if (!mainImage) return;
  mainImage.src = src;
  document.querySelectorAll(".modal-thumbs button").forEach((item) => item.classList.remove("active"));
  if (button) button.classList.add("active");
}

function closeProductModal() {
  const modal = document.querySelector("#productModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function addToRetailCart(productId) {
  const product = productosTecnoServ.find((item) => item.id === productId);
  if (!product) return;
  if (!retailCart.some((item) => item.id === productId)) retailCart.push(product);
  updateRetailCart();
  openCartPanel();
}

function removeFromRetailCart(productId) {
  retailCart = retailCart.filter((item) => item.id !== productId);
  updateRetailCart();
}

function updateRetailCart() {
  const count = document.querySelector("#cartCount");
  const items = document.querySelector("#cartItems");
  const whatsapp = document.querySelector("#cartWhatsapp");
  if (count) count.textContent = retailCart.length;

  if (items) {
    items.innerHTML = retailCart.length
      ? retailCart.map((product) => `
          <div class="cart-item">
            <strong>${product.nombre}</strong>
            <p>${retailFormatPrice(product)} • ${product.estado}</p>
            <button class="btn btn-secondary btn-full" type="button" onclick="removeFromRetailCart('${product.id}')">Quitar</button>
          </div>
        `).join("")
      : `<p class="product-meta">Aún no agregaste productos a consulta.</p>`;
  }

  if (whatsapp) {
    const lines = retailCart.length
      ? ["Hola TecnoServWJ, quiero consultar por estos productos:", ...retailCart.map((p) => `- ${p.nombre} (${retailFormatPrice(p)})`)]
      : ["Hola TecnoServWJ, quiero consultar por la tienda de laptops."];
    whatsapp.href = `https://wa.me/51916074052?text=${lines.join("%0A")}`;
  }
}

function openCartPanel() {
  const panel = document.querySelector("#cartPanel");
  if (!panel) return;
  updateRetailCart();
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
}

function closeCartPanel() {
  const panel = document.querySelector("#cartPanel");
  if (!panel) return;
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
}

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

document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeProductModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProductModal();
    closeCartPanel();
  }
});

renderProducts();
updateRetailCart();
