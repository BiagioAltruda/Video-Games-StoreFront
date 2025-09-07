  //Creazione della costante per il fetch della pagina
  const baseUrl = 'http://localhost:8080/smoke/accounts';


// Effettua il login e salva il token in localStorage
function login() {
    // Recupera il valore inserito nel campo di input con id 'user'
    const u = document.getElementById('user').value;
    
    // Recupera il valore inserito nel campo di input con id 'pass'
    const p = document.getElementById('pass').value;

    // Usa FormData invece di JSON
    // Crea un nuovo oggetto FormData per inviare i dati come form-urlencoded
    const formData = new FormData();
    
    // Aggiunge il campo 'username' e 'password' con i valori recuperati dall'input
    formData.append('username', u);
    formData.append('password', p);

    // Esegue una richiesta HTTP POST all'endpoint di login
    fetch(`${baseUrl}/login`, {
        method: 'POST', 
        body: formData // Imposta il body con i dati del form
    })
    // Gestisce la risposta del server
    .then(response => {
        if (response.status === 200) {
            // Converte la risposta in formato JSON e la restituisce
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    // Gestisce i dati JSON ricevuti dal server
    .then(player => {
        // Salva il token per le richieste successive
        localStorage.setItem('token', player.token);
        
        // Aggiorna l'interfaccia utente per mostrare un messaggio di successo
        document.getElementById('authOut').textContent = 'Login OK. Token salvato.';
    })
    // Gestisce eventuali errori che si verificano durante il processo
    .catch(error => {
        // Aggiorna l'interfaccia utente per mostrare un messaggio di errore
        document.getElementById('authOut').textContent = 'Login fallito';
    });
}

// Funzione per la registrazione di un nuovo account
function register() {
    // Recupera i valori dai campi del form di registrazione
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validazione base
    if (password !== confirmPassword) {
        alert('Le password non coincidono!');
        return;
    }

    if (password.length < 4) {
        alert('La password deve essere di almeno 4 caratteri!');
        return;
    }

    // Prepara i dati per la richiesta
    const formData = new FormData();
    formData.append('name', username);
    formData.append('password', password);

    // Esegue la richiesta HTTP POST all'endpoint di registrazione
    fetch(`${baseUrl}/register`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.status === 200) {
            return response.text();
        } else {
            throw new Error('Errore durante la registrazione');
        }
    })
    .then(message => {
        // Mostra il messaggio di successo o errore
        alert(message);
        
        // Se la registrazione è avvenuta con successo, chiudi il modale
        if (message === 'Account created successfully') {
            // Chiudi il modale di registrazione
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();
            
            // Pulisci i campi del form
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            
            // Opzionale: apri automaticamente il login
            // const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            // loginModal.show();
        }
    })
    .catch(error => {
        alert('Si è verificato un errore durante la registrazione: ' + error.message);
    });
}

const fs = require('fs');
const path = require('path');

function getFilesInDirectory() {
    const directoryPath = 'src/main/resources/images';
    
    try {
        // Legge il contenuto della cartella
        const files = fs.readdirSync(directoryPath);
        
        // Filtra solo i file (esclude le cartelle)
        const fileArray = files.filter(file => {
            const filePath = path.join(directoryPath, file);
            return fs.statSync(filePath).isFile();
        });
        
        return fileArray;
    } catch (error) {
        console.error('Errore nella lettura della cartella:', error);
        return [];
    }
}

let currentIndex = 0;
let imageFiles = [];

function initializeCarousel() {
    const fileArray = getFilesInDirectory();
    
    // Filtra solo file immagine (estensioni comuni)
    imageFiles = fileArray.filter(file => 
        /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file)
    );

    if (imageFiles.length === 0) {
        console.error('Nessuna immagine trovata nella cartella');
        return;
    }

    createCarousel();
    showImage(currentIndex);
}

function createCarousel() {
    const carousel = document.createElement('div');
    carousel.id = 'image-carousel';
    carousel.style.position = 'relative';
    carousel.style.maxWidth = '800px';
    carousel.style.margin = '0 auto';

    const imgElement = document.createElement('img');
    imgElement.id = 'carousel-image';
    imgElement.style.width = '100%';
    imgElement.style.height = 'auto';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.onclick = () => navigate(-1);
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '10px';
    prevBtn.style.top = '50%';

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.onclick = () => navigate(1);
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '10px';
    nextBtn.style.top = '50%';

    carousel.appendChild(imgElement);
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    
    document.body.appendChild(carousel);
}

function showImage(index) {
    const imagePath = `src/main/resources/images/${imageFiles[index]}`;
    document.getElementById('carousel-image').src = imagePath;
}

function navigate(direction) {
    currentIndex = (currentIndex + direction + imageFiles.length) % imageFiles.length;
    showImage(currentIndex);
}

// Inizializza il carosello
document.addEventListener('DOMContentLoaded', initializeCarousel);
       