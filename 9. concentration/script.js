const $wrapper = document.querySelector('#wrapper');

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
let colorCopy = colors.concat(colors);
let shuffled = [];

function shuffle() {
	for (let i = 0; colorCopy.length > 0; i += 1) {
		const randomIndex = Math.floor(Math.random() * colorCopy.length);
		shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
		// 로또에서 사용했던 방법
		// const spliced = colorCopy.splice(randomIndex, 1);
		// shuffled.push(spliced[0]);
	}
}

function createCard(i) {
	const card = document.createElement('div');
	card.className = 'card'; // .card 태그 생성
	const cardInner = document.createElement('div');
	cardInner.className = 'card-inner'; // .card-inner 태그 생성
	const cardFront = document.createElement('div');
	cardFront.className = 'card-front'; // .card-inner 태그 생성
	const cardBack = document.createElement('div');
	cardBack.className = 'card-back'; // .card-back 태그 생성
	cardBack.style.backgroundColor = shuffled[i];
	cardInner.appendChild(cardFront);
	cardInner.appendChild(cardBack);
	card.appendChild(cardInner);
	return card;
}

function startGame() {
	shuffle();
	for (let i = 0; i < total; i += 1) {
		const card = createCard(i);
		$wrapper.appendChild(card);
	}
}

startGame();
