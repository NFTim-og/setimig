let dealerSum = 0;
let playerSum = 0;

var dealerMigCount = 0;
var playerMigCount = 0; //10, 11, 12

var hidden;
var deck;

let canHit = true; //allows the player to draw while his/her sum is less than 7,5

window.onload = function() {
    let myDeck = new Deck();
    myDeck.shuffleDeck();
    startGame(myDeck);
}

function startGame(deck) {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerMigCount += checkMig(hidden);


    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./baralla/" + card + ".jpg";
        dealerSum += getValue(card);
        dealerMigCount += checkMig(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./baralla/" + card + ".jpg";
        playerSum += getValue(card);
        playerMigCount += checkMig(card);
        document.getElementById("player-cards").append(cardImg);
    }

    if (playerSum >= 7.5) {
        canHit = false;
    }

    console.log(`Before hit: playerSum = ${playerSum}, playerMigCount = ${playerMigCount}`);
    document.getElementById("hit").addEventListener("click", function() {
        hit(deck);
        console.log(`After hit: playerSum = ${playerSum}, playerMigCount = ${playerMigCount}`);
    });
    document.getElementById("stand").addEventListener("click", function() {
        stand(deck);
    });

    document.getElementById("player-sum").innerText = playerSum;
}

function stand(deck) {
    canHit = false;

    /*Allow the dealer to draw cards until their sum is greater than
    or equal to the player's sum or until they reach 7.5*/
    while (dealerSum < playerSum && dealerSum < 7.5) {
        let card = deck.pop();
        dealerSum += getValue(card);
        dealerMigCount += checkMig(card);
        let cardImg = document.createElement("img");
        cardImg.src = "./baralla/" + card + ".jpg";
        document.getElementById("dealer-cards").append(cardImg);
    }
    
    document.getElementById("hidden").src = "./baralla/" + hidden + ".jpg";

    let message = ""; // Initialize message variable

    if (playerSum > 7.5) {
        message = "Has perdut...";
    } else {
        if (playerSum > 7.5 && playerSum == dealerSum && dealerSum > playerSum) {
            message = "Has perdut...";
        } else if (dealerSum > 7.5 && playerSum <= 7.5) {
            message = "Has guanyat!";
        } else if (playerSum <= 7.5 && dealerSum <= 7.5) {
            if (playerSum > dealerSum) {
                message = "Has guanyat!";
            } else if (playerSum < dealerSum) {
                message = "Has perdut...";
            } else {
                message = "Has perdut..."; // If both have the same sum, dealer wins
            }
        }
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;

    document.getElementById("results").innerText = message;
}


function hit(deck) {
    if (!canHit) {
        alert("No pots demanar carta!");
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./baralla/" + card + ".jpg";
    playerSum += getValue(card);
    playerMigCount += checkMig(card);
    document.getElementById("player-cards").append(cardImg);

    if (playerSum >= 7.5) {
        canHit = false;
    }

    document.getElementById("player-sum").innerText = playerSum;
}

function getValue(card) {
    let data = card.split("_");
    let value = data[1];

    if (value == "10" || value == "11" || value == "12") {
        return 0.5;
    }

    return parseInt(value);
}

function checkMig(card) {
    if (parseInt(card[0]) == 10) {
        return 0.5;
    }
    if (parseInt(card[0]) == 11) {
        return 0.5;
    }
    if (parseInt(card[0]) == 12) {
        return 0.5;
    } else {
        return 0;
    }
}