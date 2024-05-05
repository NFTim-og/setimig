import Player from './player.js';
import Computer from './computer.js';
import Deck from './deck.js';

class Game {
    constructor() {
        this.player = new Player("Player");
        this.computer = new Computer("Computer");
        this.deck = new Deck();
    }

    initGame() {
        this.deck.shuffle();

        // Deal initial cards to the player
        let playerCard = this.deck.pop();
        let playerCardImg = document.createElement("img");
        playerCardImg.src = "./baralla/" + playerCard + ".jpg";
        this.player.cards.push(playerCard);
        this.player.calculatePoints();
        document.getElementById("player-cards").append(playerCardImg);

        // Deal initial cards to the dealer
        let computerCard = this.deck.pop();
        let computerCardImg = document.createElement("img");
        computerCardImg.src = "./baralla/" + computerCard + ".jpg";
        this.computer.cards.push(computerCard);
        this.computer.calculatePoints();
        computerCardImg.classList.add('firstCardHidden');
        document.getElementById("dealer-cards").append(computerCardImg);
    }

    dealCard(player, numCards) {
        for (let i = 0; i < numCards; i++) {
            let playerCardImg = document.createElement("img");
            let card = this.deck.pop();
            playerCardImg.src = "./baralla/" + card + ".jpg";
            player.cards.push(card);
            player.calculatePoints();
            document.getElementById("player-cards").append(playerCardImg);
        }
    }

    hit() {
        if (this.player.sum > 7.5) {
            alert("No pots demanar carta!");
            return;
        }

        this.dealCard(this.player, 1);

        if (this.player.sum > 7.5) {
            this.canHit = false;
            let message = "T'has passat!";
            document.getElementById("results").innerText = message;
        }

        document.getElementById("player-sum").innerText = this.player.sum;
    }

    stand() {
        this.canHit = false;

        /*Allow the dealer to draw cards until their sum is greater than
        or equal to the player's sum or until they reach 7.5*/
        while (this.computer.sum < this.player.sum && this.computer.sum < 7.5) {
            let card = this.deck.pop();
            this.computer.sum += this.getValue(card);
            let cardImg = document.createElement("img");
            cardImg.src = "./baralla/" + card + ".jpg";
            document.getElementById("computer-cards").append(cardImg);
            this.computer.calculatePoints();
        }

        // Remove the 'firstCardHidden' class from the first dealer card
        let dealerCards = document.getElementById("computer-cards");
        let firstCard = dealerCards.getElementsByClassName("firstCardHidden")[0];
        firstCard.classList.remove("firstCardHidden");

        document.getElementById("computer-sum").innerText = this.computer.sum;

        let message = ""; // Initialize message variable

        document.getElementById("results").innerText = message;
    
        if (this.player.sum > 7.5) {
            message = "Has perdut...";
        } else {
            if (this.player.sum > 7.5 && this.player.sum == this.computer.sum && this.computer.sum > this.player.sum) {
                message = "Has perdut...";
            } else if (this.computer.sum > 7.5 && this.player.sum <= 7.5) {
                message = "Has guanyat!";
            } else if (this.player.sum <= 7.5 && this.computer.sum <= 7.5) {
                if (this.player.sum > this.computer.sum) {
                    message = "Has guanyat!";
               } else if (this.player.sum < this.computer.sum) {
                    message = "Has perdut...";
                } else {
                    message = "Has perdut..."; // If both have the same sum, dealer wins
                }
            }
        }

        document.getElementById("results").innerText = message;
    
    }

    getValue(card) {
        let data = card.split("_");
        let value = data[1];

        if (value == "10" || value == "11" || value == "12") {
            return 0.5;
        }

        return parseInt(value);
    }
}

export default Game;