// Refactored getProfile to correctly return JSON
async function getProfile() {
  const response = await fetch('http://localhost:8080/smoke/accounts/profile', {
    method: 'GET',
    headers: {'X-Token': localStorage.getItem('X-Token')},
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }
  return await response.json();
}

// showProfile is now simpler and correctly uses the awaited data
async function showProfile() {
  try {
    const playerData = await getProfile();
    console.log(playerData);
    document.getElementById('profile-welcome').innerHTML = `
      <div class="container my-4">
        <div class="d-flex align-items-center gap-3 mb-4 text-contrast">
          <div>
            <h4 class="mb-0 context-aware-text" id="profileUsername">${playerData.name}</h4>
            <small class="text-muted" id="profileEmail">${playerData.name}@example.com</small>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error showing profile:", error);
  }
}
async function showGames() {
  document.getElementById('tab-games').innerHTML = `
    <div class="card game-details-container">
      <div class="card-header bg-main">
        <h5 class="mb-0">La tua libreria</h5>
      </div>
      <div class="card-body text-contrast">
        <div id="gamesEmpty" class="text-center mb-3" style="display: none">
          <p class="mb-2">Nessun gioco in libreria.</p>
          <a href="../pages/Catalogo.html" class="btn btn-primary">Vai al catalogo</a>
        </div>
        <div class="row g-3" id="gamesList" style="display: block"></div>
      </div>
    </div>`;

  try {
    const profileData = await getProfile();
    const playerId = profileData.id;

    const response = await fetch(`http://localhost:8080/smoke/transactions/player/${playerId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    const games = await response.json();

    const gamesEmpty = document.getElementById('gamesEmpty');
    const gamesList = document.getElementById('gamesList');

    if (games.length === 0) {
      gamesEmpty.style.display = 'block';
      gamesList.style.display = 'none';
    } else {
      gamesEmpty.style.display = 'none';
      gamesList.style.display = 'block';
      gamesList.innerHTML = ''; // Clear the list before adding items
      
      for (const game of games) {
        const gameRow = document.createElement('div');
        gameRow.className = 'game-row';
        gameRow.onclick = () => showGameDetails(game.id);
        
        gameRow.innerHTML = `
          <img src="${game.bannerPath ? game.bannerPath : 'https://via.placeholder.com/80x80/51073a/ecf0f1?text=No+Image'}" 
               class="game-image" alt="${game.name}"
               onerror="this.src='https://via.placeholder.com/80x80/51073a/ecf0f1?text=Image+Error'">
          <div class="game-info">
            <div class="game-title">${game.name}</div>
            <p class="game-meta">${game.developer} / ${game.genre}</p>
          </div>
          <div class="game-status">Acquistato</div>
        `;
        
        gamesList.appendChild(gameRow);
      }
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    document.getElementById('gamesEmpty').style.display = 'block';
    document.getElementById('gamesList').style.display = 'none';
  }
}

async function showFriends() {
  try {
    const playerData = await getProfile();
    const playerId = playerData.id;
    const response = await fetch(`http://localhost:8080/smoke/friends/friend-list/${playerId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch friends: ${response.statusText}`);
    }

    const friendsList = await response.json(); // Renamed to avoid confusion
    const tableBody = document.getElementById('players-table');

    // Clear the table before adding new rows to prevent duplicates on re-render
    tableBody.innerHTML = '';

    for (const f of friendsList) {
      const friendResponse = await fetch(`http://localhost:8080/smoke/player/${f.secondPlayer}`);

      if (!friendResponse.ok) {
        throw new Error(`Failed to fetch details for player ID ${f.secondPlayer}: ${friendResponse.statusText}`);
      }

      const friend = await friendResponse.json(); // Correctly get the JSON data

      tableBody.innerHTML += `
        <tr>
          <td>${friend.id}</td>
          <td>${friend.name}</td>
          <td><span class="badge bg-primary">Livello ${friend.playerLevel}</span></td>
          <td>${new Date(friend.creationDate).toLocaleDateString()}</td>
        </tr>
      `;
    }
  } catch (error) {
    console.error("Error fetching friends:", error);
    // Optional: Add a row to the table to indicate an error
    document.getElementById('players-table').innerHTML = `<tr><td colspan="4" class="text-danger text-center">Failed to load friends.</td></tr>`;
  }
}

async function addFriend () {
  try{
    const playerData = await getProfile();
    const playerId = playerData.id;
    const newFriend = parseInt(document.getElementById('friendId').value);
    const response = await fetch(`http://localhost:8080/smoke/friends`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstPlayer : playerId,
        secondPlayer : newFriend,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to add friend: ${response.statusText}`);
    }

  }
  catch (error) {
    console.error("Error adding friend:", error);
  }
}


