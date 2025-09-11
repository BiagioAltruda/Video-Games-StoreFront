function login() {
  const u = document.getElementById('user').value;
  const p = document.getElementById('pass').value;

  fetch(`http://localhost:8080/smoke/accounts/login?username=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.status === 200) {
      return response.text(); // ritorna token come stringa
    } else {
      throw new Error('Login failed');
    }
  })
  .then(token => {
    console.log("Login response token:", token);

    // Salva il token
    localStorage.setItem('token', token);

    window.location.href= "profile.html"

    // document.getElementById('authOut').textContent =
    //   '✅ Login OK. Token salvato.';
  })
  .catch(error => {
    console.error("Login error:", error);
    document.getElementById('authOut').textContent = '❌ Login fallito';
  });
}
function register() {
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Le password non coincidono!');
    return;
  }

  if (password.length < 4) {
    alert('La password deve essere di almeno 4 caratteri!');
    return;
  }

  fetch(`http://localhost:8080/smoke/accounts/register?name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.status === 200) {
      return response.text();
    } else {
      throw new Error('Errore durante la registrazione');
    }
  })
  .then(message => {
    alert(message);

    if (message === 'Account created successfully') {
      const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      registerModal.hide();

      document.getElementById('newUsername').value = '';
      document.getElementById('newPassword').value = '';
      document.getElementById('confirmPassword').value = '';

      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
    }
  })
  .catch(error => {
    alert('Si è verificato un errore durante la registrazione: ' + error.message);
  });
}