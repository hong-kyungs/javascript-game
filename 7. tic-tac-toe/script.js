const $table = document.createElement('table');
const $result = document.createElement('div');

let turn = 'O';
const rows = [];

const callback = (event) => {
	//칸에 글자가 있나?
	if (event.target.textContent !== '') {
		console.log('빈칸이 아닙니다.');
	} else {
		console.log('빈칸입니다.');
		event.target.textContent = turn;
		//승부 확인
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
		$td.addEventListener('click', callback);
		$tr.append($td);
	}
	$table.append($tr);
	rows.push(cells);
}

document.body.append($table);
document.body.append($result);
