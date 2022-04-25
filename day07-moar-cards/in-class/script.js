// Initialize an array named "deck" to store the 52 cards in a deck.
var deck = [];

// Initialize an array of the 4 suits in our deck. We will loop over this array
var createDeck = function () {
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
      if (rankCounter == 1) {
        cardName = "A";
      } else if (rankCounter == 11) {
        cardName = "J";
      } else if (rankCounter == 12) {
        cardName = "Q";
      } else if (rankCounter == 13) {
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
      console.log(`The current card is`, card);
    }
  }
  return deck;
};

// Create a function to generate a random Index

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the deck

var shuffleDeck = function (cardDeck) {
  // Initialize the current index variable
  var currentIndex = 0;

  // Loop over the deck array once
  while (currentIndex < cardDeck.length) {
    console.log(
      `control flow: while loop for generating random deck is running`
    );
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];
    // Select the card that corresponds to the currentIndex
    var currentCard = deck[currentIndex];

    // Swap the position of randomCard and currentCard in the deck

    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment the current index
    currentIndex += 1;
  }
  // return the shuffled deck
  return cardDeck;
};

var moarCardsSingleCardMain = function (input) {
  // Complete the Base: Moar Cards Display Single Card exercise below with moarCardsSingleCardMain as the main function.

  // Player draws a card

  var gameCardDeck = createDeck();
  console.log(`gameCardDeck is generated`);
  var shuffledGameCardDeck = shuffleDeck(gameCardDeck);
  var playerCard = shuffledGameCardDeck.pop();
  console.log("playerCard is", playerCard);
  return `Hi player! You drew a ${playerCard.name} of ${playerCard.suitEmoji}`;
};

// Helper Function

var numWins = 0;
var numPlayed = 0;
var didPlayerWin = function (playerCard, computerCard) {
  return playerCard.rank < computerCard.rank;
};

var didPlayerDraw = function (playerCard, computerCard) {
  return (playerCard.rank = computerCard.rank);
};

var genCompareCardsMessage = function (playerCard, computerCard) {
  return `Player draws ${playerCard} and computer draws ${computerCard}`;
};

var genWinRecords = function (numWins, numPlayed) {
  return `Current Leaderboard: <br><br> Player won: ${numWins} times. <br> Number of games Played: ${numPlayed}.`;
};

var moarCardsLowCardMain = function (input) {
  var gameCardDeck = createDeck();
  var shuffledGameCardDeck = shuffleDeck(gameCardDeck);
  numPlayed += 1;
  var playerCard = shuffledGameCardDeck.pop();
  var computerCard = shuffledGameCardDeck.pop();
  if (didPlayerWin(playerCard, computerCard)) {
    numWins += 1;

    return `You drew: ${playerCard.name} ${playerCard.suitEmoji}<br> Computer drew: ${computerCard.name}${computerCard.suitEmoji}.<br><br> You won!!`;
  } else if (didPlayerDraw(playerCard, computerCard)) {
    return `You Drew! Both of you drew ${playerCard.name} ${playerCard.suitEmoji} `;
  } else {
    return `You drew: ${playerCard.name} ${playerCard.suitEmoji}. <br> Computer drew: ${computerCard.name}${computerCard.suitEmoji}. <br><br> You lost!`;
  }
};

var moarCardsLowCardQueenWinnerMain = function (input) {
  // Complete the Base: Moar Cards Low Card with Queen Winner exercise below with moarCardsLowCardQueenWinnerMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCardHandsMain = function (input) {
  // Complete the Base: Moar Cards Low Card Hands exercise below with moarCardsLowCardHandsMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCardSuitMain = function (input) {
  // Complete the Base: Moar Cards Low Card Suit Output exercise below with moarCardsLowCardSuitMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCardWildCardMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card with Wild Card exercise below with moarCardsLowCardWildCardMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCardWildPlayerMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card with Player-Chosen Wild Card exercise below with moarCardsLowCardWildPlayerMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCardBetsMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card with Bets exercise below with moarCardsLowCardBetsMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCard2PMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card 2-Player Mode exercise below with moarCardsLowCard2PMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCard2PairsMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card 2-Player Mode with Pairs exercise below with moarCardsLowCard2PairsMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotSingleMain = function (input) {
  // Complete the Base: Chat Bot Single Chat Bot Answer Set below with chatBotSingleMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotMultipleMain = function (input) {
  // Complete the Base: Chat Bot Multiple Chat Bot Answer Sets below with chatBotMultipleMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotUsernameMain = function (input) {
  // Complete the Base: Chat Bot Stores User's Name below with chatBotUsernameMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotAgeMain = function (input) {
  // Complete the Base: Chat Bot Stores User's Age below with chatBotAgeMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotNamedMain = function (input) {
  // Complete the More Comfortable: Chat Bot Named Answer Sets below with chatBotNamedMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotDynamicMain = function (input) {
  // Complete the More Comfortable: Dynamic Chat Bot below with chatBotDynamicMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotFortuneMain = function (input) {
  // Complete the More Comfortable: Chat Bot Fortune Telling below with chatBotFortuneMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};
