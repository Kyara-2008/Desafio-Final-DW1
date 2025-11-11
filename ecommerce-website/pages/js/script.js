// Array para almacenar los productos en el carrito
let carrito = [];
let total = 0;

const totalElement = document.getElementById('carrito-total');
const listaCarrito = document.getElementById('lista-carrito');
const finalizarBtn = document.getElementById('finalizar-compra');
const carritoSummary = document.getElementById('carrito-summary');


// FUNCIÓN: Eliminar un producto del carrito por nombre
function eliminarProducto(nombre) {
    const indice = carrito.findIndex(item => item.nombre === nombre);
    
    if (indice !== -1) {
        // Elimina el producto del array
        carrito.splice(indice, 1);
        console.log(`Eliminado: ${nombre}. Carrito actual:`, carrito);
        actualizarCarrito();
    }
}


// Función para actualizar el total y la interfaz del carrito
function actualizarCarrito() {
    //Calcular el total
    total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalElement.textContent = total.toFixed(2);
    
    //Renderizar los productos en la lista
    listaCarrito.innerHTML = ''; // Limpiar lista anterior

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li style="color: #6c757d;">El carrito está vacío.</li>';
        finalizarBtn.disabled = true;
    } 
    else {

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.style.marginBottom = '8px';

            const textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
            li.textContent = textContent;

            // Botón para eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.style.marginLeft = '10px';
            deleteButton.style.padding = '2px 6px';
            deleteButton.style.backgroundColor = 'transparent';
            deleteButton.style.border = 'none';
            deleteButton.style.cursor = 'pointer';
            
            // Asignar el evento de click al botón para eliminar el producto
            deleteButton.addEventListener('click', () => {
                eliminarProducto(item.nombre);
            });

            li.appendChild(deleteButton);
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
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones con la clase 'add-to-cart'
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const nombre = e.target.dataset.name;
            const precio = parseFloat(e.target.dataset.price);
            
            agregarProducto(nombre, precio);
        });
    });

    actualizarCarrito(); 
});