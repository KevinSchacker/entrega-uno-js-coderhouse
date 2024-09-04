document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorProductos = document.getElementById('productos-seleccionados');
    const totalElement = document.getElementById('total-compra');
    const mensajeCompra = document.getElementById('mensaje-compra');
    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)} x ${producto.cantidad}`;
        contenedorProductos.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // confirmar la compra
    document.getElementById('confirmar-compra').addEventListener('click', () => {
        if (carrito.length > 0) {
            mostrarMensaje('¡Compra confirmada! Muchas gracias por elegirnos', 'exito');
            localStorage.removeItem('carrito');
            setTimeout(() => {
                window.location.href = 'productos.html'; 
            }, 2000);
        } else {
            mostrarMensaje('El carrito está vacío. No hay nada que comprar.', 'error');
        }
    });
    function mostrarMensaje(mensaje, tipo) {
        mensajeCompra.textContent = mensaje;
        mensajeCompra.className = tipo; 
        setTimeout(() => {
            mensajeCompra.textContent = '';
            mensajeCompra.className = ''; // Limpia el mensaje después de 3 segundos
        }, 3000);
    }
});
