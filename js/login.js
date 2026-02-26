// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('.login-form');

//     if (!form) return;

//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         // Obtenemos los datos del formulario (asegúrate que los <input> tengan name="nombre" y name="pass")
//         const formData = Object.fromEntries(new FormData(form));

//         try {
//             /** * CAMBIO IMPORTANTE: 
//              * 1. La URL ahora apunta a /api/auth/login (según el AuthController).
//              * 2. Eliminamos "/backend-java/" ya que Spring Boot corre en la raíz "/" por defecto.
//              */
//             const response = await fetch('http://localhost:8080/api/auth/login', {
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             // Verificamos el éxito según la estructura de respuesta de nuestro nuevo Java
//             if (response.ok && data.success) {
                
//                 // Guardamos datos de sesión en el LocalStorage
//                 localStorage.setItem('tastytap_token', data.token);
//                 localStorage.setItem('user_role', data.rol);
//                 // Si quieres guardar el nombre, asegúrate que el backend lo envíe o usa el del formData
//                 localStorage.setItem('user_name', formData.nombre);

//                 alert("👋 ¡Bienvenido!");

//                 // Redirección dinámica según el rol (1 para Admin, 2 para Usuario, etc.)
//                 if (data.rol === 1) {
//                     window.location.href = 'pages/admin_dashboard.html';
//                 } else {
//                     window.location.href = 'pages/home.html';
//                 }
                
//             } else {
//                 // Mostramos el mensaje de error que viene del backend ("Credenciales incorrectas", etc.)
//                 alert("❌ Error: " + (data.mensaje || "No se pudo iniciar sesión"));
//             }
//         } catch (error) {
//             console.error("Detalle del error:", error);
//             alert("Error: No se pudo conectar con el servidor. Asegúrate de que el JAR de Spring Boot esté corriendo.");
//         }
//     });
// });

const API_URL = "http://localhost:8080/api";

document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Extraer datos del formulario (asegúrate que los input tengan estos IDs)
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // 1. Guardar el token que generó tu TokenUtil
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            
            // 2. Redirigir según el rol (RF27)
            if (data.rol === "ADMIN") {
                window.location.href = "../Admin/logs-servidor.html";
            } else {
                window.location.href = "tienda.html";
            }
        } else {
            alert("Error: " + data.mensaje);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
});