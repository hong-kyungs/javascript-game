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
	let rowIndex;
	let cellIndex;
	rows.forEach((row, ri) => {
		row.forEach((cell, ci) => {
			if (cell === target) {
				rowIndex = ri;
				cellIndex = ci;
			}
		});
	});
	//세 칸 다 채워졌나?
	let hasWinner = false; // 검사할때는 항상 false로 시작하면 된다, 승자가 있으면 true로 바꿔준다
	//가로줄검사
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

const callback = (event) => {
	//칸에 글자가 있나?
	if (event.target.textContent !== '') {
		console.log('빈칸이 아닙니다.');
	} else {
		console.log('빈칸입니다.');
		event.target.textContent = turn;
		//승부 확인
		if (checkWinner(event.target)) {
			$result.textContent = `${turn}님이 승리!`;
			$table.removeEventListener('click', callback);
			return;
		}
		// 무승부 검사
		let draw = true;
		rows.forEach((row) => {
			row.forEach((cell) => {
				if (!cell.textContent) {
					//한칸이라도 비어있으면 무승부가 아닌걸로 간주 = 9칸이 꽉차있으면 무승부
					draw = false;
				}
			});
		});
		if (draw) {
			$result.textContent = '무승부';
			return;
		}
		turn = turn === 'O' ? 'X' : 'O';
		// if (turn === 'O') {
		// 	turn = 'X';
		// } else if (turn === 'X') {
		// 	turn = 'O';
		// }
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
