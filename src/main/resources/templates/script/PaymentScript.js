document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const holder = document.getElementById("cardHolderName").value;

    // Simulazione pagamento
    fetch("/api/payment/fake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cardNumber: cardNumber,
            holder: holder,
            amount: 49.99 // esempio prezzo fisso
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("paymentResult").innerText = 
            data.success ? "Pagamento avvenuto con successo ✅" : "Pagamento fallito ❌";
    })
    .catch(err => console.error(err));
});
(function () {
  "use strict";

  // ---- util ----
  function $(sel, root){ return (root||document).querySelector(sel); }
  function showAlert(type, text) {
    let wrap = $('#alerts');
    if (!wrap) { alert(text); return; }
    wrap.innerHTML =
      '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert">'
      + text +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
      '</div>';
  }

  // Usa http://localhost:8080 se la pagina è file://, altrimenti path relativo
  let IS_HTTP = (location.protocol === 'http:' || location.protocol === 'https:');
  let BASE = IS_HTTP ? '' : 'http://localhost:8080';

  async function pay(id) {
    //disable button after pressing it
    let btn = $('#payBtn') || $('#paymentForm button[type="submit"]');
    if (btn) btn.setAttribute('disabled', 'disabled');

    try {
      //get payment data from the form
      const paymentDetails = document.getElementById('paymentForm');
      paymentDetails.addEventListener('submit', async function(event) {
        event.preventDefault();

        const transaction = document.getElementById('transactionDetails');

        const transactionDetails = new FormData(transaction);

        const playerName =document.getElementById('tx-player').value;
        const gameName = document.getElementById('tx-game').value;
        const price = document.getElementById('tx-price').value;
        const date = document.getElementById('tx-date').value;

        const transactionData = {
          "player": playerName,
          "game": gameName,
          "date": date,
          "pricePaid": price,
        };

        const data = new FormData(paymentDetails);
        const transactionId = data.get('transactionId');
        const cardholderName = data.get('cardholderName');
        const cardNumber = data.get('cardNumber');
        const expirationDate = data.get('expirationDate');
        const cvv = data.get('cvv');

        const cardData = {
          "transactionId": transactionId,
          "cardholderName": cardholderName,
          "cardNumber": cardNumber,
          "expirationDate": expirationDate,
          "cvv": cvv,
        };

        const payload = { transactionData, ...cardData};

        let res = await fetch(BASE + '/transactions/pay/' + encodeURIComponent(id), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('HTTP ' + res.status);
        let msg = await res.text();
        showAlert('success', msg);
        let dateEl = $('#tx-date');
        if (dateEl) dateEl.textContent = new Date().toLocaleString();

      });
    } catch (e) {
      showAlert('danger', 'Errore di connessione o server non disponibile');
    } finally {
      if (btn) btn.removeAttribute('disabled');
    }
  }

  function getTransactionId() {
    let hidden = $('input[name="transactionId"]');
    if (hidden && hidden.value) return hidden.value.trim();
    let qs = new URLSearchParams(location.search).get('id');
    return qs ? qs.trim() : '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    let form = $('#paymentForm');
    if (!form) return;

    let txId = getTransactionId();
    if (!txId) { showAlert('danger', 'Manca l’ID della transazione.'); return; }

    // Se manca l'hidden lo creo
    if (!$('input[name="transactionId"]')) {
      let hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'transactionId';
      hidden.value = txId;
      form.appendChild(hidden);
    }

    // Dati placeholder (se vuoi quelli reali, fai una GET qui)
    let el;
    if ((el = $('#tx-id')))    el.textContent = txId;
    if ((el = $('#tx-player')))el.textContent = 'Player Name';
    if ((el = $('#tx-game')))  el.textContent = 'Game Title';
    if ((el = $('#tx-price'))) el.textContent = '—';
    if ((el = $('#tx-date')))  el.textContent = new Date().toLocaleString();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      pay(txId);
    });
  });
})();