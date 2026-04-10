// tienda de productos en una pagina del index.html

// Carrito de compras
const carrito = [];

// Productos disponibles
const productos = [
    { id: 1, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
    { id: 3, nombre: "Producto 3", precio: 300 }
];

// Seleccionar los botones del HTML
const botones = document.querySelectorAll('.btn-producto');

// Agregar evento click a cada botón
botones.forEach((boton, indice) => {
    boton.addEventListener('click', () => {
        const producto = productos[indice];
        
        // Verificar si el producto ya está en el carrito
        const existeEnCarrito = carrito.some(p => p.id === producto.id);
        
        if (existeEnCarrito) {
            console.log(`El producto "${producto.nombre}" ya está en el carrito`);
        } else {
            // Agregar producto al carrito
            carrito.push(producto);
            console.log(`Producto "${producto.nombre}" agregado al carrito`);
            console.log("Carrito actual:", carrito);
        }
    });
});