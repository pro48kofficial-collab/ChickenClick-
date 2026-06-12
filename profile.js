const shopList = document.getElementById('shop-items-list');
const invList = document.getElementById('inventory-list');
let currentFilter = 'weapon';

// Малювання магазину
window.renderShop = function() {
    if (!shopList) return;
    shopList.innerHTML = "";
    
    let filtered = window.shopItems.filter(i => i.type === currentFilter);
    
    filtered.forEach(item => {
        let isBought = window.inventory.some(invItem => invItem.id === item.id);
        let rarityInfo = window.rarities[item.rarity];
        
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.style.borderLeft = `5px solid ${rarityInfo.color}`;
        card.innerHTML = `
            <div style="font-size:24px">${item.icon}</div>
            <b style="color:${rarityInfo.color}">${item.name}</b>
            <small>Клік: +${item.bonus}</small>
            <button class="buy-btn" ${isBought ? 'disabled' : ''} onclick="buyItem('${item.id}')">
                ${isBought ? 'Куплено' : item.cost + ' 🪙'}
            </button>
        `;
        shopList.appendChild(card);
    });
};

window.filterShop = function(type) {
    currentFilter = type;
    window.renderShop();
};

// Купівля
window.buyItem = function(id) {
    let item = window.shopItems.find(i => i.id === id);
    if (window.coins >= item.cost) {
        window.coins -= item.cost;
        window.clickPower += item.bonus;
        window.inventory.push(item);
        window.updateUI();
        window.saveGame();
    } else {
        alert("Мало монет! 🪙");
    }
};

// Відображення інвентаря + Кнопка ПРОДАТИ
window.updateInventoryUI = function() {
    if (!invList) return;
    invList.innerHTML = "";
    
    if (window.inventory.length === 0) {
        invList.innerHTML = "<p style='color:#bdc3c7'>Інвентар порожній</p>";
        return;
    }
    
    window.inventory.forEach((item, index) => {
        let rarityInfo = window.rarities[item.rarity];
        let sellPrice = Math.round(item.cost * 0.6); // 60% ціни повертається
        
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.style.borderLeft = `5px solid ${rarityInfo.color}`;
        card.innerHTML = `
            <div>${item.icon}</div>
            <b style="color:${rarityInfo.color}">${item.name}</b>
            <button class="buy-btn" style="background:#c0392b" onclick="sellItem(${index})">Продати (${sellPrice}🪙)</button>
        `;
        invList.appendChild(card);
    });
};

// Продаж предметів
window.sellItem = function(index) {
    let item = window.inventory[index];
    let sellPrice = Math.round(item.cost * 0.6);
    
    window.coins += sellPrice;
    window.clickPower -= item.bonus; // Забираємо бонус від проданої зброї
    if (window.clickPower < 1) window.clickPower = 1;
    
    window.inventory.splice(index, 1); // Видаляємо з інвентаря
    window.updateUI();
    window.saveGame();
};

// Перемикач вкладок
window.openTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
};

// Профіль (Нікнейм)
document.getElementById('edit-nick-btn').addEventListener('click', () => {
    let n = prompt("Змінити нік:", window.nickname);
    if (n) { window.nickname = n; document.getElementById('player-nickname').innerText = n; window.saveGame(); }
});
document.getElementById('player-nickname').innerText = window.nickname;
          
