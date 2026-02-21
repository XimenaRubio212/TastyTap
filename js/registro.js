document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.registro-form') || document.querySelector('#form-registro');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = Object.fromEntries(new FormData(form));

        try {
            // URL corregida para Spring Boot
            const response = await fetch('http://localhost:8080/api/auth/registro', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("✅ " + data.mensaje);
                // Redirección al login tras éxito
                setTimeout(() => { 
                    window.location.href = 'login.html'; 
                }, 1500);
            } else {
                alert("❌ " + (data.mensaje || "Error en el registro"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error: No se pudo conectar con el servidor Java. Revisa que el JAR esté corriendo.");
        }
    });
});