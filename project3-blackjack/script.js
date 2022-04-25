// Blackjack Base Game Walkthrough
// 1. Playable game with minimum function: creating deck, shuffling, dealing cards, evaluate winner
// 2. Ability for the player to hit or stand
// 3. Ability for the dealer to hit or stand
// 4. Value of Ace to be 1 or 11.

// ======== Pseudocode for Version 1 ========== //
// 1. Define player and dealer
// 2. Create and shuffle a game deck
// 3. Draw 2 cards for player and dealer respectively
// 4. Check for win conditions
//    -- blackjack
//    -- higher hand value
// 5. display hands of both player and dealer and declare winner

// ========= GLOBAL VARIABLE ========= //

// Declare game modes
var GAME_MODE_PLACE_BETS = `place bets`;
var GAME_START = `game start`;
var GAME_RESULTS_SHOWN = `results shown`;
var GAME_HIT_OR_STAND = `hit or stand`;
var currentGameMode = GAME_MODE_PLACE_BETS;

// Declare variables to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects

var playerHand = [];
var dealerHand = [];
var playerChipCount = 100;
var currentRoundPlayerBet = 0;
var outputMessage = ``;
var splitPlayerHand = [];

// Keep Score
var playerHandTotalValue = ``;
var dealerHandTotalValue = ``;

// Buttons
var buttons = document.getElementById(`buttons`);
var hitButton = document.createElement(`button`);
buttons.appendChild(hitButton);
hitButton.textContent = `Hit`;
hitButton.style.display = `none`;
var standButton = document.createElement(`button`);
buttons.appendChild(standButton);
standButton.textContent = `Stand`;
standButton.style.display = `none`;

/*================================================*/
/*================== GAME IMAGES =================*/
/*================================================*/
//https://c.tenor.com/wIxFiobxxbIAAAAd/john-jonah-jameson-lol.gif

var triedYourBestImg = `<img src="https://c.tenor.com/eofFOQr4ycoAAAAC/try-so-hard-but-you-dont-succeed-fail.gif"/>`;

var cryImg = `<img src="https://c.tenor.com/qm6ErRtDZfUAAAAd/ouin-pleur.gif"/>`;

var babyCelebrateImg = `<img src="https://c.tenor.com/Cd2vV8ZOuzoAAAAd/bb-baby.gif"/>`;

var kThxByeImg = `<img src="https://c.tenor.com/9iw34vIDwVoAAAAC/michael-urie-redmond.gif"/>`;

var moneyAngelImg = `<img src = "https://c.tenor.com/VjfzMphtCDYAAAAC/money-angel.gif"/>`;

var prayingImg = `<img src = "https://c.tenor.com/B25um8RTgfIAAAAC/nervous-sign-of-the-cross.gif"/>`;

var hitItImg = `<img src = "https://c.tenor.com/PM9CNDYZenMAAAAC/hit-it-dj-music-on.gif"/>`;

var doItImg = `<img src = "https://c.tenor.com/bXAKEBgc_D0AAAAC/do-it-what-are-you-waiting-for.gif"/>`;

var nodImg = `<img src = "https://c.tenor.com/-kHJ5bxUwisAAAAd/smile-nod.gif">`;

var danceImg = `<img src = "https://c.tenor.com/39bRj_CKtFUAAAAC/whoop-dance.gif">`;

var bondImg = `<img src = "https://c.tenor.com/Yw7STJhV-JgAAAAd/daniel-craig-james-bond.gif"/>`;

var handShakeImg = `<img src = "https://c.tenor.com/ytbz1Epg7Q8AAAAC/predator-arnold.gif"/>`;

var facePalmImg = `<img src = "https://c.tenor.com/8JC0Q8897jwAAAAd/facepalm-picard.gif"/>`;

var phewImg = `<img src = "https://c.tenor.com/0kwCaACwAUwAAAAC/dwight-the-office.gif"/>`;

var selfDestructImg = `<img src = "https://c.tenor.com/SzfO_CqZSRwAAAAC/chicken-chicken-bro.gif"/>`;

var whiteFlagImg = `<img src = "https://c.tenor.com/85IVfl04Z8UAAAAd/tom-and-jerry-waving-white-flag.gif"/>`;

var bigBallsImg = `<img src = "https://c.tenor.com/VKsXSVwgvokAAAAC/domletty.gif"/>`;
/*================================================*/
/*=============== HELPER FUNCTIONS ===============*/
/*================================================*/
// Declare variable to hold deck of cards
var gameDeck = "";
// Create deck

var createDeck = function () {
  var deck = [];
  var suits = [`spades`, `hearts`, `clubs`, `diamonds`];
  console.log(`the suits are`, suits);

  // Loop over the suits array
  for (var i = 0; i < suits.length; i += 1) {
    console.log(`control flow: suits array for loop is being executed`);
    // Store the current suit in a variable
    var currentSuit = suits[i];
    console.log(`the current suit is`, currentSuit);
    var suitEmoji = 0;
    if (currentSuit === `spades`) {
      suitEmoji = "♠️";
    } else if (currentSuit === `hearts`) {
      suitEmoji = "♥️";
    } else if (currentSuit === `clubs`) {
      suitEmoji = "♣️";
    } else {
      suitEmoji = "♦️";
    }

    // Create an internal loop, for the 13 cards in a suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      console.log(`control flow: rankCounter array for loop is being executed`);
      // Declare a variable "cardName"
      var cardName = rankCounter;
      // If cardName is 1, 11, 12, 13, assign a special name "ace", "jack", "queen", "king"
      if (rankCounter === 1) {
        cardName = "A";
      } else if (rankCounter === 11) {
        cardName = "J";
      } else if (rankCounter === 12) {
        cardName = "Q";
      } else if (rankCounter === 13) {
        cardName = "K";
      }

      // Define a new variable called card, with the current name, suit and rank
      var card = {
        name: cardName,
        suits: currentSuit,
        rank: rankCounter,
        suitEmoji: suitEmoji
      };

      // Add the new card to the deck
      deck.push(card);
    }
  }
  return deck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentCard = cards[index];
    var randomCard = cards[randomIndex];
    cards[index] = randomCard;
    cards[randomIndex] = currentCard;
    index += 1;
  }
  return cards;
};

// function that creates and shuffles a deck
var createShuffledDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

/*==============================================*/
/*=============== GAME FUNCTIONS ===============*/
/*==============================================*/

// Function that checks a hand for blackjack
var checkForBlackJack = function (handArray) {
  var cardOne = handArray[0];
  var cardTwo = handArray[1];
  var isBlackjack = false;

  // check player hand
  // if there is a blackjack, return true
  // Possible scenarios:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card ace
  if (
    (cardOne.name === `A` && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name === `A`)
  ) {
    isBlackjack = true;
  }

  // else return false - don't need statement because variable already declared as false
  return isBlackjack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen and king, value is 10;
    if (
      currentCard.name === `J` ||
      currentCard.name === `Q` ||
      currentCard.name === `K`
    ) {
      totalHandValue += 10;
    } else if (currentCard.name === `A`) {
      totalHandValue = totalHandValue + 11;
      aceCounter += 1;
    } else {
      totalHandValue += currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// Function that displays the player and dealer hands in a message

var displayPlayerAndDealerHands = function (
  playerHandArray,
  dealerHandArray,
  hideOneCard
) {
  //player hand
  var playerMessage = `Player's Hand: <br>`;
  for (var i = 0; i < playerHandArray.length; i += 1) {
    playerMessage += `${playerHandArray[i].name} of ${playerHandArray[i].suitEmoji} | `;
  }
  var hidden = 0;
  if (hideOneCard === true) {
    hidden = 1;
  }

  var dealerMessage = `Dealer's Hand: <br>`;
  for (var j = hidden; j < dealerHandArray.length; j += 1) {
    dealerMessage += `${dealerHandArray[j].name} of ${dealerHandArray[j].suitEmoji} | `;
  }
  return `${playerMessage} <br><br> ${dealerMessage}`;
};

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage = `Player total hand value: ${playerHandValue} <br> Dealer total hand value: ${dealerHandValue}`;

  return totalHandValueMessage;
};

var displayGameInstructions = function (playerHandValue) {
  if (playerHandValue < 11) {
    return `You have less than 11. Even my grandmother knows that you should  hit. <br><br> ${doItImg}`;
  } else if (playerHandValue === 11) {
    return `Wow! I would double down if I can!!<br><br> ${doItImg}`;
  } else if (playerHandValue === 12) {
    return `Okay.. You're at 12 right now. Your chance of busting if you hit is currently 30%.<br><br> ${hitItImg}`;
  } else if (playerHandValue === 13) {
    return `Okay.. You're at 13 right now. Your chance of busting if you hit is currently 38%.<br><br>${hitItImg}`;
  } else if (playerHandValue === 14) {
    return `Okay.. You're at 14 right now. Your chance of busting if you hit is currently 46%.<br><br> ${prayingImg}`;
  } else if (playerHandValue === 15) {
    return `Okay.. You're at 15 right now. Your chance of busting if you hit is currently 53%.<br><br> ${prayingImg}`;
  } else if (playerHandValue === 16) {
    return `This is suuuper tricky. Go big or go home <br><br> ${prayingImg}`;
  } else if (playerHandValue >= 17 && playerHandValue <= 20) {
    return `Awesome! Now, don't take unnecessary risks..... <br><br> ${nodImg}`;
  } else if (playerHandValue === 21) {
    return `Whooop! 21!! If you hit, you're either too rich or you really need to read the rulebook.<br><br>${danceImg}`;
  }
};

var checkForBust = function (handValue) {
  var isBust = false;
  if (handValue > 21) {
    isBust = true;
  }
  return isBust;
};

var displayChipCountInfo = function (chipCount) {
  return `Your current chip count is $${chipCount}`;
};

var resetBJ = function () {
  playerHand = [];
  dealerHand = [];
  currentRoundPlayerBet = 0;
  currentGameMode = GAME_MODE_PLACE_BETS;
};

/*============ EVENT LISTENERS==============*/
// hitButton.addEventListener("click", function () {
//   console.log(`The hit button is working`);
//   playerHand.push(gameDeck.pop());
//   console.log(`the current player cards are`, playerHand);
//   // Calculate the total hand value of both player and dealer
//   playerHandTotalValue = calculateTotalHandValue(playerHand);
//   dealerHandTotalValue = calculateTotalHandValue(dealerHand);
//   console.log(`player's total hand value is `, playerHandTotalValue);
//   outputMessage = `${displayPlayerAndDealerHands(
//     playerHand,
//     dealerHand
//   )} <br><br> You drew another card. <br><br> ${displayHandTotalValues(
//     playerHandTotalValue,
//     dealerHandTotalValue
//   )} <br><br> Please type "hit" to hit or "stand" to stand. <br><br> ${displayGameInstructions(
//     playerHandTotalValue
//   )}`;

//   // Check if player bust
//   var playerBust = checkForBust(playerHandTotalValue);
//   if (playerBust === true) {
//     outputMessage = `🔥 Oops! You went bust!🔥 <br><br> ${displayChipCountInfo(
//       playerChipCount
//     )}<br><br> It's okay, this is just a game of cards afterall. It's not your life or mine. Please place your bets to continue playing.<br><br>${selfDestructImg}`;
//     resetBJ();
//     return main();
//   }
//   return main();
// });

/*==============================================*/
/*=============== MAIN FUNCTIONS ===============*/
/*==============================================*/

var main = function (input) {
  if (currentGameMode === GAME_MODE_PLACE_BETS) {
    currentRoundPlayerBet = input;
    if (!input) {
      return `Please place your bets by entering a numerical number! <br><br> You have $${playerChipCount} to play with, enter the amount you wish to bet.${bondImg}`;
    }
    if (currentRoundPlayerBet > playerChipCount) {
      return `You're betting $${currentRoundPlayerBet} when you only have $${playerChipCount}. You don't have enough money to bet. Please call 1800 668 8668 if you have the urge to borrow from your friend (and please don't take your child's piggybank) <br><br> ${cryImg}`;
    }
    if (isNaN(currentRoundPlayerBet)) {
      return `Please enter a numeric number to place your bets. <br><br>${facePalmImg}`;
    }
    currentGameMode = GAME_START;
  }
  // FIRST CLICK
  if (currentGameMode === GAME_START) {
    console.log(`control flow: if the current game mode is GAME_START `);
    playerChipCount = playerChipCount - currentRoundPlayerBet;
    console.log(`current player chip amount`, playerChipCount);
    // Create the game deck
    gameDeck = createShuffledDeck();
    console.log(gameDeck);

    //Deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // Debug code to check for blackjack
    // playerHand = [
    //   { name: `A`, suits: `spades`, rank: 1, suitEmoji: `♠️` },
    //   { name: `10`, suits: `spades`, rank: 10, suitEmoji: `♠️` }
    // ];

    // dealerHand = [
    //   { name: `A`, suits: `spades`, rank: 1, suitEmoji: `♠️` },
    //   { name: `10`, suits: `spades`, rank: 10, suitEmoji: `♠️` }
    // ];

    console.log(`player hand ==>`, playerHand);
    console.log(`dealer hand ==>`, dealerHand);

    // Calculate the total hand value of both player and dealer
    playerHandTotalValue = calculateTotalHandValue(playerHand);
    dealerHandTotalValue = calculateTotalHandValue(dealerHand);

    // check for blackjack

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    // If player has blackjack, player wins, even if dealer has blackjack, game will rest and will prompt user to place their bets

    if (
      (playerHasBlackJack === true && dealerHasBlackJack === false) ||
      (playerHasBlackJack === true && dealerHasBlackJack === true)
    ) {
      playerChipCount += 2.5 * currentRoundPlayerBet;
      console.log(
        `in the case of user black jack, player chip count: `,
        playerChipCount
      );

      outputMessage = `🍾 YOU GOT BLACKJACK! 🍾 <br> Congratulations, you won $${
        2.5 * currentRoundPlayerBet
      }! <br><br> ${displayChipCountInfo(
        playerChipCount
      )} <br><br> Please place your bets to continue playing!<br><br>${displayPlayerAndDealerHands(
        playerHand,
        dealerHand,
        false
      )}<br><br>${moneyAngelImg}`;
      resetBJ();
      return outputMessage;
    }

    // if dealer has blackjack, user loses, game resets and will prompt user to place their bets
    if (playerHasBlackJack === false && dealerHasBlackJack === true) {
      outputMessage = `🤬 DEALER HAS BLACKJACK! 🤬 <br> Too bad, you lost! <br><br> ${displayChipCountInfo(
        playerChipCount
      )}<br><br>Please place your bets to continue playing!<br><br>${displayPlayerAndDealerHands(
        playerHand,
        dealerHand,
        false
      )}<br><br>${kThxByeImg}`;
      resetBJ();
      return outputMessage;
    }

    // If no Blackjack, game continues
    // Progress the gameMode
    currentGameMode = GAME_HIT_OR_STAND;
    outputMessage = `You bet $${currentRoundPlayerBet}.<br><br> Heads up! Input "hit", "stand", "surrender" or "double down"! Clock's ticking.. <br><br>${displayPlayerAndDealerHands(
      playerHand,
      dealerHand,
      true
    )} <br><br> Your current hand value is ${playerHandTotalValue} <br><br> ${displayGameInstructions(
      playerHandTotalValue
    )}`;

    return outputMessage;
  }

  if (currentGameMode === GAME_HIT_OR_STAND) {
    console.log(`The current game mode is`, currentGameMode);

    if (
      input !== "hit" &&
      input !== "stand" &&
      input !== "double down" &&
      input !== "surrender"
    ) {
      return `Please input "hit", "stand", "surrender" or "double down" to play the game <br><br>${displayChipCountInfo(
        playerChipCount
      )}<br>----------<br> ${displayPlayerAndDealerHands(
        playerHand,
        dealerHand,
        true
      )}`;
    }
    console.log(`control flow: game state === GAME_HIT_OR_STAND`);

    // If Player Surrenders
    if (input === `surrender`) {
      playerChipCount += 0.5 * currentRoundPlayerBet;

      outputMessage = `You waved the white flag. Let's see if you made the right decision. <br><br> ${displayChipCountInfo(
        playerChipCount
      )}<br><br>${displayPlayerAndDealerHands(
        playerHand,
        dealerHand,
        false
      )} <br><br>
      Please place your bets to start the next round.<br><br> ${whiteFlagImg}`;
      resetBJ();
      return outputMessage;
    }

    // If Player double down after hitting,

    if (playerHand.length > 2 && input === `double down`) {
      return `It's too late to double down. Please input "hit" or "stand" to play.`;
    }

    // If Player Hits

    if (input === `hit`) {
      playerHand.push(gameDeck.pop());

      console.log(`the current player cards are`, playerHand);
      // Calculate the total hand value of both player and dealer
      playerHandTotalValue = calculateTotalHandValue(playerHand);
      dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      outputMessage = `${displayPlayerAndDealerHands(
        playerHand,
        dealerHand,
        true
      )} <br><br> You drew another card. <br><br> Your current hand value is ${playerHandTotalValue}<br><br>  Please type "hit" to hit or "stand" to stand. <br><br> ${displayGameInstructions(
        playerHandTotalValue
      )}`;

      // Check if player bust
      var playerBust = checkForBust(playerHandTotalValue);
      if (playerBust === true) {
        outputMessage = `🔥 Oops! You went bust!🔥 <br><br> ${displayChipCountInfo(
          playerChipCount
        )}<br><br>${displayPlayerAndDealerHands(
          playerHand,
          dealerHand,
          false
        )}<br><br> Please place your bets to start the next round.<br><br> ${selfDestructImg}`;
        resetBJ();
        return outputMessage;
      }
      return outputMessage;
    } else if (input === `stand`) {
      currentGameMode = GAME_RESULTS_SHOWN;
      playerHandTotalValue = calculateTotalHandValue(playerHand);
      dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      var dealerBust = checkForBust(dealerHandTotalValue);

      if (dealerBust === true) {
        playerChipCount += 2 * currentRoundPlayerBet;
        console.log(`the current player chip count is`, playerChipCount);
        console.log(`player bets`, currentRoundPlayerBet);
        outputMessage = `🎉 You Won $${
          2 * currentRoundPlayerBet
        }! 🎉<br> Dealer got too greedy and went bust. <br><br> ${displayChipCountInfo(
          playerChipCount
        )}<br><br>Please place your bets to play again.<br><br>----------<br> ${displayPlayerAndDealerHands(
          playerHand,
          dealerHand,
          false
        )} <br><br> ${phewImg}`;

        resetBJ();

        return outputMessage;
      }
    } else if (input === `double down`) {
      playerHand.push(gameDeck.pop());
      playerChipCount = playerChipCount - currentRoundPlayerBet;
      currentRoundPlayerBet = 2 * currentRoundPlayerBet;

      playerHandTotalValue = calculateTotalHandValue(playerHand);
      dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      dealerBust = checkForBust(dealerHandTotalValue);

      if (dealerBust === true) {
        playerChipCount += 2 * currentRoundPlayerBet;
        console.log(`the current player chip count is`, playerChipCount);
        console.log(`player bets`, currentRoundPlayerBet);
        outputMessage = `🎉 You went big and won big! You Won $${
          2 * currentRoundPlayerBet
        }! 🎉 <br><br> Dealer got too greedy and went bust. <br><br> ${displayChipCountInfo(
          playerChipCount
        )}<br><br>Please place your bets to play again.<br><br>----------<br> ${displayPlayerAndDealerHands(
          playerHand,
          dealerHand,
          false
        )} <br><br> ${bigBallsImg}`;

        resetBJ();

        return outputMessage;
      }
      currentGameMode = GAME_RESULTS_SHOWN;
    }
    if (currentGameMode === GAME_RESULTS_SHOWN) {
      console.log(`control flow: the current game mode === GAME_RESULTS_SHOWN`);
      if (playerHandTotalValue === dealerHandTotalValue) {
        playerChipCount += 1 * currentRoundPlayerBet;
        console.log(`it's a tie! playerChipCount is`, playerChipCount);
        console.log(`it's a tie! Player bets`, currentRoundPlayerBet);
        outputMessage = `It's a tie!<br><br> ${displayChipCountInfo(
          playerChipCount
        )}<br><br>Please place your bets to play again.<br><br>----------<br><br>${displayPlayerAndDealerHands(
          playerHand,
          dealerHand,
          false
        )} <br><br> ${displayHandTotalValues(
          playerHandTotalValue,
          dealerHandTotalValue
        )} <br><br> ${handShakeImg}`;
        resetBJ();
        return outputMessage;
      }
      // player higher value -> player wins
      if (playerHandTotalValue > dealerHandTotalValue) {
        playerChipCount += 2 * currentRoundPlayerBet;
        console.log(
          `Player wins. The current player chip count is`,
          playerChipCount
        );
        console.log(`Player wins, player's bet was `, currentRoundPlayerBet);
        outputMessage = `🎉 Congratulations!! You won! ${
          2 * currentRoundPlayerBet
        }! 🎉 <br><br> ${displayChipCountInfo(
          playerChipCount
        )}<br><br>Please place your bets to play again.<br><br>----------<br><br>${displayPlayerAndDealerHands(
          playerHand,
          dealerHand,
          false
        )}<br><br> ${displayHandTotalValues(
          playerHandTotalValue,
          dealerHandTotalValue
        )} <br><br> ${babyCelebrateImg}`;
        resetBJ();
        return outputMessage;
      }
      // dealer higher value -> dealer wins

      if (playerHandTotalValue < dealerHandTotalValue) {
        playerChipCount = 1 * playerChipCount;
        console.log(`player lost, player's chip is`, playerChipCount);
        console.log(`player lost, player bets`, currentRoundPlayerBet);
        outputMessage = `Aw Snap! Dealer wins! <br> You lost $${currentRoundPlayerBet} <br><br> ${displayChipCountInfo(
          playerChipCount
        )}<br><br>Please place your bets to play again.<br><br>----------<br>${displayPlayerAndDealerHands(
          playerHand,
          dealerHand,
          false
        )} <br><br> ${displayHandTotalValues(
          playerHandTotalValue,
          dealerHandTotalValue
        )}<br><br> ${triedYourBestImg}`;

        resetBJ();
        return outputMessage;
      }
    }
  }
};
