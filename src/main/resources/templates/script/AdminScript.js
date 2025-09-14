// FUNZIONE PER AGGIUNGERE UN NUOVO GIOCO
document.getElementById('gameForm').addEventListener('submit', async e => { // Aggiunge listener al submit del form "gameForm"
    e.preventDefault();  // Previene il reload della pagina

    const submitBtn = e.target.querySelector('button[type="submit"]'); // Prende il bottone di submit dentro al form
    const originalText = submitBtn.innerHTML; // Salva il testo originale del bottone
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sto aggiungendo...'; // Mostra spinner e testo di caricamento
    submitBtn.disabled = true; // Disabilita il bottone per evitare doppi invii

    try { // Inizio blocco try per gestione errori
        // Prepara l'oggetto gioco con i dati del form
        const newGame = { // Crea l'oggetto che rappresenta il nuovo gioco
            name: document.getElementById('gameName').value, // Nome gioco
            developer: document.getElementById('gameDeveloper').value, // Sviluppatore
            genre: document.getElementById('gameGenre').value, // Genere
            price: parseFloat(document.getElementById('gamePrice').value), // Prezzo convertito in numero
            releaseDate: document.getElementById('gameReleaseDate').value, // Data di uscita (stringa ISO)
            description: document.getElementById('gameDescription').value, // Descrizione
            rating: parseInt(document.getElementById('gamePegi').value, 10) // PEGI convertito in intero base 10
        };

        // Gestione dell'immagine
        const imageFile = document.getElementById('gameImage').files[0]; // Recupera il file immagine selezionato (se presente)
        if (imageFile) { // Se c'è un'immagine
            // Verifica le dimensioni dell'immagine
            const img = new Image(); // Crea un oggetto Image per caricare l'immagine
            const imageCheck = await new Promise((resolve) => { // Wrapper Promise per attendere onload/onerror
                img.onload = function() { // Quando l'immagine è caricata
                    resolve(this.width === 300 && this.height === 450); // Verifica dimensioni esatte 300x450
                };
                img.onerror = function() { // In caso di errore nel caricare l'immagine
                    resolve(false); // Fallisce la verifica
                };
                img.src = URL.createObjectURL(imageFile); // Crea URL temporaneo per il file e lo assegna alla Image
            });

            if (!imageCheck) { // Se dimensioni non valide
                throw new Error('L\'immagine deve avere dimensioni esatte di 300x450 pixel'); // Lancia errore bloccante
            }

            // Crea il percorso dell'immagine (puoi personalizzare questa logica)
            const fileName = imageFile.name.toLowerCase().replace(/[^a-z0-9.]/g, '_'); // Normalizza il nome file
            newGame.bannerPath = `../../images/${fileName}`; // Imposta il path (nota: non carica il file, solo path)
        }

        // Invio della richiesta POST al backend
        const response = await fetch('http://localhost:8080/smoke/games/add', { // Effettua la POST all'endpoint add
            method: 'POST', // Metodo HTTP
            headers: { // Header della richiesta
                'Content-Type': 'application/json', // Indica JSON nel body
                'Accept': 'application/json' // Richiede JSON in risposta
            },
            body: JSON.stringify(newGame) // Serializza l'oggetto newGame in JSON
        });

        if (!response.ok) { // Se status non 2xx
            const errorText = await response.text(); // Legge il testo dell'errore dal body
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText} - ${errorText}`); // Lancia errore dettagliato
        }

        const game = await response.json(); // Parsifica la risposta JSON (gioco creato)
        showAlert(`Gioco "${game.name}" creato con successo! ID: ${game.id}`, 'success'); // Mostra alert di successo
        e.target.reset(); // Resetta il form
        document.getElementById('imagePreview').classList.add('d-none'); // Nasconde l'anteprima immagine

    } catch (err) { // Gestione errori
        showAlert('Errore durante la creazione del gioco: ' + err.message, 'danger'); // Mostra alert di errore
    } finally { // Eseguito sempre
        submitBtn.innerHTML = originalText; // Ripristina testo bottone
        submitBtn.disabled = false; // Riabilita il bottone
    }
}); // Fine listener submit

// ANTEPRIMA IMMAGINE
document.getElementById('gameImage').addEventListener('change', function(e) { // Listener cambio file immagine (nuovo gioco)
    const file = e.target.files[0]; // Primo file selezionato
    const preview = document.getElementById('imagePreview'); // Img di anteprima
    
    if (file) { // Se c'è un file
        const reader = new FileReader(); // Crea FileReader per leggere come DataURL
        reader.onload = function(e) { // Quando la lettura è completata
            preview.src = e.target.result; // Imposta src dell'anteprima con il DataURL
            preview.classList.remove('d-none'); // Mostra l'anteprima
            
            // Verifica dimensioni
            const img = new Image(); // Crea Image per controllare dimensioni
            img.onload = function() { // Al caricamento
                if (this.width !== 300 || this.height !== 450) { // Se dimensioni non esatte
                    showAlert('Attenzione: L\'immagine dovrebbe essere 300x450 px', 'warning'); // Avvisa l'utente
                }
            };
            img.src = e.target.result; // Carica l'immagine dal DataURL
        };
        reader.readAsDataURL(file); // Avvia lettura del file come DataURL
    } else { // Se nessun file selezionato
        preview.classList.add('d-none'); // Nasconde l'anteprima
    }
}); // Fine listener change immagine

// FUNZIONE PER MOSTRARE ALERT (rimane uguale)
function showAlert(message, type = 'info') { // Mostra un alert bootstrap-like in alto a destra
    const existingAlert = document.querySelector('.custom-alert'); // Cerca un alert già presente
    if (existingAlert) { // Se esiste
        existingAlert.remove(); // Rimuove l'alert attuale per non accumularli
    }
    
    const alertDiv = document.createElement('div'); // Crea un container <div> per l'alert
    alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`; // Classi bootstrap + custom
    alertDiv.style.position = 'fixed'; // Posizionamento fisso
    alertDiv.style.top = '20px'; // Distanza dall'alto
    alertDiv.style.right = '20px'; // Distanza da destra
    alertDiv.style.zIndex = '1050'; // Z-index sopra modali standard
    alertDiv.style.minWidth = '300px'; // Larghezza minima
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `; // Contenuto dell'alert con bottone di chiusura
    
    document.body.appendChild(alertDiv); // Aggiunge l'alert al body
    
    setTimeout(() => { // Timer auto-chiusura
        if (alertDiv.parentNode) { // Se è ancora nel DOM
            alertDiv.remove(); // Rimuove l'alert
        }
    }, 5000); // Dopo 5 secondi
} // Fine showAlert

// VALIDAZIONI (rimangono uguali)
document.addEventListener('DOMContentLoaded', function() { // Quando il DOM è pronto
    const priceInput = document.getElementById('gamePrice'); // Input prezzo nuovo gioco
    const releaseDateInput = document.getElementById('gameReleaseDate'); // Input data uscita nuovo gioco
    
    if (priceInput) { // Se esiste l'input prezzo
        priceInput.addEventListener('input', function() { // Listener sull'input
            if (this.value < 0) { // Se valore negativo
                this.value = 0; // Forza a 0
            }
        });
    }
    
    if (releaseDateInput) { // Se esiste l'input data
        const today = new Date().toISOString().split('T')[0]; // Calcola la data odierna in formato YYYY-MM-DD
        releaseDateInput.max = today; // Imposta la data massima selezionabile a oggi
    }
}); // Fine DOMContentLoaded validazioni nuovo gioco

// FUNZIONE PER AGGIORNARE UN GIOCO
async function updateGame(gameData) { // Effettua una PUT per aggiornare un gioco
    try { // Gestione errori
        const response = await fetch('http://localhost:8080/smoke/games/update', { // Chiamata PUT al backend
            method: 'PUT', // Metodo HTTP
            headers: { // Header della richiesta
                'Content-Type': 'application/json', // Invia JSON
                'Accept': 'application/json' // Si aspetta JSON in risposta
            },
            body: JSON.stringify(gameData) // Body JSON con i dati del gioco aggiornato
        });

        if (!response.ok) { // Se non 2xx
            const errorText = await response.text(); // Legge testo di errore
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText} - ${errorText}`); // Lancia errore
        }

        const updatedGame = await response.json(); // Parsifica risposta JSON
        showAlert(`Gioco "${updatedGame.name}" aggiornato con successo!`, 'success'); // Mostra successo
        return updatedGame; // Ritorna il gioco aggiornato

    } catch (err) { // In caso di errore
        showAlert('Errore durante l\'aggiornamento del gioco: ' + err.message, 'danger'); // Mostra errore
        throw err; // Rilancia l'errore al chiamante
    }
} // Fine updateGame

// FUNZIONE PER RECUPERARE UN GIOCO PER ID (utile prima dell'update)
async function getGameById(gameId) { // Recupera un gioco per ID
    try { // Gestione errori
        const response = await fetch(`http://localhost:8080/smoke/games/${gameId}`); // GET al backend
        
        if (!response.ok) { // Se non 2xx
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`); // Lancia errore
        }

        return await response.json(); // Ritorna il JSON del gioco

    } catch (err) { // In caso di errore
        showAlert('Errore durante il recupero del gioco: ' + err.message, 'danger'); // Mostra alert
        throw err; // Rilancia errore
    }
} // Fine getGameById

// ===== FUNZIONE UNICA PER CARICARE LA LISTA GIOCHI =====
async function loadGamesList(selectElementId, includeGameData = false) { // Carica lista giochi e popola un <select>
    try { // Gestione errori
        const response = await fetch('http://localhost:8080/smoke/games/all'); // GET all games
        
        if (!response.ok) { // Se errore HTTP
            throw new Error(`Errore HTTP: ${response.status}`); // Lancia errore generico con status
        }
        
        const games = await response.json(); // Lista giochi in JSON
        const select = document.getElementById(selectElementId); // Riferimento al select target
        
        if (!select) return; // Se il select non esiste, esce silenziosamente
        
        select.innerHTML = '<option value="">-- Seleziona un gioco --</option>'; // Reset con placeholder
        
        games.forEach(game => { // Per ogni gioco
            const option = document.createElement('option'); // Crea option
            option.value = game.id; // Imposta value con ID
            option.textContent = `${game.name} (${game.developer})`; // Testo visibile
            
            if (includeGameData) { // Se richiesto, include i dati
                option.setAttribute('data-game', JSON.stringify(game)); // Salva il JSON del gioco in data-attribute
            }
            
            select.appendChild(option); // Aggiunge l'option al select
        });
        
        return games; // Ritorna la lista giochi per eventuale uso esterno
        
    } catch (error) { // In caso di errore
        console.error('Errore nel caricamento giochi:', error); // Log su console
        
        const select = document.getElementById(selectElementId); // Riferimento al select
        if (select) { // Se esiste
            select.innerHTML = `
                <option value="">
                    Errore nel caricamento - Riprova più tardi
                </option>
            `; // Mostra option di errore
        }
        
        showAlert('Impossibile caricare i giochi. Riprova più tardi.', 'warning'); // Alert utente
        throw error; // Rilancia errore
    }
} // Fine loadGamesList

// ===== FUNZIONI PER LA MODIFICA =====

// Funzione per caricare i dati del gioco selezionato nel form di modifica
async function loadGameForEdit(gameId) { // Popola il form di edit con i dati del gioco
    if (!gameId) { // Se nessun gioco selezionato
        document.getElementById('editGameFormContainer').style.display = 'none'; // Nasconde form
        document.getElementById('editGamePlaceholder').style.display = 'block'; // Mostra placeholder
        return; // Esce
    }

    try { // Gestione errori
        const game = await getGameById(gameId); // Recupera gioco dal backend
        
        // Popola il form di modifica
        document.getElementById('editGameId').value = game.id; // ID (hidden/readonly)
        document.getElementById('editGameName').value = game.name; // Nome
        document.getElementById('editGameDeveloper').value = game.developer; // Developer
        document.getElementById('editGameGenre').value = game.genre; // Genere
        document.getElementById('editGamePrice').value = game.price; // Prezzo
        document.getElementById('editGameReleaseDate').value = game.releaseDate; // Data
        document.getElementById('editGameDescription').value = game.description; // Descrizione
        document.getElementById('editGamePegi').value = game.rating; // PEGI
        
        // Gestione immagine
        const preview = document.getElementById('editImagePreview'); // Img anteprima edit
        if (game.bannerPath) { // Se c'è un banner
            preview.src = game.bannerPath; // Imposta src
            preview.style.display = 'block'; // Mostra l'immagine
            document.getElementById('currentImageInfo').textContent = 'Immagine corrente'; // Testo info
        } else { // Se non c'è immagine
            preview.style.display = 'none'; // Nasconde anteprima
            document.getElementById('currentImageInfo').textContent = 'Nessuna immagine'; // Testo info
        }
        
        // Mostra il form
        document.getElementById('editGameFormContainer').style.display = 'block'; // Mostra form di edit
        document.getElementById('editGamePlaceholder').style.display = 'none'; // Nasconde placeholder
        
    } catch (error) { // In caso di errore
        showAlert('Errore nel caricamento del gioco: ' + error.message, 'danger'); // Alert
    }
} // Fine loadGameForEdit

// Funzione annulla modifica
function cancelEdit() { // Ripristina lo stato della sezione modifica
    document.getElementById('selectGameToEdit').value = ''; // Reset select
    document.getElementById('editGameFormContainer').style.display = 'none'; // Nasconde form
    document.getElementById('editGamePlaceholder').style.display = 'block'; // Mostra placeholder
    document.getElementById('editGameForm').reset(); // Resetta campi del form
} // Fine cancelEdit

// Funzione per aggiornare la lista giochi per modifica
function refreshGamesList() { // Aggiorna la lista giochi nel select di edit
    loadGamesList('selectGameToEdit'); // Ricarica l'elenco
    showAlert('Lista giochi aggiornata', 'info'); // Mostra info alert
} // Fine refreshGamesList

// ===== FUNZIONI PER L'ELIMINAZIONE =====

// Funzione per caricare i dettagli del gioco selezionato per l'eliminazione
function loadGameForDelete(gameId) { // Popola l'anteprima del pannello di delete
    if (!gameId) { // Se nessun gioco selezionato
        document.getElementById('deleteGamePreview').classList.add('d-none'); // Nasconde pannello dettagli
        document.getElementById('deleteGamePlaceholder').classList.remove('d-none'); // Mostra placeholder
        return; // Esce
    }

    try { // Gestione errori
        const select = document.getElementById('selectGameToDelete'); // Select dei giochi da eliminare
        const selectedOption = select.options[select.selectedIndex]; // Option selezionata
        const game = JSON.parse(selectedOption.getAttribute('data-game')); // Parsea i dati gioco dal data-attribute
        
        // Popola i dettagli del gioco
        document.getElementById('deleteGameTitle').textContent = game.name; // Titolo con nome gioco
        document.getElementById('deleteGameDetails').textContent = 
            `${game.developer} • ${game.genre} • €${game.price} • PEGI ${game.rating}`; // Riepilogo dettagli
        document.getElementById('deleteGameDescription').textContent = 
            game.description || 'Nessuna descrizione disponibile'; // Descrizione o fallback
        
        // Gestione immagine
        const gameImage = document.getElementById('deleteGameImage'); // Img di anteprima delete
        if (game.bannerPath) { // Se esiste banner
            gameImage.src = game.bannerPath; // Imposta src
            gameImage.style.display = 'block'; // Mostra immagine
        } else { // Se no
            gameImage.style.display = 'none'; // Nasconde immagine
        }
        
        // Mostra il pannello di conferma
        document.getElementById('deleteGamePreview').classList.remove('d-none'); // Mostra pannello dettagli
        document.getElementById('deleteGamePlaceholder').classList.add('d-none'); // Nasconde placeholder
        
    } catch (error) { // In caso di errore
        showAlert('Errore nel caricamento del gioco: ' + error.message, 'danger'); // Alert
    }
} // Fine loadGameForDelete

// Funzione per confermare l'eliminazione
async function confirmDelete() { // Esegue la DELETE del gioco selezionato
    const gameId = document.getElementById('selectGameToDelete').value; // ID gioco selezionato
    if (!gameId) return; // Se non selezionato, esce

    try { // Gestione errori
        const response = await fetch(`http://localhost:8080/smoke/games/delete/${gameId}`, { // Chiamata DELETE
            method: 'DELETE', // Metodo HTTP
            headers: {
                'Accept': 'application/json' // Accetta JSON (anche se la risposta è testo)
            }
        });

        if (!response.ok) { // Se errore HTTP
            const errorText = await response.text(); // Legge body errore
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText} - ${errorText}`); // Lancia errore
        }

        const result = await response.text(); // Legge il testo di risposta (es. messaggio)
        showAlert(`Gioco eliminato con successo: ${result}`, 'success'); // Mostra successo
        
        // Reset dell'interfaccia
        cancelDelete(); // Resetta pannello delete
        refreshDeleteGamesList(); // Ricarica lista giochi per delete
        
    } catch (error) { // In caso di errore
        showAlert('Errore durante l\'eliminazione del gioco: ' + error.message, 'danger'); // Alert
    }
} // Fine confirmDelete

// Funzione per annullare l'eliminazione
function cancelDelete() { // Ripristina lo stato UI della sezione delete
    document.getElementById('selectGameToDelete').value = ''; // Reset selezione
    document.getElementById('deleteGamePreview').classList.add('d-none'); // Nasconde pannello dettagli
    document.getElementById('deleteGamePlaceholder').classList.remove('d-none'); // Mostra placeholder
} // Fine cancelDelete

// Funzione per aggiornare la lista giochi per eliminazione
function refreshDeleteGamesList() { // Ricarica l'elenco per il select di delete
    loadGamesList('selectGameToDelete', true); // Carica lista con data-game incluso
    cancelDelete(); // Resetta stato pannello
    showAlert('Lista giochi aggiornata', 'info'); // Mostra info
} // Fine refreshDeleteGamesList

// ===== EVENT LISTENERS =====

// Anteprima immagine per il form di modifica
document.getElementById('editGameImage')?.addEventListener('change', function(e) { // Listener opzionale (?.) per cambio immagine in edit
    const file = e.target.files[0]; // File selezionato
    const preview = document.getElementById('editImagePreview'); // Img anteprima
    
    if (file) { // Se c'è file
        const reader = new FileReader(); // Crea FileReader
        reader.onload = function(e) { // Al termine della lettura
            preview.src = e.target.result; // Mostra anteprima
            preview.style.display = 'block'; // Assicura visibilità
            document.getElementById('currentImageInfo').textContent = 'Nuova immagine selezionata'; // Aggiorna info UI
            
            // Verifica dimensioni
            const img = new Image(); // Crea Image per controllo dimensioni
            img.onload = function() { // Al caricamento
                if (this.width !== 300 || this.height !== 450) { // Se dimensioni non corrette
                    showAlert('Attenzione: L\'immagine dovrebbe essere 300x450 px', 'warning'); // Avvisa l'utente
                }
            };
            img.src = e.target.result; // Carica da DataURL
        };
        reader.readAsDataURL(file); // Legge file come DataURL
    }
}); // Fine listener change immagine in edit

// Event listener per il form di modifica
document.getElementById('editGameForm')?.addEventListener('submit', async function(e) { // Listener submit opzionale (?.) per form edit
    e.preventDefault(); // Previene reload
    
    const gameId = document.getElementById('editGameId').value; // ID del gioco in modifica
    const submitBtn = this.querySelector('button[type="submit"]'); // Bottone submit del form
    const originalText = submitBtn.innerHTML; // Testo originale bottone
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Salvataggio...'; // Spinner + testo
    submitBtn.disabled = true; // Disabilita bottone

    try { // Gestione errori
        // Prima recupera il gioco corrente per mantenere il bannerPath originale
        const currentGame = await getGameById(gameId); // GET gioco corrente
        
        const updatedGame = { // Costruisce l'oggetto aggiornato
            id: parseInt(gameId), // ID convertito in intero
            name: document.getElementById('editGameName').value, // Nome
            developer: document.getElementById('editGameDeveloper').value, // Developer
            genre: document.getElementById('editGameGenre').value, // Genere
            price: parseFloat(document.getElementById('editGamePrice').value), // Prezzo numero
            releaseDate: document.getElementById('editGameReleaseDate').value, // Data
            description: document.getElementById('editGameDescription').value, // Descrizione
            rating: parseInt(document.getElementById('editGamePegi').value), // PEGI intero
            // Mantieni il bannerPath originale di default
            bannerPath: currentGame.bannerPath // Default: usa il path già esistente
        };

        // Gestione immagine - solo se viene selezionata una nuova immagine
        const imageFile = document.getElementById('editGameImage').files[0]; // File immagine selezionato per edit
        if (imageFile) { // Se l'utente ha scelto una nuova immagine
            // Verifica dimensioni immagine
            const img = new Image(); // Image per controllo dimensioni
            const imageCheck = await new Promise((resolve) => { // Promise per attendere onload/onerror
                img.onload = function() { // On load
                    resolve(this.width === 300 && this.height === 450); // Controlla 300x450
                };
                img.onerror = function() { // On error
                    resolve(false); // Fallisce la verifica
                };
                img.src = URL.createObjectURL(imageFile); // Carica l'immagine localmente
            });

            if (!imageCheck) { // Se non valida
                throw new Error('L\'immagine deve avere dimensioni esatte di 300x450 pixel'); // Errore bloccante
            }

            const fileName = imageFile.name.toLowerCase().replace(/[^a-z0-9.]/g, '_'); // Normalizza nome file
            updatedGame.bannerPath = `../../images/${fileName}`; // Aggiorna bannerPath con il nuovo fileName
        }

        await updateGame(updatedGame); // Effettua la PUT per salvare le modifiche
        
        // Reset solo del campo file, mantieni gli altri valori per eventuali nuove modifiche
        document.getElementById('editGameImage').value = ''; // Pulisce input file
        
        showAlert(`Gioco "${updatedGame.name}" modificato con successo!`, 'success'); // Alert successo
        refreshGamesList(); // Aggiorna la lista del select di edit
        
    } catch (error) { // In caso di errore
        showAlert('Errore durante la modifica: ' + error.message, 'danger'); // Alert errore
    } finally { // Sempre
        submitBtn.innerHTML = originalText; // Ripristina testo bottone
        submitBtn.disabled = false; // Riabilita bottone
    }
}); // Fine submit edit

// ===== INIZIALIZZAZIONE =====

// Carica la lista all'apertura della pagina
document.addEventListener('DOMContentLoaded', function() { // Quando il DOM è pronto
    // Inizializza la lista giochi per la modifica
    if (document.getElementById('selectGameToEdit')) { // Se esiste il select per edit
        loadGamesList('selectGameToEdit'); // Carica l'elenco
    }
    
    // Inizializza la lista giochi per l'eliminazione
    if (document.getElementById('selectGameToDelete')) { // Se esiste il select per delete
        loadGamesList('selectGameToDelete', true); // Carica lista includendo data-game
    }
    
    // Validazioni per il form di modifica
    const editPriceInput = document.getElementById('editGamePrice'); // Input prezzo in edit
    const editReleaseDateInput = document.getElementById('editGameReleaseDate'); // Input data in edit
    
    if (editPriceInput) { // Se esiste
        editPriceInput.addEventListener('input', function() { // Listener input
            if (this.value < 0) { // Se negativo
                this.value = 0; // Forza a 0
            }
        });
    }
    
    if (editReleaseDateInput) { // Se esiste
        const today = new Date().toISOString().split('T')[0]; // Oggi in YYYY-MM-DD
        editReleaseDateInput.max = today; // Imposta max data a oggi
    }
}); // Fine DOMContentLoaded inizializzazione

// Variabili globali
let players = []; // Cambiato da 'users' a 'players' per coerenza
const baseUrl = 'http://localhost:8080/smoke/player';

// Elementi DOM
const usersTableBody = document.getElementById('usersTableBody');
const editUserSelect = document.getElementById('editUserSelect');
const deleteUserSelect = document.getElementById('deleteUserSelect');
const createUserSubmit = document.getElementById('createUserSubmit');
const editUserSubmit = document.getElementById('editUserSubmit');
const deleteUserSubmit = document.getElementById('deleteUserSubmit');
const editUserBtn = document.getElementById('editUserBtn');
const deleteUserBtn = document.getElementById('deleteUserBtn');

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    loadPlayers();
    setupEventListeners();
});

// Funzione per caricare i player dal database
async function loadPlayers() {
    try {
        const response = await fetch(baseUrl);
        
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        players = await response.json();
        renderPlayersTable();
        populateSelects();
        
    } catch (error) {
        console.error('Errore nel caricamento dei player:', error);
        showToast('error', 'Errore nel caricamento dei player: ' + error.message);
        
        // Mostra messaggio di errore nella tabella
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Errore nel caricamento dati: ${error.message}
                </td>
            </tr>
        `;
    }
}

// Funzione per renderizzare la tabella player
function renderPlayersTable() {
    usersTableBody.innerHTML = '';
    
    if (players.length === 0) {
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    <i class="fas fa-info-circle me-2"></i>
                    Nessun player trovato nel database
                </td>
            </tr>
        `;
        return;
    }
    
    players.forEach(player => {
        const row = document.createElement('tr');
        
        // Formatta la data
        let creationDate = 'N/A';
        if (player.creationDate) {
            if (typeof player.creationDate === 'string' && player.creationDate.includes('T')) {
                creationDate = player.creationDate.split('T')[0];
            } else {
                creationDate = player.creationDate;
            }
        }
        
        row.innerHTML = `
            <td>${player.id}</td>
            <td>${player.name}</td>
            <td>${player.language || 'N/A'}</td>
            <td><span class="badge bg-primary">Livello ${player.playerLevel || 0}</span></td>
            <td>${creationDate}</td>
        `;
        
        usersTableBody.appendChild(row);
    });
}

// Funzione per popolare i select nei modali
function populateSelects() {
    // Popola il select per modifica
    editUserSelect.innerHTML = '<option value="">Seleziona un player</option>';
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.name} (Livello ${player.playerLevel || 0})`;
        option.setAttribute('data-name', player.name);
        option.setAttribute('data-language', player.language || '');
        option.setAttribute('data-playerLevel', player.playerLevel || '');
        editUserSelect.appendChild(option);
    });
    
    // Popola il select per eliminazione
    deleteUserSelect.innerHTML = '<option value="">Seleziona un player</option>';
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.name} (Livello ${player.playerLevel || 0})`;
        deleteUserSelect.appendChild(option);
    });
}

// Funzione per creare un nuovo player nel database
async function createPlayer(playerData) {
    try {
        const response = await fetch(`${baseUrl}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Errore nella creazione del player');
        }
        
        const newPlayer = await response.json();
        
        // Ricarica i player dal database per avere dati aggiornati
        await loadPlayers();
        
        // Chiudi il modale e resetta il form
        bootstrap.Modal.getInstance(document.getElementById('createUserModal')).hide();
        document.getElementById('createUserForm').reset();
        
        showToast('success', 'Player creato con successo!');
        
    } catch (error) {
        console.error('Errore nella creazione del player:', error);
        showToast('error', 'Errore nella creazione del player: ' + error.message);
    }
}

// Funzione per aggiornare un player nel database
async function updatePlayer(playerData) {
    try {
        const response = await fetch(`${baseUrl}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Errore nell\'aggiornamento del player');
        }
        
        const updatedPlayer = await response.json();
        
        // Ricarica i player dal database per avere dati aggiornati
        await loadPlayers();
        
        // Chiudi il modale e resetta il form
        bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
        document.getElementById('editUserForm').reset();
        
        showToast('success', 'Player aggiornato con successo!');
        
    } catch (error) {
        console.error('Errore nell\'aggiornamento del player:', error);
        showToast('error', 'Errore nell\'aggiornamento del player: ' + error.message);
    }
}

// Funzione per eliminare un player dal database
async function deletePlayer(playerId) {
    try {
        const response = await fetch(`${baseUrl}/${playerId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Errore nell\'eliminazione del player');
        }
        
        // Ricarica i player dal database per avere dati aggiornati
        await loadPlayers();
        
        // Chiudi il modale
        bootstrap.Modal.getInstance(document.getElementById('deleteUserModal')).hide();
        
        showToast('success', 'Player eliminato con successo!');
        
    } catch (error) {
        console.error('Errore nell\'eliminazione del player:', error);
        showToast('error', 'Errore nell\'eliminazione del player: ' + error.message);
    }
}

// Funzione per impostare i listener degli eventi
function setupEventListeners() {
    // Creazione player
    createUserSubmit.addEventListener('click', function() {
        const name = document.getElementById('createUsername').value;
        const password = document.getElementById('createPassword').value;
        const language = document.getElementById('createLanguage').value;
        const playerLevel = parseInt(document.getElementById('createLevel').value) || 0;
        
        if (!name || !password) {
            showToast('error', 'Nome e password sono obbligatori');
            return;
        }
        
        const playerData = {
            name: name,
            password: password,
            language: language,
            playerLevel: playerLevel
        };
        
        createPlayer(playerData);
    });
    
    // Modifica player
    editUserSubmit.addEventListener('click', function() {
        const playerId = parseInt(editUserSelect.value);
        const name = document.getElementById('editUsername').value;
        const language = document.getElementById('editLanguage').value;
        const playerLevel = parseInt(document.getElementById('editLevel').value) || 0;
        
        if (!playerId) {
            showToast('error', 'Seleziona un player da modificare');
            return;
        }
        
        // Prendi i dati originali per confronto
        const selectedOption = editUserSelect.options[editUserSelect.selectedIndex];
        const originalName = selectedOption.getAttribute('data-name');
        const originalLanguage = selectedOption.getAttribute('data-language');
        const originalPlayerLevel = selectedOption.getAttribute('data-playerLevel');
        
        const playerData = {
            id: playerId
        };
        
        // Aggiungi solo i campi che sono stati modificati
        if (name && name !== originalName) {
            playerData.name = name;
        }
        if (language !== originalLanguage) {
            playerData.language = language;
        }
        if (playerLevel.toString() !== originalPlayerLevel) {
            playerData.playerLevel = playerLevel;
        }
        
        // Se non ci sono modifiche, esci
        if (Object.keys(playerData).length === 1) {
            showToast('info', 'Nessuna modifica da salvare');
            return;
        }
        
        updatePlayer(playerData);
    });
    
    // Eliminazione player
    deleteUserSubmit.addEventListener('click', function() {
        const playerId = parseInt(deleteUserSelect.value);
        
        if (!playerId) {
            showToast('error', 'Seleziona un player da eliminare');
            return;
        }
        
        // Conferma aggiuntiva per eliminazione
        if (confirm('Sei sicuro di voler eliminare definitivamente questo player?')) {
            deletePlayer(playerId);
        }
    });
    
    // Quando si seleziona un player da modificare
    editUserSelect.addEventListener('change', function() {
        const playerId = parseInt(this.value);
        const selectedOption = this.options[this.selectedIndex];
        
        if (selectedOption && playerId) {
            document.getElementById('editUsername').value = selectedOption.getAttribute('data-name') || '';
            document.getElementById('editLanguage').value = selectedOption.getAttribute('data-language') || '';
            document.getElementById('editLevel').value = selectedOption.getAttribute('data-playerLevel') || '';
        } else {
            document.getElementById('editUsername').value = '';
            document.getElementById('editLanguage').value = '';
            document.getElementById('editLevel').value = '';
        }
    });
}

// Funzione per mostrare toast
function showToast(type, message) {
    console.log(`${type.toUpperCase()}: ${message}`);
    // Usa alert per semplicità, puoi sostituire con la tua implementazione di toast
    alert(`${type.toUpperCase()}: ${message}`);
}
