
// TrendingScript.js
(() => {
  const API_URL = 'http://localhost:8080/smoke/games/all';
  const trendingContainer = document.getElementById('trendingContainer');
  const allGamesContainer = document.getElementById('allGamesContainer');

  // Skeleton loader semplice
  function showSkeletons(container, n = 5) {
    if (!container) return;
    const items = Array.from({ length: n }, () => `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
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

  function cardHTML(game) {
    const img = game.bannerPath && game.bannerPath.trim() !== ''
      ? game.bannerPath
      : 'https://via.placeholder.com/400x225/51073a/ecf0f1?text=No+Image';

    const price = (typeof game.price === 'number')
      ? `€${game.price.toFixed(2)}`
      : 'Gratis';

    // Usa la tua showGameDetails se presente
    const onClick = `onclick="typeof showGameDetails==='function' ? showGameDetails(${game.id}) : void(0)"`;

    return `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card game-card h-100 text-center overflow-hidden" style="cursor:pointer" ${onClick}>
          <div class="ratio ratio-16x9">
            <img src="${img}" class="w-100 h-100 object-fit-cover"
                 alt="${game.name || 'Game'}"
                 onerror="this.src='https://via.placeholder.com/400x225/51073a/ecf0f1?text=Image+Error'">
          </div>
          <div class="card-overlay p-3">
            <h5 class="card-title mb-1">${game.name || 'Senza titolo'}</h5>
            <p class="card-developer mb-1">${game.developer || 'Sviluppatore N/D'}</p>
            <p class="card-genre small mb-0">${game.genre || 'Genere N/D'}</p>
          </div>
          <div class="card-body">
            <p class="card-rating mb-0">${price}</p>
          </div>
        </div>
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
    const five = pickRandomUnique(games, 5);
    trendingContainer.innerHTML = five.map(cardHTML).join('');
  }

  function renderAll(games) {
    if (!allGamesContainer) return;
    if (!games.length) {
      allGamesContainer.innerHTML = '';
      return;
    }
    const mixed = shuffleInPlace(games.slice());
    allGamesContainer.innerHTML = mixed.map(cardHTML).join('');
  }

  async function loadTrending() {
    try {
      showSkeletons(trendingContainer, 5);
      showSkeletons(allGamesContainer, 8);

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
      if (allGamesContainer) allGamesContainer.innerHTML = '';
    }
  }

  // Espongo un refresher manuale opzionale
  window.refreshTrending = loadTrending;

  document.addEventListener('DOMContentLoaded', loadTrending);
})();