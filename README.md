# TecnoServWJ Web

Página web oficial de **TecnoServWJ**, negocio de servicio técnico, soporte, mantenimiento y venta de laptops/productos tecnológicos en Trujillo.

## Datos del negocio

**Nombre:** TecnoServWJ  
**Slogan:** Cuidamos tu tecnología como parte de tu trabajo.  
**Frase de presentación:** Soluciones tecnológicas confiables para el mantenimiento, mejora y soporte de tus equipos.

## Contacto

- **WhatsApp:** 916 074 052
- **Correo:** tecnoserv.wj@outlook.com
- **Zona de atención:** Trujillo y La Esperanza
- **Modalidad:** remoto, delivery y a domicilio

## Horario

- **Lunes a viernes:** 9:00 am - 11:00 pm
- **Sábados:** 9:00 am - 2:00 pm
- **Domingos:** según disponibilidad. Si no se atiende, se prioriza el pedido el lunes.

## Servicios principales

- Mantenimiento preventivo de laptops y PC desde S/ 60
- Diagnóstico inicial gratis
- Instalación de Windows desde S/ 40
- Backup de información desde S/ 50
- Instalación de SSD/RAM desde S/ 20
- Ensamblaje de PC
- Soporte técnico remoto, delivery o a domicilio
- Venta de laptops y productos tecnológicos

## Estructura del sitio

```text
index.html        Página principal de servicios
tienda.html       Catálogo estilo tienda retail
product.html      Plantilla individual de producto
productos.js      Datos editables de productos
styles.css        Estilos visuales
script.js         Funciones de tienda, filtros, búsqueda y WhatsApp
assets/           Logos e imágenes
```

## Tienda

La tienda está en:

```text
tienda.html
```

Cada producto abre una ficha usando:

```text
product.html?id=ID_DEL_PRODUCTO
```

Ejemplo:

```text
product.html?id=asus-gaming-v16-rtx3050
```

## Producto destacado actual

**Laptop Asus Gaming V16 RTX 3050**

- Intel Core 5 210H
- NVIDIA GeForce RTX 3050 Laptop GPU 6GB
- 8GB DDR5
- SSD 512GB M.2 NVMe PCIe 4.0
- Pantalla 16" WUXGA 1920 x 1200, 144Hz
- Windows 11 Home
- Precio referencial: S/ 3,449
- Precio anterior: S/ 3,999
- Stock: 1 unidad

## Cómo editar productos

Edita el archivo:

```text
productos.js
```

Puedes cambiar:

- nombre
- marca
- modelo
- precio
- precio anterior/descuento
- stock
- estado
- descripción
- especificaciones técnicas
- garantía
- métodos de pago
- imágenes
- reseñas

## Cómo agregar imágenes de productos

1. Sube la imagen en:

```text
assets/productos/
```

2. En `productos.js`, cambia la ruta:

```js
imagen: "assets/productos/nombre-imagen.jpg"
```

3. Para varias imágenes, usa:

```js
galeria: [
  "assets/productos/imagen-1.jpg",
  "assets/productos/imagen-2.jpg"
]
```

## Publicación en GitHub Pages

El repositorio debe tener esta estructura en la raíz:

```text
index.html
tienda.html
product.html
productos.js
styles.css
script.js
README.md
assets/
```

En GitHub:

1. Ir a **Settings > Pages**
2. Seleccionar **Deploy from a branch**
3. Elegir **main / root**
4. Guardar con **Save**
5. Esperar unos minutos

Enlaces esperados:

```text
https://lnmersivewj.github.io/tecnoservwj/
https://lnmersivewj.github.io/tecnoservwj/tienda.html
```

## Nota

Esta web es estática y funciona gratis en GitHub Pages.  
No procesa pagos ni descuenta stock automáticamente.  
El cliente consulta por WhatsApp y la venta se coordina directamente.
