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
const restartBtn = document.querySelector('.restart');
const moveContainer = document.querySelector('.moves');
let moves = 0;
let openCards = [];
let matchCards = 0;

shuffle(cardsList);
createDeck();
enableListeners();

// Click event listener attached to restart button
restartBtn.addEventListener('click', restartGame);

//Restart The Game function
function restartGame() {
	console.log('restart button');
}

//Create the Card Deck and put it in the DOM
function createDeck() {
	cardsList.forEach(function(card) {
		const li = document.createElement('li');
		li.classList = 'card';
		li.innerHTML = `<i class="fa ${card}"></i>`;
		document.querySelector('ul.deck').appendChild(li);
	});
}

function countMoves() {
	moves++;
	moveContainer.textContent = moves;
}

//Add and Event Listener to the Card Deck, and listen to the user click target.
function enableListeners() {
	const deckOfCards = document.querySelector('ul.deck');
	deckOfCards.addEventListener('click', activateCards);
}

function disableListeners() {
	const deckOfCards = document.querySelector('ul.deck');
	deckOfCards.removeEventListener('click', activateCards);
}

function activateCards(e) {
	if (e.target.className === 'card') {
		e.target.classList.add('open', 'show');
		openCards.push(e.target);
		countMoves();

		if (openCards.length === 2) {
			compareCards();
		}
	}
}

function compareCards() {
	disableListeners();
	if (openCards[0].innerHTML === openCards[1].innerHTML) {
		setTimeout(cardsMatch, 0);
	} else {
		setTimeout(cardsDontMatch, 400);
	}
}

function cardsMatch() {
	openCards[0].classList.add('match');
	openCards[1].classList.add('match');
	openCards[0].classList.remove('open', 'show');
	openCards[1].classList.remove('open', 'show');
	matchCards += 2;
	if (matchCards === 16) {
		setTimeout(gameComplete, 400);
	}
	openCards = [];
	enableListeners();
}

function cardsDontMatch() {
	openCards[0].classList.remove('open', 'show');
	openCards[1].classList.remove('open', 'show');
	openCards = [];
	enableListeners();
}

function gameComplete() {
	console.log('Game complete, all cards have been matched!');
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
