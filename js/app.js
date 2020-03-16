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



const card = document.getElementsByClassName('card');

card.addEventListener('click', function() {
  console.log('A card was clicked!');
});
