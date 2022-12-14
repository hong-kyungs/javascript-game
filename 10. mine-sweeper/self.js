$form = document.querySelector('#form');
$timer = document.querySelector('#timer');
$tbody = document.querySelector('table tbody');
$result = document.querySelector('#result');
let row; //줄
let cell; //칸
let mine; //지뢰
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
let openCount;
let startTime;
let interval;

function onSubmit(event) {
	event.preventDefault();
	row = parseInt(event.target.row.value);
	cell = parseInt(event.target.cell.value);
	mine = parseInt(event.target.mine.value);
	openCount = 0;
	clearInterval(interval);
	$tbody.innerHTML = '';
	drawTable();
	startTime = new Date();
	interval = setInterval(() => {
		const time = Math.floor((new Date() - startTime) / 1000);
		$timer.textContent = `${time}초`;
	}, 1000);
}

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
		target.textContent = '';
		// target.textContent = 'X'; // 개발자 모드
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

let normalCellFound = false;
let firstClick = true;
function transferMine(rI, cI) {
	if (normalCellFound) return; // 이미 빈칸을 찾았으면 종료 - 계속 빈칸찾는 행위를 차단
	if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return; // rowIndex와 cellIndex가 범위를 초과하지 않았는지
	if (searched[rI][cI]) return; // 이미 찾은 칸이면 종료
	if (data[rI]?.[cI] === CODE.NORMAL) {
		// 빈칸인 경우
		normalCellFound = true;
		data[rI][cI] = CODE.MINE;
	} else {
		//searched는 같은 칸수를 가지는 이차원 배열로, 한 번 transferMine으로 검사한 칸은 true로 설정해서 다시 검사하지 않게 한다.
		searched[rI][cI] = true;
		// 지뢰 칸인 경우 8방향 탐색
		transferMine(rI - 1, cI - 1);
		transferMine(rI - 1, cI);
		transferMine(rI - 1, cI + 1);
		transferMine(rI, cI - 1);
		transferMine(rI, cI + 1);
		transferMine(rI + 1, cI - 1);
		transferMine(rI + 1, cI);
		transferMine(rI + 1, cI + 1);
	}
}

function showMines() {
	const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
	data.forEach((row, rowIndex) => {
		row.forEach((cell, cellIndex) => {
			if (mines.includes(cell)) {
				$tbody.children[rowIndex].children[cellIndex].textContent = 'X';
			}
		});
	});
}

function onLeftClick(event) {
	const target = event.target; // td
	const rowIndex = target.parentNode.rowIndex;
	const cellIndex = target.cellIndex;
	let cellData = data[rowIndex][cellIndex];
	if (firstClick) {
		// 첫번째클릭이면
		firstClick = false;
		// 찾았던 칸인지 아닌지 알기 위해서 새로운 배열을 실행할 수 밖에 없다
		searched = Array(row)
			.fill()
			.map(() => []);
		if (cellData === CODE.MINE) {
			//첫클릭이 지뢰면
			transferMine(rowIndex, cellIndex); // 지뢰 옮기기
			data[rowIndex][cellIndex] = CODE.NORMAL; // 지금 칸을 빈칸으로
			cellData = CODE.NORMAL;
		}
	}
	if (cellData === CODE.NORMAL) {
		// 닫힌 칸이면
		openAround(rowIndex, cellIndex);
	} else if (cellData === CODE.MINE) {
		// 지뢰 칸이면
		showMines();
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
				//$td.textContent = 'X'; // 개발 편의를 위해 일단 지뢰위치 표시, 개발자모드
			}
			$tr.append($td);
		});
		$tbody.append($tr);
		$tbody.addEventListener('contextmenu', onRightClick);
		$tbody.addEventListener('click', onLeftClick);
	});
}
