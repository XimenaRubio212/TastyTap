async function cargarProductos() {
    try {
        const response = await fetch("http://localhost:8080/api/productos");
        const productos = await response.json();

        const contenedor = document.getElementById("contenedor-productos");
        contenedor.innerHTML = ""; // Limpiar carga previa

        productos.forEach(p => {
            contenedor.innerHTML += `
                <div class="producto-card">
                    <img src="../../img/${p.imagen}" alt="${p.nombre}">
                    <h3>${p.nombre}</h3>
                    <p>$${p.precio}</p>
                    <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error cargando productos", error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarProductos);