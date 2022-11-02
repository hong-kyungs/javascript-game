$form = document.querySelector('#form');
$timer = document.querySelector('#timer');
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
let openCount = 0;
let startTime = new Date();
const interval = setInterval(() => {
	const time = Math.floor((new Date() - startTime) / 1000);
	$timer.textContent = `${time}초`;
}, 1000);

function onSubmit() {}

$form.addEventListener('submit', onSubmit);

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
function open(rowIndex, cellIndex) {
	//한번 열었으면 다시 열지말고 리턴시키기 -> 반복현상을 막기위해
	if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;
	const target = $tbody.children[rowIndex]?.children[cellIndex];
	if (!target) {
		return;
	}
	const count = countMine(rowIndex, cellIndex);
	target.textContent = count || '';
	target.className = 'opened';
	data[rowIndex][cellIndex] = count;
	openCount++;
	console.log(openCount);
	if (openCount === row * cell - mine) {
		const time = (new Date() - startTime) / 1000;
		clearInterval(interval);
		$tbody.removeEventListener('contextmenu', onRightClick);
		$tbody.removeEventListener('click', onLeftClick);
		setTimeout(() => {
			alert(`승리했습니다. ${time}초가 걸렸습니다.`);
		}, 500);
	}
	return count;
}

//재귀함수 - 나 자신을 다시 호출해준다
//재귀함수 사용시 - Maximum call stack size exceeded 라는 에러가 발생할 가능성이 높다
//setTimeout 0 으로 에러 해결 - 콜스택에만 쌓여있는 것들을 백그라운드와 테스트큐로 분산시킴
function openAround(rI, cI) {
	setTimeout(() => {
		const count = open(rI, cI);
		if (count === 0) {
			openAround(rI - 1, cI - 1);
			openAround(rI - 1, cI);
			openAround(rI - 1, cI + 1);
			openAround(rI, cI - 1);
			openAround(rI, cI + 1);
			openAround(rI + 1, cI - 1);
			openAround(rI + 1, cI);
			openAround(rI + 1, cI + 1);
		}
	}, 0);
}

function onLeftClick(event) {
	const target = event.target; // td
	const rowIndex = target.parentNode.rowIndex;
	const cellIndex = target.cellIndex;
	const cellData = data[rowIndex][cellIndex];
	if (cellData === CODE.NORMAL) {
		// 닫힌 칸이면
		openAround(rowIndex, cellIndex);
	} else if (cellData === CODE.MINE) {
		// 지뢰 칸이면
		target.textContent = '펑';
		target.className = 'opened';
		clearInterval(interval);
		$tbody.removeEventListener('contextmenu', onRightClick);
		$tbody.removeEventListener('click', onLeftClick);
	} // 나머지는 무시, 아무 동작도 안함
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
