document.getElementById("footer").innerHTML = `
<footer class="footer mt-5 py-5 main-color-1">
      <div class="container">
        <div class="row">
          <!-- Chi siamo -->
          <div class="col-md-4">
            <div class="footer-section">
              <h5 class="text-white mb-3">🎮 Smoke Home</h5>
              <p class="text-light">
                Dal 2023 vendiamo videogiochi "fumosi" a prezzi incredibili!<br />
                La nostra missione? Rendere il gaming accessibile a tutti,<br />
                tranne a chi non paga in tempo.<br /><br />
                ⚡ Consegna in 3-5 giorni lavorativi (se generiamo il codice in
                tempo)<br />
                🎯 Soddisfazione garantita o quasi!
              </p>
            </div>
          </div>

          <!-- Parte Centrale - Link utili -->
          <div class="col-md-4">
            <div class="footer-section">
              <h5 class="text-white mb-3">🔗 Link Utili</h5>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <a
                    href="../pages/DomandeFrequenti.html"
                    class="text-light text-decoration-none"
                  >
                    <i class="fas fa-question-circle me-2"></i>Domande frequenti
                  </a>
                </li>
                <li class="mb-2">
                  <a href="../pages/ContattiStore.html" class="text-light text-decoration-none">
                    <i class="fas fa-envelope me-2"></i>Contatti
                  </a>
                </li>
              </ul>

              <h6 class="text-white mt-4 mb-2">🌐 Canali Social</h6>
              <div class="social-links">
                <a href="https://discord.com/" class="text-light me-3"
                  ><i class="fab fa-discord fa-lg"></i
                ></a>
                <a href="https://www.instagram.com/" class="text-light me-3"
                  ><i class="fab fa-instagram fa-lg"></i
                ></a>
                <a href="https://www.facebook.com/" class="text-light me-3"
                  ><i class="fab fa-facebook fa-lg"></i
                ></a>
                <a href="https://www.youtube.com/" class="text-light"
                  ><i class="fab fa-youtube fa-lg"></i
                ></a>
              </div>
            </div>
          </div>

          <!-- Parte Destra - Form contatto -->
          <div class="col-md-4">
            <div class="footer-section">
              <h5 class="text-white mb-3">📧 Contattaci</h5>
              <form class="contact-form">
                <div class="mb-3">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Scrivi la tua mail"
                    required
                  />
                </div>
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Fà la tua domanda"
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-light w-100">
                  <i class="fas fa-paper-plane me-2"></i>Invia
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="row mt-4">
          <div class="col-12">
            <hr class="footer-divider" />
          </div>
        </div>

        <!-- Copyright -->
        <div class="row mt-3">
          <div class="col-12 text-center">
            <p class="text-light mb-0">
              &copy; 2025 Smoke Home - Tutti i diritti riservati (forse)
            </p>
          </div>
        </div>
      </div>
    </footer>
`