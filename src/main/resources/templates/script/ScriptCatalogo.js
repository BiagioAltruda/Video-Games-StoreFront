function showAllGames(games) {
    const gameCards = games
        .map((game) => {
            return `
<div class="col-md-4 mb-4 cardStyle" data-genre="${game.genre}">
    <div class="card game-card">
        <img src="${game.bannerPath ? game.bannerPath : 'https://via.placeholder.com/300x450/51073a/ecf0f1?text=No+Image'}" 
             class="card-img-top" alt="${game.name}"
             onerror="this.src='https://via.placeholder.com/300x450/51073a/ecf0f1?text=Image+Error'">
        
        <div class="card-overlay">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-developer">${game.developer}</p>
            <p class="card-genre">${game.genre}</p>
            <p class="card-price">€${game.price ? game.price.toFixed(2) : 'N/D'}</p>
        </div>
        
        <div class="card-body">
            <p class="card-text">${game.description ? game.description.substring(0, 100) + '...' : 'Nessuna descrizione'}</p>
            <p class="card-rating">⭐ ${game.rating || 'N/A'}/100</p>
            <a href="#" class="btn btn-primary" onclick="showGameDetails(${game.id})">Dettagli</a>
        </div>
    </div>
</div>
`;
        })
        .join("");

    const productContainer = document.getElementById('catalogoCompleto');
    productContainer.innerHTML = `<div class="row">${gameCards}</div>`;
}

// Funzione per caricare i giochi dal database
async function loadGames() {
    try {
        const response = await fetch('http://localhost:8080/smoke/games/all');
        const games = await response.json();
        showAllGames(games);
    } catch (error) {
        console.error('Errore nel caricamento giochi:', error);
        // eventuale fallback con dati mock
    }
}

// Chiamata quando la pagina è caricata
document.addEventListener('DOMContentLoaded', loadGames);