
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
    `