
      const apiUrl = "http://localhost:8080/smoke/trending";

      async function loadTrending() {
        try {
          const res = await fetch(apiUrl + "/all");
          const trends = await res.json();

          const trendingContainer = document.getElementById("trendingContainer");
          const allGamesContainer = document.getElementById("allGamesContainer");

          trendingContainer.innerHTML = "";
          allGamesContainer.innerHTML = "";

          if (trends.length === 0) {
            trendingContainer.innerHTML = '<p class="loading-text">😢 Nessun trend disponibile</p>';
            return;
          }

          trends.forEach(t => {
            // Sezione Trending Games (prime 6 card)
            if (trendingContainer.children.length < 6) {
              const col = document.createElement("div");
              col.className = "col-md-4 mb-4";
              col.innerHTML = `
                <div class="card game-card">
                  <img src="${t.game?.imageUrl || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${t.game?.name}">
                  <div class="card-overlay">
                    <h5 class="card-title">${t.game?.name || "Senza nome"}</h5>
                    <p class="mb-1"><i class="fas fa-tags me-1"></i>${t.category?.name || "N/D"}</p>
                    <p class="small mb-0"><i class="fas fa-calendar-alt me-1"></i>${t.period || "---"}</p>
                  </div>
                </div>`;
              trendingContainer.appendChild(col);
            }

            // Sezione Tutti i Giochi Trend
            const colAll = document.createElement("div");
            colAll.className = "col-md-3 mb-4";
            colAll.innerHTML = `
              <div class="card game-card h-100">
                <img src="${t.game?.imageUrl || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${t.game?.name}">
                <div class="card-overlay">
                  <h6 class="card-title">${t.game?.name || "Senza nome"}</h6>
                  <p class="small mb-1"><i class="fas fa-tags me-1"></i>${t.category?.name || "N/D"}</p>
                  <p class="small"><i class="fas fa-calendar-alt me-1"></i>${t.period || "---"}</p>
                </div>
              </div>`;
            allGamesContainer.appendChild(colAll);
          });
        } catch (e) {
          console.error("Errore caricamento trending:", e);
        }
      }

      document.addEventListener("DOMContentLoaded", loadTrending);
   
