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
async function pay() {
  let btn = $("#payBtn");
  if (btn) btn.setAttribute("disabled", "disabled");

  const expiration =convertDateFormat('01/' + $("#expirationDate").value);
  const cardDetails = {
    cardNumber: $("#cardNumber").value.replace(/\s+/g, ''),
    cardHolderName: $("#cardholderName").value,
    cardExpiry: expiration,
    cardCVV: $("#cvv").value
  }

  console.log(cardDetails);
  console.log(transaction); //{player, game, gameName,pricePaid,date}

  const transactionRequest = {
    playerId: transaction.player,
    gameId: transaction.game,
    pricePaid: transaction.pricePaid,
    date: new Date().toISOString(),
  }

                                                               //localStorage
  const dto = {cardDetails , transactionRequest}; //encapsulates the data for transfer
  console.log(JSON.stringify(dto, null, 2));
  try{
    let res = await fetch("http://localhost:8080/smoke/transactions/pay/" + transaction.player, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto)
    });
    

    if (!res.ok) throw new Error("HTTP " + res.status);
    let msg = await res.text();
    showAlert("success", msg);
    

  } catch (e) {
    console.error(e);
    showAlert("danger", "❌ Errore di connessione o server non disponibile");
  } finally {
    if (btn) btn.removeAttribute("disabled");

  }
}

  // Intercetta il submit
const form = document.getElementById("paymentForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    pay();
  });

function convertDateFormat(date) {
  const parts = date.split('/');
  const month = parts[0];
  let year = parts[1];

  if(year.length === 2){ //convert date since we are
    year = "20" + year; //assuming year starts with 20xx
  }
  return `${parseInt(month)}/1/${year}`;
}

addEventListener('DOMContentLoaded', checkLoggedIn);
function checkLoggedIn(){
  const token = localStorage.getItem("X-Token");
  if(token){
    document.getElementById("login-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    return true;
  }
  else{
    document.getElementById("logout-button").style.display = "none";
    document.getElementById("login-button").style.display = "block";
    return false;
  }
}