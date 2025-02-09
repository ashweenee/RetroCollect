const achievements = {
    'bronze-collector': {
        title: 'Bronze Collector',
        description: 'Collect your first 15 retro games',
        image: 'media\\bronzeBadge.png',
        progress: { current: 8, total: 15, percentage: 53 },
        collection: 'retro-games'
    },
    'nes-collector': {
        title: 'NES Collector',
        description: 'Complete the NES console collection',
        image: 'media\\NESBadge.png',
        progress: { current: 8, total: 15, percentage: 53 },
        collection: 'nes-games'
    },
    'sega-sage': {
        title: 'SEGA Sage',
        description: 'Complete the SEGA console collection',
        image: 'media\\SEGABadge.png',
        progress: { current: 6, total: 10, percentage: 60 },
        collection: 'sega-games'
    },
    'rare-finder': {
        title: 'Rare Finder',
        description: 'Find and collect 5 legendary rare games',
        image: 'media\\lockedBadge.png',
        progress: { current: 0, total: 5, percentage: 0 },
        locked: true,
        collection: 'rare-games'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        badge: document.getElementById('badgeModal'),
        share: document.getElementById('shareModal')
    };

    // modals
    document.querySelectorAll('.close-button').forEach(btn => 
        btn.addEventListener('click', () => btn.closest('.modal').style.display = 'none'));
    
    window.onclick = e => {
        if (Object.values(modals).includes(e.target)) e.target.style.display = 'none';
    };

    // badge buttons
    document.querySelectorAll('.view-badge-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const achievement = achievements[btn.closest('.achievement-card').dataset.badgeId];
            if (!achievement.locked) displayBadgeDetails(achievement, modals);
        });
    });

    // share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const platform = e.target.classList[1];
            const shareModal = modals.share;
            const achievement = Object.values(achievements).find(a => 
                a.title === shareModal.dataset.achievementId);
            
            const shareMsg = `I just earned the ${achievement.title} badge on RetroCollect! ${achievement.progress.current}/${achievement.progress.total} complete!`;
            
            const shareUrls = {
                telegram: `https://t.me/share/url?url=retrocollect.com&text=${encodeURIComponent(shareMsg)}`,
                tiktok: null,
                instagram: null
            };

            if (shareUrls[platform]) window.open(shareUrls[platform]);
            else alert(`Share to ${platform} functionality coming soon!`);
            
            shareModal.style.display = 'none';
        });
    });

    updateOverallProgress();
});

function displayBadgeDetails(achievement, modals) {
    const modal = modals.badge;
    const elements = {
        image: modal.querySelector('#modalBadgeImage'),
        title: modal.querySelector('#modalBadgeTitle'),
        description: modal.querySelector('#modalBadgeDescription'),
        progress: {
            percentage: modal.querySelector('.progress-percentage'),
            fill: modal.querySelector('.progress-fill'),
            detail: modal.querySelector('.progress-detail')
        }
    };

    // reset modal content
    elements.image.src = achievement.image;
    elements.title.textContent = achievement.title;
    elements.description.textContent = achievement.description;
    elements.progress.percentage.textContent = `${achievement.progress.percentage}% Complete`;
    elements.progress.fill.style.width = `${achievement.progress.percentage}%`;
    elements.progress.detail.textContent = `${achievement.progress.current}/${achievement.progress.total} ${achievement.title} Complete`;

    modal.querySelector('.view-collection').onclick = () => 
        window.location.href = `collection.html?filter=${achievement.collection}`;
    
    modal.querySelector('.share-badge').onclick = () => {
        modals.share.dataset.achievementId = achievement.title;
        modal.style.display = 'none';
        modals.share.style.display = 'block';
    };

    modal.style.display = 'block';
}

// update overall progress count
function updateAchievementProgress(achievementId, newProgress) {
    const achievement = achievements[achievementId];
    if (!achievement) return;

    achievement.progress.current = newProgress;
    achievement.progress.percentage = Math.round((newProgress / achievement.progress.total) * 100);

    const card = document.querySelector(`[data-badge-id="${achievementId}"]`);
    if (card) {
        card.querySelector('.progress-fill').style.width = `${achievement.progress.percentage}%`;
        card.querySelector('.achievement-info p').textContent = 
            `${achievement.progress.current}/${achievement.progress.total} Collected`;

        if (achievement.progress.current === achievement.progress.total) {
            card.classList.add('achievement-unlocked');
            card.style.animation = 'unlockAnimation 1s ease-out';
            setTimeout(() => card.style.animation = '', 1000);
        }
    }

    const progressCount = document.querySelector('.progress-count');
    if (progressCount) {
        const completed = Object.values(achievements).filter(a => 
            !a.locked && a.progress.current === a.progress.total).length;
        progressCount.textContent = `${completed}/${Object.keys(achievements).length}`;
    }
}

window.RetroCollect = { updateAchievementProgress, achievements };