// Quando la pagina è caricata esegue la funzione checkLoggedIn
addEventListener("DOMContentLoaded", checkLoggedIn)

// Funzione che controlla se l’utente è loggato
function checkLoggedIn(){
  if(localStorage.getItem("X-Token")){ // Se c’è il token in localStorage
    document.getElementById("login-button").style.display = "none";   // Nasconde bottone login
    document.getElementById("logout-button").style.display = "block"; // Mostra bottone logout
  }
  else{ // Se non c’è token
    document.getElementById("logout-button").style.display = "none"; // Nasconde bottone logout
    document.getElementById("login-button").style.display = "block"; // Mostra bottone login
  }
}

// Funzione per login
async function login() {
  const u = document.getElementById('user').value; // Recupera username
  const p = document.getElementById('pass').value; // Recupera password

  // Effettua richiesta al backend per login
  fetch(`http://localhost:8080/smoke/accounts/login?username=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.status === 200) {
      return response.text(); // ritorna token come stringa
    } else {
      throw new Error('Login failed'); // Se non 200, errore
    }
  })
  .then(async token => {
    console.log("Login response token:", token);

    // Salva il token nel localStorage
    localStorage.setItem('X-Token', await token);

    // Reindirizza a pagina profilo
    window.location.href = "profile.html"

    // Eventuale output testuale a schermo (commentato)
    // document.getElementById('authOut').textContent =
    //   ' Login OK. Token salvato.';
  })
  .catch(error => {
    console.error("Login error:", error); // Log errore
    document.getElementById('authOut').textContent = 'Login fallito'; // Mostra messaggio di errore
  });
}

// Funzione per registrazione
async function register() {
  const username = document.getElementById('newUsername').value; // Nuovo username
  const password = document.getElementById('newPassword').value; // Nuova password
  const confirmPassword = document.getElementById('confirmPassword').value; // Conferma password

  if (password !== confirmPassword) { // Controllo password uguali
    alert('Le password non coincidono!');
    return;
  }

  if (password.length < 4) { // Controllo lunghezza minima
    alert('La password deve essere di almeno 4 caratteri!');
    return;
  }

  // Chiamata fetch per registrazione
  fetch(`http://localhost:8080/smoke/accounts/register?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.status === 200) {
      return response.text(); // Messaggio di successo
    } else {
      throw new Error('Errore durante la registrazione'); // Altrimenti errore
    }
  })
  .then(message => {
    alert(message); // Mostra messaggio di risposta

    if (message === 'Account created successfully') { // Se account creato con successo
      const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal')); 
      registerModal.hide(); // Chiude modal registrazione

      // Resetta i campi input
      document.getElementById('newUsername').value = '';
      document.getElementById('newPassword').value = '';
      document.getElementById('confirmPassword').value = '';

      // Mostra modal login
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
    }
  })
  .catch(error => {
    // Errore durante la registrazione
    alert('Si è verificato un errore durante la registrazione: ' + error.message);
  });
}

// Funzione per logout
async function logout(){
  const token = localStorage.getItem('X-Token'); // Recupera token
  await fetch(`http://localhost:8080/smoke/accounts/logout?token=${token}`, {
    method: 'POST',
    headers: {'X-Token' : token} // Passa token anche come header
  })
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('X-Token'); // Rimuove token
          alert("Logout eseguito con successo"); // Conferma logout
        }
        else{
          alert("Errore durante il logout"); // Errore logout
        }
        checkLoggedIn(); // Aggiorna visibilità pulsanti
      })
}