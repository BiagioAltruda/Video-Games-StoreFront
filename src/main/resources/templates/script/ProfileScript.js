(function () {                     // IIFE = funzione auto-eseguita: isola le variabili dallo scope globale
  "use strict";                    // Modalità rigorosa: aiuta a evitare errori silenziosi

  // Se la pagina è servita via http/https uso path relativo.
  // Se la apri come file:// (doppio click su file) allora punta all'API in localhost:8080
  const API = (location.protocol === 'http:' || location.protocol === 'https:')
              ? ''                                                     // In contesto http/https usa path relativo
              : 'http://localhost:8080';                               // In file:// usa host esplicito per le API

  // ---- RIFERIMENTI AGLI ELEMENTI DELLA UI ----
  const form      = document.getElementById('addFriendForm');     // <form> di "aggiungi amico"
  const myIdEl    = document.getElementById('myUserId');          // <input type="hidden" id="myUserId" value="...">
  const friendEl  = document.getElementById('friendId');          // <input id="friendId"> (ID dell'amico da aggiungere)
  const alertsBox = document.getElementById('friendAlerts');      // <div id="friendAlerts"> dove mostrare messaggi
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null; // bottone submit del form

  // Se manca qualche elemento fondamentale non faccio nulla e esco
  if (!form || !myIdEl || !friendEl || !submitBtn) return;        // Early return se elementi essenziali non ci sono

  // ---- FUNZIONE DI MESSAGGISTICA (bootstrap alert) ----
  // type: 'success' | 'danger' | 'warning' | 'info'
  // Se non esiste il box, ripiega su alert() del browser.
  function showMsg(type, text) {
    if (!alertsBox) { alert(text); return; }                       // Fallback su alert nativo
    alertsBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>`;                                                     // Inserisce markup Bootstrap alert
  }

  // ---- ABILITA/DISABILITA IL BOTTONE IN BASE ALL'INPUT ----
  function updateBtnState() {
    const fid = Number(friendEl.value);                               // converto il valore a numero
    submitBtn.disabled = !(Number.isInteger(fid) && fid > 0);         // attivo solo se è intero positivo
  }
  friendEl.addEventListener('input', updateBtnState);                 // ricalcola quando digiti
  updateBtnState();                                                   // stato iniziale corretto

  // ---- HANDLER SUBMIT: invia POST /api/friends con JSON { player_1, player_2 } ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();                                               // evita il refresh pagina

    const myId     = Number(myIdEl.value);                            // ID dell'utente corrente (hidden)
    const friendId = Number(friendEl.value);                          // ID dell'amico inserito

    // Validazioni base
    if (!Number.isInteger(myId) || myId <= 0) {
      showMsg('warning', 'Manca il tuo ID utente. (myUserId)');       // Avvisa se manca il tuo ID
      return;
    }
    if (!Number.isInteger(friendId) || friendId <= 0) {
      showMsg('warning', 'Inserisci un FRIEND_ID valido (intero > 0).'); // Avvisa se friendId non valido
      return;
    }

    submitBtn.disabled = true;                                        // previene doppi click

    try {
      // Corpo della richiesta: deve combaciare con la tua entity Friends (player_1, player_2)
      const payload = { player_1: myId, player_2: friendId };         // DTO verso backend

      // Chiamata al backend
      const res = await fetch(`${API}/smoke/friends`, {
        method: 'POST',                                               // Metodo POST
        headers: { 'Content-Type': 'application/json' },              // invio JSON
        body: JSON.stringify(payload)                                 // Serializzazione
      });

      // Se non è 2xx mostro l'errore restituito (se c'è), oppure un generico HTTP <status>
      if (!res.ok) {
        const txt = await res.text().catch(() => '');                 // fallback se non c'è body
        throw new Error(txt || `HTTP ${res.status}`);                 // Alza errore con dettaglio
      }

      // Successo: messaggio, pulizia input e reset stato bottone
      showMsg('success', `Amico (ID ${friendId}) aggiunto con successo ✅`); // Notifica successo
      friendEl.value = '';                                            // Svuota input
      updateBtnState();                                               // Aggiorna stato bottone

      // Qui potrai in futuro ricaricare la lista amici (GET) e aggiornare la UI.

    } catch (err) {
      // Qualsiasi errore (rete/server/validazione back) viene mostrato qui
      showMsg('danger', 'Errore aggiunta amico: ' + err.message);     // Notifica errore
      console.error(err);                                             // Log per debug
    } finally {
      submitBtn.disabled = false;                                     // riabilita il bottone
    }
  });
})();                                                                 // Chiude IIFE ed esegue subito

// Al caricamento del DOM mostra un saluto se c'è il nome nel localStorage
document.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('playerName');                    // Legge playerName salvato
  if (name) {
    const authBox = document.getElementById('authOut');               // Box per messaggi di autenticazione
    if (authBox) {
      authBox.textContent = 'Bentornato, ' + name;                    // Messaggio di benvenuto
    }
  }
});