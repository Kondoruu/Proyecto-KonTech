document.addEventListener('DOMContentLoaded', () => {
    const inventario = {
        1: { nombre: "Disco SSD 1TB", precio: 85, stock: 5 },
        2: { nombre: "Memoria RAM 16GB", precio: 60, stock: 3 },
        3: { nombre: "Licencia Windows 11", precio: 120, stock: 10 }
    };

    let carrito = {};

    const sidebar = document.getElementById('sidebar-carrito');
    const btnAbrir = document.getElementById('abrir-carrito');
    const btnCerrar = document.getElementById('cerrar-carrito');
    const cuerpoCarrito = document.getElementById('contenido-carrito');
    const contadorTotal = document.getElementById('contador-total');
    const precioTotal = document.getElementById('precio-total');
    const botonesCompra = document.querySelectorAll('.btn-add');

    btnAbrir.addEventListener('click', () => sidebar.classList.add('active'));
    btnCerrar.addEventListener('click', () => sidebar.classList.remove('active'));

    botonesCompra.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const producto = inventario[id];

            if (producto.stock > 0) {
                // 1. Animación de feedback en el botón
                btn.classList.add('animacion-click');
                setTimeout(() => btn.classList.remove('animacion-click'), 300);

                // 2. Animación de rebote en el contador del header
                contadorTotal.classList.add('bounce-cart');
                setTimeout(() => contadorTotal.classList.remove('bounce-cart'), 400);

                // 3. Gestión de Stock
                producto.stock--;
                document.getElementById(`stock-${id}`).innerText = producto.stock;

                if (producto.stock === 0) {
                    btn.disabled = true;
                    btn.innerText = "Agotado";
                    btn.style.backgroundColor = "#ccc"; 
                }

                // 4. Agregar al carrito
                if (carrito[id]) {
                    carrito[id].cantidad++;
                } else {
                    carrito[id] = { ...producto, cantidad: 1 };
                }

                actualizarInterfaz();
            }
        });
    });

    function actualizarInterfaz() {
        cuerpoCarrito.innerHTML = '';
        let totalUSD = 0;
        let totalUnidades = 0;

        Object.keys(carrito).forEach(id => {
            const item = carrito[id];
            totalUSD += (item.precio * item.cantidad);
            totalUnidades += item.cantidad;

            const div = document.createElement('div');
            div.className = 'item-carrito';
            div.innerHTML = `
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>${item.cantidad} x $${item.precio}</small>
                </div>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            `;
            cuerpoCarrito.appendChild(div);
        });

        if (totalUnidades === 0) {
            cuerpoCarrito.innerHTML = '<p class="empty-msg">No hay productos aún.</p>';
        }

        contadorTotal.innerText = totalUnidades;
        precioTotal.innerText = totalUSD.toFixed(2);
    }

    // vacia el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        Object.keys(carrito).forEach(id => {
            inventario[id].stock += carrito[id].cantidad;
            document.getElementById(`stock-${id}`).innerText = inventario[id].stock;
            
            const btn = document.querySelector(`.btn-add[data-id="${id}"]`);
            btn.disabled = false;
            btn.innerText = "Añadir al Carrito";
            btn.style.backgroundColor = ""; 
        });

        carrito = {};
        actualizarInterfaz();
    });
    const btnDarkMode = document.getElementById('dark-mode-toggle');
    const body = document.body;

        btnDarkMode.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
            if (body.classList.contains('dark-mode')) {
                btnDarkMode.innerText = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                btnDarkMode.innerText = '🌙';
                localStorage.setItem('theme', 'light');
            }
            });
            if (localStorage.getItem('theme') === 'dark') {
                body.classList.add('dark-mode');
                btnDarkMode.innerText = '☀️';
            }
});