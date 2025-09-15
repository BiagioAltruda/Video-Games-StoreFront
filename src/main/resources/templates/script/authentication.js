async function checkAdmin(token) {
    try {
        const response = await fetch(`http://localhost:8080/smoke/accounts/is-admin`, {
            method: 'GET',
            headers: {'X-Token': await token},
        });

        if (!response.ok) { // Check for a successful HTTP status code (200-299)
            // `response.ok` is a better check than `response.status === 200`
            throw new Error(`Error encountered while checking admin privileges: ${response.status}`);
        }

        const isAdmin = await response.text(); // Await the text to be fully received

        localStorage.setItem('admin', isAdmin); // Store the string 'true' or 'false'

        if (isAdmin === 'true') {
            window.location.href = "adminProfile.html";
        } else {
            window.location.href = "profile.html";
        }

    } catch (error) {
        console.error(error);
        // Optional: Handle the error gracefully, e.g., redirect to an error page
        window.location.href = "error.html";
    }
}