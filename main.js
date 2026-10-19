const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    const percent = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbar.style.width = percent + '%';

    person.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        person.elProgressbar.classList.add('critical');
    } else if (percent < 60) {
        person.elProgressbar.classList.add('low');
    }
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function changeHP(count, person) {
    person.damageHP -= count;

    if (person.damageHP <= 0) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btnKick.disabled = true;
        $btnSpecial.disabled = true;
    }

    renderHP(person);
}

function makeAttack(characterDamageMax, enemyDamageMax) {
    changeHP(random(characterDamageMax), character);
    changeHP(random(enemyDamageMax), enemy);
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
    renderHP(character);
    renderHP(enemy);
}

init();