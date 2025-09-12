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
  console.log(expiration);
  const cardDetails = {
    cardNumber: $("#cardNumber").value,
    cardHolderName: $("#cardholderName").value,
    cardExpiry: expiration,
    cardCVV: $("#cvv").value
  }

  console.log(cardDetails);
  console.log(transaction); //{player, game, gameName,pricePaid,date}
  delete transaction.gameName;


  const dto = {cardDetails , transaction};
  console.log(JSON.stringify(dto));
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

function convertDateFormat(date) {
  const parts = date.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return `${month}/${day}/${year}`;
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