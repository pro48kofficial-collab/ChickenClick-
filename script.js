// Завантаження збережень або дефолтні значення
let savedData = JSON.parse(localStorage.getItem('chicken_clicker_save')) || {};

window.coins = savedData.coins || 0;
window.clickPower = savedData.clickPower || 1;
window.inventory = savedData.inventory || [];
window.nickname = savedData.nickname || "Гравець";
window.currentAvatar = savedData.currentAvatar || "🐥";
window.usedPromos = savedData.usedPromos || [];

// Створюємо 340 динамічних промокодів
window.promoCodes = {};
for (let i = 1; i <= 340; i++) {
    window.promoCodes[CHICKEN${i}] = i * 15; // Код CHICKEN10 дасть 150 монет тощо
}

// Пошук елементів
const coinsDisplay = document.getElementById('coins');
const clickPowerDisplay = document.getElementById('click-power');
const chickenBtn = document.getElementById('chicken-btn');

window.updateUI = function() {
    coinsDisplay.innerText = window.coins;
    clickPowerDisplay.innerText = window.clickPower;
    if (typeof window.updateInventoryUI === 'function') window.updateInventoryUI();
    if (typeof window.renderShop === 'function') window.renderShop();
};

// Збереження гри
window.saveGame = function() {
    let dataToSave = {
        coins: window.coins,
        clickPower: window.clickPower,
        inventory: window.inventory,
        nickname: window.nickname,
        currentAvatar: window.currentAvatar,
        usedPromos: window.usedPromos
    };
    localStorage.setItem('chicken_clicker_save', JSON.stringify(dataToSave));
};

// Кліки
chickenBtn.addEventListener('click', () => {
    window.coins += window.clickPower;
    window.updateUI();
});

// Промокоди
document.getElementById('promo-btn').addEventListener('click', () => {
    const input = document.getElementById('promo-input').value.trim().toUpperCase();
    
    if (window.usedPromos.includes(input)) {
        alert("Цей промокод вже активовано! ❌");
        return;
    }

    if (window.promoCodes[input]) {
        let reward = window.promoCodes[input];
        window.coins += reward;
        window.usedPromos.push(input);
        window.updateUI();
        alert(Успішно! Активовано код ${input}. Отримано +${reward} 🪙);
        document.getElementById('promo-input').value = "";
    } else {
        alert("Невірний код! ❌");
    }
});

// Автозбереження кожні 5 секунд
setInterval(window.saveGame, 5000);

// Перший запуск після завантаження сторінки
setTimeout(() => { window.updateUI(); }, 100);
