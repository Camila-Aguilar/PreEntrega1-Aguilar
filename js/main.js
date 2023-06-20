document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
  
    const registerUsername = document.getElementById("register-username").value;

    const registerPassword = document.getElementById("register-password").value;

localStorage.setItem("registerUsername", registerUsername);
localStorage.setItem("registerPassword", registerPassword);
  
alert("Registro exitoso. Ahora puedes iniciar sesión.");
});
  
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
  
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;
  
    const registerUsername = localStorage.getItem("registerUsername");
    const registerPassword = localStorage.getItem("registerPassword");
  
    if (loginUsername === registerUsername && loginPassword === registerPassword) {
      // Inicio de sesión exitoso
      localStorage.setItem("isLoggedIn", "true"); 
      mostrarCuotas(); 
    } else {
      // Inicio de sesión fallido
      alert("Nombre de usuario o contraseña incorrectos");
    }
});
  
window.addEventListener("load", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (isLoggedIn === "true") {
      mostrarCuotas();
    }
});

function calcularCuota(precio, cuotas, coninteres) {
    const sininteres = 0;
    let interes = sininteres;
  
    if (cuotas === 6) {
      interes = 0.03;
    } else if (cuotas === 12) {
      interes = 0.05;
    }
  
    const cuota = (precio + precio * interes) / cuotas;
    return cuota;
  }
  
function seleccionarProducto(productos) {
    let mensaje = "Opciones de productos:\n";
    for (let i = 0; i < productos.length; i++) {
      mensaje += `${i + 1}. ${productos[i].nombre}\n`;
    }
  
    let numero = parseInt(prompt(`${mensaje}\nIngrese el número del producto que desea comprar (1, 2, 3), presione 0 si desea salir:`));
  
    while (numero < 0 || numero > productos.length) {
      alert("Número inválido. Intente nuevamente.");
      numero = parseInt(prompt(`${mensaje}\nIngrese el número del producto que desea comprar (1, 2, 3):`));
    }
  
    return productos[numero - 1];
}
  
function ingresarCantidad(producto) {
    let cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto.nombre} que desea comprar:`));
  
    while (isNaN(cantidad) || cantidad <= 0) {
      cantidad = parseInt(prompt("Cantidad inválida. Ingrese la cantidad de productos que desea comprar:"));
    }
  
    producto.cantidad = cantidad;
  }
  
function mostrarCuotas() {
    const productos = [
      { nombre: "Remera Oversize", precio: 1000 },
      { nombre: "Remera ajustada", precio: 2000 },
      { nombre: "Pantalon wide leg", precio: 3000 },
    ];
  
    const productosSeleccionados = [];
  
    let producto = seleccionarProducto(productos);
    while (producto) {
      ingresarCantidad(producto);
      productosSeleccionados.push(producto);
      producto = seleccionarProducto(productos);
    }
  
    let total = 0;
    let mensajeFinal = "";
    for (let i = 0; i < productosSeleccionados.length; i++) {
      const productoSeleccionado = productosSeleccionados[i];
      const precioProducto = productoSeleccionado.precio;
      const cantidad = productoSeleccionado.cantidad;
  
      mensajeFinal += `Cuotas sin interés para ${cantidad} ${productoSeleccionado.nombre}:\n`;
      const cuotasSinInteres = [3];
      for (let j = 0; j < cuotasSinInteres.length; j++) {
        const cuotas = cuotasSinInteres[j];
        const cuota = calcularCuota(precioProducto * cantidad, cuotas, 0);
        mensajeFinal += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
      }
  
      mensajeFinal += `\nCuotas con interés para ${cantidad} ${productoSeleccionado.nombre}:\n`;
      const cuotasConInteres = [6, 12];
      for (let j = 0; j < cuotasConInteres.length; j++) {
        const cuotas = cuotasConInteres[j];
        const cuota = calcularCuota(precioProducto * cantidad, cuotas, 1);
        mensajeFinal += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
      }
  
      mensajeFinal += "\n";
  
      total += precioProducto * cantidad;
    }
    mensajeFinal += `Total de la compra: $${total.toFixed(2)}\n`;
  
    const cuotasTotales = [3, 6, 12];
    mensajeFinal += "\nCuotas totales:\n";
    for (let i = 0; i < cuotasTotales.length; i++) {
      const cuotas = cuotasTotales[i];
      const cuotaTotal = calcularCuota(total, cuotas, 1);
      mensajeFinal += `${cuotas} cuotas: $${cuotaTotal.toFixed(2)}\n`;
    }
  
    alert(mensajeFinal);
  }
  
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "usuario" && password === "contrasena") {
      localStorage.setItem("isLoggedIn", "true"); 
      mostrarCuotas(); 
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
});
window.addEventListener("load", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (isLoggedIn === "true") {
      mostrarCuotas();
    }
});
  