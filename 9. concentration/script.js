const $wrapper = document.querySelector('#wrapper');

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
		// 로또에서 사용했던 방법
		// const spliced = colorCopy.splice(randomIndex, 1);
		// shuffled.push(spliced[0]);
	}
}

function createCard(i) {
	// div.card > div.card-inner > (div.card-front + div.card.back)
	const card = document.createElement('div');
	card.className = 'card'; // .card 태그 생성
	const cardInner = document.createElement('div');
	cardInner.className = 'card-inner'; // .card-inner 태그 생성
	const cardFront = document.createElement('div');
	cardFront.className = 'card-front'; // .card-front 태그 생성
	const cardBack = document.createElement('div');
	cardBack.className = 'card-back'; // .card-back 태그 생성
	cardBack.style.backgroundColor = shuffled[i];
	cardInner.appendChild(cardFront);
	cardInner.appendChild(cardBack);
	card.appendChild(cardInner);
	return card;
}

function onClickCard() {
	//1. 처음에 카드가 공개되는 동안 클릭막기.
	//2. 12장의 카드가 다 맞으면 클릭막기
	//3. 방금 클릭한 카드 재클릭 막기
	if (!clickable || completed.includes(this) || clicked[0] === this) {
		return;
	}
	this.classList.toggle('flipped');
	clicked.push(this);
	//if문의 중첩을 방지하지 위해서 return을 빨리한다.
	if (clicked.length !== 2) {
		return;
	}
	//클릭한 카드가 두개일때만 실행
	const firstBackColor =
		clicked[0].querySelector('.card-back').style.backgroundColor;
	const secondBackColor =
		clicked[1].querySelector('.card-back').style.backgroundColor;
	if (firstBackColor === secondBackColor) {
		// 두 카드가 같으면
		completed.push(clicked[0]);
		completed.push(clicked[1]);
		clicked = [];
		//위 세줄을 줄여서 아래로 만들어줄 수 있다.
		//completed = completed.concat(clicked);
		if (completed.length !== total) {
			return;
		}
		setTimeout(() => {
			alert('축하합니다!!');
			resetGame();
		}, 1000);
		return;
	}
	clickable = false; // 카드가 2개 선택되면  클릭을 방지 -> 버그 해결 방법 (clicked에 2개이상 들어가지 않게 해서 버그해결)
	//두 카드가 다르면
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
	for (let i = 0; i < total; i += 1) {
		const card = createCard(i);
		card.addEventListener('click', onClickCard);
		$wrapper.appendChild(card);
	}

	document.querySelectorAll('.card').forEach((card, index) => {
		//초반 카드 공개
		setTimeout(() => {
			card.classList.add('flipped');
		}, 1000 + 100 * index);
	});

	setTimeout(() => {
		// 카드 감추기
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
	clickable = false;
	startGame();
}
