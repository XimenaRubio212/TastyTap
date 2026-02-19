document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new URLSearchParams(new FormData(form));

        try {
            // ✅ URL CORRECTA
            const response = await fetch('http://localhost:8080/backend-java-1.0-SNAPSHOT/api/login', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert("👋 " + data.message);
                window.location.href = '../../views/client/seguir-comprando.html'; 
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error("Detalle del error:", error);
            alert("Error: No se pudo conectar con el servidor Java.");
        }
    });
});