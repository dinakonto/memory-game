/*
 * DECLARE VARIABLES
 */

const deckClasses = [
  'fa-cat',
  'fa-crow',
  'fa-dog',
  'fa-fish',
  'fa-frog',
  'fa-horse',
  'fa-spider',
  'fa-hippo'
];

const cards = document.querySelectorAll('.card');

let turn = 1;
let moves = 0;

/*
 * DECLARE FUNCTIONS
 */



/*
 * DOING STUFF
 */

// For each card
for (const card of cards) {
  // Listen for a click
  card.addEventListener('click', function() {
    // If it's your first card
    if (turn === 1) {
      card.classList.add('open');
      console.log(`Turns: ${turn}`)
      turn += 1;;
    }
    // If it's your second card
    else if (turn === 2) {
      card.classList.add('open');
      console.log(`Turns: ${turn}. Go again.`);
      turn = 1;
    };
  });
}
