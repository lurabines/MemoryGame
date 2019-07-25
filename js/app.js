/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deckOfCards = document.querySelector('ul.deck');
const cardsList = [
	'fa-diamond',
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-anchor',
	'fa-bolt',
	'fa-bolt',
	'fa-cube',
	'fa-cube',
	'fa-leaf',
	'fa-leaf',
	'fa-bomb',
	'fa-bomb',
	'fa-bicycle',
	'fa-bicycle'
];

let openCards = [];
let matchCards = [];
shuffle(cardsList);

cardsList.forEach(function(card) {
	const li = document.createElement('li');
	li.classList = 'card';
	li.innerHTML = `<i class="fa ${card}"></i>`;
	deckOfCards.appendChild(li);
});

deckOfCards.addEventListener('click', function(e) {
	const clickTarget = e.target;

	if (
		!clickTarget.classList.contains('open') &&
		!clickTarget.classList.contains('show') &&
		!clickTarget.classList.contains('match')
	) {
		clickTarget.classList.add('open', 'show');
		openCards.push(clickTarget);

		if (openCards.length === 2) {
			if (openCards[0].innerHTML === openCards[1].innerHTML) {
				let cardA = openCards[0];
				let cardB = openCards[1];
				cardA.classList.add('match');
				cardB.classList.add('match');

				matchCards.push(cardA, cardB);
			} else {
				setTimeout(function() {
					openCards[0].classList.remove('open', 'show');
					openCards[1].classList.remove('open', 'show');
					openCards = [];
				}, 500);
			}
		}
	} else {
		alert('You already flip this cards!');
	}
});

function openCardList(card) {
	if (card.className === 'open') {
		openCards.push(card.innerHTML);
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
