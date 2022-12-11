const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.getElementById('back');
let data = [];
const history = [];
const scoreHistory = [];

$back.addEventListener('click', () => {
	const prevData = history.pop();
	if (!prevData) return; // 되돌릴게 없으면 종료
	data = prevData.table;
	$score.textContent = prevData.score;
	draw();
});

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

// data = [
// 	[32, 2, 4, 2],
// 	[64, 4, 8, 4],
// 	[2, 1024, 1024, 32],
// 	[32, 16, 64, 4],
// ];
// draw();

let score = 0;
function moveCells(direction) {
	history.push({
		table: JSON.parse(JSON.stringify(data)),
		score: JSON.parse(JSON.stringify(score)),
	});
	switch (direction) {
		case 'left': {
			const newData = [[], [], [], []];
			data.forEach((rowData, i) => {
				rowData.forEach((cellData, j) => {
					if (cellData) {
						const currentRow = newData[i];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === cellData) {
							// 이전값과 지금값이 같으면
							score += currentRow[currentRow.length - 1] * 2;
							$score.textContent = score;
							currentRow[currentRow.length - 1] *= -2;
						} else {
							newData[i].push(cellData);
						}
					}
				});
			});
			console.log(newData);
			[1, 2, 3, 4].forEach((rowData, i) => {
				[1, 2, 3, 4].forEach((cellData, j) => {
					data[i][j] = Math.abs(newData[i][j]) || 0;
				});
			});
			break;
		}
		case 'right': {
			const newData = [[], [], [], []];
			data.forEach((rowData, i) => {
				data.forEach((cellData, j) => {
					if (rowData[3 - j]) {
						const currentRow = newData[i];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === rowData[3 - j]) {
							score += currentRow[currentRow.length - 1] * 2;
							$score.textContent = score;
							currentRow[currentRow.length - 1] *= -2;
						} else {
							newData[i].push(rowData[3 - j]);
						}
					}
				});
			});
			console.log(newData);
			[1, 2, 3, 4].forEach((rowData, i) => {
				[1, 2, 3, 4].forEach((cellData, j) => {
					data[i][3 - j] = Math.abs(newData[i][j]) || 0;
				});
			});
			break;
		}
		case 'up': {
			newData = [[], [], [], []];
			data.forEach((rowData, i) => {
				rowData.forEach((cellData, j) => {
					if (cellData) {
						const currentRow = newData[j];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === cellData) {
							score += currentRow[currentRow.length - 1] * 2;
							$score.textContent = score;
							currentRow[currentRow.length - 1] *= -2;
						} else {
							newData[j].push(cellData);
						}
					}
				});
			});
			console.log(newData);
			[1, 2, 3, 4].forEach((rowData, i) => {
				[1, 2, 3, 4].forEach((cellData, j) => {
					data[i][j] = Math.abs(newData[j][i]) || 0;
				});
			});
			break;
		}
		case 'down': {
			const newData = [[], [], [], []];
			data.forEach((rowData, i) => {
				rowData.forEach((cellData, j) => {
					if (data[3 - i][j]) {
						const currentRow = newData[j];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === data[3 - i][j]) {
							score += currentRow[currentRow.length - 1] * 2;
							$score.textContent = score;
							currentRow[currentRow.length - 1] *= -2;
						} else {
							newData[j].push(data[3 - i][j]);
						}
					}
				});
			});
			console.log(newData);
			[1, 2, 3, 4].forEach((rowData, i) => {
				[1, 2, 3, 4].forEach((cellData, j) => {
					data[3 - j][i] = Math.abs(newData[i][j]) || 0;
				});
			});
			break;
		}
	}
	if (data.flat().includes(2048)) {
		draw();
		setTimeout(() => {
			// 2048을 만들면 승리
			alert('축하합니다. 2048을 만들었습니다.');
		}, 50);
	} else if (!data.flat().includes(0)) {
		// 빈칸이 없으면 패배
		alert(`패배했습니다. ${$score.textContent}점 입니다.`);
	} else {
		put2ToRandomCell(); // 무작위 위치에 2를 놓기
		draw();
	}
}

//키보드 이벤트
window.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowUp') {
		moveCells('up');
	} else if (event.key === 'ArrowDown') {
		moveCells('down');
	} else if (event.key === 'ArrowLeft') {
		moveCells('left');
	} else if (event.key === 'ArrowRight') {
		moveCells('right');
	}
});

//마우스 이벤트
let startCoord;
window.addEventListener('mousedown', (event) => {
	startCoord = [event.clientX, event.clientY];
});

window.addEventListener('mouseup', (event) => {
	const endCoord = [event.clientX, event.clientY];
	const diffX = endCoord[0] - startCoord[0];
	const diffY = endCoord[1] - startCoord[1];
	if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
		moveCells('up');
	} else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
		moveCells('down');
	} else if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
		moveCells('left');
	} else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
		moveCells('right');
	}
});
