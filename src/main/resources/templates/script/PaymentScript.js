// Utility per selezionare rapidamente un elemento
function $(selector) {
  return document.querySelector(selector);
}

// Mostra messaggi (puoi sostituire alert con div styled bootstrap)
function showAlert(type, message) {
  const resultDiv = $("#paymentResult"); // Seleziona il div dove mostrare il messaggio
  if (resultDiv) {
    resultDiv.textContent = message; // Inserisce il testo del messaggio
    resultDiv.className = ""; // reset classi CSS precedenti
    resultDiv.classList.add("alert", "alert-" + type, "mt-3"); // aggiunge classi Bootstrap
  } else {
    alert(message); // fallback con alert nativo se non trova il div
  }
}

// Funzione principale di pagamento
async function pay(gameId) {
  let btn = $("#payBtn"); // Seleziona il bottone di pagamento
  if (btn) btn.setAttribute("disabled", "disabled"); // Disabilita il bottone per evitare doppi click

  const game = await getGameData(); // Recupera dati del gioco
  try {
    // Costruzione DTO come atteso da TransactionDTO
    const dto = {
      transaction: {
        amount: parseFloat($("#tx-price")?.value || game.price), // Importo dal form o dal gioco
        date: new Date().toISOString().slice(0,19) // Data attuale senza "Z"
      },
      cardDetails: {
        cardholderName: $("#cardholderName").value, // Nome sulla carta
        cardNumber: $("#cardNumber").value,         // Numero carta
        expirationDate: $("#expirationDate").value, // Data scadenza
        cvv: $("#cvv").value                        // CVV
      }
    };

    let playerId = getPlayerId(); // Recupera ID del player

    // Invio della richiesta al backend
    let res = await fetch("http://localhost:8080/smoke/transactions/pay/" + playerId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto) // Serializza DTO in JSON
    });

    if (!res.ok) throw new Error("HTTP " + res.status); // Se la risposta non è OK lancia errore
    let msg = await res.text(); // Legge la risposta come testo
    showAlert("success", msg);  // Mostra messaggio di successo

    if ($("#tx-date")) $("#tx-date").textContent = new Date().toLocaleString(); // Aggiorna data transazione a schermo

  } catch (e) {
    console.error(e); // Log errore
    showAlert("danger", "❌ Errore di connessione o server non disponibile"); // Messaggio di errore
  } finally {
    if (btn) btn.removeAttribute("disabled"); // Riabilita il bottone
  }
}

// Inizializzazione quando la pagina è pronta
document.addEventListener("DOMContentLoaded", function () {
  const form = $("#paymentForm"); // Seleziona il form di pagamento
  if (!form) return; // Se non esiste, esce

  let txId = getTransactionId(); // Recupera ID transazione
  if (!txId) {
    showAlert("danger", "Manca l’ID della transazione."); // Mostra errore se manca
    return;
  }

  // Aggiungi hidden input se manca (con transactionId)
  if (!$('input[name="transactionId"]')) {
    let hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "transactionId";
    hidden.value = txId;
    form.appendChild(hidden);
  }

  // Dati placeholder (in futuro puoi popolarli da backend con GET)
  if ($("#tx-id")) $("#tx-id").textContent = txId;                   // Mostra ID transazione
  if ($("#tx-player")) $("#tx-player").textContent = "Player Name";  // Placeholder nome player
  if ($("#tx-game")) $("#tx-game").textContent = "Game Title";       // Placeholder titolo gioco
  if ($("#tx-price")) $("#tx-price").textContent = "49.99";          // Placeholder prezzo
  if ($("#tx-date")) $("#tx-date").textContent = new Date().toLocaleString(); // Data attuale

  // Intercetta il submit del form
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Previene il comportamento di default
    pay(txId); // Chiama la funzione di pagamento con id player
  });
});

// Funzione per recuperare dati del gioco (placeholder, non completa)
async function getGameData(id) {
  try {
    await fetch("smoke/games/" + id)
        .then(res => {
          return res.json() // Restituisce il JSON della risposta
        })
  }
  catch (e) {
    console.error(e); // Log errore se la fetch fallisce
  }
}