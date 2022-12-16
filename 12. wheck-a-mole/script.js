const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //1차원 배열로
let started = false;
let score = 0;
$start.addEventListener('click', () => {
	if (started) return; // 이미 시작했으면 무시
	started = true;
	console.log('시작');
	const tickId = setInterval(tick, 1000);
	tick();
});

let gopherPercent = 0.3;
let bombPercent = 0.5;
function tick() {
	holes.forEach((hole, index) => {
		//holes 배열안에 값이 있으면 두더지가 보이는 상황이므로 이때는 타이머를 추가하지 않는다
		if (hole) return; //무언가 일어나고 있으면 return, 이 코드로 인해서 setTimeout이 2초에 한번 실행됨
		const randomValue = Math.random();
		if (randomValue < gopherPercent) {
			const $gopher = $$cells[index].querySelector('.gopher');
			holes[index] = setTimeout(() => {
				// 1초 뒤에 사라짐
				$gopher.classList.add('hidden');
				holes[index] = 0;
			}, 1000);
			$gopher.classList.remove('hidden');
		} else if (randomValue < bombPercent) {
			const $bombs = $$cells[index].querySelector('.bomb');
			holes[index] = setTimeout(() => {
				// 1초 뒤에 사라짐
				$bombs.classList.add('hidden');
				holes[index] = 0;
			}, 1000);
			$bombs.classList.remove('hidden');
		}
	});
}
