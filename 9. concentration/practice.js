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
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = [];
//버그를 해결하기 위해 카드를 클릭할 수 있는 상황과 클릭할 수 없는 상황을 구분 => clickable 변수 선언
let clickable = false;

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

function onClickCard() {
	if (!clickable || completed.includes(this) || clicked[0] === this) {
		return;
	}
	this.classList.toggle('flipped');
	clicked.push(this);
	if (clicked.length !== 2) {
		return;
	}
	//선택한 카드가 2장이고
	//2장의 카드가 같으면
	const firstBackColor =
		clicked[0].querySelector('.card-back').style.backgroundColor;
	const secondBackColor =
		clicked[1].querySelector('.card-back').style.backgroundColor;
	if (firstBackColor === secondBackColor) {
		completed.push(clicked[0]);
		completed.push(clicked[1]);
		clicked = [];
		if (completed.length !== total) {
			return;
		}
		setTimeout(() => {
			alert('축하합니다.');
			resetGame();
			return;
		}, 1000);
	}

	//2장의 카드가 다르면
	clickable = false;
	setTimeout(() => {
		clicked[0].classList.remove('flipped');
		clicked[1].classList.remove('flipped');
		clicked = [];
		clickable = true;
	}, 500);
}

function startGame() {
	clickable = false;
	shuffle();
	for (i = 0; i < total; i++) {
		const card = createCard(i);
		card.addEventListener('click', onClickCard);
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
		clickable = true;
	}, 5000);
}

startGame();

function resetGame() {
	$wrapper.innerHTML = '';
	colorCopy = colors.concat(colors);
	shuffled = [];
	completed = [];
	startGame();
}
