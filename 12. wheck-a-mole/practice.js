const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $life = document.querySelector('#life');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $$cells = document.querySelectorAll('.cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
$start.addEventListener('click', () => {
	if (started) return; //한번 시작했으면 시작버튼 무시
	started = true;
	console.log('시작');
	tick();
});

function tick() {
	holes.forEach((hole, index) => {
		const $gopher = $$cells[index].querySelector('.gopher');
		$gopher.classList.remove('hidden');
		holes[index] = setTimeout(() => {
			$gopher.classList.add('hidden');
			holes[index] = 0;
		}, 1000);
	});
}
