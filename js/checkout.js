document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorProductos = document.getElementById('productos-seleccionados');
    const totalElement = document.getElementById('total-compra');
    const botonConfirmar = document.getElementById('confirmar-compra');
    let total = 0;

    // Verificar que los elementos existan en el DOM
    if (!contenedorProductos || !totalElement || !botonConfirmar) {
        console.error('Error: Elementos del DOM no encontrados.');
        return;
    }

    carrito.forEach(producto => {
        if (!producto.nombre || typeof producto.precio !== 'number' || typeof producto.cantidad !== 'number') {
            console.error('Error: Producto inválido en el carrito.', producto);
            return;
        }
        const item = document.createElement('div');
        item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)} x ${producto.cantidad}`;
        contenedorProductos.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    botonConfirmar.addEventListener('click', () => {
        if (carrito.length > 0) {
            const detalleProductos = carrito.map(producto =>
                `<li>${producto.nombre} x ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</li>`
            ).join('');

            confirmPurchase(detalleProductos);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El carrito está vacío. No hay nada que comprar.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
    function confirmPurchase(detalleProductos) {
        Swal.fire({
            title: '¿Confirmar compra?',
            html: `<ul>${detalleProductos}</ul><br>Total: $${total.toFixed(2)}. ¿Deseas continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Compra confirmada!',
                    text: 'Muchas gracias por elegirnos.',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonText: 'OK'
                }).then(() => {
                    localStorage.removeItem('carrito'); // Limpiar el carrito después de la confirmación
                    window.location.href = 'productos.html';
                });
            }
        });
    }
});
