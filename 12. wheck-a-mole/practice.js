const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $life = document.querySelector('#life');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $$cells = document.querySelectorAll('.cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 10;
let life = 3;
let tickId;
let timerId;
$start.addEventListener('click', () => {
	if (started) return; //한번 시작했으면 시작버튼 무시
	started = true;
	console.log('시작');
	tickId = setInterval(tick, 1000);
	$timer.textContent = time;
	$life.textContent = life;
	timerId = setInterval(() => {
		time = (time * 10 - 1) / 10;
		$timer.textContent = time;
		if (time === 0) {
			clearInterval(tickId);
			clearInterval(timerId);
			setTimeout(() => {
				alert(`게임 오버! 점수는 ${score}입니다.`);
			}, 50);
		}
	}, 100);
	tick();
});

const gopherPercent = 0.3;
const bombPercent = 0.5;
function tick() {
	holes.forEach((hole, index) => {
		if (hole) return;
		const randomValue = Math.random();
		if (randomValue < gopherPercent) {
			const $gopher = $$cells[index].querySelector('.gopher');
			$gopher.classList.remove('hidden');
			holes[index] = setTimeout(() => {
				$gopher.classList.add('hidden');
				holes[index] = 0;
			}, 1000);
		} else if (randomValue < bombPercent) {
			const $gopher = $$cells[index].querySelector('.bomb');
			$gopher.classList.remove('hidden');
			holes[index] = setTimeout(() => {
				$gopher.classList.add('hidden');
				holes[index] = 0;
			}, 1000);
		}
	});
}

$$cells.forEach(($cell, index) => {
	$cell.querySelector('.gopher').addEventListener('click', (event) => {
		if (!event.target.classList.contains('dead')) {
			score += 1;
			$score.textContent = score;
		}
		event.target.classList.add('dead');
		event.target.classList.add('hidden');
		clearTimeout(holes[index]);
		setTimeout(() => {
			event.target.classList.remove('dead');
			holes[index] = 0;
		}, 1000);
	});

	$cell.querySelector('.bomb').addEventListener('click', (event) => {
		if (!event.target.classList.contains('boom')) {
			life -= 1;
			$life.textContent = life;
		}
		if (life === 0) {
			clearInterval(tickId);
			clearInterval(timerId);
			setTimeout(() => {
				alert(`게임 오버! 점수는 ${score}입니다.`);
			}, 50);
			$timer.textContent = 0;
		}
		event.target.classList.add('boom');
		event.target.classList.add('hidden');
		clearTimeout(holes[index]);
		setTimeout(() => {
			event.target.classList.remove('boom');
			holes[index] = 0;
		}, 1000);
	});
});
