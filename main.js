const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.querySelector('#logs');

function renderHPLife() {
    const { elHP, damageHP, defaultHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {
    const { damageHP, defaultHP, elProgressbar } = this;
    const percent = (damageHP / defaultHP) * 100;
    elProgressbar.style.width = percent + '%';

    elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        elProgressbar.classList.add('critical');
    } else if (percent < 60) {
        elProgressbar.classList.add('low');
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
        const { name } = this;
        alert(`Бідний ${name} програв бій!`);
        $btnKick.disabled = true;
        $btnSpecial.disabled = true;
    }

    this.renderHP();

    const enemyObj = this === character ? enemy : character;
    const log = generateLog(this, enemyObj, count);

    const $p = document.createElement('p');$p.innerText = log;
    $logs.insertBefore($p,$logs.children[0]);
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

function generateLog(firstPerson, secondPerson, count) {
    const { name: name1, damageHP, defaultHP } = firstPerson;
    const { name: name2 } = secondPerson;

    const logs = [
        `[${name1}] згадав щось важливе, але несподівано [${name2}], не тямлячи себе від переляку, вдарив у передпліччя ворога. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] поперхнувся, і за це [${name2}] з переляку завдав прямого удару коліном у лоб ворога. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] забувся, але в цей час наглий [${name2}], прийнявши вольове рішення, непомітно підійшовши ззаду, вдарив. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] прийшов до тями, але несподівано [${name2}] випадково завдав найпотужнішого удару. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] поперхнувся, але в цей час [${name2}] неохоче роздробив кулаком захист супротивника. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] здивувався, а [${name2}], похитнувшись, вліпив підлий удар. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] висморкався, але несподівано [${name2}] провів дробильний удар. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] похитнувся, і раптом наглий [${name2}] безпричинно вдарив у ногу супротивника. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] засмутився, як раптом несподівано [${name2}] випадково вліпив стопою в живіт суперника. -${count}, [${damageHP}/${defaultHP}]`,
        `[${name1}] намагався щось сказати, але раптом несподівано [${name2}] від нудьги розбив брову супернику. -${count}, [${damageHP}/${defaultHP}]`
    ];

    return logs[random(logs.length) - 1];
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