(function() {
  'use strict';

  const cards = [{
      id: 1,
      text: 'cow',
      img: './images/cow.png'
    },
    {
      id: 2,
      text: 'horse',
      img: './images/horse.png'
    },
    {
      id: 3,
      text: 'pig',
      img: './images/pig.png'
    },
    {
      id: 4,
      text: 'dog',
      img: './images/dog.png'
    },
    {
      id: 5,
      text: 'cat',
      img: './images/cat.png'
    },
    {
      id: 6,
      text: 'giraffe',
      img: './images/giraffe.png'
    },
    {
      id: 7,
      text: 'rooster',
      img: './images/rooster.png'
    },
    {
      id: 8,
      text: 'donkey',
      img: './images/donkey.png'
    },
  ];

  const $container = document.querySelector('div.container');

  function createCardHTML(card) {
    const html = `
      <div class='card' data-name=${card.text}>
        <div class='card-front'>
          <img class='card-image-front' src=${card.img} alt=${card.text}/>
          <h2>${card.text.toUpperCase()}</h2>
        </div>
        <div class='card-back'>
          <img class='card-image-front' src="./images/brand.png" alt="brand"/>
        </div>
      </div>
    `;
    return html;
  }

  const cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');

  const cardPairs = [...cards, ...cards];

  // more robust way to shuffle
  // for loop; i is equal to length of array - 1, run the loop as long as i is greater than 0; decrease the value of i by 1 each time you run the loop
  // Math.floor rounds a number down
  // Math.random returns a random number between 0 and less than 1
  for (let i = cardPairs.length - 1; i > 0; i--) {
    // Math.floor(Math.random() * i); returns a random number between 0 and less than the length of the array
    const j = Math.floor(Math.random() * i);
    // i is the iteration number; j is the random number we created
    // switch two cards
    const temp = cardPairs[i];
    cardPairs[i] = cardPairs[j];
    cardPairs[j] = temp;
  }

  cardPairs.sort(function(a, b) {
    return (0.5 - Math.random());
  });

  let cardsHTML = '';
  cardPairs.forEach(function(card) {
    const html = createCardHTML(card);
    cardsHTML = cardsHTML + html;
    // cardsHTML += html;
  });

  cardsElement.innerHTML = cardsHTML;

  $container.appendChild(cardsElement);

  const $cards = document.querySelectorAll('.card');

  let card1 = null;
  let card2 = null;
  let matches = 0;

  function gameReset() {
    matches = 0;
    $cards.forEach(function(card) {
      card.addEventListener('click', handleClick);
      card.classList.remove('matched');
    });
    return;
  }

  function checkGameStatus() {
    if (matches === 8) {
      alert('Congratulations! You matched all the cards!');
      gameReset();
    }
    return;
  }

  function compareCards() {
    if (card1.dataset.name === card2.dataset.name) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      card1.removeEventListener('click', handleClick);
      card2.removeEventListener('click', handleClick);
      alert('Yay! You found a match!');
      matches++;
    }

    card1.classList.remove('selected');
    card2.classList.remove('selected');

    card1 = null;
    card2 = null;

    checkGameStatus();
    return;
  }

  function handleClick(event) {
    const card = event.currentTarget;
    card.classList.add('selected');

    if (card1) {
      card2 = event.currentTarget;
    } else {
      card1 = event.currentTarget;
    }

    if (card2) {
      setTimeout(compareCards, 1000);
    }

    return;
  }

  $cards.forEach(function(card) {
    card.addEventListener('click', handleClick);
  });

})();
