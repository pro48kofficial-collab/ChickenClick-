// Типи рідкостей та їх властивості
window.rarities = {
    common: { name: "Common", color: "#bdc3c7", priceMult: 1, powerMult: 1 },
    rare: { name: "Rare", color: "#3498db", priceMult: 5, powerMult: 3 },
    epic: { name: "Epic", color: "#9b59b6", priceMult: 15, powerMult: 8 },
    legendary: { name: "Legendary", color: "#f1c40f", priceMult: 50, powerMult: 25 }
};

window.shopItems = [];

// Автогенерація 45 видів зброї (пістолети, автомати, дробовики тощо)
const weaponNames = ["Пістолет", "Дробовик", "Гвинтівка", "Автомат", "УЗІ", "РПГ", "Лазер", "Мисливська", "Бластер"];
const weaponRarities = ["common", "rare", "epic", "legendary"];

let itemCounter = 1;

// Генеруємо зброю (9 типів * 4 рідкості = 36 видів зброї)
weaponNames.forEach((name) => {
    weaponRarities.forEach((rarity) => {
        let rData = window.rarities[rarity];
        window.shopItems.push({
            id: w_${itemCounter},
            name: ${name} "${rData.name}",
            type: "weapon",
            rarity: rarity,
            cost: Math.round(15 * itemCounter * rData.priceMult),
            bonus: Math.round(2 * itemCounter * rData.powerMult),
            icon: "⚔️"
        });
        itemCounter++;
    });
});

// Додаємо одяг (ще 9 предметів = разом 45+ предметів у магазині)
const clothesNames = ["Кепка", "Шолом", "Куртка", "Окуляри", "Чоботи", "Плащ", "Корона", "Костюм", "Маска"];
clothesNames.forEach((name, index) => {
    let rarity = "common";
    if (index > 2) rarity = "rare";
    if (index > 5) rarity = "epic";
    if (index == 8) rarity = "legendary";
    
    let rData = window.rarities[rarity];
    window.shopItems.push({
        id: c_${index},
        name: ${name} [${rData.name}],
        type: "clothes",
        rarity: rarity,
        cost: Math.round(30 * (index + 1) * rData.priceMult),
        bonus: Math.round(3 * (index + 1) * rData.powerMult),
        icon: "👕"
    });
});
