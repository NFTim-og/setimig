import Player from './player.js';

class Computer extends Player {
    constructor() {
        super();
        this.hiddenCard = null;
    }

    calculatePoints() {
        let points = 0;

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            points += card.getValue();
        }

        if (this.hiddenCard) {
            let hiddenValue = this.hiddenCard.split("_")[1];

            if (hiddenValue === "10" || hiddenValue === "11" || hiddenValue === "12") {
                points += 0.5;
            } else {
                points += parseInt(hiddenValue);
            }
        }

        return points;
    }
}

export default Computer;