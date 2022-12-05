const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.getElementById('back');
let data = [];

//table -> fragment -> tr -> td
function startGame() {
	const $fragment = document.createDocumentFragment();
	[1, 2, 3, 4].forEach(() => {
		const rowData = [];
		data.push(rowData);
		const $tr = document.createElement('tr');
		[1, 2, 3, 4].forEach(() => {
			rowData.push(0);
			const $td = document.createElement('td');
			$tr.appendChild($td);
		});
		$fragment.appendChild($tr);
	});
	$table.appendChild($fragment);
	put2ToRandomCell();
	draw();
}

function put2ToRandomCell() {
	const emptyCells = [];
	data.forEach((rowData, i) => {
		rowData.forEach((cellData, j) => {
			if (!cellData) {
				emptyCells.push([i, j]);
			}
		});
	});
	const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
	data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
	data.forEach((rowData, i) => {
		rowData.forEach((cellData, j) => {
			const $target = $table.children[i].children[j];
			if (cellData > 0) {
				$target.textContent = cellData;
				$target.className = 'color-' + cellData;
			} else {
				$target.textContent = '';
				$target.className = '';
			}
		});
	});
}

startGame();
