const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.getElementById('back');
let data = [];
const history = [];

$back.addEventListener('click', () => {
	const prevData = history.pop();
	if (!prevData) return; // 되돌릴 게 없으면 종료
	$score.textContent = prevData.score;
	data = prevData.table;
	draw();
});

// fragment - 실전에서 화면을 조작할 떄 자주쓰는 표현
//$table -> $fragment -> $tr -> $td
// createElement로 만들어서 실제 태그에 바로 추가(append)하는 방식은 추가해야 할 태그가 많다면 실무에서는 이러한 방식을 쓰지 않는 것이 좋다. 실제 태그에 추가하는 횟수가 많아질수록 성능 문제가 생길 가능성이 높아집니다.
// 그래서 메모리 안에만 존재하는 documentFragment를 만들고, 가상의 태그라고 봐도 된다. 그리고 documentFragment 안에 필요한 태그를 추가(append)한 뒤 마지막으로 $table로 한 번에 documentFragment를 추가하는 방식을 사용합니다. -> 한 번만 그려줘도 되서 성능이 좋다. 화면을 자주 그릴 것 같다면 fragment라는 가상의 부모태그를 만들어서 그 안에 추가한다. 실제화면에는 fragment 하나만 한번에!!
function startGame() {
	const $fragment = document.createDocumentFragment();
	[1, 2, 3, 4].forEach(function () {
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

// 먼저 빈칸을 모두 찾고 무작위로 빈칸 중에 칸 하나를 선택해 숫자 2를 넣는다
function put2ToRandomCell() {
	// 빈칸들이 몇번째 줄, 몇번째 칸인지 emptyCell에 모아두기
	const emptyCells = []; // [[i1, j1], [i1, j2], [i1, j3], [i1, j4]] 의 형태
	data.forEach(function (rowData, i) {
		// i는 몇번째 줄
		rowData.forEach(function (cellData, j) {
			// j는 몇번째 칸
			if (!cellData) {
				// cellData가 빈칸이면
				emptyCells.push([i, j]);
			}
		});
	});
	// randomCell === [i, j]
	const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
	data[randomCell[0]][randomCell[1]] = 2;
}

// 반복문으로 16칸을 화면에 그린다. 그리고 각 칸에 텍스트와 클래스를 부여한다
function draw() {
	data.forEach((rowData, i) => {
		rowData.forEach((cellData, j) => {
			const $target = $table.children[i].children[j]; // $target = td
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

/*
키보드와 마우스 이벤트 종류 
window.addEventListener('keydown', (event) => {
  console.log('keydown', event);
});
window.addEventListener('keyup', (event) => {
  console.log('keyup', event);
});

window.addEventListener('mousedown', (event) => {
  console.log('mousedown', event);
});
window.addEventListener('mousemove', (event) => {
  console.log('mousemove', event);
});
window.addEventListener('mouseup', (event) => {
  console.log('mouseup', event);
});
*/

//dummy data를 이용해서 test해보면서 코드를 짜는 것이 좋다.
//dummy data를 원하는대로 바꾸면서 모든 경우에도 잘 작동하는지 테스트하면 된다.
/*
data = [
	[32, 2, 4, 2],
	[64, 4, 8, 4],
	[2, 1024, 1024, 32],
	[32, 16, 64, 4],
];
draw();
*/

function moveCells(direction) {
	//history에 이전 데이터, 점수 저장하기(push)
	history.push({
		table: JSON.parse(JSON.stringify(data)),
		score: $score.textContent,
	});

	//case문에 {}를 사용한 이유
	//블록스코프의 활용으로 newData를 블록안에서만 활용하기 위해서
	//case 내부에서 const나 let을 사용할 때 중괄호{}를 넣는다
	//const와 let은 블록스코프라서 블록안에서만 접근 가능
	switch (direction) {
		case 'left': {
			const newData = [[], [], [], []]; // 바로 이전 data를 기반으로 newData 생성
			data.forEach((rowData, i) => {
				// draw할 때 data를 drawg하기 떄문에 바꿔주는 주체는 newData가 아니고 data
				rowData.forEach((cellData, j) => {
					if (cellData) {
						//newData[i].push(cellData); 데이터를 newData로 옮길 때 0을(빈칸을) 제외한 나머지 값들을 옮겨서 왼쪽 정렬 효과
						const currentRow = newData[i];
						//값이 하나씩 push되어 들어가기 떄문에 지금 넣을 값의 이전 값은 현재줄의 마지막 값이 된다
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === cellData) {
							//이전 값과 지금 값이 같으면
							const score = parseInt($score.textContent); //점수는 계산할 때 정렬한다
							$score.textContent =
								score + currentRow[currentRow.length - 1] * 2;
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
				rowData.forEach((cellData, j) => {
					if (rowData[3 - j]) {
						const currentRow = newData[i];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === rowData[3 - j]) {
							const score = parseInt($score.textContent);
							$score.textContent =
								score + currentRow[currentRow.length - 1] * 2;
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
			const newData = [[], [], [], []];
			data.forEach((rowData, i) => {
				rowData.forEach((cellData, j) => {
					if (cellData) {
						const currentRow = newData[j];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === cellData) {
							const score = parseInt($score.textContent);
							$score.textContent =
								score + currentRow[currentRow.length - 1] * 2;
							currentRow[currentRow.length - 1] *= -2;
						} else {
							newData[j].push(cellData);
						}
					}
				});
			});
			console.log(newData);
			[1, 2, 3, 4].forEach((cellData, i) => {
				[1, 2, 3, 4].forEach((rowData, j) => {
					data[j][i] = Math.abs(newData[i][j]) || 0;
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
							const score = parseInt($score.textContent);
							$score.textContent =
								score + currentRow[currentRow.length - 1] * 2;
							currentRow[currentRow.length - 1] *= -2;
						} else {
							newData[j].push(data[3 - i][j]);
						}
					}
				});
			});
			console.log(newData);
			[1, 2, 3, 4].forEach((cellData, i) => {
				[1, 2, 3, 4].forEach((rowData, j) => {
					data[3 - j][i] = Math.abs(newData[i][j]) || 0;
				});
			});
			break;
		}
	}
	if (data.flat().includes(2048)) {
		//승리
		draw();
		setTimeout(() => {
			alert('축하합니다. 2048을 만들었습니다!');
		}, 50);
	} else if (!data.flat().includes(0)) {
		// 빈칸이 없으면 패배
		alert(`패배했습니다... ${$score.textContent}점`);
	} else {
		put2ToRandomCell(); // 정렬 후 무작위 위치에 2를 생성하게 한다
		draw();
	}
}

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

//마우스이벤트는 특정한 기준을 잡아야 방향을 판단할 수 있다
//클릭한 순간(mousedown)의 좌표를 기준으로 삼고 이를 클릭했다가 뗐을때(mouseup)의 좌표와 비교해서 방향을 판단
//clientX, clientY는 현재 브라우저 페이지 내에서의 x, y좌표를 가리킨다. pageX, pageY도 브라우저 페이지 내에서의 x,y좌표를 가리키지만, 스크롤이 있으면 스크롤한 픽셀 값까지 포함한다는 점이 clientX, clientY와 다르다
let startCoord; // 시작 좌표
window.addEventListener('mousedown', (event) => {
	startCoord = [event.clientX, event.clientY];
});
window.addEventListener('mouseup', (event) => {
	const endCoord = [event.clientX, event.clientY]; // 끝 좌표
	const diffX = endCoord[0] - startCoord[0];
	const diffY = endCoord[1] - startCoord[1];
	if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
		moveCells('left');
	} else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
		moveCells('right');
	} else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
		moveCells('down');
	} else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
		moveCells('up');
	}
});
