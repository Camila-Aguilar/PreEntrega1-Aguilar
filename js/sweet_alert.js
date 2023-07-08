const mostrarMensaje = () => {
    Swal.fire({
      title: 'Hola!',
      text: 'Bienvenido a su compra',
      icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'compraonline.html';
        }
});
}
document.getElementById("boton").onclick = mostrarMensaje;