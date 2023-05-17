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
    let numero = parseFloat(prompt("Ingrese el precio:"));
  
    while (numero !== 0) {
      let mensaje = `Cuotas sin interés:\n`;
      const cuotasSinInteres = [3];
      for (let i = 0; i < cuotasSinInteres.length; i++) {
        const cuotas = cuotasSinInteres[i];
        const cuota = calculadoradecuota(numero, cuotas, 0);
        mensaje += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
      }
  
      mensaje += `\nCuotas con interés:\n`;
      const cuotasConInteres = [6, 12];
      for (let i = 0; i < cuotasConInteres.length; i++) {
        const cuotas = cuotasConInteres[i];
        const cuota = calculadoradecuota(numero, cuotas, 1);
        mensaje += `${cuotas} cuotas: $${cuota.toFixed(2)}\n`;
      }
  
    alert(mensaje);
      numero = parseFloat(prompt("Ingrese el precio o presione 0 para salir de la ventana emergente):"));
    }
  }
  
mostrarCuotas();
  