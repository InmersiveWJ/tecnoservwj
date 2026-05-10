# TecnoServWJ - Página web para GitHub Pages

Página web estática creada para el negocio TecnoServWJ.

## Archivos principales

- `index.html`: estructura de la web.
- `styles.css`: diseño visual, colores y versión responsive.
- `script.js`: menú móvil, animaciones y formulario hacia WhatsApp.
- `assets/`: logos e íconos.

## Cómo publicarla en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo: `tecnoservwj`.
2. Sube todos estos archivos a la raíz del repositorio.
3. Entra a **Settings > Pages**.
4. En **Build and deployment**, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guarda los cambios.
6. GitHub generará un enlace parecido a:
   `https://tuusuario.github.io/tecnoservwj`

## Cómo actualizar precios o textos

Edita directamente el archivo `index.html`.

Busca la sección:
- `promociones`
- `servicios`
- `faq`
- `contacto`

Ahí puedes cambiar precios, textos, servicios o mensajes.

## WhatsApp

El número configurado es:

`916074052`

En enlaces internacionales se usa:

`51916074052`


## Tienda de laptops

La sección de tienda usa el archivo:

`productos.js`

Ahí puedes editar:

- nombre del producto
- precio
- descuento o precio anterior
- stock
- estado del producto
- especificaciones técnicas
- descripción
- métodos de pago
- garantía
- accesorios incluidos
- reseñas
- imagen del producto

### Cómo agregar fotos reales

1. Crea dentro de `assets` una carpeta llamada `productos`.
2. Sube ahí la foto, por ejemplo:
   `assets/productos/laptop-hp.jpg`
3. En `productos.js`, cambia:

```js
imagen: ""
```

por:

```js
imagen: "assets/productos/laptop-hp.jpg"
```

### Cómo añadir descuento

Usa:

```js
precio: 1450,
precioAnterior: 1650,
```

Si no hay descuento:

```js
precioAnterior: null,
```

### Cómo poner producto sin precio exacto

Usa:

```js
precio: null,
```

La web mostrará `Cotizar`.


## Tienda en página separada

La tienda ahora está en:

`tienda.html`

El menú principal redirige a esa página desde el botón **Tienda**.

Archivos relacionados:

- `tienda.html`: página de tienda.
- `productos.js`: datos editables de las laptops.
- `styles.css`: diseño de tarjetas, filtros y modal de producto.
- `script.js`: funcionamiento de filtros, modal y WhatsApp.

Para subir la actualización a GitHub Pages, reemplaza/sube:

- `index.html`
- `tienda.html`
- `styles.css`
- `script.js`
- `productos.js`
- `README.md`

Luego haz **Commit changes**.


## Actualización: Asus Gaming V16

Se agregó el producto:

`Laptop Asus Gaming V16 RTX 3050`

También se añadieron imágenes referenciales en:

`assets/productos/`

Para reemplazarlas por fotos reales, sube tus fotos a esa carpeta y actualiza las rutas en `productos.js`, campos `imagen` y `galeria`.


## Corrección visual Asus V16 visible

La página `tienda.html` ahora muestra el producto Asus Gaming V16 como producto destacado en la parte superior, antes del catálogo.  
También el catálogo sigue leyendo los productos desde `productos.js`.


## Rediseño retail / e-commerce

La página `tienda.html` fue rediseñada como tienda tipo retail:

- Header superior con contacto.
- Buscador de productos.
- Categorías y filtros laterales.
- Catálogo en tarjetas.
- Producto destacado.
- Ficha/modal de producto.
- Carrito de consulta por WhatsApp.
- Métodos de pago, stock, garantía, reseñas y especificaciones.

Importante: es una tienda estática para GitHub Pages. No procesa pagos ni inventario automático. El "carrito" solo arma una consulta por WhatsApp.
