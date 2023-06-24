function obtenerProductos() {
  const productosJSON = localStorage.getItem("productos");
  return productosJSON ? JSON.parse(productosJSON) : [];
}

function guardarProductos(productos) {
  const productosJSON = JSON.stringify(productos);
  localStorage.setItem("productos", productosJSON);
}

function seleccionarProducto(productos) {
  let mensaje = "Opciones de productos:\n";
  productos.forEach((producto, index) => {
    mensaje += `${index + 1}. ${producto.nombre}\n`;
});

  let numero = parseInt(prompt(`${mensaje}\nIngrese el número del producto que desea comprar (1, 2, 3), presione 0 si desea salir:`));

  while (numero < 0 || numero > productos.length) {
    alert("Número inválido. Intente nuevamente.");
    numero = parseInt(prompt(`${mensaje}\nIngrese el número del producto que desea comprar (1, 2, 3):`));
  }

  if (numero === 0) {
    return null;
  }

  return productos[numero - 1];
}

function ingresarCantidad(productoSeleccionado) {
  let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productoSeleccionado.nombre} que desea comprar:`));

  while (isNaN(cantidad) || cantidad <= 0) {
    cantidad = parseInt(prompt("Cantidad inválida. Ingrese la cantidad de productos que desea comprar:"));
  }

  productoSeleccionado.cantidad = cantidad;
}

function calcularCuota(precio, cuotas, conInteres) {
  const intereses = { 6: 0.03, 12: 0.05 };
  const interes = conInteres ? intereses[cuotas] : 0;
  const precioConInteres = precio * (1 + interes);
  const cuota = precioConInteres / cuotas;
  return cuota;
}

function generarMensajeFinal(productosSeleccionados) {
  let mensajeFinal = "";
  let total = 0;

  productosSeleccionados.forEach((productoSeleccionado) => {
    const precioProducto = productoSeleccionado.precio;
    const cantidad = productoSeleccionado.cantidad;

    mensajeFinal += `Cuotas con interés para ${cantidad} ${productoSeleccionado.nombre}:\n`;
    [6, 12].forEach((cuotas) => {
      const cuota = calcularCuota(precioProducto, cuotas, true);
      mensajeFinal += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
    });

    mensajeFinal += "\n";

    const subtotal = precioProducto * cantidad;
    total += subtotal;
  });

  mensajeFinal += `Total de la compra: $${total.toFixed(2)}\n`;

  mensajeFinal += "\nCuotas totales:\n";
  [6, 12].forEach((cuotas) => {
    const cuotaTotal = calcularCuota(total, cuotas, true);
    mensajeFinal += `${cuotas} cuotas: $${cuotaTotal.toFixed(2)}\n`;
  });

  return mensajeFinal;
}

function mostrarCuotas() {
  const productos = [
    { nombre: "Producto 1", precio: 1000 },
    { nombre: "Producto 2", precio: 2000 },
    { nombre: "Producto 3", precio: 3000 }
  ];

  const productosSeleccionados = [];

  let producto = seleccionarProducto(productos);
  while (producto) {
    ingresarCantidad(producto);
    productosSeleccionados.push(producto);
    producto = seleccionarProducto(productos);
  }

  const mensajeFinal = generarMensajeFinal(productosSeleccionados);

  document.getElementById("resultado").innerText = mensajeFinal;
}

document.addEventListener("DOMContentLoaded", mostrarCuotas);
