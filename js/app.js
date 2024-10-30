async function fetchWithRetry(url, options, retyDely = 5000) {
    while (true) {
        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            // Si la respuesta es exitosa, la funcion continua
            return await response.json()
        } catch (error) {
            console.log(`API no disponible. Reintentando en ${retryDelay / 1000} segundos...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

// Uso de la función
(async () => {
    const data = await fetchWithRetry('https://node-api-blackout.onrender.com/horario');
    console.log("Datos recibidos:", data);
    // Aquí continua el funcionamiento normal de la app.
    window.location.href = "/template-client-blackout/home.html";
    // window.open("../index.html", "_blank");
})();