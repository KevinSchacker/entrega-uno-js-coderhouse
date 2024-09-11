(function () {
    let carrito = [];
    const botonesAgregarCarrito = document.querySelectorAll('.btn-primary');
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total-compra');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    const botonRealizarCompra = document.getElementById('realizar-compra');
    // Cargar el carrito desde localStorage si existe
    window.onload = function () {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            mostrarCarrito();
            if (carrito.length > 0) {
                Swal.fire({
                    title: '¡Atención!',
                    text: 'No olvides de finalizar tu compra.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    timer: 5000
                });
            }
        }
    };
    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener('click', () => {
            const card = boton.closest('.card');
            const nombreProducto = card.querySelector('.card-title').textContent;
            const precioProducto = obtenerPrecioProducto(nombreProducto);
            const producto = {
                nombre: nombreProducto,
                precio: precioProducto,
                cantidad: 1
            };
            agregarProductoAlCarrito(producto);
            mostrarCarrito();
        });
    });
    function agregarProductoAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(producto);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    function mostrarCarrito() {
        contenedorCarrito.innerHTML = '';
        let total = 0;
        carrito.forEach((producto, index) => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('producto-carrito');
            itemCarrito.innerHTML = `
                <span class="producto-nombre">${producto.nombre}</span> - 
                <span class="producto-precio">$${producto.precio.toFixed(2)}</span> x 
                <span class="producto-cantidad">${producto.cantidad}</span>
                <button class="btn btn-eliminar">Eliminar</button>`
                ;
            const botonEliminar = itemCarrito.querySelector('.btn-eliminar');
            botonEliminar.addEventListener('click', () => {
                eliminarProductoDelCarrito(index);
                mostrarCarrito();
            });
            contenedorCarrito.appendChild(itemCarrito);
            total += producto.precio * producto.cantidad;
        });
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        botonVaciarCarrito.style.display = carrito.length > 0 ? 'block' : 'none';
        botonRealizarCompra.style.display = carrito.length > 0 ? 'block' : 'none';
    }
    function eliminarProductoDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    botonVaciarCarrito.addEventListener('click', () => {
        carrito = [];
        localStorage.removeItem('carrito'); // Eliminar el carrito de localStorage
        mostrarCarrito();
    });
    botonRealizarCompra.addEventListener('click', () => {
        // Guarda el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        // Redirige a la página de checkout
        window.location.href = '../pags/checkout.html';
    });
    function obtenerPrecioProducto(nombre) {
        const precios = {
            "Celular MOTOROLA": 299.99,
            "Mouse": 19.99,
            "Cámaras HIKVISION": 499.99,
            "Notebook DELL": 899.99,
            "CPU GAMER": 1199.99,
            "iPhone 15": 1099.99,
            "Xiaomi": 349.99,
            "Smartwatch": 149.99,
            "Samsung": 799.99
        };

        return precios[nombre] || 0;
    }
})();
