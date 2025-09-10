  //Creazione della costante per il fetch della pagina
  const baseUrl = 'http://localhost:8080/smoke/accounts';


// Effettua il login e salva il token in localStorage
function login() {
    // Recupera il valore inserito nel campo di input con id 'user'
    const u = document.getElementById('user').value;
    
    // Recupera il valore inserito nel campo di input con id 'pass'
    const p = document.getElementById('pass').value;

    // Usa FormData invece di JSON
    // Crea un nuovo oggetto FormData per inviare i dati come form-urlencoded
    const formData = new FormData();
    
    // Aggiunge il campo 'username' e 'password' con i valori recuperati dall'input
    formData.append('username', u);
    formData.append('password', p);

    // Esegue una richiesta HTTP POST all'endpoint di login
    fetch(`${baseUrl}/login`, {
        method: 'POST', 
        body: formData // Imposta il body con i dati del form
    })
    // Gestisce la risposta del server
    .then(response => {
        if (response.status === 200) {
            // Converte la risposta in formato JSON e la restituisce
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    // Gestisce i dati JSON ricevuti dal server
    .then(player => {
        // Salva il token per le richieste successive
        localStorage.setItem('token', player.token);
        
        // Aggiorna l'interfaccia utente per mostrare un messaggio di successo
        document.getElementById('authOut').textContent = 'Login OK. Token salvato.';
    })
    // Gestisce eventuali errori che si verificano durante il processo
    .catch(error => {
        // Aggiorna l'interfaccia utente per mostrare un messaggio di errore
        document.getElementById('authOut').textContent = 'Login fallito';
    });
}

// Funzione per la registrazione di un nuovo account
function register() {
    // Recupera i valori dai campi del form di registrazione
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validazione base
    if (password !== confirmPassword) {
        alert('Le password non coincidono!');
        return;
    }

    if (password.length < 4) {
        alert('La password deve essere di almeno 4 caratteri!');
        return;
    }

    // Prepara i dati per la richiesta
    const formData = new FormData();
    formData.append('name', username);
    formData.append('password', password);

    // Esegue la richiesta HTTP POST all'endpoint di registrazione
    fetch(`${baseUrl}/register`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.status === 200) {
            return response.text();
        } else {
            throw new Error('Errore durante la registrazione');
        }
    })
    .then(message => {
        // Mostra il messaggio di successo o errore
        alert(message);
        
        // Se la registrazione è avvenuta con successo, chiudi il modale
        if (message === 'Account created successfully') {
            // Chiudi il modale di registrazione
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();
            
            // Pulisci i campi del form
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            
            // Opzionale: apri automaticamente il login
            // const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            // loginModal.show();
        }
    })
    .catch(error => {
        alert('Si è verificato un errore durante la registrazione: ' + error.message);
    });
}

let currentFeaturedIndex = 0;
let allGames = [];

function showFeaturedGame(index) {
    // Nascondi il placeholder di caricamento
    document.getElementById('featured-loading').style.display = 'none';
    
    // Mostra il container
    document.getElementById('featured-game-container').style.display = 'flex';
    
    const game = allGames[index];
    
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

    document.getElementById('featured-game-container').innerHTML = featuredCard;
    currentFeaturedIndex = index;
    
    // Aggiorna il contatore
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
        
        allGames = await response.json();
        
        if (allGames.length > 0) {
            showFeaturedGame(0); // Mostra il primo gioco
        } else {
            document.getElementById('featured-loading').innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Nessun gioco disponibile.
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Errore nel caricamento dal database:', error);
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

// Funzione per filtrare i giochi per categoria
function cercaCategoria(categoriaCercata) {
    if (categoriaCercata === "TUTTE") {
        mostraTuttiIGiochi();
        return;
    }
    
    const categoriaCercataLower = categoriaCercata.toLowerCase();
    
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
    
    mostraRisultatiRicerca(giochiFiltrati, `Categoria: ${categoriaCercata}`);
}

// Funzione per mostrare i risultati della ricerca
function mostraRisultatiRicerca(giochi, titoloRicerca) {
    // Nascondi il carosello
    document.getElementById('featured-game-container').style.display = 'none';
    
    // Mostra la sezione risultati
    document.getElementById('search-results-section').style.display = 'block';
    
    // Imposta il titolo della ricerca
    document.getElementById('search-results-title').textContent = titoloRicerca;
    
    // Genera le card per i risultati
    const cardsContainer = document.getElementById('cards-container');
    
    if (giochi.length > 0) {
        // Nascondi il messaggio "nessun risultato"
        document.getElementById('no-results-message').style.display = 'none';
        
        // Genera le card
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
    }
}

// Funzione per tornare al carosello
function tornaAlCarosello() {
    document.getElementById('search-results-section').style.display = 'none';
    document.getElementById('featured-game-container').style.display = 'flex';
}

// Funzione per mostrare tutti i giochi (senza filtri)
function mostraTuttiIGiochi() {
    mostraRisultatiRicerca(allGames, "Tutti i giochi");
}