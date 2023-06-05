function calculadoradecuota(precio, cuotas, coninteres) {
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
  
function mostrarCuotas() {
    const productos = [
      { nombre: "Remera Oversize", precio: 1000 },
      { nombre: "Remera ajustada", precio: 2000 },
      { nombre: "Pantalon wide leg", precio: 3000 },
    ];
  
    let mensaje = "Opciones de productos:\n";
    for (let i = 0; i < productos.length; i++) {
      mensaje += `${i + 1}. ${productos[i].nombre}\n`;
    }
  
    let numero = parseInt(prompt(`${mensaje}\nIngrese el numero del producto que desea comprar (1, 2, 3):`));
  
    const productosSeleccionados = [];
    while (numero !== 0) {
      if (numero >= 1 && numero <= productos.length) {
        const productoSeleccionado = productos[numero - 1];
        const precioProducto = productoSeleccionado.precio;
  
        let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productoSeleccionado.nombre} que desea comprar:`));
        while (isNaN(cantidad) || cantidad <= 0) {
          cantidad = parseInt(prompt(" invalido X. Ingrese la cantidad de productos que desea comprar:"));
        }
  
        productoSeleccionado.cantidad = cantidad;
        productosSeleccionados.push(productoSeleccionado);
      } else {
        alert("X invAlido");
      }
  
      numero = parseInt(prompt(`${mensaje}\nIngrese el número del producto que desea comprar (1, 2, 3) o presione 0 para finalizar:`));
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
        const cuota = calculadoradecuota(precioProducto * cantidad, cuotas, 0);
        mensajeFinal += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
      }
  
      mensajeFinal += `\nCuotas con interés para ${cantidad} ${productoSeleccionado.nombre}:\n`;
      const cuotasConInteres = [6, 12];
      for (let j = 0; j < cuotasConInteres.length; j++) {
        const cuotas = cuotasConInteres[j];
        const cuota = calculadoradecuota(precioProducto * cantidad, cuotas, 1);
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
      const cuotaTotal = calculadoradecuota(total, cuotas, 1);
      mensajeFinal += `${cuotas} cuotas: $${cuotaTotal.toFixed(2)}\n`;
    }
  
    alert(mensajeFinal);
  }
  
mostrarCuotas();
  