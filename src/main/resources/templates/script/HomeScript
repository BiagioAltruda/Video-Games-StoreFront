  // Base URL per tutte le chiamate API verso il controller Spring
  const baseUrl = 'http://localhost:8080/tasks';

  // Ritorna il token salvato nel localStorage
  function getToken() {
    return localStorage.getItem('token');
  }

  // Effettua il login e salva il token in localStorage
  function login() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;

    fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    })
    .then(r => r.text())
    .then(token => {
      if (token !== 'LOGIN_FAILED') {
        // Salva il token per le richieste successive
        localStorage.setItem('token', token);
        document.getElementById('authOut').textContent = 'Login OK. Token salvato.';
      } else {
        document.getElementById('authOut').textContent = 'Login fallito';
      }
    });
  }
  