document.addEventListener("DOMContentLoaded", () => {
    // Set progress bar widths
    document.querySelectorAll(".console-card").forEach(card => {
        let progress = card.getAttribute("data-progress");
        card.querySelector(".progress-bar").style.width = progress + "%";
    });

    // Create the modal and append it to the body
    const modal = document.createElement("div");
    modal.className = "collection-details-modal modal";
    modal.style.display = "none"; // Hide initially
    modal.innerHTML = `
        <div class="modal-content collection-details-content">
            <span class="close-button">&times;</span>
            <h2 id="modalTitle"></h2>
            <div class="collection-items-grid"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalTitle = document.getElementById("modalTitle");
    const itemsGrid = modal.querySelector(".collection-items-grid");
    const closeButton = modal.querySelector(".close-button");

    // Sample collection data for PlayStation 1
    const collectionData = {
        "PlayStation 1": [
            {
                name: "Crash Bandicoot",
                image: "/api/placeholder/200/200",
                condition: "Mint",
                rarity: 5,
                details: "Original 1996 release"
            }
        ]
    };

    // Event listener for "View Details" buttons
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", (event) => {
            const consoleCard = event.target.closest(".console-card");
            const consoleName = consoleCard.querySelector("h3").textContent;
            displayCollectionDetails(consoleName);
        });
    });

    // Function to display collection details in the modal
    function displayCollectionDetails(consoleName) {
        const items = collectionData[consoleName] || [];
        modalTitle.textContent = `${consoleName} Collection`;
        itemsGrid.innerHTML = "";

        if (items.length === 0) {
            itemsGrid.innerHTML = "<p>No items in this collection yet.</p>";
        } else {
            items.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.className = "collection-detail-item";
                itemElement.innerHTML = `
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <div class="condition-badge">${item.condition}</div>
                        <p>${item.details}</p>
                    </div>
                `;
                itemsGrid.appendChild(itemElement);
            });
        }

        modal.style.display = "block"; // Show the modal
    }

    // Close modal functionality
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
