/*
 *    STILL TO DO
 *    + responsive behaviour
 *    + transitions and animations
 *    + keyboard accessibility
 */



/* * * * * * * * *
 GLOBAL VARIABLES
 * * * * * * * * */
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

// Get all card elements
const cards = document.querySelectorAll('.card')

// Get reset button
const resetButton = document.querySelector('button');

// List of which cards are open
let openCards = [];

// Move counter
let moveCount = 0;

// Variable to hold timer interval function
let timerInt;

/* * * * * * * * *
 FUNCTIONS
 * * * * * * * * */

//
// GLOBAL GAME FUNCTIONS
//

//Timer
function timer() {
  let s = 1;
  timerInt = setInterval(function () {
    document.querySelector('#sec').innerHTML = formatTime(s % 60);
    document.querySelector('#min').innerHTML = formatTime(parseInt(s / 60));
    s++;
  }, 1000);
};

// Add a leading 0 if only 1 digit
function formatTime(s) {
  let sString = s + "";
  if (sString.length < 2) {
    return "0" + sString;
  } else {
    return sString;
  }
};

// Shuffle the cards and display them randomly
function resetDeck() {
  // Make two of every card type
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
  // Reset card storage and move count
  openCards = [];
  moveCount = 0;
  let moveDisplay = document.getElementById('move-count');
  moveDisplay.innerText = moveCount;
  // Reset timer
  clearInterval(timerInt);
  sec = 0;
  document.querySelector('#min').innerHTML = '00';
  document.querySelector('#sec').innerHTML = '00';
  // Reset stars
  let stars = document.querySelectorAll('.fa-star');
  for (let star of stars) {
    star.classList.add('fas');
    star.classList.remove('far');
  }

  for (let i = 0; i < deck.length; i++ ) {
    // Reset everything card-specific
    let cards = document.querySelectorAll('.card');
    cards[i].classList.remove('open', 'match', 'nomatch');
    // Randomly populate the cards again
    for (let animal in deck) {
      cards[i].innerHTML = `<i class="fas ${deck[i]}"></i>`;
    }
  }
};

// Keep track of the number of moves
function moveCounter() {
  moveCount += 1;
  starRating();
  let moveDisplay = document.getElementById('move-count');
  moveDisplay.innerText = moveCount;
};

// Star ratings
function starOff(num) {
  let stars = document.querySelectorAll('.fa-star');
  let star = stars.item(num);
  star.classList.add('far');
  star.classList.remove('fas');
}
function starRating() {
  if (moveCount === 14) {
    starOff(4);
  } else if (moveCount > 17 && moveCount <= 20) {
    starOff(3);
  } else if (moveCount > 20 && moveCount <= 24) {
    starOff(2);
  } else if (moveCount > 24) {
    starOff(1);
  }
}

//
// CARD + MATCHING LOGIC
//
// Show card and add it to the openCards array
function showCard(card) {
  if (card.classList.contains('match') || card.classList.contains('nomatch')) {
    // Do nothing
  } else {
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
  }
};

// Check to see if two open cards match
function checkMatch() {
  if (openCards[0] == openCards[1]) {
    hasMatch();
  } else {
    noMatch();
  }
};

// If they do match
function hasMatch() {
  let choices = document.querySelectorAll('.open');
  choices[0].classList.add('match');
  choices[1].classList.add('match');
  choices[0].classList.remove('open');
  choices[1].classList.remove('open');
  openCards = [];

  let parent = document.querySelector('.deck')
  if (parent.children.length == parent.querySelectorAll('.match').length) {
    completed();
  }
};

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
};

// When you've matched everything
function completed() {
  // Get relevant info
  let modal = document.querySelector('.modal-bg');
  let finalMoves = document.querySelector('.moves-final');
  let finalStars = document.querySelector('.stars').innerHTML;
  let playAgain = document.querySelector('#replay');

  // Timer
  let finalTime = document.querySelector('.time').innerHTML;
  clearInterval(timerInt);

  // Display success message
  modal.style.display = 'block';
  finalMoves.innerText = moveCount;
  document.querySelector('.final-stars').innerHTML = finalStars;
  document.querySelector('.time-final').innerHTML = finalTime;
  // Click play again button
  playAgain.onclick = function() {
    resetDeck();
    modal.style.display = 'none';
  }
};

/* * * * * * * * *
 EXECUTION
 * * * * * * * * */

// When DOM is ready, load randomised content
document.addEventListener('DOMContentLoaded', resetDeck());

// Listen for a click on each card
for (const card of cards) {
  card.addEventListener('click', function () {
    // If less than 2 cards are shown and this card isn't, show this card
    if (openCards.length < 2 && !card.classList.contains('open')) {
      showCard(card);
    };
    // If it's the first card opened, start the timer
    if (moveCount === 0 && openCards.length < 2) {
      timer();
    }
  });
};

// Listen for click on Reset button
resetButton.onclick = resetDeck;
