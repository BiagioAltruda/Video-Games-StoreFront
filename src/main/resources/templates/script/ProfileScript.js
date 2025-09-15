// Refactored getProfile to correctly return JSON
async function getProfile() {
  const response = await fetch('http://localhost:8080/smoke/accounts/profile', {
    method: 'GET',
    headers: {'X-Token': localStorage.getItem('X-Token')},
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }
  return await response.json();
}

// showProfile is now simpler and correctly uses the awaited data
async function showProfile() {
  try {
    const playerData = await getProfile();
    console.log(playerData);
    document.getElementById('profile-welcome').innerHTML = `
      <div class="container my-4">
        <div class="d-flex align-items-center gap-3 mb-4 text-contrast">
          <div>
            <h4 class="mb-0 context-aware-text" id="profileUsername">${playerData.name}</h4>
            <small class="text-muted" id="profileEmail">${playerData.name}@example.com</small>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error showing profile:", error);
  }
}
async function showGames() {
  document.getElementById('tab-games').innerHTML = `
    <div class="card game-details-container">
      <div class="card-header bg-main">
        <h5 class="mb-0">La tua libreria</h5>
      </div>
      <div class="card-body text-contrast">
        <div id="gamesEmpty" class="text-center mb-3" style="display: none">
          <p class="mb-2">Nessun gioco in libreria.</p>
          <a href="../pages/Catalogo.html" class="btn btn-primary">Vai al catalogo</a>
        </div>
        <div class="row g-3" id="gamesList" style="display: block"></div>
      </div>
    </div>`;

  try {
    // Call getProfile just once and get the ID from the result
    const profileData = await getProfile();
    const playerId = profileData.id;

    const response = await fetch(`http://localhost:8080/smoke/transactions/player/${playerId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    const games = await response.json();

    const gamesEmpty = document.getElementById('gamesEmpty');
    const gamesList = document.getElementById('gamesList');

    if (games.length === 0) {
      gamesEmpty.style.display = 'block';
      gamesList.style.display = 'none';
    } else {
      gamesEmpty.style.display = 'none';
      gamesList.style.display = 'flex-block';
      gamesList.innerHTML = ''; // Clear the list before adding items
      for (const game of games) {
        gamesList.innerHTML += `
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
      }
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    document.getElementById('gamesEmpty').style.display = 'block';
    document.getElementById('gamesList').style.display = 'none';
  }
}

async function showFriends() {
  try {
    const playerData = await getProfile();
    const playerId = playerData.id;
    const response = await fetch(`http://localhost:8080/smoke/friends/friend-list/${playerId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch friends: ${response.statusText}`);
    }

    const friendsList = await response.json(); // Renamed to avoid confusion
    const tableBody = document.getElementById('players-table');

    // Clear the table before adding new rows to prevent duplicates on re-render
    tableBody.innerHTML = '';

    for (const f of friendsList) {
      const friendResponse = await fetch(`http://localhost:8080/smoke/player/${f.secondPlayer}`);

      if (!friendResponse.ok) {
        throw new Error(`Failed to fetch details for player ID ${f.secondPlayer}: ${friendResponse.statusText}`);
      }

      const friend = await friendResponse.json(); // Correctly get the JSON data

      tableBody.innerHTML += `
        <tr>
          <td>${friend.id}</td>
          <td>${friend.name}</td>
          <td><span class="badge bg-primary">Livello ${friend.playerLevel}</span></td>
          <td>${new Date(friend.creationDate).toLocaleDateString()}</td>
        </tr>
      `;
    }
  } catch (error) {
    console.error("Error fetching friends:", error);
    // Optional: Add a row to the table to indicate an error
    document.getElementById('players-table').innerHTML = `<tr><td colspan="4" class="text-danger text-center">Failed to load friends.</td></tr>`;
  }
}

async function addFriend () {
  try{
    const playerData = await getProfile();
    const playerId = playerData.id;
    const newFriend = parseInt(document.getElementById('friendId').value);
    const response = await fetch(`http://localhost:8080/smoke/friends`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstPlayer : playerId,
        secondPlayer : newFriend,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to add friend: ${response.statusText}`);
    }

  }
  catch (error) {
    console.error("Error adding friend:", error);
  }
}

/*

 */

// (function () {                     // IIFE = funzione auto-eseguita: isola le variabili dallo scope globale
//   "use strict";                    // Modalità rigorosa: aiuta a evitare errori silenziosi
//
//   // Se la pagina è servita via http/https uso path relativo.
//   // Se la apri come file:// (doppio click su file) allora punta all'API in localhost:8080
//   const API = (location.protocol === 'http:' || location.protocol === 'https:')
//               ? ''                                                     // In contesto http/https usa path relativo
//               : 'http://localhost:8080';                               // In file:// usa host esplicito per le API
//
//   // ---- RIFERIMENTI AGLI ELEMENTI DELLA UI ----
//   const form      = document.getElementById('addFriendForm');     // <form> di "aggiungi amico"
//   const myIdEl    = document.getElementById('myUserId');          // <input type="hidden" id="myUserId" value="...">
//   const friendEl  = document.getElementById('friendId');          // <input id="friendId"> (ID dell'amico da aggiungere)
//   const alertsBox = document.getElementById('friendAlerts');      // <div id="friendAlerts"> dove mostrare messaggi
//   const submitBtn = form ? form.querySelector('button[type="submit"]') : null; // bottone submit del form
//
//   // Se manca qualche elemento fondamentale non faccio nulla e esco
//   if (!form || !myIdEl || !friendEl || !submitBtn) return;        // Early return se elementi essenziali non ci sono
//
//   // ---- FUNZIONE DI MESSAGGISTICA (bootstrap alert) ----
//   // type: 'success' | 'danger' | 'warning' | 'info'
//   // Se non esiste il box, ripiega su alert() del browser.
//   function showMsg(type, text) {
//     if (!alertsBox) { alert(text); return; }                       // Fallback su alert nativo
//     alertsBox.innerHTML = `
//       <div class="alert alert-${type} alert-dismissible fade show" role="alert">
//         ${text}
//         <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
//       </div>`;                                                     // Inserisce markup Bootstrap alert
//   }
//
//   // ---- ABILITA/DISABILITA IL BOTTONE IN BASE ALL'INPUT ----
//   function updateBtnState() {
//     const fid = Number(friendEl.value);                               // converto il valore a numero
//     submitBtn.disabled = !(Number.isInteger(fid) && fid > 0);         // attivo solo se è intero positivo
//   }
//   friendEl.addEventListener('input', updateBtnState);                 // ricalcola quando digiti
//   updateBtnState();                                                   // stato iniziale corretto
//
//   // ---- HANDLER SUBMIT: invia POST /api/friends con JSON { player_1, player_2 } ----
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();                                               // evita il refresh pagina
//
//     const myId     = Number(myIdEl.value);                            // ID dell'utente corrente (hidden)
//     const friendId = Number(friendEl.value);                          // ID dell'amico inserito
//
//     // Validazioni base
//     if (!Number.isInteger(myId) || myId <= 0) {
//       showMsg('warning', 'Manca il tuo ID utente. (myUserId)');       // Avvisa se manca il tuo ID
//       return;
//     }
//     if (!Number.isInteger(friendId) || friendId <= 0) {
//       showMsg('warning', 'Inserisci un FRIEND_ID valido (intero > 0).'); // Avvisa se friendId non valido
//       return;
//     }
//
//     submitBtn.disabled = true;                                        // previene doppi click
//
//     try {
//       // Corpo della richiesta: deve combaciare con la tua entity Friends (player_1, player_2)
//       const payload = { player_1: myId, player_2: friendId };         // DTO verso backend
//
//       // Chiamata al backend
//       const res = await fetch(`${API}/smoke/friends`, {
//         method: 'POST',                                               // Metodo POST
//         headers: { 'Content-Type': 'application/json' },              // invio JSON
//         body: JSON.stringify(payload)                                 // Serializzazione
//       });
//
//       // Se non è 2xx mostro l'errore restituito (se c'è), oppure un generico HTTP <status>
//       if (!res.ok) {
//         const txt = await res.text().catch(() => '');                 // fallback se non c'è body
//         throw new Error(txt || `HTTP ${res.status}`);                 // Alza errore con dettaglio
//       }
//
//       // Successo: messaggio, pulizia input e reset stato bottone
//       showMsg('success', `Amico (ID ${friendId}) aggiunto con successo ✅`); // Notifica successo
//       friendEl.value = '';                                            // Svuota input
//       updateBtnState();                                               // Aggiorna stato bottone
//
//       // Qui potrai in futuro ricaricare la lista amici (GET) e aggiornare la UI.
//
//     } catch (err) {
//       // Qualsiasi errore (rete/server/validazione back) viene mostrato qui
//       showMsg('danger', 'Errore aggiunta amico: ' + err.message);     // Notifica errore
//       console.error(err);                                             // Log per debug
//     } finally {
//       submitBtn.disabled = false;                                     // riabilita il bottone
//     }
//   });
// })();                                   // Chiude IIFE ed esegue subito
//
// // Al caricamento del DOM mostra un saluto se c'è il nome nel localStorage
// document.addEventListener('DOMContentLoaded', () => {
//   const name = localStorage.getItem('playerName');                    // Legge playerName salvato
//   if (name) {
//     const authBox = document.getElementById('authOut');               // Box per messaggi di autenticazione
//     if (authBox) {
//       authBox.textContent = 'Bentornato, ' + name;                    // Messaggio di benvenuto
//     }
//   }
// });