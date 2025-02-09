function toggleLeaderboard(leaderboardId) {
    const contents = document.querySelectorAll('.leaderboard-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    const selectedContent = document.getElementById(leaderboardId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('.tab-input');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleLeaderboard(this.id + '-content');
        });
    });

    // Show global content by default
    document.getElementById('global-content').style.display = 'block';
});