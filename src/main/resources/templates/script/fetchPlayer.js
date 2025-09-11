async function getPlayerId() {
    let token = localStorage.getItem('token');
    let options = {method : 'GET' , headers : {'X-Token': token}};
    try {
        const response = await fetch(`http://localhost:8080/smoke/accounts/profile`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const playerId = data.id;

        console.log(`The player ID is: ${playerId}`);
        return playerId; // You can now return the ID from the function
    } catch (err) {
        console.error("Failed to fetch player ID:", err);
        return null; // Or throw the error to the caller
    }
}