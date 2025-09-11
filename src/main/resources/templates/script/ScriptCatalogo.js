// Funzione principale che crea le card
function showAllGames(games) {
    // Crea l'HTML delle card mappando l'array dei giochi
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
        .join(""); // Unisce tutte le stringhe in un unico blocco HTML

    // Inserisce le card dentro il container
    const productContainer = document.getElementById('cards-container');
    productContainer.innerHTML = `<div class="row">${gameCards}</div>`;
}

// Funzione che chiama il TUO database
async function loadGames() {
    try {
        // Richiesta per ottenere tutti i giochi
        const response = await fetch('http://localhost:8080/smoke/games/all');
        
        // Se la risposta non è OK, lancia un errore
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        // Converte la risposta in JSON (array di giochi)
        const games = await response.json();
        // Mostra tutte le card
        showAllGames(games);
        
    } catch (error) {
        // In caso di errore, logga e mostra un messaggio all'utente
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
document.addEventListener('DOMContentLoaded', loadGames); // Al DOM pronto, carica i giochi

// Mostra i dettagli di un gioco quando si clicca sulla card
function showGameDetails(gameId) {
    // Costruisce l'URL per il dettaglio del gioco
    const url = `http://localhost:8080/smoke/games/${gameId}`;

    // Effettua la fetch dei dettagli del gioco
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Gioco non trovato'); // Errore se non ok
            }
            return response.json(); // Converte in JSON
        })
        .then((game) => {
        // Template HTML con i dettagli del gioco e form recensione
        const gameDetails = `
        <div class="game-details-container">
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
                
                <!-- Aggiunta della sezione recensioni -->
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="card game-details-container">
                            <div class="card-header bg-main">
                                <h5 class="mb-0">Aggiungi recensione</h5>
                            </div>
                            <div class="card-body">
                                <form id="reviewForm">
                                    <div class="mb-3">
                                        <label class="form-label">Valutazione</label>
                                        <select class="form-control" name="rating" id="reviewRating">
                                            <option value="👍">👍</option>
                                            <option value="👎">👎</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Titolo (opzionale)</label>
                                        <input type="text" class="form-control" name="title" placeholder="Titolo breve">
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Recensione</label>
                                        <textarea class="form-control" name="content" rows="4" placeholder="Scrivi la tua recensione..."></textarea>
                                    </div>

                                    <button type="submit" class="btn btn-primary" id="submitReviewBtn" disabled>Pubblica recensione</button>
                                </form>

                                <hr class="my-4">

                                <div id="reviewsList">
                                    <h5>Recensioni degli utenti</h5>
                                    <p class="text-muted">Ancora nessuna recensione. Sii il primo a recensire!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Sostituisce le card con i dettagli del gioco
        document.getElementById('cards-container').innerHTML = gameDetails;
        
        // Aggiungi gli event listener dopo che l'HTML è stato renderizzato
        setTimeout(() => {
            // Recupera il form recensione appena inserito
            const reviewForm = document.getElementById('reviewForm');
            const reviewTextarea = reviewForm.querySelector('textarea[name="content"]');
            const submitBtn = document.getElementById('submitReviewBtn');
            
            // Abilita il pulsante solo se c'è del testo nella recensione
            reviewTextarea.addEventListener('input', function() {
                submitBtn.disabled = this.value.trim().length === 0;
            });
            
            // Gestione dell'invio del form
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitReview(gameId); // Chiama la funzione di invio recensione
            });
        }, 100); // timeout per assicurare il DOM aggiornato
    })
    .catch((error) => {
        // Gestione errori nel recupero dettagli
        console.error("Errore durante il recupero dei dettagli", error);
        // Messaggio di errore + pulsante per tornare alla lista
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

// Funzione per inviare la recensione (da implementare)
function submitReview(gameId) {
    // Recupera il form e i suoi dati
    const form = document.getElementById('reviewForm');
    const formData = new FormData(form);
    
    // Qui dovresti implementare la logica per inviare la recensione al server
    console.log('Recensione per il gioco', gameId, ':', {
        rating: formData.get('rating'),
        title: formData.get('title'),
        content: formData.get('content')
    });
    
    // Esempio: mostra un messaggio di successo
    alert('Recensione inviata con successo!');
    form.reset(); // Resetta il form
    document.getElementById('submitReviewBtn').disabled = true; // Disabilita il bottone finché non c'è nuovo testo
}

// funzione per tornare alla lista giochi
function closeGameDetails() {
    loadGames(); // Richiama la funzione che carica tutti i giochi
}

// Variabile globale per memorizzare tutti i giochi
let allGames = [];
// Variabile per memorizzare la categoria selezionata
let categoriaSelezionata = null;

// Funzione per filtrare per categoria (adattata per il tuo HTML)
function cercaCategoria(categoriaCercata) {
    // Se clicchi sulla stessa categoria, deseleziona
    if (categoriaSelezionata === categoriaCercata) {
        deselezionaCategoria();
        return;
    }
    
    // Aggiorna la categoria selezionata
    categoriaSelezionata = categoriaCercata;
    
    // Rimuovi la classe active da tutte le categorie
    const tutteLeCategorie = document.querySelectorAll('.categoria-item');
    tutteLeCategorie.forEach(cat => cat.classList.remove('active'));
    
    // Aggiungi la classe active alla categoria cliccata (in base al testo)
    const categoriaCliccata = Array.from(tutteLeCategorie).find(cat => 
        cat.textContent.includes(categoriaCercata)
    );
    if (categoriaCliccata) {
        categoriaCliccata.classList.add('active');
    }
    
    // Se è stato selezionato "TUTTE LE CATEGORIE" mostra tutto
    if (categoriaCercata === "TUTTE LE CATEGORIE") {
        mostraTuttiIGiochi();
        return;
    }
    
    // Normalizza la categoria cercata
    const categoriaCercataLower = categoriaCercata.toLowerCase();
    
    // Filtra i giochi in base al genere
    const giochiFiltrati = allGames.filter(game => {
        if (!game.genre) return false;
        
        // Dividi le categorie per virgola e pulisci gli spazi
        const categorieGioco = game.genre.split(',')
            .map(cat => cat.trim().toLowerCase());
        
        // Controlla se una delle categorie combacia
        return categorieGioco.some(categoria => 
            categoria === categoriaCercataLower
        );
    });
    
    // Mostra i risultati della ricerca per categoria
    mostraRisultatiRicerca(giochiFiltrati, `Categoria: ${categoriaCercata}`);
}

// Funzione per deselezionare la categoria
function deselezionaCategoria() {
    categoriaSelezionata = null; // Reset selezione
    
    // Rimuovi la classe active da tutte le categorie
    const tutteLeCategorie = document.querySelectorAll('.categoria-item');
    tutteLeCategorie.forEach(cat => cat.classList.remove('active'));
    
    // Mostra tutti i giochi
    mostraTuttiIGiochi();
}

// Funzione per mostrare i risultati della ricerca (adattata)
function mostraRisultatiRicerca(giochi, titoloRicerca) {
    const cardsContainer = document.getElementById('cards-container'); // Container principale
    
    if (giochi.length > 0) {
        // Genera le card usando la tua funzione esistente showAllGames
        showAllGames(giochi);
        
        // Aggiungi il titolo della ricerca sopra le card
        cardsContainer.innerHTML = `
            <div class="row mb-4">
                <div class="col-12">
                    <h4 class="text-contrast">${titoloRicerca}</h4>
                    <p class="text-muted">Trovati ${giochi.length} giochi</p>
                    <button class="btn btn-sm btn-outline-secondary" onclick="deselezionaCategoria()">
                        <i class="fas fa-times me-1"></i>Deseleziona filtro
                    </button>
                </div>
            </div>
            ${cardsContainer.innerHTML}
        `;
        
    } else {
        // Mostra messaggio "nessun risultato"
        cardsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    Nessun gioco trovato nella categoria "${titoloRicerca.replace('Categoria: ', '')}"
                </div>
                <button class="btn btn-primary" onclick="deselezionaCategoria()">
                    <i class="fas fa-arrow-left me-1"></i>Vedi tutti i giochi
                </button>
            </div>
        `;
    }
}

// Funzione per mostrare tutti i giochi (adattata)
function mostraTuttiIGiochi() {
    // Mostra tutte le card a partire dall'array globale
    showAllGames(allGames);
    
    // Rimuovi eventuali titoli di ricerca precedenti
    const cardsContainer = document.getElementById('cards-container');
    const existingTitle = cardsContainer.querySelector('.row.mb-4');
    if (existingTitle) {
        existingTitle.remove();
    }
}

// Modifica la funzione loadGames per salvare i giochi nella variabile globale
async function loadGames() {
    try {
        // Fetch verso il backend per tutti i giochi
        const response = await fetch('http://localhost:8080/smoke/games/all');
        
        // Se non ok, lancia errore
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        // Converte a JSON
        const games = await response.json();
        allGames = games; // Salva nella variabile globale
        showAllGames(games); // Mostra le card
        
    } catch (error) {
        // Gestione errore caricamento
        console.error('Errore nel caricamento dal database:', error);
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

// Aggiungi anche la funzione per la ricerca per nome dal menu laterale
function setupSearchForm() {
    const searchForm = document.querySelector('.search-form'); // Seleziona il form di ricerca
    if (searchForm) {
        // Intercetta il submit e avvia la ricerca
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]'); // Campo di input testo
            cercaPerNome(searchInput.value.trim()); // Chiama la ricerca per nome
        });
    }
}

// Funzione per cercare per nome
function cercaPerNome(nomeCercato) {
    // Se input vuoto, mostra tutti i giochi
    if (!nomeCercato) {
        mostraTuttiIGiochi();
        return;
    }
    
    // Deseleziona eventuali categorie selezionate
    deselezionaCategoria();
    
    // Normalizza il testo cercato
    const nomeCercatoLower = nomeCercato.toLowerCase();
    
    // Filtra i giochi il cui nome include il testo cercato
    const giochiFiltrati = allGames.filter(game => {
        return game.name && game.name.toLowerCase().includes(nomeCercatoLower);
    });
    
    // Mostra i risultati per nome
    mostraRisultatiRicerca(giochiFiltrati, `Risultati per: "${nomeCercato}"`);
}

// Inizializza i form di ricerca quando la pagina è carica
document.addEventListener('DOMContentLoaded', function() {
    loadGames(); // Carica la lista giochi all'avvio
    setTimeout(setupSearchForm, 100); // Aspetta un attimo e poi configura il form di ricerca
});