class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    toString() {
        return 'Suit: ${this.suit}, Value: ${this.value}';
    }
}