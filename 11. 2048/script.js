const $table = document.getElementById('table');
const $score = document.getElementById('scroe');
let data = [];

// fragment - 실전에서 화면을 조작할 떄 자주쓰는 표현
//$table -> $fragment -> $tr -> $td
// reateElement로 만들어서 실제 태그에 바로 추가(append)하는 방식은 추가해야 할 태그가 많다면 실무에서는 이러한 방식을 쓰지 않는 것이 좋. 실제 태그에 추가하는 횟수가 많아질수록 성능 문제가 생길 가능성이 높아집니다.
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

// 반복문으로 16칸을 화면에 그린다. 그리고 각 칸에 텍스트와 클래스르 부여한다
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

function moveCells(direction) {}
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
