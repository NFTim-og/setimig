import Player from './player.js';

class Computer extends Player {
    constructor() {
        super();
    }

    calculatePoints() {
        let points = 0;

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            points += card.getValue();
        }
        this.points = points;

        return points;
    }
}

export default Computer;