const achievements = {
    'bronze-collector': {
        title: 'Bronze Collector',
        description: 'Collect your first 15 retro games',
        image: 'path-to-your-badge-image/bronze-collector.png',
        progress: {
            current: 8,
            total: 15,
            percentage: 53
        },
        collection: 'retro-games'
    },
    'nes-collector': {
        title: 'NES Collector',
        description: 'Complete the NES console collection',
        image: 'path-to-your-badge-image/nes-collector.png',
        progress: {
            current: 8,
            total: 15,
            percentage: 53
        },
        collection: 'nes-games'
    },
    'sega-sage': {
        title: 'SEGA Sage',
        description: 'Complete the SEGA console collection',
        image: 'path-to-your-badge-image/sega-sage.png',
        progress: {
            current: 6,
            total: 10,
            percentage: 60
        },
        collection: 'sega-games'
    },
    'rare-finder': {
        title: 'Rare Finder',
        description: 'Find and collect 5 legendary rare games',
        image: 'path-to-your-badge-image/rare-finder.png',
        progress: {
            current: 0,
            total: 5,
            percentage: 0
        },
        locked: true,
        collection: 'rare-games'
    }
};

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeModals();
    initializeBadgeButtons();
    initializeShareButtons();
    updateOverallProgress();
});

// Modal functionality
function initializeModals() {
    const badgeModal = document.getElementById('badgeModal');
    const shareModal = document.getElementById('shareModal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Close modal functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === badgeModal) {
            badgeModal.style.display = 'none';
        }
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
}

// Badge button functionality
function initializeBadgeButtons() {
    const viewBadgeButtons = document.querySelectorAll('.view-badge-btn');
    
    viewBadgeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const badgeId = button.closest('.achievement-card').dataset.badgeId;
            const achievement = achievements[badgeId];
            
            if (!achievement.locked) {
                displayBadgeDetails(achievement);
            }
        });
    });
}

// Display badge details in modal
function displayBadgeDetails(achievement) {
    const modal = document.getElementById('badgeModal');
    const modalImage = document.getElementById('modalBadgeImage');
    const modalTitle = document.getElementById('modalBadgeTitle');
    const modalDescription = document.getElementById('modalBadgeDescription');
    
    modalImage.src = achievement.image;
    modalTitle.textContent = achievement.title;
    modalDescription.textContent = achievement.description;
    
    // Update progress elements
    const progressPercentage = modal.querySelector('.progress-percentage');
    const progressFill = modal.querySelector('.progress-fill');
    const progressDetail = modal.querySelector('.progress-detail');
    
    progressPercentage.textContent = `${achievement.progress.percentage}% Complete`;
    progressFill.style.width = `${achievement.progress.percentage}%`;
    progressDetail.textContent = `${achievement.progress.current}/${achievement.progress.total} ${achievement.title} Complete`;
    
    // Set up action buttons
    initializeActionButtons(achievement);
    
    modal.style.display = 'block';
}

// Initialize action buttons in badge details modal
function initializeActionButtons(achievement) {
    const viewCollectionBtn = document.querySelector('.view-collection');
    const shareBadgeBtn = document.querySelector('.share-badge');
    
    viewCollectionBtn.onclick = () => {
        window.location.href = `collection.html?filter=${achievement.collection}`;
    };
    
    shareBadgeBtn.onclick = () => {
        openShareModal(achievement);
    };
}

// Share functionality
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = e.target.classList[1]; // telegram, tiktok, or instagram
            shareAchievement(platform);
        });
    });
}

// Open share modal
function openShareModal(achievement) {
    const shareModal = document.getElementById('shareModal');
    const badgeModal = document.getElementById('badgeModal');
    
    // Store achievement data for sharing
    shareModal.dataset.achievementId = achievement.title;
    
    // Hide badge modal and show share modal
    badgeModal.style.display = 'none';
    shareModal.style.display = 'block';
}

// Share achievement to platform
function shareAchievement(platform) {
    const shareModal = document.getElementById('shareModal');
    const achievementTitle = shareModal.dataset.achievementId;
    const achievement = Object.values(achievements).find(a => a.title === achievementTitle);
    
    // Create share message
    const shareMessage = `I just earned the ${achievement.title} badge on RetroCollect! ${achievement.progress.current}/${achievement.progress.total} complete!`;
    
    // Platform-specific sharing logic
    switch(platform) {
        case 'telegram':
            // Implement Telegram sharing
            window.open(`https://t.me/share/url?url=retrocollect.com&text=${encodeURIComponent(shareMessage)}`);
            break;
        case 'tiktok':
            // Implement TikTok sharing
            alert('Share to TikTok functionality coming soon!');
            break;
        case 'instagram':
            // Implement Instagram sharing
            alert('Share to Instagram functionality coming soon!');
            break;
    }
    
    // Close share modal
    shareModal.style.display = 'none';
}

// Update overall progress
function updateOverallProgress() {
    const progressCount = document.querySelector('.progress-count');
    if (progressCount) {
        let completed = Object.values(achievements).filter(a => 
            !a.locked && a.progress.current === a.progress.total
        ).length;
        let total = Object.keys(achievements).length;
        progressCount.textContent = `${completed}/${total}`;
    }
}

// Animation for achievement unlocking
function animateAchievementUnlock(achievementId) {
    const card = document.querySelector(`[data-badge-id="${achievementId}"]`);
    if (card) {
        card.classList.add('achievement-unlocked');
        
        // Add animation class
        card.style.animation = 'unlockAnimation 1s ease-out';
        
        // Remove animation class after it completes
        setTimeout(() => {
            card.style.animation = '';
        }, 1000);
    }
}

// Update achievement progress
function updateAchievementProgress(achievementId, newProgress) {
    const achievement = achievements[achievementId];
    if (achievement) {
        achievement.progress.current = newProgress;
        achievement.progress.percentage = Math.round((newProgress / achievement.progress.total) * 100);
        
        // Update UI
        const card = document.querySelector(`[data-badge-id="${achievementId}"]`);
        if (card) {
            const progressBar = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.achievement-info p');
            
            progressBar.style.width = `${achievement.progress.percentage}%`;
            progressText.textContent = `${achievement.progress.current}/${achievement.progress.total} Collected`;
            
            // Check if achievement is completed
            if (achievement.progress.current === achievement.progress.total) {
                animateAchievementUnlock(achievementId);
            }
        }
        
        // Update overall progress
        updateOverallProgress();
    }
}

// Export functions for use in other parts of the application
window.RetroCollect = {
    updateAchievementProgress,
    achievements
};