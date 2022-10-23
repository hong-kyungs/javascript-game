$wrapper = document.querySelector('#wrapper');

const total = 12;
const colors = [
	'lightcoral',
	'lightpink',
	'beige',
	'plum',
	'lightskyblue',
	'lightgreen',
];
const colorCopy = colors.concat(colors);
let shuffled = [];

function shuffle() {
	for (let i = 0; colorCopy.length > 0; i += 1) {
		const randomIndex = Math.floor(Math.random() * colorCopy.length);
		shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
	}
}

//div.card > div.card-inner > (div.card-front + div.card-back)
function createCard() {
	const card = document.createElement('div');
	card.className = 'card'; //
	const cardInner = document.createElement('div');
	cardInner.className = 'card-inner';
	const cardFront = document.createElement('div');
	cardFront.className = 'card-front';
	const cardBack = document.createElement('div');
	cardBack.className = 'card-back';
	cardBack.style.backgroundColor = shuffled[i];
	cardInner.appendChild(cardFront);
	cardInner.appendChild(cardBack);
	card.appendChild(cardInner);
	return card;
}

function startGame() {
	shuffle();
	for (i = 0; i < total; i++) {
		const card = createCard(i);
		$wrapper.appendChild(card);
	}

	document.querySelectorAll('.card').forEach((card, index) => {
		setTimeout(() => {
			card.classList.add('flipped');
		}, 1000 + 100 * index);
	});

	setTimeout(() => {
		document.querySelectorAll('.card').forEach((card) => {
			card.classList.remove('flipped');
		});
	}, 5000);
}

startGame();
