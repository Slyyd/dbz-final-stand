import Character from "../js/classes/Character.js";

let raceSelector = document.getElementById("raceSelector")

let statsDiv = document.getElementById("statsDiv");

let raceSpan = document.getElementById("raceSpan");
let levelInput = document.getElementById("levelInput");
let spSpan = document.getElementById("spSpan");
let spInput = document.getElementById("spInput");

let healthmaxSpan = document.getElementById("healthmaxSpan");
let kimaxSpan = document.getElementById("kimaxSpan");
let meleedmgSpan = document.getElementById("meleedmgSpan");
let kidmgSpan = document.getElementById("kidmgSpan");
let meleeresSpan = document.getElementById("meleeresSpan");
let kiresSpan = document.getElementById("kiresSpan");
let speedSpan = document.getElementById("speedSpan");

let addButtons = document.querySelectorAll(".addBtns");

let prestigeSpan = document.getElementById("prestigeSpan");
let deadSpan = document.getElementById("deadSpan");
let rebirthSpan = document.getElementById("rebirthSpan");
let prestigeButton = document.getElementById("prestigeButton");
let deadButton = document.getElementById("deadButton");
let rebirthButton = document.getElementById("rebirthButton");

let currentCharacter;

let oldLevel = 0;

levelInput.addEventListener("input", updateLevel);

raceSelector.addEventListener("change", changeRace);

prestigeButton.addEventListener("click", addPrestige);
deadButton.addEventListener("click", goToHeaven);
rebirthButton.addEventListener("click", addRebirth);

for (const i of addButtons) {
    i.addEventListener("click", addSkillPoint);
}


function changeRace() {
    if (raceSelector.value == "None") {return;}
    oldLevel = 0;
    currentCharacter = new Character(raceSelector.value);
    updateFront();
}

function updateLevel(e) {
    if (!currentCharacter) {return;}
    
    currentCharacter.Level = e.target.value;
    console.log(oldLevel)
    currentCharacter.calcPoints(oldLevel);

    oldLevel = e.target.value;

    updateFront();
}

function addPrestige() {
    currentCharacter.doPrestige();
    oldLevel = 0;
    updateFront();
}

function goToHeaven() {
    currentCharacter.goToHeaven();
    updateFront();
}

function addRebirth() {
    currentCharacter.doRebirth();
    oldLevel = 0;
    updateFront();
}

function addSkillPoint(e) {
    currentCharacter.addSkillPoints(e.target.id, parseInt(spInput.value));
    updateFront();
}

function updateFront() {
    
    levelInput.value = currentCharacter.Level;
    spSpan.textContent = currentCharacter.FreePoints;

    healthmaxSpan.textContent = currentCharacter.Stats["HealthMax"]
    kimaxSpan.textContent = currentCharacter.Stats["KiMax"]
    meleedmgSpan.textContent = currentCharacter.Stats["MeleeDamage"]
    kidmgSpan.textContent = currentCharacter.Stats["KiDamage"]
    meleeresSpan.textContent = currentCharacter.Stats["MeleeResistance"]
    kiresSpan.textContent = currentCharacter.Stats["KiResistance"]
    speedSpan.textContent = currentCharacter.Stats["Speed"]

    prestigeSpan.textContent = currentCharacter.Prestige;
    deadSpan.textContent = currentCharacter.isDead;
    rebirthSpan.textContent = currentCharacter.Rebirth;
}