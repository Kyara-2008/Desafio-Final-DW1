// Array para almacenar los productos en el carrito
let carrito = [];
let total = 0;

// Referencias a los elementos del DOM
const totalElement = document.getElementById('carrito-total');
const listaCarrito = document.getElementById('lista-carrito');
const finalizarBtn = document.getElementById('finalizar-compra');
const carritoSummary = document.getElementById('carrito-summary');


// Función para actualizar el total y la interfaz del carrito
function actualizarCarrito() {
    // 1. Calcular el total
    total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalElement.textContent = total.toFixed(2);
    
    // 2. Renderizar los productos en la lista
    listaCarrito.innerHTML = ''; // Limpiar lista anterior

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li style="color: #6c757d;">El carrito está vacío.</li>';
        finalizarBtn.disabled = true;
        carritoSummary.style.display = 'none'; // Ocultar si está vacío
    } 
    else {
        carritoSummary.style.display = 'block'; // Mostrar si tiene productos
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
            listaCarrito.appendChild(li);
        });
        finalizarBtn.disabled = false;
    }
}


// Función principal para agregar un producto al carrito
function agregarProducto(nombre, precio) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si existe, aumentar solo la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregarlo con cantidad 1
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Notificación simple (opcional)
    console.log(`Agregado: ${nombre}. Carrito actual:`, carrito);
    
    // Actualizar la interfaz
    actualizarCarrito();
}

// ASIGNAR EVENT LISTENERS A LOS BOTONES
// Esto espera que todo el HTML esté cargado antes de buscar los botones
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones con la clase 'add-to-cart'
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            // Leer los datos del producto almacenados en los atributos data-
            const nombre = e.target.dataset.name;
            const precio = parseFloat(e.target.dataset.price);
            
            agregarProducto(nombre, precio);
        });
    });

    actualizarCarrito();
});