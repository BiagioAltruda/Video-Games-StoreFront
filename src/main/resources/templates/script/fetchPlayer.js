// Funzione asincrona per recuperare l'ID del player loggato
async function getPlayerId() {
    // Recupera il token salvato nel localStorage (in precedenza ottenuto al login)
    let token = localStorage.getItem('token');

    // Prepara le opzioni per la chiamata fetch: metodo GET + header con token
    let options = { 
        method : 'GET', 
        headers : { 'X-Token': token } // header personalizzato per autenticazione
    };

    try {
        // Richiesta al backend per recuperare il profilo dell'account
        const response = await fetch(`http://localhost:8080/smoke/accounts/profile`, options);

        // Se la risposta non è ok (status non 200–299) lancia un errore
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Converte il body della risposta in JSON
        const data = await response.json();

        // Estrae l'ID del player dal JSON
        const playerId = data.id;

        // Debug: stampa l'ID in console
        console.log(`The player ID is: ${playerId}`);

        // Restituisce l'ID al chiamante
        return playerId;

    } catch (err) {
        // Gestione errori: stampa l'errore a console
        console.error("Failed to fetch player ID:", err);

        // In caso di errore ritorna null (puoi anche scegliere di rilanciare l'errore)
        return null;
    }
}