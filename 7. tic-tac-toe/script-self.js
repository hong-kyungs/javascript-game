const $table = document.createElement('table');
const $result = document.createElement('div');

let turn = 'O';
const rows = [];
//[
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
//]

const checkWinner = (target) => {
	let rowIndex = target.parentNode.rowIndex;
	let cellIndex = target.cellIndex;
	let hasWinner = false;
	if (
		rows[rowIndex][0].textContent === turn &&
		rows[rowIndex][1].textContent === turn &&
		rows[rowIndex][2].textContent === turn
	) {
		hasWinner = true;
	}
	//세로줄검사
	if (
		rows[0][cellIndex].textContent === turn &&
		rows[1][cellIndex].textContent === turn &&
		rows[2][cellIndex].textContent === turn
	) {
		hasWinner = true;
	}
	//대각선검사
	if (
		rows[0][0].textContent === turn &&
		rows[1][1].textContent === turn &&
		rows[2][2].textContent === turn
	) {
		hasWinner = true;
	}
	if (
		rows[0][2].textContent === turn &&
		rows[1][1].textContent === turn &&
		rows[2][0].textContent === turn
	) {
		hasWinner = true;
	}
	return hasWinner;
};

const checkWinnerAndDraw = (target) => {
	const hasWinner = checkWinner(target);
	if (hasWinner) {
		$result.textContent = `${turn}님이 승리!`;
		$table.removeEventListener('click', callback);
		return;
	}
	// 무승부 검사
	const draw = rows.flat().every((cell) => cell.textContent);
	if (draw) {
		$result.textContent = '무승부';
		return;
	}
	turn = turn === 'O' ? 'X' : 'O';
};

let clickable = true; // flag변수, 중간에 클릭방지, setTimeout사용시 필요
const callback = (event) => {
	if (!clickable) return;
	//칸에 글자가 있나?
	if (event.target.textContent !== '') {
		console.log('빈칸이 아닙니다.');
		return;
	}
	console.log('빈칸입니다.');
	event.target.textContent = turn;
	//승부 확인
	checkWinnerAndDraw(event.target);
	if (turn === 'X') {
		clickable = false;
		setTimeout(() => {
			const emptyCells = rows.flat().filter((value) => !value.textContent);
			const randomCells =
				emptyCells[Math.floor(Math.random() * emptyCells.length)];
			randomCells.textContent = 'X';
			//승부 확인
			checkWinnerAndDraw(randomCells);
			clickable = true;
		}, 1000);
	}
};

for (let i = 0; i < 3; i++) {
	const $tr = document.createElement('tr');
	const cells = [];
	for (let j = 0; j < 3; j++) {
		const $td = document.createElement('td');
		cells.push($td);
		$tr.append($td);
	}
	$table.append($tr);
	rows.push(cells);
}

$table.addEventListener('click', callback);
document.body.append($table);
document.body.append($result);
