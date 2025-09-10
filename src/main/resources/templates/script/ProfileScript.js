
(function () {                          // IIFE: funzione auto-eseguita per non “sporcare” lo scope globale
 "use strict";

  // Se apri come file:// usa localhost; se http/https usa path relativo
  const API = (location.protocol === 'http:' || location.protocol === 'https:') ? '' : 'http://localhost:8080';

  // <<< CAMBIA QUI IL TUO USER ID QUANDO SERVE >>>
  // In produzione lo ricavi dal login/sessione/token.
  const CURRENT_USER_ID = 1;

  // Elementi UI
  const form = document.getElementById('addFriendForm');      // prende il <form id="addFriendForm">
  const friendIdInput = document.getElementById('friendId');  // prende l’<input id="friendId"> con l’ID dell’amico
  const alerts = document.getElementById('friendAlerts');     // box dove mostrare messaggi (ok se non esiste: c’è fallback)
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null; // cache del bottone “Aggiungi”

  if (!form || !friendIdInput || !submitBtn) return; // se manca qualcosa, esco silenziosamente

  // Msg helper (usa alert() se manca il box)
  function showMsg(type, text) {                // type: success | danger | warning | info (stili Bootstrap)
    if (!alerts) { alert(text); return; }       // se non hai <div id="friendAlerts"> usa alert() del browser
    alerts.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>`;
  }

  // Abilita/disabilita bottone
  function updateSubmitState() {
    const fid = Number(friendIdInput.value);                // converte il valore in numero
    submitBtn.disabled = !(Number.isInteger(fid) && fid > 0); // abilita solo se intero positivo
  }

  friendIdInput.addEventListener('input', updateSubmitState); // ricalcola ad ogni digitazione
  updateSubmitState();                                        // stato iniziale

  // Submit → POST /api/friends  { player_1: CURRENT_USER_ID, player_2: friendId }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();                                       // evita il reload della pagina

    const friendId = Number(friendIdInput.value);             // legge e converte l’ID amico
    if (!Number.isInteger(friendId) || friendId <= 0) {       // validazione “base”
      showMsg('warning', 'Inserisci un FRIEND_ID valido (intero > 0).');
      return;
    }

    submitBtn.disabled = true;                                // evita doppi click durante la chiamata

    try {
      const payload = { firstPlayer: CURRENT_USER_ID,            // ⚠️ usa l’ID UTENTE CORRENTE (devi definirlo tu)
                        secondPlayer: friendId };

      const res = await fetch(`${API}/api/friends`, {         // ⚠️ usa la base URL/API (devi definirla tu)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },      // invio JSON
        body: JSON.stringify(payload)                         // corpo della richiesta
      });

      if (!res.ok) {                                          // errori non-2xx
        const txt = await res.text().catch(() => '');
        throw new Error(txt || `HTTP ${res.status}`);
      }

      showMsg('success', `Amico (ID ${friendId}) aggiunto con successo ✅`); // esito ok
      friendIdInput.value = '';                                              // pulisco input
      updateSubmitState();                                                   // ri-disabilita bottone se vuoto

    

    } catch (err) {
      showMsg('danger', 'Errore aggiunta amico: ' + err.message); // mostra errore
      console.error(err);
    } finally {
      submitBtn.disabled = false;                                  // ri-abilita bottone
    }
  });
})();                                                         
