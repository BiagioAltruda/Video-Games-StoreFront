// TrendingScript.js
(() => {
  const API_URL = 'http://localhost:8080/smoke/games/all';
  const trendingContainer = document.getElementById('trendingContainer');
  const allGamesContainer = document.getElementById('allGamesContainer');

  // Skeleton loader per le card (con titoli sopra)
  function showSkeletons(container, n = 3) {
    if (!container) return;
    const items = Array.from({ length: n }, (_, index) => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="top-title text-center mb-3">
          <h3 class="rank-title rank-${index + 1} placeholder col-6 mx-auto">Top ${index + 1}</h3>
        </div>
        <div class="card game-card h-100 placeholder-glow overflow-hidden">
          <div class="ratio ratio-16x9 bg-secondary placeholder"></div>
          <div class="card-overlay p-3">
            <h5 class="card-title placeholder col-8">&nbsp;</h5>
            <p class="placeholder col-6 mb-1">&nbsp;</p>
            <p class="placeholder col-4 mb-0">&nbsp;</p>
          </div>
          <div class="card-body">
            <p class="placeholder col-3 mb-0">&nbsp;</p>
          </div>
        </div>
      </div>
    `).join('');
    container.innerHTML = `<div class="row g-4">${items}</div>`;
  }

  // Skeleton loader per la lista (con numerazione)
  function showListSkeletons(container, n = 8) {
    if (!container) return;
    const items = Array.from({ length: n }, (_, i) => `
      <div class="list-game-item placeholder-glow mb-3 position-relative">
        <div class="position-absolute top-50 start-0 translate-middle-y list-rank">${i + 4}</div>
        <div class="row g-3 align-items-center ms-4">
          <div class="col-3 col-md-2">
            <div class="ratio ratio-16x9 bg-secondary placeholder rounded"></div>
          </div>
          <div class="col-9 col-md-7">
            <h6 class="card-title placeholder col-8 mb-1">&nbsp;</h6>
            <p class="card-developer placeholder col-6 mb-1">&nbsp;</p>
            <p class="card-genre placeholder col-4 mb-0">&nbsp;</p>
          </div>
          <div class="col-12 col-md-3 text-md-end">
            <p class="card-rating placeholder col-3 mb-0">&nbsp;</p>
          </div>
        </div>
        ${i < n - 1 ? '<hr class="my-3 ms-4">' : ''}
      </div>
    `).join('');
    container.innerHTML = items;
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickRandomUnique(items, n) {
    const copy = items.slice();
    shuffleInPlace(copy);
    return copy.slice(0, Math.min(n, copy.length));
  }

function cardHTML(game, rank) {
    const img = game.bannerPath && game.bannerPath.trim() !== ''
      ? game.bannerPath
      : 'https://via.placeholder.com/400x225/51073a/ecf0f1?text=No+Image';

    const price = (typeof game.price === 'number')
      ? `€${game.price.toFixed(2)}`
      : 'Gratis';

    const onClick = `onclick="typeof showGameDetails==='function' ? showGameDetails(${game.id}) : void(0)"`;

    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="top-title text-center mb-3">
          <h3 class="rank-title rank-${rank}">Top ${rank}</h3>
        </div>
        <div class="card game-card h-100 text-center overflow-hidden" style="cursor:pointer" ${onClick}>
          <h5 class="card-title-static">${game.name || 'Senza titolo'}</h5>
          <div class="ratio ratio-16x9">
            <img src="${img}" class="w-100 h-100 object-fit-cover"
                 alt="${game.name || 'Game'}"
                 onerror="this.src='https://via.placeholder.com/400x225/51073a/ecf0f1?text=Image+Error'">
          </div>
          <div class="card-overlay">
            <div class="card-overlay-content">
              <h5 class="card-title">${game.name || 'Senza titolo'}</h5>
              <p class="card-developer">${game.developer || 'Sviluppatore N/D'}</p>
              <p class="card-genre">${game.genre || 'Genere N/D'}</p>
              <p class="card-rating">${game.price ? '€' + game.price.toFixed(2) : 'Gratis'}</p>
            </div>
          </div>
          <div class="card-body">
            <p class="card-rating mb-0">${game.price ? '€' + game.price.toFixed(2) : 'Gratis'}</p>
          </div>
        </div>
      </div>
    `;
}

  function listItemHTML(game, rank) {
    const img = game.bannerPath && game.bannerPath.trim() !== ''
      ? game.bannerPath
      : 'https://via.placeholder.com/120x68/51073a/ecf0f1?text=No+Image';

    const price = (typeof game.price === 'number')
      ? `€${game.price.toFixed(2)}`
      : 'Gratis';

    const onClick = `onclick="typeof showGameDetails==='function' ? showGameDetails(${game.id}) : void(0)"`;

    return `
      <div class="list-game-item mb-3 position-relative" style="cursor:pointer" ${onClick}>
        <div class="position-absolute top-50 start-0 translate-middle-y list-rank">${rank}</div>
        <div class="row g-3 align-items-center ms-4">
          <div class="col-3 col-md-2">
            <div class="ratio ratio-16x9">
              <img src="${img}" class="w-100 h-100 object-fit-cover rounded"
                   alt="${game.name || 'Game'}"
                   onerror="this.src='https://via.placeholder.com/120x68/51073a/ecf0f1?text=Image+Error'">
            </div>
          </div>
          <div class="col-9 col-md-7">
            <h6 class="card-title mb-1">${game.name || 'Senza titolo'}</h6>
            <p class="card-developer mb-1 small text-muted">${game.developer || 'Sviluppatore N/D'}</p>
            <p class="card-genre small mb-0"><span class="genre-badge">${game.genre || 'Genere N/D'}</span></p>
          </div>
          <div class="col-12 col-md-3 text-md-end">
            <p class="card-rating mb-0 fw-bold">${game.price ? '€' + game.price.toFixed(2) : 'Gratis'}</p>
          </div>
        </div>
        <hr class="my-3 ms-4">
      </div>
    `;
  }

  function renderTrending(games) {
    if (!trendingContainer) return;
    if (!games.length) {
      trendingContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info text-center">
            <i class="fas fa-info-circle me-2"></i>
            Nessun gioco disponibile al momento.
          </div>
        </div>
      `;
      return;
    }
    const threeRandom = pickRandomUnique(games, 3);
    trendingContainer.innerHTML = threeRandom.map((game, index) => 
      cardHTML(game, index + 1)
    ).join('');
  }

  function renderAll(games) {
    if (!allGamesContainer) return;
    if (!games.length) {
      allGamesContainer.innerHTML = `
        <div class="alert alert-info text-center">
          <i class="fas fa-info-circle me-2"></i>
          Nessun altro gioco disponibile.
        </div>
      `;
      return;
    }
    
    // Filtra i giochi per escludere quelli già mostrati in trending
    const trendingGamesElements = trendingContainer.querySelectorAll('.card-title');
    const trendingGameNames = Array.from(trendingGamesElements).map(el => el.textContent.trim());
    
    const remainingGames = games.filter(game => 
      !trendingGameNames.includes(game.name || '')
    );
    
    if (remainingGames.length === 0) {
      allGamesContainer.innerHTML = `
        <div class="alert alert-info text-center">
          <i class="fas fa-info-circle me-2"></i>
          Non ci sono altri giochi oltre a quelli in trend.
        </div>
      `;
      return;
    }
    
    // Mescola i giochi rimanenti e assegna i rank (a partire da 4)
    const shuffledGames = shuffleInPlace(remainingGames.slice());
    allGamesContainer.innerHTML = shuffledGames.map((game, index) => 
      listItemHTML(game, index + 4)
    ).join('');
  }

  async function loadTrending() {
    try {
      showSkeletons(trendingContainer, 3);
      showListSkeletons(allGamesContainer, 6);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const games = await res.json();

      renderTrending(games);
      renderAll(games);
    } catch (err) {
      console.error('Errore caricamento trending:', err);
      if (trendingContainer) {
        trendingContainer.innerHTML = `
          <div class="col-12">
            <div class="alert alert-warning text-center">
              <i class="fas fa-exclamation-triangle me-2"></i>
              Impossibile caricare i giochi trend. Riprova più tardi.
            </div>
          </div>
        `;
      }
      if (allGamesContainer) {
        allGamesContainer.innerHTML = `
          <div class="alert alert-warning text-center">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Impossibile caricare la lista dei giochi.
          </div>
        `;
      }
    }
  }

  // Espongo un refresher manuale opzionale
  window.refreshTrending = loadTrending;

  document.addEventListener('DOMContentLoaded', loadTrending);
})();