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
        document.getElementById("player-sum").innerText = this.player.points;

        // Deal initial cards to the computer
        let computerCard = this.deck.pop();
        let computerCardImg = document.createElement("img");
        computerCardImg.src = "./baralla/" + computerCard + ".jpg";
        this.computer.cards.push(computerCard);
        this.computer.calculatePoints();
        computerCardImg.classList.add('firstCardHidden');
        document.getElementById("computer-cards").append(computerCardImg);
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
        if (this.player.points > 7.5) {
            alert("No pots demanar més cartes!");
            return;
        }

        this.dealCard(this.player, 1);

        if (this.player.points > 7.5) {
            let message = "T'has passat!";
            document.getElementById("results").innerText = message;
        }

        document.getElementById("player-sum").innerText = this.player.points;
    }

    stand() {

        /*Allow the computer to draw cards until their points are greater than
        or equal to the player's points or until they reach 7.5*/
        while (this.computer.points < this.player.points && this.computer.points < 7.5) {
            let card = this.deck.pop();
            this.computer.points += this.computer.calculatePoints();
            let computerCardImg = document.createElement("img");
            computerCardImg.src = "./baralla/" + card + ".jpg";
            document.getElementById("computer-cards").append(computerCardImg);
            document.getElementById("computer-sum").innerText = this.computer.points;
        }

        // Remove the 'firstCardHidden' class from the first computer card
        let computerCards = document.getElementById("computer-cards");
        let firstCard = computerCards.getElementsByClassName("firstCardHidden")[0];
        firstCard.classList.remove("firstCardHidden");

        document.getElementById("computer-sum").innerText = this.computer.points;

        let message = ""; // Initialize message variable

        document.getElementById("results").innerText = message;
    
        if (this.player.points > 7.5) {
            message = "Has perdut...";
        } else {
            if (this.player.points > 7.5 && this.player.points == this.computer.points && this.computer.points > this.player.points) {
                message = "Has perdut...";
            } else if (this.computer.points > 7.5 && this.player.points <= 7.5) {
                message = "Has guanyat!";
            } else if (this.player.points <= 7.5 && this.computer.points <= 7.5) {
                if (this.player.points > this.computer.points) {
                    message = "Has guanyat!";
               } else if (this.player.points < this.computer.points) {
                    message = "Has perdut...";
                } else {
                    message = "Has perdut..."; // If both have the same points, computer wins
                }
            }
        }

        document.getElementById("results").innerText = message;
    
    }
}

export default Game;