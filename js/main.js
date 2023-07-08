function obtenerProductos() {
  const productosJSON = localStorage.getItem("productos");
  return productosJSON ? JSON.parse(productosJSON) : [];
}

function guardarProductos(productos) {
  const productosJSON = JSON.stringify(productos);
  localStorage.setItem("productos", productosJSON);
}

function mostrarOpcionesProductos(productos) {
  let mensaje = "Opciones de productos:\n";
  productos.forEach((producto, index) => {
    mensaje += `${index + 1}. ${producto.nombre}\n`;
  });
  return mensaje;
}

function mostrarMensajeError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.innerText = mensaje;
  document.getElementById("resultado").appendChild(mensajeError);
}

function limpiarResultado() {
  document.getElementById("resultado").innerHTML = "";
}

function mostrarSeleccionProducto(productos) {
  limpiarResultado();
  const mensajeOpciones = mostrarOpcionesProductos(productos);
  const mensajeSeleccion = document.createElement("p");
  mensajeSeleccion.innerText = mensajeOpciones;
  document.getElementById("resultado").appendChild(mensajeSeleccion);

  const inputNumero = document.createElement("input");
  inputNumero.type = "number";
  inputNumero.min = 0;
  inputNumero.max = productos.length;
  document.getElementById("resultado").appendChild(inputNumero);

  const botonConfirmar = document.createElement("button");
  botonConfirmar.innerText = "Confirmar";
  document.getElementById("resultado").appendChild(botonConfirmar);

  botonConfirmar.addEventListener("click", () => {
    const numero = parseInt(inputNumero.value);
    if (numero >= 0 && numero <= productos.length) {
      if (numero === 0) {
        const productosSeleccionados = obtenerProductosSeleccionados(productos);
        if (productosSeleccionados.length > 0) {
          const mensajeFinal = generarMensajeFinal(productosSeleccionados);
          mostrarResultado(mensajeFinal);
          mostrarBotonVolver(productos);
        } else {
          mostrarMensajeError("No se ha seleccionado ningún producto.");
        }
      } else {
        const producto = productos[numero - 1];
        mostrarIngresarCantidad(producto, productos);
      }
    } else {
      mostrarMensajeError("Número inválido. Intente nuevamente.");
    }
  });
}

function mostrarIngresarCantidad(productoSeleccionado, productos) {
  return new Promise((resolve, reject) => {
    limpiarResultado();
    const mensajeCantidad = document.createElement("p");
    mensajeCantidad.innerText = `Ingrese la cantidad de ${productoSeleccionado.nombre} que desea comprar:`;
    document.getElementById("resultado").appendChild(mensajeCantidad);

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = 1;
    document.getElementById("resultado").appendChild(inputCantidad);

    const botonConfirmar = document.createElement("button");
    botonConfirmar.innerText = "Confirmar";
    document.getElementById("resultado").appendChild(botonConfirmar);

    botonConfirmar.addEventListener("click", () => {
      const cantidad = parseInt(inputCantidad.value);
      if (cantidad > 0) {
        productoSeleccionado.cantidad = cantidad;

        fetch('http://127.0.0.1:5500/compraonline.html', {
          method: 'POST',
          body: JSON.stringify(productoSeleccionado),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          mostrarSeleccionProducto(productos);
          resolve();
        })
        .catch(error => {
          reject(error); 
        });
      } else {
        const error = new Error("Cantidad inválida. Ingrese la cantidad de productos que desea comprar.");
        reject(error);
      }
    });
  });
}

function obtenerProductosSeleccionados(productos) {
  const productosSeleccionados = [];
  productos.forEach((producto) => {
    if (producto.cantidad > 0) {
      productosSeleccionados.push(producto);
    }
  });
  return productosSeleccionados;
}

function calcularCuota(precio, cuotas, conInteres) {
  const intereses = { 6: 0.03, 12: 0.05 };
  const interes = conInteres ? intereses[cuotas] : 0;
  const precioConInteres = precio * (1 + interes);
  const cuota = precioConInteres / cuotas;
  return cuota;
}

function calcularTotal(productosSeleccionados) {
  let total = 0;
  productosSeleccionados.forEach((productoSeleccionado) => {
    const subtotal = productoSeleccionado.precio * productoSeleccionado.cantidad;
    total += subtotal;
  });
  return total;
}

function generarMensajeCuotas(productoSeleccionado) {
  let mensajeCuotas = "";
  const precioProducto = productoSeleccionado.precio;
  const cantidad = productoSeleccionado.cantidad;

  mensajeCuotas += `Cuotas con interés para ${cantidad} ${productoSeleccionado.nombre}:\n`;
  [6, 12].forEach((cuotas) => {
    const cuota = calcularCuota(precioProducto, cuotas, true);
    mensajeCuotas += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
  });

  return mensajeCuotas;
}

function generarMensajeFinal(productosSeleccionados) {
  let mensajeFinal = "";
  const total = calcularTotal(productosSeleccionados);

  productosSeleccionados.forEach((productoSeleccionado) => {
    const mensajeCuotas = generarMensajeCuotas(productoSeleccionado);
    mensajeFinal += mensajeCuotas + "\n";
  });

  mensajeFinal += `Total de la compra: $${total.toFixed(2)}\n`;

  mensajeFinal += "\nCuotas totales:\n";
  [6, 12].forEach((cuotas) => {
    const cuotaTotal = calcularCuota(total, cuotas, true);
    mensajeFinal += `${cuotas} cuotas: $${cuotaTotal.toFixed(2)}\n`;
  });

  return mensajeFinal;
}

function mostrarResultado(mensaje) {
  limpiarResultado();
  const mensajeResultado = document.createElement("p");
  mensajeResultado.innerText = mensaje;
  document.getElementById("resultado").appendChild(mensajeResultado);
}

function mostrarBotonVolver(productos) {
  const botonVolver = document.createElement("button");
  botonVolver.innerText = "Volver a comprar";
  document.getElementById("resultado").appendChild(botonVolver);

  botonVolver.addEventListener("click", () => {
    limpiarResultado();
    mostrarSeleccionProducto(productos);
  });
}

function mostrarCuotas() {
  const productos = [
    { nombre: "Producto 1", precio: 1000, cantidad: 0 },
    { nombre: "Producto 2", precio: 2000, cantidad: 0 },
    { nombre: "Producto 3", precio: 3000, cantidad: 0 }
  ];

  mostrarSeleccionProducto(productos);
}

mostrarCuotas();
