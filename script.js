document.addEventListener('DOMContentLoaded', () => {
    const getFortuneBtn = document.getElementById('get-fortune-btn');
    const fortuneText = document.getElementById('fortune-text');
    const zoltarMachine = document.getElementById('zoltar-machine');
    const imgZoltar = document.getElementById('img-zoltar');
    
    let quotes = [];

    async function loadQuotes() {
        try {
            const response = await fetch('quotes.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            quotes = await response.json();
            getFortuneBtn.disabled = false;
            fortuneText.textContent = 'Presiona el botón para recibir tu fortuna...';
        } catch (error) {
            console.error("No se pudieron cargar las citas:", error);
            fortuneText.textContent = 'Error al contactar a los espíritus. Inténtalo de nuevo.';
        }
    }

    function getFortune() {
        if (quotes.length === 0) return;

        getFortuneBtn.disabled = true;
        fortuneText.textContent = 'Zoltar consulta a los espíritus...';
        imgZoltar.classList.add('shake');

        // --- CAMBIO AQUÍ ---
        // Añadimos la nueva clase única
        zoltarMachine.classList.add('is-predicting');

        // Mostramos la fortuna después de n.m segundos
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomFortune = quotes[randomIndex];
            fortuneText.innerHTML = `"${randomFortune.quote}" <br><strong>- ${randomFortune.author}</strong>`;
            getFortuneBtn.disabled = false;
            imgZoltar.classList.remove('shake');
        }, 500);

        setTimeout(() => {
            zoltarMachine.classList.remove('is-predicting');
        }, 800); // Se quita tras 1s (la duración de la animación más larga)
    }
    
    getFortuneBtn.disabled = true;
    fortuneText.textContent = 'Contactando con el más allá...';
    loadQuotes();
    getFortuneBtn.addEventListener('click', getFortune);
});