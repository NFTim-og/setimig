class Deck {
    constructor() {
        this.cards = [];
        this.types = ["bastos", "copas", "espadas", "oros"];
        this.values = ["1", "2", "3", "4", "5", "6", "7", "10", "11", "12"];

        for (let type of this.types) {
            for (let value of this.values) {
                this.cards.push(type + "_" + value);
            }
        }
    }

    shuffleDeck() {
        for (let i = 0; i < this.cards.length; i++) {
            let j = Math.floor(Math.random() * this.cards.length); //Random number
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    pop() {
        return this.cards.pop();
    }

    push(card) {
        this.cards.push(card);
    }

    toString() {
        return this.cards.join(', ');
    }
}