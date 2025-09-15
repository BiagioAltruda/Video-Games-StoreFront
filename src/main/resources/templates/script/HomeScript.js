
addEventListener("DOMContentLoaded", checkLoggedIn)

// Costanti
const baseUrl = 'http://localhost:8080/smoke';
const gamesUrl = `${baseUrl}/games`;
const placeholderImage = 'https://via.placeholder.com/500x450/51073a/ecf0f1?text=No+Image';
const errorImage = 'https://via.placeholder.com/500x450/51073a/ecf0f1?text=Image+Error';

// Variabili globali
let currentFeaturedIndex = 0;
let allGames = [];
let categoriaSelezionata = null;
let ultimiGiochiVisualizzati = [];


// Funzione per gestire gli errori delle immagini
function handleImageError(img) {
    img.src = errorImage;
}

// Funzione per formattare il prezzo
function formatPrice(price) {
    return price ? '€' + price.toFixed(2) : 'GRATIS';
}


// Funzioni per il carosello principale
function showFeaturedGame(index) {
    document.getElementById('featured-loading').style.display = 'none';
    document.getElementById('featured-game-container').style.display = 'flex';
    
    const game = allGames[index];
    const featuredCard = `
<div class="card featured-game-card" onclick="showGameDetails(${game.id})" style="cursor: pointer;">
    <img src="${game.bannerPath ? game.bannerPath : placeholderImage}" 
         class="card-img-left" alt="${game.name}"
         onerror="handleImageError(this)">
    
    <div class="card-content-right">
        <div>
            <h3 class="card-title">${game.name}</h3>
            <p class="card-developer">${game.developer}</p>
            <span class="card-genre">${game.genre}</span>
            
            <p class="card-description">${game.description || 'Nessuna descrizione disponibile.'}</p>
        </div>
        
        <div class="card-price-section">
            <p class="card-rating">${formatPrice(game.price)}</p>
        </div>
    </div>
    
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
    
  const curEl = document.getElementById('current-game-number');
const totEl = document.getElementById('total-games');
if (curEl && totEl) {
  curEl.textContent = index + 1;
  totEl.textContent = allGames.length;
}}

function nextFeaturedGame() {
    const nextIndex = (currentFeaturedIndex + 1) % allGames.length;
    showFeaturedGame(nextIndex);
}

function prevFeaturedGame() {
    const prevIndex = (currentFeaturedIndex - 1 + allGames.length) % allGames.length;
    showFeaturedGame(prevIndex);
}

// Funzioni per il caricamento dei giochi
async function loadGames() {
    try {
        const response = await fetch('http://localhost:8080/smoke/games/all');
        
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        allGames = await response.json();
        
        if (allGames.length > 0) {
            showFeaturedGame(0);
            // Popola le offerte speciali dopo un breve ritardo
            setTimeout(() => {
                populateSpecialOffers(allGames);
            }, 100);
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

// Funzioni per la navigazione
function tornaAlCarosello() {
    document.getElementById('search-results-section').style.display = 'none';
    document.getElementById('featured-game-container').style.display = 'flex';
}

function closeGameDetails() {
    tornaAlCarosello();
}

// Funzioni per il filtro per categoria
function cercaCategoria(categoriaCercata) {
    if (categoriaSelezionata === categoriaCercata) {
        nascondiGiochi();
        return;
    }
    
    categoriaSelezionata = categoriaCercata;
    
    const tutteLeCategorie = document.querySelectorAll('.categoria-item');
    tutteLeCategorie.forEach(cat => cat.classList.remove('active'));
    
    const categoriaCliccata = Array.from(tutteLeCategorie).find(cat => 
        cat.textContent.includes(categoriaCercata)
    );
    if (categoriaCliccata) {
        categoriaCliccata.classList.add('active');
    }
    
    if (categoriaCercata === "TUTTE") {
        mostraTuttiIGiochi();
        return;
    }
    
    const categoriaCercataLower = categoriaCercata.toLowerCase();
    
    const giochiFiltrati = allGames.filter(game => {
        if (!game.genre) return false;
        
        const categorieGioco = game.genre.split(',')
            .map(cat => cat.trim().toLowerCase());
        
        return categorieGioco.some(categoria => 
            categoria === categoriaCercataLower
        );
    });
    
    ultimiGiochiVisualizzati = giochiFiltrati;
    
    mostraRisultatiRicerca(giochiFiltrati, `Categoria: ${categoriaCercata}`);
}

function nascondiGiochi() {
    categoriaSelezionata = null;
    
    const tutteLeCategorie = document.querySelectorAll('.categoria-item');
    tutteLeCategorie.forEach(cat => cat.classList.remove('active'));
    
    document.getElementById('search-results-section').style.display = 'none';
    document.getElementById('featured-game-container').style.display = 'block';
    
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    cardsContainer.style.display = 'none';
    
    document.getElementById('no-results-message').style.display = 'block';
    document.getElementById('no-results-message').innerHTML = `
        <i class="fas fa-info-circle me-2"></i>
        Nessuna categoria selezionata. Scegli una categoria per visualizzare i giochi.
    `;
}

function mostraTuttiIGiochi() {
    categoriaSelezionata = "TUTTE";
    ultimiGiochiVisualizzati = allGames;
    mostraRisultatiRicerca(allGames, "Tutti i giochi");
}

// Funzioni per la visualizzazione dei risultati
function mostraRisultatiRicerca(giochi, titoloRicerca) {
    document.getElementById('featured-game-container').style.display = 'none';
    document.getElementById('search-results-section').style.display = 'block';
    
    document.getElementById('search-results-title').innerHTML = `<h2 class="text-contrast mb-4">${titoloRicerca}</h2>`;
    
    const deselezionaBtn = `<button class="btn btn-sm btn-outline-secondary ms-3" onclick="nascondiGiochi()">
        <i class="fas fa-times me-1"></i>
    </button>`;
    document.getElementById('search-results-title').innerHTML += deselezionaBtn;
    
    const cardsContainer = document.getElementById('cards-container');
    
    if (giochi.length > 0) {
        document.getElementById('no-results-message').style.display = 'none';
        
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

// Funzioni per i dettagli del gioco
function showGameDetails(gameId) {
  // 1) mostra l’area dei risultati e nascondi il featured
  const featured = document.getElementById('featured-game-container');
  const results  = document.getElementById('search-results-section');
  const cards    = document.getElementById('cards-container');
  const loader   = document.getElementById('featured-loading');

  if (loader)   loader.style.display = 'none';
  if (featured) featured.style.display = 'none';
  if (results)  results.style.display  = 'block';
  if (cards)    { 
    cards.style.display = 'block';
    // stato "loading" opzionale
    cards.innerHTML = `
      <div class="col-12 text-center py-4">
        <div class="spinner-border text-light" role="status"></div>
        <p class="text-white mt-3">Caricamento dettagli...</p>
      </div>`;
  }

  // 2) fetch del gioco
  const url = `http://localhost:8080/smoke/games/${gameId}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Gioco non trovato');
      return response.json();
    })
    .then((game) => {
      if (!cards) return;

      const img = game.bannerPath || 'https://via.placeholder.com/500x700/51073a/ecf0f1?text=No+Image';
      const priceTxt = (typeof game.price === 'number')
        ? '€' + game.price.toFixed(2)
        : 'Gratis';

      const gameDetails = `
        <div class="game-details-container">
          <div class="container mt-4">
            <div class="row">
              <div class="col-md-6">
                <img src="${img}" class="img-fluid rounded" alt="${game.name || ''}"
                     onerror="this.src='https://via.placeholder.com/500x700/51073a/ecf0f1?text=Image+Error'">
              </div>
              <div class="col-md-6">
                <h2 class="text-contrast">${game.name || 'Titolo non disponibile'}</h2>
                <p class="text-contrast"><strong>Sviluppatore:</strong> ${game.developer || 'N/D'}</p>
                <p class="text-contrast"><strong>Genere:</strong> ${game.genre || 'N/D'}</p>
                <p class="text-contrast"><strong>Prezzo:</strong> ${priceTxt}</p>
                <p class="text-contrast"><strong>Pegi:</strong> + ${game.rating || 'N/A'}</p>
                <p class="text-contrast"><strong>Data di rilascio:</strong> ${game.releaseDate || 'N/D'}</p>

                <div class="mt-4">
                  <h5 class="text-contrast">Descrizione</h5>
                  <p class="text-contrast">${game.description || 'Nessuna descrizione disponibile'}</p>
                </div>

                <div class="mt-4">
                 <button type="button" class="btn btn-primary me-2" id="buyBtn">
  <i class="fas fa-shopping-cart me-1"></i>Acquista
</button>
                  <button type="button" class="btn btn-secondary" onclick="closeGameDetails()">
                    <i class="fas fa-arrow-left me-1"></i>Torna indietro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      cards.innerHTML = gameDetails;
      const buyBtn = document.getElementById('buyBtn');
if (buyBtn) {
  buyBtn.addEventListener('click', () => goToPayment(game));
}
      // porta in vista (opzionale)
      cards.scrollIntoView({ behavior: 'smooth', block: 'start' });

    })
    .catch((error) => {
      console.error("Errore durante il recupero dei dettagli", error);
      if (!cards) return;
      cards.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-danger">
            <i class="fas fa-exclamation-circle me-2"></i>
            Errore nel caricamento dei dettagli: ${error.message}
          </div>
          <button type="button" class="btn btn-secondary" onclick="closeGameDetails()">
            Torna alla lista
          </button>
        </div>`;
      if (results) results.style.display = 'block';
    });
}

// Funzioni per le offerte speciali
function populateSpecialOffers(games) {
    const offersContainer = document.getElementById('special-offers-container');
    
    if (!offersContainer) {
        console.error("Container delle offerte speciali non trovato!");
        return;
    }
    
    // Seleziona casualmente 3 giochi dalla lista
    const randomGames = getRandomGamesWithDiscount(games, 3);
    
    if (randomGames.length === 0) {
        offersContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-light">Nessuna offerta speciale al momento</p>
            </div>
        `;
        return;
    }
    
    const offersHTML = randomGames.map(game => {
        const originalPrice = game.price || 29.99;
        const discountPercentage = Math.floor(Math.random() * 41) + 10; // Sconto tra 10% e 50%
        const discountedPrice = (originalPrice * (1 - discountPercentage/100)).toFixed(2);
        
        return `
        <div class="col-md-4 mb-4">
            <div class="card offer-card h-100" onclick="showGameDetails(${game.id})" style="cursor: pointer;">
                <div class="discount-badge">-${discountPercentage}%</div>
                <img src="${game.bannerPath ? game.bannerPath : 'https://via.placeholder.com/300x450/2c3e50/ecf0f1?text=No+Image'}" 
                     class="card-img-top" alt="${game.name}"
                     onerror="this.src='https://via.placeholder.com/300x450/2c3e50/ecf0f1?text=Image+Error'">
                
                <div class="card-body">
                    <h5 class="card-title text-white">${game.name}</h5>
                    <p class="card-text text-light">${game.genre}</p>
                    <div class="price-container">
                        <span class="original-price">€${originalPrice.toFixed(2)}</span>
                        <span class="discounted-price">€${discountedPrice}</span>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <small class="text-warning"><i class="fas fa-clock me-1"></i>Offerta limitata</small>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    offersContainer.innerHTML = offersHTML;
}

// Funzione per selezionare giochi casuali con sconto
function getRandomGamesWithDiscount(games, count) {
    if (!games || games.length === 0) return [];
    
    // Filtra giochi con prezzo (escludendo quelli gratuiti)
    const paidGames = games.filter(game => game.price && game.price > 0);
    
    if (paidGames.length === 0) return [];
    
    // Seleziona casualmente fino a 'count' giochi
    const shuffled = [...paidGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Funzione per aggiornare le offerte
function refreshOffers() {
    if (allGames && allGames.length > 0) {
        populateSpecialOffers(allGames);
    }
}

// Avvia il caricamento quando la pagina è pronta
document.addEventListener('DOMContentLoaded', function() {
    // Nascondi inizialmente il container
    document.getElementById('featured-game-container').style.display = 'none';
    
    // Carica i giochi
    loadGames();
});

async function goToPayment(game){
    if(!checkLoggedIn()){
        alert("Devi essere loggato prima di poter procede all'acquisto");
        return;
    }
    const playerId = await getPlayerId();
    const transactionData = JSON.stringify({
        "player": playerId,
        "game": game.id,
        "gameName": game.name,
        "pricePaid": game.price,
        "date" : new Date().toLocaleDateString('en-US')
    });
    localStorage.setItem("data", transactionData);
    window.location.assign("Payment.html")
}




async function getPlayerId() {
    let token = localStorage.getItem('X-Token');
    let options = {method : 'GET' , headers : {'X-Token': token}};
    try {
        const response = await fetch(`http://localhost:8080/smoke/accounts/profile`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const playerId = data.id;

        console.log(`The player ID is: ${playerId}`);
        return playerId; // You can now return the ID from the function
    } catch (err) {
        console.error("Failed to fetch player ID:", err);
        return null; // Or throw the error to the caller
    }
}
