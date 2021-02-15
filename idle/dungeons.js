function calcMinDR(autoEatThreshold, combatTriangle, combatStyle) {
    let currHP = +$('#currHealth').val();
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            monster.minDR = Math.max(0, Math.ceil(Math.ceil(100 - currHP / monster.maxHit * (100 * autoEatThreshold)) / combatTriangle[combatStyle][monster.attackType]));
        });
    });
}
function calcReducedMaxHit(combatTriangle, combatStyle) {
    let currDR = +$('#currDR').val();
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            let damageModifier = Math.floor(currDR * combatTriangle[combatStyle][monster.attackType]);
            monster.reducedMaxHit = monster.maxHit - Math.floor(monster.maxHit * damageModifier / 100);
        });
    });
}
function calcHPneeded(combatTriangle, combatStyle, autoEatThreshold) {
    let currDR = +$('#currDR').val();
    DUNGEONS.forEach(dungeon => {
        dungeon.monsters.forEach(monster => {
            let damageModifier = Math.floor(currDR * combatTriangle[combatStyle][monster.attackType]);
            monster.reqHP = Math.max(100, Math.ceil((monster.maxHit - Math.floor(monster.maxHit * damageModifier / 100)) / autoEatThreshold / 10) * 10);
        });
    });
}
function updateDungeonTable() {
    // find highest dr monster in dungeon, return that monsters object, use to update table.
    const table = document.querySelectorAll('.dungeon-table tbody tr');
    let toughestFoeList = [];
    let combatStyleSelect = ["Melee", "Ranged", "Magic"];
    let currDR = +$('#currDR').val();
    DUNGEONS.forEach(dungeon => {
        let highestDR = Math.max(...dungeon.monsters.map(monster => monster.minDR));
        let highestReqHP = Math.max(...dungeon.monsters.map(monster => monster.reqHP));
        let highestHit = Math.max(...dungeon.monsters.map(monster => monster.reducedMaxHit));
        let toughestFoe;
        toughestFoe = dungeon.monsters.find(monster => monster.reducedMaxHit === highestHit);
        toughestFoe.dungHighDr = highestDR;
        toughestFoe.dungHighHit = highestReqHP;
        toughestFoeList.push(toughestFoe);
    });
    toughestFoeList.forEach((monster, i) => {
        let tablerow = table[i].querySelectorAll('td');
        tablerow[0].textContent = monster.dungHighDr;
        tablerow[1].textContent = monster.dungHighHit;
        tablerow[2].textContent = DUNGEONS[i].name;
        tablerow[3].textContent = monster.name;
        tablerow[4].textContent = combatStyleSelect[monster.attackType];
        tablerow[5].textContent = monster.maxHit;
        tablerow[6].textContent = monster.reducedMaxHit;
        // i want to change this so apply to entire row, not just each individual cell
        if (monster.minDR <= currDR) {
            tablerow.forEach(element => element.classList.add("idleable"));
        }
        else if (monster.minDR > currDR && tablerow[0].classList.contains("idleable")) {
            tablerow.forEach(element => element.classList.remove("idleable"));
        }
    });
    // 
    // tablerow[0].textContent = '99';
}
function updateMonsterTable() {
    let i = 0;
    const table = document.querySelectorAll('.monster-table tbody tr');
    let combatStyleSelect = ["Melee", "Ranged", "Magic"];
    let currDR = +$('#currDR').val();
    DUNGEONS.forEach(dungeon => {
        let dungeonName = dungeon.name;
        dungeon.monsters.forEach(monster => {
            let tablerow = table[i].querySelectorAll('td');
            tablerow[0].textContent = monster.minDR;
            tablerow[1].textContent = monster.reqHP;
            tablerow[2].textContent = dungeonName;
            tablerow[3].textContent = monster.name;
            tablerow[4].textContent = combatStyleSelect[monster.attackType];
            tablerow[5].textContent = monster.maxHit;
            tablerow[6].textContent = monster.reducedMaxHit;
            if (monster.minDR <= currDR) {
                tablerow.forEach(element => element.classList.add("idleable"));
            }
            else if (monster.minDR > currDR && tablerow[0].classList.contains("idleable")) {
                tablerow.forEach(element => element.classList.remove("idleable"));
            }
            i++;
        });
    });
}
function updatePlayerTable(autoEatThreshold, combatTriangle, combatStyle) {
    const table = document.querySelectorAll('.player-table tbody tr td');
    let currDR = +$('#currDR').val();
    let currHP = +$('#currHealth').val();
    table[1].textContent = currHP * autoEatThreshold;
    table[3].textContent = Math.ceil(currDR * combatTriangle[combatStyle][0]);
    table[5].textContent = Math.ceil(currDR * combatTriangle[combatStyle][1]);
    table[7].textContent = Math.ceil(currDR * combatTriangle[combatStyle][2]);
}
function getAutoEatThreshold(autoEatLevel) {
    switch (autoEatLevel) {
        case "0":
            return 0;
        case "1":
            return 0.2;
        case "2":
            return 0.3;
        case "3":
            return 0.4;
    }
}
function getCombatTriangle(gameMode) {
    switch (gameMode) {
        case "Normal":
            return [[1, 1.25, 0.5], [0.95, 1, 1.25], [1.25, 0.85, 1]];
        case "Hardcore":
            return [[1, 1.25, 0.25], [0.75, 1, 1.25], [1.25, 0.75, 1]];
    }
}
function getCombatStyle(style) {
    switch (style) {
        case "Melee":
            return 0;
        case "Ranged":
            return 1;
        case "Magic":
            return 2;
    }
}
function doTheThing() {
    let autoEatThreshold = getAutoEatThreshold(document.getElementById('autoEatDropDown').innerText.trim());
    let combatStyle = getCombatStyle(document.getElementById('combatStyleDropDown').innerText.trim());
    let combatTriangle = getCombatTriangle(document.getElementById('gameModeDropDown').innerText.trim());
    calcMinDR(autoEatThreshold, combatTriangle, combatStyle);
    calcReducedMaxHit(combatTriangle, combatStyle);
    calcHPneeded(combatTriangle, combatStyle, autoEatThreshold);
    updateDungeonTable();
    updateMonsterTable();
    updatePlayerTable(autoEatThreshold, combatTriangle, combatStyle);
    localSave();
}
//# sourceMappingURL=dungeons.js.map