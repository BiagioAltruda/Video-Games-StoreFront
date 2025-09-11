// Utility per selezionare rapidamente un elemento
function $(selector) {
  return document.querySelector(selector);
}

// Mostra messaggi (puoi sostituire alert con div styled bootstrap)
function showAlert(type, message) {
  const resultDiv = $("#paymentResult");
  if (resultDiv) {
    resultDiv.textContent = message;
    resultDiv.className = ""; // reset classi
    resultDiv.classList.add("alert", "alert-" + type, "mt-3");
  } else {
    alert(message); // fallback
  }
}


// Funzione principale di pagamento
async function pay(gameId) {
  let btn = $("#payBtn");
  if (btn) btn.setAttribute("disabled", "disabled");

  const game = await getGameData();
  try {
    // Costruzione DTO come atteso da TransactionDTO
   const dto = {
  transaction: {
    amount: parseFloat($("#tx-price")?.value || game.price),
    date: new Date().toISOString().slice(0,19) // senza Z
  },
  cardDetails: {
    cardholderName: $("#cardholderName").value,
    cardNumber: $("#cardNumber").value,
    expirationDate: $("#expirationDate").value,
    cvv: $("#cvv").value
  }
};

let playerId = getPlayerId();

let res = await fetch("http://localhost:8080/smoke/transactions/pay/" + playerId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto)
});

    if (!res.ok) throw new Error("HTTP " + res.status);
    let msg = await res.text();
    showAlert("success", msg);

    if ($("#tx-date")) $("#tx-date").textContent = new Date().toLocaleString();

  } catch (e) {
    console.error(e);
    showAlert("danger", "❌ Errore di connessione o server non disponibile");
  } finally {
    if (btn) btn.removeAttribute("disabled");
  }
}

// Inizializzazione quando la pagina è pronta
document.addEventListener("DOMContentLoaded", function () {
  const form = $("#paymentForm");
  if (!form) return;

  let txId = getTransactionId();
  if (!txId) {
    showAlert("danger", "Manca l’ID della transazione.");
    return;
  }

  // Aggiungi hidden input se manca
  if (!$('input[name="transactionId"]')) {
    let hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "transactionId";
    hidden.value = txId;
    form.appendChild(hidden);
  }

  // Dati placeholder (in futuro puoi popolarli da backend con GET)
  if ($("#tx-id")) $("#tx-id").textContent = txId;
  if ($("#tx-player")) $("#tx-player").textContent = "Player Name";
  if ($("#tx-game")) $("#tx-game").textContent = "Game Title";
  if ($("#tx-price")) $("#tx-price").textContent = "49.99";
  if ($("#tx-date")) $("#tx-date").textContent = new Date().toLocaleString();

  // Intercetta il submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    pay(txId); // id player
  });
});

async function getGameData(id) {
  try {
    await fetch("smoke/games/" + id)
        .then(res => {
          return res.json()
        })
  }
  catch (e) {
    console.error(e);
  }
}