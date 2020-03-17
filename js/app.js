/*
 *    STILL TO DO
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/* * * * * * * * *
 GLOBAL VARIABLES
 * * * * * * * * */

// Variable to access cards in the DOM
const cards = document.querySelectorAll('.card')

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

// Target the reset button
const resetButton = document.querySelector('button');

// List of which cards are open
let openCards = [];

// Move counter
let moveCount = 0;

/* * * * * * * * *
 FUNCTIONS
 * * * * * * * * */

// Shuffle the cards and display them randomly
function resetDeck() {
  // Make two of every card
  let deck = [...cardTypes, ...cardTypes]
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
  // Save the shuffled deck
  deck = shuffle(deck);

  openCards = [];
  moveCount = 0;
  let moveDisplay = document.getElementById('move-count');
  moveDisplay.innerText = moveCount;

  for (let i = 0; i < deck.length; i++ ) {
    //Reset everything
    let cards = document.querySelectorAll('.card');
    cards[i].classList.remove('open', 'match', 'nomatch');
    // Randomly populate the cards
    for (let animal in deck) {
      cards[i].innerHTML = `<i class="fas ${deck[i]}"></i>`;
    }
  }
}

function moveCounter(num) {
  moveCount += 1;
  let moveDisplay = document.getElementById('move-count');
  moveDisplay.innerText = moveCount;
}

// Show the card and add it to the openCards array
function showCard(card) {
  card.classList.add('open');
  if (openCards.length < 2) {
    let iconName = card.querySelector('svg').getAttribute('data-icon');
    openCards.push(iconName);
  } if (openCards.length === 2) {
    // Set move count forward one
    moveCounter();
    // Check to see if they match
    checkMatch();
  }
};

// Check to see if two open cards match
function checkMatch() {
  if (openCards[0] == openCards[1]) {
    hasMatch();
  }
  else {
    noMatch();
  }
}

// If they do match
function hasMatch() {
  let choices = document.querySelectorAll('.open');
  choices[0].classList.add('match');
  choices[1].classList.add('match');
  choices[0].classList.remove('open');
  choices[1].classList.remove('open');
  openCards = [];
}

// If they don't match
function noMatch() {
  let choices = document.querySelectorAll('.open');
  choices[0].classList.add('nomatch');
  choices[1].classList.add('nomatch');
  setTimeout(() => {
    choices[0].classList.remove('nomatch', 'open');
    choices[1].classList.remove('nomatch', 'open');
  }, 600);
  openCards = [];
}

/* * * * * * * * *
 EXECUTION
 * * * * * * * * */

// When DOM is ready, load randomised content
document.addEventListener('DOMContentLoaded', resetDeck());

// Listen for a click on each card
for (const card of cards) {
  card.addEventListener('click', function () {
    if (openCards.length < 2 && !card.classList.contains('open')) {
      showCard(card);
    };
  });
}

// Reset the deck and the move counter
resetButton.onclick = resetDeck;
