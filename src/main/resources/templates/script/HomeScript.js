  //Creazione della costante per il fetch della pagina
  const baseUrl = 'http://localhost:8080/smoke/accounts';


// Indice corrente del gioco in evidenza
let currentFeaturedIndex = 0;
// Array che conterrà tutti i giochi caricati
let allGames = [];

// Funzione che mostra il gioco in evidenza
function showFeaturedGame(index) {
    // Nascondi il placeholder di caricamento
    document.getElementById('featured-loading').style.display = 'none';
    
    // Mostra il container
    document.getElementById('featured-game-container').style.display = 'flex';
    
    // Prendi il gioco corrispondente all'indice
    const game = allGames[index];
    
    // Template HTML della card del gioco in evidenza
    const featuredCard = `
<div class="card featured-game-card" onclick="showGameDetails(${game.id})" style="cursor: pointer;">
    <img src="${game.bannerPath ? game.bannerPath : 'https://via.placeholder.com/500x450/51073a/ecf0f1?text=No+Image'}" 
         class="card-img-left" alt="${game.name}"
         onerror="this.src='https://via.placeholder.com/500x450/51073a/ecf0f1?text=Image+Error'">
    
    <div class="card-content-right">
        <div>
            <h3 class="card-title">${game.name}</h3>
            <p class="card-developer">${game.developer}</p>
            <span class="card-genre">${game.genre}</span>
            
            <p class="card-description">${game.description || 'Nessuna descrizione disponibile.'}</p>
        </div>
        
        <div class="card-price-section">
            <p class="card-rating">${game.price ? '€' + game.price.toFixed(2) : 'GRATIS'}</p>
        </div>
    </div>
    
    <!-- FRECCETTE DENTRO LA CARD -->
    <div class="carousel-arrows">
        <div class="carousel-arrow carousel-arrow-prev" onclick="event.stopPropagation(); prevFeaturedGame()">
            &#10094;
        </div>
        <div class="carousel-arrow carousel-arrow-next" onclick="event.stopPropagation(); nextFeaturedGame()">
            &#10095;
        </div>
    </div>
</div>
`;

    // Inserisci la card nel container
    document.getElementById('featured-game-container').innerHTML = featuredCard;
    // Aggiorna l'indice corrente
    currentFeaturedIndex = index;
    
    // Aggiorna il contatore giochi
    document.getElementById('current-game-number').textContent = index + 1;
    document.getElementById('total-games').textContent = allGames.length;
}

// Funzione per il gioco successivo
function nextFeaturedGame() {
    const nextIndex = (currentFeaturedIndex + 1) % allGames.length;
    showFeaturedGame(nextIndex);
}

// Funzione per il gioco precedente
function prevFeaturedGame() {
    const prevIndex = (currentFeaturedIndex - 1 + allGames.length) % allGames.length;
    showFeaturedGame(prevIndex);
}

// Funzione che chiama il database
async function loadGames() {
    try {
        const response = await fetch('http://localhost:8080/smoke/games/all');
        
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        // Salva i giochi caricati in allGames
        allGames = await response.json();
        
        if (allGames.length > 0) {
            showFeaturedGame(0); // Mostra il primo gioco
        } else {
            // Mostra un messaggio se non ci sono giochi
            document.getElementById('featured-loading').innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Nessun gioco disponibile.
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Errore nel caricamento dal database:', error);
        // Mostra messaggio di errore se la fetch fallisce
        document.getElementById('featured-loading').innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Impossibile caricare i giochi. Riprova più tardi.
            </div>
        `;
    }
}

// Avvia il caricamento quando la pagina è pronta
document.addEventListener('DOMContentLoaded', function() {
    // Nascondi inizialmente il container
    document.getElementById('featured-game-container').style.display = 'none';
    
    // Carica i giochi
    loadGames();
});

// Funzione per tornare al carosello
function tornaAlCarosello() {
    document.getElementById('search-results-section').style.display = 'none';
    document.getElementById('featured-game-container').style.display = 'flex';
}

// Variabile per memorizzare la categoria selezionata
let categoriaSelezionata = null;
// Variabile per memorizzare i giochi filtrati
let ultimiGiochiVisualizzati = [];

// Funzione per filtrare i giochi per categoria
function cercaCategoria(categoriaCercata) {
    // Se clicchi sulla stessa categoria, deseleziona/nascondi
    if (categoriaSelezionata === categoriaCercata) {
        nascondiGiochi();
        return;
    }
    
    // Aggiorna la categoria selezionata
    categoriaSelezionata = categoriaCercata;
    
    // Rimuovi la classe active da tutte le categorie
    const tutteLeCategorie = document.querySelectorAll('.categoria-item');
    tutteLeCategorie.forEach(cat => cat.classList.remove('active'));
    
    // Aggiungi la classe active alla categoria cliccata
    const categoriaCliccata = Array.from(tutteLeCategorie).find(cat => 
        cat.textContent.includes(categoriaCercata)
    );
    if (categoriaCliccata) {
        categoriaCliccata.classList.add('active');
    }
    
    // Se la categoria è TUTTE mostra tutti i giochi
    if (categoriaCercata === "TUTTE") {
        mostraTuttiIGiochi();
        return;
    }
    
    const categoriaCercataLower = categoriaCercata.toLowerCase();
    
    // Filtra i giochi in base alla categoria
    const giochiFiltrati = allGames.filter(game => {
        if (!game.genre) return false;
        
        // Dividi le categorie per virgola e pulisci gli spazi
        const categorieGioco = game.genre.split(',')
            .map(cat => cat.trim().toLowerCase());
        
        // Controlla se una delle categorie matcha
        return categorieGioco.some(categoria => 
            categoria === categoriaCercataLower
        );
    });
    
    // Salva i giochi visualizzati
    ultimiGiochiVisualizzati = giochiFiltrati;
    
    // Mostra i risultati filtrati
    mostraRisultatiRicerca(giochiFiltrati, `Categoria: ${categoriaCercata}`);
}

// Funzione per nascondere i giochi (deselezionare)
function nascondiGiochi() {
    categoriaSelezionata = null;
    
    // Rimuovi la classe active da tutte le categorie
    const tutteLeCategorie = document.querySelectorAll('.categoria-item');
    tutteLeCategorie.forEach(cat => cat.classList.remove('active'));
    
    // Nascondi la sezione risultati e mostra il carosello
    document.getElementById('search-results-section').style.display = 'none';
    document.getElementById('featured-game-container').style.display = 'block';
    
    // Svuota il container delle card
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    cardsContainer.style.display = 'none';
    
    // Mostra il messaggio di nessun gioco visibile
    document.getElementById('no-results-message').style.display = 'block';
    document.getElementById('no-results-message').innerHTML = `
        <i class="fas fa-info-circle me-2"></i>
        Nessuna categoria selezionata. Scegli una categoria per visualizzare i giochi.
    `;
}

// Funzione per mostrare i risultati della ricerca
function mostraRisultatiRicerca(giochi, titoloRicerca) {
    // Nascondi il carosello
    document.getElementById('featured-game-container').style.display = 'none';
    
    // Mostra la sezione risultati
    document.getElementById('search-results-section').style.display = 'block';
    
    // Imposta il titolo della ricerca
    document.getElementById('search-results-title').innerHTML = `<h2 class="text-contrast mb-4">${titoloRicerca}</h2>`;
    
    // Aggiungi pulsante deseleziona
    const deselezionaBtn = `<button class="btn btn-sm btn-outline-secondary ms-3" onclick="nascondiGiochi()">
        <i class="fas fa-times me-1"></i>
    </button>`;
    document.getElementById('search-results-title').innerHTML += deselezionaBtn;
    
    // Genera le card per i risultati
    const cardsContainer = document.getElementById('cards-container');
    
    if (giochi.length > 0) {
        // Nascondi il messaggio "nessun risultato"
        document.getElementById('no-results-message').style.display = 'none';
        
        // Genera le card dei giochi
        const gameCards = giochi
            .map((game) => {
                return `
<div class="col-md-4 mb-4">
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
        
        cardsContainer.innerHTML = gameCards;
        cardsContainer.style.display = 'flex';
    } else {
        // Mostra messaggio "nessun risultato"
        cardsContainer.style.display = 'none';
        document.getElementById('no-results-message').style.display = 'block';
        document.getElementById('no-results-message').innerHTML = `
            <i class="fas fa-info-circle me-2"></i>
            Nessun gioco trovato in questa categoria.
            <br><button class="btn btn-primary mt-3" onclick="nascondiGiochi()">
                <i class="fas fa-times me-1"></i>Nascondi
            </button>
        `;
    }
}

// Funzione per mostrare tutti i giochi (senza filtri)
function mostraTuttiIGiochi() {
    categoriaSelezionata = "TUTTE";
    ultimiGiochiVisualizzati = allGames;
    mostraRisultatiRicerca(allGames, "Tutti i giochi");
}