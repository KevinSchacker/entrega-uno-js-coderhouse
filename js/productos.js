(function() {
    let carrito = [];

    // Selecciona todos los botones "Agregar al carrito"
    const botonesAgregarCarrito = document.querySelectorAll('.btn-primary');
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total-compra');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    const botonRealizarCompra = document.getElementById('realizar-compra');

    // Recorre todos los botones y agrega un evento de clic a cada uno
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

    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(producto);
        }
    }

    // Función para mostrar el carrito en la página
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
                <button class="btn btn-eliminar">Eliminar</button>
            `;

            // Agregar evento al botón "Eliminar"
            const botonEliminar = itemCarrito.querySelector('.btn-eliminar');
            botonEliminar.addEventListener('click', () => {
                eliminarProductoDelCarrito(index);
                mostrarCarrito();
            });

            contenedorCarrito.appendChild(itemCarrito);

            total += producto.precio * producto.cantidad;
        });

        // Mostrar el total
        totalElement.textContent = `Total: $${total.toFixed(2)}`;

        // Mostrar/ocultar botones
        botonVaciarCarrito.style.display = carrito.length > 0 ? 'block' : 'none';
        botonRealizarCompra.style.display = carrito.length > 0 ? 'block' : 'none';
    }

    // Función para eliminar un producto del carrito
    function eliminarProductoDelCarrito(index) {
        carrito.splice(index, 1);
    }

    // Función para vaciar el carrito
    botonVaciarCarrito.addEventListener('click', () => {
        carrito = [];
        mostrarCarrito();
    });

    // Función para obtener el precio del producto
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
