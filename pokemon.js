class Selectors {
    constructor(selectors) {
        this.elHP = document.getElementById(`health-${selectors}`);
        this.elProgressbar = document.getElementById(`progressbar-${selectors}`);
        this.elImg = document.getElementById(`img-${selectors}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors, attacks, img }) {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;
        this.img = img;

        this.renderHP();
        this.renderImg();
    }

    renderImg = () => {
        if (this.elImg && this.img) {
            this.elImg.src = this.img;
        }
    };

    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;
        elHP.innerText = `${current} / ${total}`;
    };

    renderProgressbarHP = () => {
        const { hp: { current, total }, elProgressbar } = this;
        const percent = (current / total) * 100;
        elProgressbar.style.width = percent + '%';

        elProgressbar.classList.remove('low', 'critical');
        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        }
    };

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    };

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }

        this.renderHP();

        if (typeof cb === 'function') {
            cb(count);
        }
    };
}

export default Pokemon;