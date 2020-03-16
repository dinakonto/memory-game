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

console.log('Options are: ' + deckClasses);

const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function() {
    console.log('A card was clicked!');
  });
}
