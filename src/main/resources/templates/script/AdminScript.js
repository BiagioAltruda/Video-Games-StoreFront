// FUNZIONE PER AGGIUNGERE UN NUOVO GIOCO
document.getElementById('gameForm').addEventListener('submit', async e => {
    e.preventDefault();  // Previene il reload della pagina

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sto aggiungendo...';
    submitBtn.disabled = true;

    try {
        // Prepara l'oggetto gioco con i dati del form
        const newGame = {
            name: document.getElementById('gameName').value,
            developer: document.getElementById('gameDeveloper').value,
            genre: document.getElementById('gameGenre').value,
            price: parseFloat(document.getElementById('gamePrice').value),
            releaseDate: document.getElementById('gameReleaseDate').value,
            description: document.getElementById('gameDescription').value,
            rating: parseInt(document.getElementById('gamePegi').value, 10)
        };

        // Gestione dell'immagine
        const imageFile = document.getElementById('gameImage').files[0];
        if (imageFile) {
            // Verifica le dimensioni dell'immagine
            const img = new Image();
            const imageCheck = await new Promise((resolve) => {
                img.onload = function() {
                    resolve(this.width === 300 && this.height === 450);
                };
                img.onerror = function() {
                    resolve(false);
                };
                img.src = URL.createObjectURL(imageFile);
            });

            if (!imageCheck) {
                throw new Error('L\'immagine deve avere dimensioni esatte di 300x450 pixel');
            }

            // Crea il percorso dell'immagine (puoi personalizzare questa logica)
            const fileName = imageFile.name.toLowerCase().replace(/[^a-z0-9.]/g, '_');
            newGame.bannerPath = `../../images/${fileName}`;
        }

        // Invio della richiesta POST al backend
        const response = await fetch('http://localhost:8080/smoke/games/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newGame)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }

        const game = await response.json();
        showAlert(`Gioco "${game.name}" creato con successo! ID: ${game.id}`, 'success');
        e.target.reset();
        document.getElementById('imagePreview').classList.add('d-none');

    } catch (err) {
        showAlert('Errore durante la creazione del gioco: ' + err.message, 'danger');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ANTEPRIMA IMMAGINE
document.getElementById('gameImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.remove('d-none');
            
            // Verifica dimensioni
            const img = new Image();
            img.onload = function() {
                if (this.width !== 300 || this.height !== 450) {
                    showAlert('Attenzione: L\'immagine dovrebbe essere 300x450 px', 'warning');
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        preview.classList.add('d-none');
    }
});

// FUNZIONE PER MOSTRARE ALERT (rimane uguale)
function showAlert(message, type = 'info') {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1050';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// VALIDAZIONI (rimangono uguali)
document.addEventListener('DOMContentLoaded', function() {
    const priceInput = document.getElementById('gamePrice');
    const releaseDateInput = document.getElementById('gameReleaseDate');
    
    if (priceInput) {
        priceInput.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    }
    
    if (releaseDateInput) {
        const today = new Date().toISOString().split('T')[0];
        releaseDateInput.max = today;
    }
});