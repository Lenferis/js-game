export const random = (max, min = 0) => {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
};

export const generateLog = (firstPerson, secondPerson, count) => {
    const { name: name1, hp: { current: damageHP, total: defaultHP } } = firstPerson;
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

    return logs[random(logs.length - 1, 0)];
};

export const countBtn = (count = 6, el) => {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count <= 0) {
            count = 0;
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    };
};