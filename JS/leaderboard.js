const leaderboardData = {
    global: [
        { rank: 1, name: "RetroKing", avatar: "/api/placeholder/40/40", collection: "Complete NES", score: 150000 },
        { rank: 2, name: "PixelQueen", avatar: "/api/placeholder/40/40", collection: "SEGA Master", score: 145000 },
        { rank: 3, name: "GameMaster", avatar: "/api/placeholder/40/40", collection: "Nintendo 64", score: 140000 },
        { rank: 4, name: "RetroHunter", avatar: "/api/placeholder/40/40", collection: "PlayStation", score: 135000 },
        { rank: 5, name: "8BitHero", avatar: "/api/placeholder/40/40", collection: "SNES", score: 130000 }
    ],
    friends: [
        { rank: 1, name: "Player1", avatar: "/api/placeholder/40/40", collection: "Genesis", score: 120000 },
        { rank: 2, name: "Player2", avatar: "/api/placeholder/40/40", collection: "GameBoy", score: 115000 },
        { rank: 3, name: "Player3", avatar: "/api/placeholder/40/40", collection: "Nintendo 64", score: 110000 }
    ],
    local: [
        { rank: 1, name: "LocalPro", avatar: "/api/placeholder/40/40", collection: "Dreamcast", score: 100000 },
        { rank: 2, name: "CityChamp", avatar: "/api/placeholder/40/40", collection: "PlayStation", score: 95000 },
        { rank: 3, name: "AreaAce", avatar: "/api/placeholder/40/40", collection: "SNES", score: 90000 }
    ]
};

function switchTab(tab) {
    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update leaderboard content
    const tableBody = document.getElementById('leaderboard-body');
    tableBody.innerHTML = '';

    leaderboardData[tab].forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank">#${player.rank}</td>
            <td>
                <div class="player">
                    <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
                    <span>${player.name}</span>
                </div>
            </td>
            <td>${player.collection}</td>
            <td class="score">${player.score.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize with global leaderboard
window.onload = () => switchTab('global');