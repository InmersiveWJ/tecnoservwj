/*
  Catálogo editable de TecnoServWJ para tienda tipo retail.

  Edita productos aquí para cambiar:
  - precio, descuento, stock, fotos, garantía, métodos de pago, descripción y ficha técnica.
  - marca, condición, rating, reseñas, destacados y etiquetas.

  Para usar fotos reales:
  1. Sube la imagen a assets/productos/
  2. Cambia imagen y galeria con la ruta correspondiente.
*/

const productosTecnoServ = [
  {
    id: "laptop-asus-gaming-v16-rtx3050",
    categoria: "laptops",
    marca: "ASUS",
    nombre: "Laptop Asus Gaming V16 RTX 3050",
    modelo: "V3607VJ-RP067W",
    estado: "Nuevo",
    etiqueta: "Oferta gamer",
    destacado: true,
    precio: 3449,
    precioAnterior: 3999,
    moneda: "S/",
    stock: 1,
    rating: 4.8,
    totalResenas: 12,
    envio: "Delivery disponible en Trujillo y La Esperanza",
    garantia: "Garantía según proveedor + revisión TecnoServWJ antes de entrega",
    imagen: "assets/productos/asus-v16-rtx3050-principal.svg",
    galeria: [
      "assets/productos/asus-v16-rtx3050-principal.svg",
      "assets/productos/asus-v16-rtx3050-detalle.svg",
      "assets/productos/asus-v16-rtx3050-teclado.svg"
    ],
    descripcion: "Laptop gaming de 16 pulgadas recomendada para estudios, trabajo, multitarea, edición ligera, diseño, programación y juegos en configuración media.",
    especificaciones: {
      Procesador: "Intel Core 5 210H, 8 núcleos / 12 hilos, hasta 4.8 GHz",
      Gráficos: "NVIDIA GeForce RTX 3050 Laptop GPU 6GB",
      RAM: "8 GB DDR5",
      Almacenamiento: "512 GB SSD M.2 NVMe PCIe 4.0",
      Pantalla: "16 pulgadas WUXGA 1920 x 1200, antirreflejo, 144 Hz",
      Sistema: "Windows 11 Home",
      Cámara: "FHD 1080p con obturador de privacidad",
      Conectividad: "Wi-Fi 6 y Bluetooth",
      Teclado: "Español, retroiluminado, con teclado numérico",
      Color: "Negro",
      Condición: "Nuevo"
    },
    incluye: [
      "Laptop Asus Gaming V16",
      "Cargador original",
      "Windows 11 Home",
      "Revisión técnica antes de entrega",
      "Asesoría básica de uso y cuidado",
      "Configuración inicial según solicitud"
    ],
    metodosPago: [
      "Yape",
      "Plin",
      "Transferencia bancaria",
      "Efectivo contra entrega",
      "Separación previa coordinación"
    ],
    resenas: [
      {
        autor: "TecnoServWJ",
        comentario: "Equipo recomendado para usuarios que desean una laptop moderna con gráfica dedicada para estudio, trabajo y gaming casual."
      }
    ]
  },
  {
    id: "laptop-lenovo-ideapad-ryzen5",
    categoria: "laptops",
    marca: "Lenovo",
    nombre: "Lenovo IdeaPad Ryzen 5",
    modelo: "IdeaPad",
    estado: "Usado",
    etiqueta: "Precio especial",
    destacado: false,
    precio: 1450,
    precioAnterior: 1650,
    moneda: "S/",
    stock: 1,
    rating: 4.5,
    totalResenas: 4,
    envio: "Entrega coordinada",
    garantia: "7 días de garantía por funcionamiento",
    imagen: "assets/productos/lenovo-ideapad-ryzen5.svg",
    galeria: ["assets/productos/lenovo-ideapad-ryzen5.svg"],
    descripcion: "Laptop ideal para estudios, oficina, navegación, clases virtuales y tareas diarias. Equipo revisado antes de la entrega.",
    especificaciones: {
      Procesador: "AMD Ryzen 5",
      RAM: "8 GB",
      Almacenamiento: "SSD 256 GB",
      Pantalla: "15.6 pulgadas",
      Sistema: "Windows 11",
      Estado: "Usado en buen estado"
    },
    incluye: ["Cargador", "Windows instalado", "Revisión técnica previa", "Limpieza externa básica"],
    metodosPago: ["Yape", "Plin", "Transferencia bancaria", "Efectivo contra entrega"],
    resenas: [{ autor: "Cliente TecnoServWJ", comentario: "Equipo entregado operativo y configurado para uso diario." }]
  },
  {
    id: "laptop-hp-core-i5",
    categoria: "laptops",
    marca: "HP",
    nombre: "HP Intel Core i5",
    modelo: "HP Core i5",
    estado: "Usado",
    etiqueta: "Disponible",
    destacado: false,
    precio: 1350,
    precioAnterior: null,
    moneda: "S/",
    stock: 1,
    rating: 4.4,
    totalResenas: 3,
    envio: "Entrega coordinada",
    garantia: "7 días de garantía por funcionamiento",
    imagen: "assets/productos/laptop-hp-core-i5.svg",
    galeria: ["assets/productos/laptop-hp-core-i5.svg"],
    descripcion: "Laptop recomendada para trabajos de oficina, tareas académicas, videollamadas y uso general.",
    especificaciones: {
      Procesador: "Intel Core i5",
      RAM: "8 GB",
      Almacenamiento: "SSD 240 GB",
      Pantalla: "14 pulgadas",
      Sistema: "Windows 10/11 según compatibilidad",
      Estado: "Usado operativo"
    },
    incluye: ["Cargador", "Configuración inicial", "Prueba de funcionamiento"],
    metodosPago: ["Yape", "Plin", "Transferencia bancaria", "Efectivo"],
    resenas: []
  },
  {
    id: "laptop-gamer-consulta",
    categoria: "laptops",
    marca: "Varias marcas",
    nombre: "Laptop gamer bajo pedido",
    modelo: "Según disponibilidad",
    estado: "Bajo pedido",
    etiqueta: "Consulta stock",
    destacado: false,
    precio: null,
    precioAnterior: null,
    moneda: "S/",
    stock: 0,
    rating: 4.7,
    totalResenas: 6,
    envio: "Según coordinación",
    garantia: "Según proveedor o acuerdo de venta",
    imagen: "assets/productos/laptop-gamer-pedido.svg",
    galeria: ["assets/productos/laptop-gamer-pedido.svg"],
    descripcion: "Consulta por laptops gamer según presupuesto, uso requerido y disponibilidad. Se brinda orientación antes de la compra.",
    especificaciones: {
      Procesador: "Según disponibilidad",
      RAM: "Según configuración",
      Almacenamiento: "SSD recomendado",
      Pantalla: "Según modelo",
      Gráficos: "Dedicados según presupuesto",
      Estado: "Nuevo o usado según consulta"
    },
    incluye: ["Asesoría de compra", "Revisión de especificaciones", "Cotización según presupuesto"],
    metodosPago: ["Yape", "Plin", "Transferencia bancaria", "Pago coordinado"],
    resenas: []
  }
];
