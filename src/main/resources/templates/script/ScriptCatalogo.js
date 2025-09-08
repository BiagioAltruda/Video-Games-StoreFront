// Funzione principale che crea le card
function showAllGames(games) {
    const gameCards = games
        .map((game) => {
            return `
<div class="col-md-4 mb-4 cardStyle" data-genre="${game.genre}">
    <div class="card game-card" onclick="showGameDetails(${game.id})" style="cursor: pointer;">
        <img src="${game.bannerPath ? game.bannerPath : 'https://via.placeholder.com/300x450/51073a/ecf0f1?text=No+Image'}" 
             class="card-img-top" alt="${game.name}"
             onerror="this.src='https://via.placeholder.com/300x450/51073a/ecf0f1?text=Image+Error'">
        
        <div class="card-overlay">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-developer">${game.developer}</p>
            <p class="card-genre">${game.genre}</p>
        </div>
        
        <div class="card-body">
            <p class="card-rating">${game.price ? '€' + game.price.toFixed(2) : 'Gratis'}</p>
        </div>
    </div>
</div>
`;
        })
        .join("");

    const productContainer = document.getElementById('cards-container');
    productContainer.innerHTML = `<div class="row">${gameCards}</div>`;
}

// Funzione che chiama il TUO database
async function loadGames() {
    try {
        const response = await fetch('http://localhost:8080/smoke/games/all');
        
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        const games = await response.json();
        showAllGames(games);
        
    } catch (error) {
        console.error('Errore nel caricamento dal database:', error);
        // Mostra un messaggio di errore all'utente
        const container = document.getElementById('cards-container');
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Impossibile caricare i giochi. Riprova più tardi.
                </div>
            </div>
        `;
    }
}

// Avvia il caricamento quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadGames);

function showGameDetails(gameId) {
    console.log('Apri dettagli gioco ID:', gameId);
    // Reindirizza alla pagina dettagli
    window.location.href = `dettagli.html?id=${gameId}`;
    // Oppure mostra un modal con i dettagli
}