/* * * * * * * * *
 POPULATE THE HTML
 * * * * * * * * */

// List of card types
const cardTypes = [
  'fa-cat',
  'fa-crow',
  'fa-dog',
  'fa-fish',
  'fa-frog',
  'fa-horse',
  'fa-spider',
  'fa-hippo'
];

// Make two of every card
let deck = [...cardTypes, ...cardTypes]

// Shuffle the cards and display them randomly
function resetDeck() {
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

  //Shuffle the deck
  deck = shuffle(deck);

  // Randomly populate the cards
  for (let i = 0; i < deck.length; i++ ) {
    let cards = document.querySelectorAll('.card');
    for (let animal in deck) {
      cards[i].innerHTML = `<i class="fas ${deck[i]}"></i>`;
      cards[i].classList.add('hide');
    }
  }
}

document.addEventListener('DOMContentLoaded', resetDeck());


/* * * * * * * * *
 SHOW CARD SYMBOL ONCLICK
 * * * * * * * * */
function showCard(card) {
  card.classList.remove('hide');
  card.classList.add('open');
  console.log(`Show card.`)
}

let openCards = [];

function addCard(card) {
  console.log(`Add card to list.`)
  let attr = card.querySelector('svg').getAttribute('data-icon');
  openCards.push(attr);
  console.log(openCards)
}

const cards = document.querySelectorAll('.card')

for (const card of cards) {
  card.addEventListener('click', function () {
    showCard(card);
    addCard(card);
  });
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function thatyou call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */























// /*
//  * FUNCTIONALITY
//  */
//
// const cards = document.querySelectorAll('.card');
//
// let turnsLeft = 2;
// let moves = 0;
//
// let cardOne = null;
// let cardTwo = null;
//
// let result;
//
// // DO THE THING
// console.log(typeof cards);
//
//
//
// for (const card of cards) {
//  card.addEventListener('click', function () {
//    if (cardOne === null /* && this not already open */ ) {
//
//      // Set the variable to the icon class
//      cardOne = card.querySelector('svg').getAttribute('data-icon');
//      console.log(`Card one = ${cardOne}`);
//    }
//    else if (cardTwo === null /* && this not already open */) {
//      // Set the variable to the icon class
//      cardTwo = card.querySelector('svg').getAttribute('data-icon');
//      console.log(`Card two = ${cardTwo}`);
//
//      //Compare cardOne and cardTwo
//      if (cardOne === cardTwo) {
//        result = true;
//      } else {
//        result = false;
//      }
//
//      console.log (result);
//      // Reset the variables
//      cardOne = null;
//      cardTwo = null;
//    }
//  });
// }
//
//
// //
// // /*
// //  * DECLARE FUNCTIONS
// //  */
// //
// // // Check if it's a match
// // function checkMatch() {
// //   console.log(`Check to see if it's a match`)
// //
// // };
// //
// // // Keep track of what turn and move you're on
// // function turnCount() {
// //   // If it's the first card,
// //   if (turnsLeft === 2) {
// //     turnsLeft -= 1;
// //     moves += 1;
// //   }
// //   // if it's the second card,
// //   else if (turnsLeft === 1) {
// //     turnsLeft = 2;
// //     moves += 1;
// //     console.log(`Try for your next match`)
// //   }
// // };
// //
// // // Turn cards over
// // function turnCard(e) {
// //   const thisCard = e.currentTarget;
// //   // If it's already open or matched, do nothing
// //   if (thisCard.classList.contains('open') || thisCard.classList.contains('matched')) {
// //     console.log(`Already open. You have ${turnsLeft} turns left.`);
// //   }
// //   // Otherwise...
// //   else {
// //     thisCard.classList.add('open');
// //     console.log(`Opened. You have ${turnsLeft} turns left.`);
// //     turnCount();
// //     checkMatch();
// //   }
// // ;}
// //
// //
// // /*
// //  * DOING STUFF
// //  */
// //
// //  for (const card of cards) {
// //    card.addEventListener('click', turnCard);
// //  }
