const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';

    this.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        this.elProgressbar.classList.add('critical');
    } else if (percent < 60) {
        this.elProgressbar.classList.add('low');
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        $btnKick.disabled = true;
        $btnSpecial.disabled = true;
    }

    this.renderHP();
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP
};

function random(num) {
    return Math.ceil(Math.random() * num);
}

function makeAttack(characterDamageMax, enemyDamageMax) {
    character.changeHP(random(characterDamageMax));
    enemy.changeHP(random(enemyDamageMax));
}

$btnKick.addEventListener('click', function () {
    console.log('Thunder Jolt!');
    makeAttack(20, 20); 
});

$btnSpecial.addEventListener('click', function () {
    console.log('Special Attack!');
    makeAttack(15, 35); 
});

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

init();