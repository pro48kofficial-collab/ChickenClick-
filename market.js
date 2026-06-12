const marketList = document.getElementById('market-list');
window.marketOffers = [];

// Створення випадкової пропозиції на ринку від "ботів"
function generateMarketOffers() {
    window.marketOffers = [];
    for (let i = 0; i < 3; i++) {
        let randomItem = window.shopItems[Math.floor(Math.random() * window.shopItems.length)];
        let randomDiscount = 0.5 + Math.random() * 0.6; // Знижка або націнка від 50% до 110%
        
        window.marketOffers.push({
            id: `market_${i}`,
            item: randomItem,
            price: Math.round(randomItem.cost * randomDiscount),
            seller: `Бот_Гравець_${Math.floor(Math.random() * 900) + 100}`
        });
    }
    renderMarket();
}

function renderMarket() {
    if (!marketList) return;
    marketList.innerHTML = "";
    
    window.marketOffers.forEach((offer, idx) => {
        let item = offer.item;
        let rarityInfo = window.rarities[item.rarity];
        
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.style.borderLeft = `5px solid ${rarityInfo.color}`;
        card.innerHTML = `
            <small style="color:#bdc3c7">Продавець: ${offer.seller}</small>
            <div>${item.icon} <b>${item.name}</b></div>
            <button class="buy-btn" onclick="buyFromMarket(${idx})">Купити за ${offer.price} 🪙</button>
        `;
        marketList.appendChild(card);
    });
}

window.buyFromMarket = function(idx) {
    let offer = window.marketOffers[idx];
    if (window.coins >= offer.price) {
        window.coins -= offer.price;
        window.clickPower += offer.item.bonus;
        window.inventory.push(offer.item);
        window.marketOffers.splice(idx, 1); // Видаляємо з ринку
        window.updateUI();
        renderMarket();
        window.saveGame();
    } else {
        alert("Не вистачає монет для ринку!");
    }
};

// Оновлювати ринок кожні 15 секунд новим товаром
setInterval(generateMarketOffers, 15000);
setTimeout(generateMarketOffers, 500);
              
