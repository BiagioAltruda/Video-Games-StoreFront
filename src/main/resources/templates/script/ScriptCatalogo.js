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

//metodo per mostrare i dettagli del gioco
function showGameDetails(gameId) {
    const url = `http://localhost:8080/smoke/games/${gameId}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Gioco non trovato');
            }
            return response.json();
        })
        .then((game) => {
        const gameDetails = `
        <div class="game-details-container"> <!-- Aggiungi questo wrapper -->
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${game.bannerPath}" 
                             class="img-fluid rounded" alt="${game.name}" 
                             onerror="this.src='https://via.placeholder.com/500x700/51073a/ecf0f1?text=Image+Error'">
                    </div>
                    <div class="col-md-6">
                        <h2 class="text-contrast">${game.name}</h2> 
                        <p class="text-contrast"><strong>Sviluppatore:</strong> ${game.developer}</p> 
                        <p class="text-contrast"><strong>Genere:</strong> ${game.genre}</p> 
                        <p class="text-contrast"><strong>Prezzo:</strong> ${game.price ? '€' + game.price.toFixed(2) : 'Gratis'}</p> 
                        <p class="text-contrast"><strong>Pegi:</strong> + ${game.rating || 'N/A'}</p> 
                        <p class="text-contrast"><strong>Data di rilascio:</strong> ${game.releaseDate || 'N/D'}</p> 
                        
                        <div class="mt-4">
                            <h5 class="text-contrast">Descrizione</h5> 
                            <p class="text-contrast">${game.description || 'Nessuna descrizione disponibile'}</p> 
                        </div>
                        
                        <div class="mt-4">
                           <button class="btn btn-primary me-2" onclick="window.location.href='Payment.html'">
                            <i class="fas fa-shopping-cart me-1"></i>Acquista
                            </button>
                            <button class="btn btn-secondary" onclick="closeGameDetails()">
                                <i class="fas fa-arrow-left me-1"></i>Torna indietro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        document.getElementById('cards-container').innerHTML = gameDetails;
    })
        .catch((error) => {
            console.error("Errore durante il recupero dei dettagli", error);
            document.getElementById('cards-container').innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle me-2"></i>
                        Errore nel caricamento dei dettagli: ${error.message}
                    </div>
                    <button class="btn btn-secondary" onclick="closeGameDetails()">
                        Torna alla lista
                    </button>
                </div>
            `;
        });
}

// funzione per tornare alla lista giochi
function closeGameDetails() {
    loadGames(); // Richiama la funzione che carica tutti i giochi
}