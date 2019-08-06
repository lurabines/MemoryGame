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
let cardsList = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-leaf',
	'fa-bomb',
	'fa-bicycle'
];

cardsList = cardsList.concat(cardsList);
const stars = document.querySelectorAll('.stars li');
let rating = 3;
const minutesText = document.querySelector('#timer .minutes');
const secondsText = document.querySelector('#timer .seconds');
const restartBtn = document.querySelector('.restart');
const moveContainer = document.querySelector('.moves');
moveContainer.innerHTML = 0;
let moves = 0;
let openCards = [];
let matchCards = 0;
let gameTimer = setInterval(setTimer, 1000);

shuffle(cardsList);
createDeck();
enableListeners();

// Click event listener attached to restart button
restartBtn.addEventListener('click', restartGame);

//Restart The Game function
function restartGame() {
	console.log('restart button');
	location.reload(true);
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

//Create the Card Deck and put it in the DOM
function createDeck() {
	cardsList.forEach(function(card) {
		const li = document.createElement('li');
		li.classList = 'card';
		li.innerHTML = `<i class="fa ${card}"></i>`;
		document.querySelector('ul.deck').appendChild(li);
	});
}
//Start Counting the User moves
function countMoves() {
	moves++;
	moveContainer.textContent = moves;
	starRating();
}

//Star Rating with user moves in the Game
function starRating() {
	if (moves === 17) {
		rating--;
		stars[2].classList.add('empty-star');
		console.log(rating);
	} else if (moves === 26) {
		rating--;
		stars[1].classList.add('empty-star');
		console.log(rating);
	}
}

//Setting the Timer for the Game
let seconds = 0;
let minutes = 0;

function setTimer() {
	seconds = seconds + 1;

	if (seconds > 59) {
		seconds = 00;
		minutes = minutes + 1;
	}
	secondsText.innerText = seconds;
	minutesText.innerText = minutes;

	if (seconds < 10) {
		secondsText.innerText = '0' + seconds;
	}
	if (minutes < 10) {
		minutesText.innerText = '0' + minutes;
	}
}

// //Start Timer for the Game
// function startTimer() {}

//Stop Timer for the Game
function stopTimer() {
	console.log('stop timer');
	clearInterval(gameTimer);
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
		stopTimer();
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
