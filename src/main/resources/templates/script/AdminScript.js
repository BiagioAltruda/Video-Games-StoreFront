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

// FUNZIONE PER AGGIORNARE UN GIOCO
async function updateGame(gameData) {
    try {
        const response = await fetch('http://localhost:8080/smoke/games/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(gameData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }

        const updatedGame = await response.json();
        showAlert(`Gioco "${updatedGame.name}" aggiornato con successo!`, 'success');
        return updatedGame;

    } catch (err) {
        showAlert('Errore durante l\'aggiornamento del gioco: ' + err.message, 'danger');
        throw err;
    }
}

// FUNZIONE PER RECUPERARE UN GIOCO PER ID (utile prima dell'update)
async function getGameById(gameId) {
    try {
        const response = await fetch(`http://localhost:8080/smoke/games/${gameId}`);
        
        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();

    } catch (err) {
        showAlert('Errore durante il recupero del gioco: ' + err.message, 'danger');
        throw err;
    }
}

// ===== FUNZIONE UNICA PER CARICARE LA LISTA GIOCHI =====
async function loadGamesList(selectElementId, includeGameData = false) {
    try {
        const response = await fetch('http://localhost:8080/smoke/games/all');
        
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        const games = await response.json();
        const select = document.getElementById(selectElementId);
        
        if (!select) return;
        
        select.innerHTML = '<option value="">-- Seleziona un gioco --</option>';
        
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game.id;
            option.textContent = `${game.name} (${game.developer})`;
            
            if (includeGameData) {
                option.setAttribute('data-game', JSON.stringify(game));
            }
            
            select.appendChild(option);
        });
        
        return games;
        
    } catch (error) {
        console.error('Errore nel caricamento giochi:', error);
        
        const select = document.getElementById(selectElementId);
        if (select) {
            select.innerHTML = `
                <option value="">
                    Errore nel caricamento - Riprova più tardi
                </option>
            `;
        }
        
        showAlert('Impossibile caricare i giochi. Riprova più tardi.', 'warning');
        throw error;
    }
}

// ===== FUNZIONI PER LA MODIFICA =====

// Funzione per caricare i dati del gioco selezionato nel form di modifica
async function loadGameForEdit(gameId) {
    if (!gameId) {
        document.getElementById('editGameFormContainer').style.display = 'none';
        document.getElementById('editGamePlaceholder').style.display = 'block';
        return;
    }

    try {
        const game = await getGameById(gameId);
        
        // Popola il form di modifica
        document.getElementById('editGameId').value = game.id;
        document.getElementById('editGameName').value = game.name;
        document.getElementById('editGameDeveloper').value = game.developer;
        document.getElementById('editGameGenre').value = game.genre;
        document.getElementById('editGamePrice').value = game.price;
        document.getElementById('editGameReleaseDate').value = game.releaseDate;
        document.getElementById('editGameDescription').value = game.description;
        document.getElementById('editGamePegi').value = game.rating;
        
        // Gestione immagine
        const preview = document.getElementById('editImagePreview');
        if (game.bannerPath) {
            preview.src = game.bannerPath;
            preview.style.display = 'block';
            document.getElementById('currentImageInfo').textContent = 'Immagine corrente';
        } else {
            preview.style.display = 'none';
            document.getElementById('currentImageInfo').textContent = 'Nessuna immagine';
        }
        
        // Mostra il form
        document.getElementById('editGameFormContainer').style.display = 'block';
        document.getElementById('editGamePlaceholder').style.display = 'none';
        
    } catch (error) {
        showAlert('Errore nel caricamento del gioco: ' + error.message, 'danger');
    }
}

// Funzione annulla modifica
function cancelEdit() {
    document.getElementById('selectGameToEdit').value = '';
    document.getElementById('editGameFormContainer').style.display = 'none';
    document.getElementById('editGamePlaceholder').style.display = 'block';
    document.getElementById('editGameForm').reset();
}

// Funzione per aggiornare la lista giochi per modifica
function refreshGamesList() {
    loadGamesList('selectGameToEdit');
    showAlert('Lista giochi aggiornata', 'info');
}

// ===== FUNZIONI PER L'ELIMINAZIONE =====

// Funzione per caricare i dettagli del gioco selezionato per l'eliminazione
function loadGameForDelete(gameId) {
    if (!gameId) {
        document.getElementById('deleteGamePreview').classList.add('d-none');
        document.getElementById('deleteGamePlaceholder').classList.remove('d-none');
        return;
    }

    try {
        const select = document.getElementById('selectGameToDelete');
        const selectedOption = select.options[select.selectedIndex];
        const game = JSON.parse(selectedOption.getAttribute('data-game'));
        
        // Popola i dettagli del gioco
        document.getElementById('deleteGameTitle').textContent = game.name;
        document.getElementById('deleteGameDetails').textContent = 
            `${game.developer} • ${game.genre} • €${game.price} • PEGI ${game.rating}`;
        document.getElementById('deleteGameDescription').textContent = 
            game.description || 'Nessuna descrizione disponibile';
        
        // Gestione immagine
        const gameImage = document.getElementById('deleteGameImage');
        if (game.bannerPath) {
            gameImage.src = game.bannerPath;
            gameImage.style.display = 'block';
        } else {
            gameImage.style.display = 'none';
        }
        
        // Mostra il pannello di conferma
        document.getElementById('deleteGamePreview').classList.remove('d-none');
        document.getElementById('deleteGamePlaceholder').classList.add('d-none');
        
    } catch (error) {
        showAlert('Errore nel caricamento del gioco: ' + error.message, 'danger');
    }
}

// Funzione per confermare l'eliminazione
async function confirmDelete() {
    const gameId = document.getElementById('selectGameToDelete').value;
    if (!gameId) return;

    try {
        const response = await fetch(`http://localhost:8080/smoke/games/delete/${gameId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText} - ${errorText}`);
        }

        const result = await response.text();
        showAlert(`Gioco eliminato con successo: ${result}`, 'success');
        
        // Reset dell'interfaccia
        cancelDelete();
        refreshDeleteGamesList();
        
    } catch (error) {
        showAlert('Errore durante l\'eliminazione del gioco: ' + error.message, 'danger');
    }
}

// Funzione per annullare l'eliminazione
function cancelDelete() {
    document.getElementById('selectGameToDelete').value = '';
    document.getElementById('deleteGamePreview').classList.add('d-none');
    document.getElementById('deleteGamePlaceholder').classList.remove('d-none');
}

// Funzione per aggiornare la lista giochi per eliminazione
function refreshDeleteGamesList() {
    loadGamesList('selectGameToDelete', true);
    cancelDelete();
    showAlert('Lista giochi aggiornata', 'info');
}

// ===== EVENT LISTENERS =====

// Anteprima immagine per il form di modifica
document.getElementById('editGameImage')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('editImagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            document.getElementById('currentImageInfo').textContent = 'Nuova immagine selezionata';
            
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
    }
});

// Event listener per il form di modifica
document.getElementById('editGameForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const gameId = document.getElementById('editGameId').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Salvataggio...';
    submitBtn.disabled = true;

    try {
        // Prima recupera il gioco corrente per mantenere il bannerPath originale
        const currentGame = await getGameById(gameId);
        
        const updatedGame = {
            id: parseInt(gameId),
            name: document.getElementById('editGameName').value,
            developer: document.getElementById('editGameDeveloper').value,
            genre: document.getElementById('editGameGenre').value,
            price: parseFloat(document.getElementById('editGamePrice').value),
            releaseDate: document.getElementById('editGameReleaseDate').value,
            description: document.getElementById('editGameDescription').value,
            rating: parseInt(document.getElementById('editGamePegi').value),
            // Mantieni il bannerPath originale di default
            bannerPath: currentGame.bannerPath
        };

        // Gestione immagine - solo se viene selezionata una nuova immagine
        const imageFile = document.getElementById('editGameImage').files[0];
        if (imageFile) {
            // Verifica dimensioni immagine
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

            const fileName = imageFile.name.toLowerCase().replace(/[^a-z0-9.]/g, '_');
            updatedGame.bannerPath = `../../images/${fileName}`;
        }

        await updateGame(updatedGame);
        
        // Reset solo del campo file, mantieni gli altri valori per eventuali nuove modifiche
        document.getElementById('editGameImage').value = '';
        
        showAlert(`Gioco "${updatedGame.name}" modificato con successo!`, 'success');
        refreshGamesList();
        
    } catch (error) {
        showAlert('Errore durante la modifica: ' + error.message, 'danger');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ===== INIZIALIZZAZIONE =====

// Carica la lista all'apertura della pagina
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza la lista giochi per la modifica
    if (document.getElementById('selectGameToEdit')) {
        loadGamesList('selectGameToEdit');
    }
    
    // Inizializza la lista giochi per l'eliminazione
    if (document.getElementById('selectGameToDelete')) {
        loadGamesList('selectGameToDelete', true);
    }
    
    // Validazioni per il form di modifica
    const editPriceInput = document.getElementById('editGamePrice');
    const editReleaseDateInput = document.getElementById('editGameReleaseDate');
    
    if (editPriceInput) {
        editPriceInput.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    }
    
    if (editReleaseDateInput) {
        const today = new Date().toISOString().split('T')[0];
        editReleaseDateInput.max = today;
    }
});