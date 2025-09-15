addEventListener("DOMContentLoaded", checkLoggedIn)
function checkLoggedIn(){
  const token = localStorage.getItem("X-Token");
  console.log("Token value:", token);
  console.log("Token type:", typeof token);
  console.log("Token exists:", !!token);

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

document.getElementById("navbar").innerHTML =`
    <nav class="navbar navbar-expand-lg main-color-1 py-3">
      <div class="container">
        <a class="navbar-brand fw-bold" href="home.html">
          <i class="fas fa-home me-2"></i>Home
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="../pages/profile.html">
                <i class="fas fa-user me-1"></i>Profilo Personale
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../pages/Catalogo.html">
                <i class="fas fa-book me-1"></i>Catalogo
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../pages/ContattiStore.html">
                <i class="fas fa-tags me-1"></i>Contatti
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../pages/TrendStore.html">
                <i class="fas fa-chart-line me-1"></i>Trends
              </a>
            </li>
          </ul>
          <form class="d-flex me-2">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Cerca..."
            />
            <button class="btn btn-outline-light" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <button id="login-button" style="display: block" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
            <i class="fas fa-sign-in-alt me-1"></i>Login
          </button>
          <button id="logout-button" style="display: none" type="button" class="btn btn-primary" onclick="logout()">
            <i class="fas fa-sign-in-alt me-1"></i>Logout
          </button>
        </div>
      </div>
    </nav>
    <!-- Modale di Login -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel"><i class="fas fa-sign-in-alt me-2"></i>Accesso</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="loginForm">
              <div class="mb-3">
                <label for="user" class="form-label">Username</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                  <input type="text" class="form-control" id="user" placeholder="Inserisci il tuo username" required />
                </div>
              </div>
              <div class="mb-3">
                <label for="pass" class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-lock"></i></span>
                  <input type="password" class="form-control" id="pass" placeholder="Inserisci la tua password" required />
                </div>
              </div>
            </form>
            <div class="text-center mt-3">
              <p>
                Se non hai ancora un account
                <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#registerModal">Registrati</a>
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
            <button type="button" class="btn btn-primary" onclick="login()">Accedi</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modale di Registrazione -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel"><i class="fas fa-user-plus me-2"></i>Crea Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="registerForm">
              <div class="mb-3">
                <label for="newUsername" class="form-label">Username</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                  <input type="text" class="form-control" id="newUsername" placeholder="Scegli un username" required />
                </div>
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-lock"></i></span>
                  <input type="password" class="form-control" id="newPassword" placeholder="Crea una password" required />
                </div>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Conferma Password</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-lock"></i></span>
                  <input type="password" class="form-control" id="confirmPassword" placeholder="Conferma la password" required />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
            <button type="button" class="btn btn-primary" onclick="register()">Registrati</button>
          </div>
        </div>
      </div>
    </div>
    `
    // CSS come stringa
const modalStyles = `
  #loginModal .modal-content,
  #registerModal .modal-content {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 18px 48px rgba(0,0,0,0.35);
    border: 1px solid rgba(81, 7, 58, 0.25);
  }

  #loginModal .modal-header,
  #registerModal .modal-header {
    background: var(--main-color);
    color: var(--light-color);
  }

  #loginModal .modal-header .btn-close,
  #registerModal .modal-header .btn-close {
    filter: invert(1) grayscale(100%);
    opacity: 0.8;
  }
  #loginModal .modal-header .btn-close:hover,
  #registerModal .modal-header .btn-close:hover {
    opacity: 1;
  }

  #loginModal .modal-body,
  #registerModal .modal-body {
    background: #fff;
    padding: 1.25rem 1.25rem 0.75rem;
  }

  #loginModal .input-group-text,
  #registerModal .input-group-text {
    background: rgba(166, 177, 178, 0.18);
    color: var(--main-color);
    border-color: var(--secondary-color);
  }

  #loginModal .form-control,
  #registerModal .form-control {
    border-color: var(--secondary-color);
    color: var(--text-dark);
  }

  #loginModal .form-control:focus,
  #registerModal .form-control:focus {
    border-color: var(--main-color);
    box-shadow: 0 0 0 0.2rem rgba(81, 7, 58, 0.15);
  }

  #loginModal .modal-footer,
  #registerModal .modal-footer {
    background: #fafafa;
  }

  #loginModal .btn-primary,
  #registerModal .btn-primary {
    background: var(--secondary-color);
    border-color: var(--secondary-color);
    color: var(--main-color);
    font-weight: 600;
    transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
  }

  #loginModal .btn-primary:hover,
  #registerModal .btn-primary:hover {
    background: var(--light-color);
    border-color: var(--light-color);
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.18);
  }

  .modal-backdrop.show {
    opacity: .35;
    backdrop-filter: blur(2px);
  }
`;

// Creo <style> e lo attacco a <head>
const styleEl = document.createElement("style");
styleEl.textContent = modalStyles;
document.head.appendChild(styleEl);