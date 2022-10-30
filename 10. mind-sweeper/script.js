$tbody = document.querySelector('table tbody');
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

let data;
function plantMine() {
	const candidate = Array(row * cell)
		.fill()
		.map((arr, i) => {
			return i;
		});
	const shuffle = [];
	while (candidate.length > row * cell - mine) {
		const chosen = candidate.splice(
			Math.floor(Math.random() * candidate.length),
			1
		)[0];
		shuffle.push(chosen);
	}
	data = [];
	for (let i = 0; i < row; i++) {
		const rowData = [];
		data.push(rowData);
		for (let j = 0; j < cell; j++) {
			rowData.push(CODE.NORMAL);
		}
	}

	/*
	shuffle = [85, 19, 93]를 예를 들면 85는 8번째 줄, 5번째칸
	for (let k = 0; k < shuffle.length; k++) {
		const ver = Math.floor(85 / 10); // 8번째 줄
		const hor = 85 % 10; // 5번째 칸
	}
	*/
	for (let k = 0; k < shuffle.length; k++) {
		const ver = Math.floor(shuffle[k] / cell); // 몇번째 줄
		const hor = shuffle[k] % cell; // 몇번째 칸
		data[ver][hor] = CODE.MINE;
	}
}

function onRightClick(event) {
	event.preventDefault();
	const target = event.target; // td
	const rowIndex = target.parentNode.rowIndex; // tr - rowindex
	const cellIndex = target.cellIndex; // td - cellindex
	const cellData = data[rowIndex][cellIndex]; // cellData 에 -1, -6 이 들어있을 것
	if (cellData === CODE.MINE) {
		// 지뢰면
		data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
		target.className = 'question';
		target.textContent = '?';
	} else if (cellData === CODE.QUESTION_MINE) {
		// 물음표 지뢰면
		data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
		target.className = 'flag';
		target.textContent = '!';
	} else if (cellData === CODE.FLAG_MINE) {
		// 깃발 지뢰면
		data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
		target.className = '';
		target.textContent = 'X';
	} else if (cellData === CODE.NORMAL) {
		// 닫힌 칸이면
		data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
		target.className = 'question';
		target.textContent = '?';
	} else if (cellData === CODE.QUESTION) {
		// 물음표면
		data[rowIndex][cellIndex] = CODE.FLAG; // 깃발로
		target.className = 'flag';
		target.textContent = '!';
	} else if (cellData === CODE.FLAG) {
		// 깃발이면
		data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
		target.className = '';
		target.textContent = '';
	}
}

function countMine(rowIndex, cellIndex) {
	const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
	let i = 0;
	mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
	mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
	mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
	mines.includes(data[rowIndex][cellIndex - 1]) && i++;
	mines.includes(data[rowIndex][cellIndex + 1]) && i++;
	mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
	mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
	mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
	return i;
}

function onLeftClick(event) {
	const target = event.target; // td
	const rowIndex = target.parentNode.rowIndex;
}

function drawTable() {
	plantMine();
	data.forEach((row) => {
		const $tr = document.createElement('tr');
		row.forEach((cell) => {
			const $td = document.createElement('td');
			if (cell === CODE.MINE) {
				$td.textContent = 'X'; // 개발 편의를 위해 일단 지뢰위치 표시, 개발자모드
			}
			$tr.append($td);
		});
		$tbody.append($tr);
		$tbody.addEventListener('contextmenu', onRightClick);
		$tbody.addEventListener('click', onLeftClick);
	});
}

drawTable();
