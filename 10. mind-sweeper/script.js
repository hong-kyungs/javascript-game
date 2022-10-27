$tBody = document.querySelector('table tbody');
$result = document.querySelector('#result');
const row = 10; //줄
const cell = 10; //칸
const mine = 10; //지뢰 10개
const CODE = {
	NORMAL: -1,
	QUESTION: -2,
	FLAG: -3,
	QUESTION_MINE: -4,
	FLAG_MINE: -5,
	MINE: -6,
	OPENED: 0, // 0 이상이면 모두 열린 칸
};

function plantMine() {}

function drawTable() {
	plantMine();
}

drawTable();
