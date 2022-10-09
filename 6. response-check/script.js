const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
const records = [];
let timeoutId;
$screen.addEventListener('click', (event) => {
	if (event.target.classList.contains('waiting')) {
		//대기화면, 파랑
		$screen.classList.remove('waiting');
		$screen.classList.add('ready');
		$screen.textContent = '초록색이 되면 클릭하세요';
		const random = Math.floor(Math.random() * 1000) + 2000; // 2~3초사이,
		timeoutId = setTimeout(function () {
			$screen.classList.remove('ready');
			$screen.classList.add('now');
			$screen.textContent = '클릭하세요';
			//첫시간재기
			startTime = new Date();
		}, random);
	} else if (event.target.classList.contains('ready')) {
		//준비화면, 빨강
		clearTimeout(timeoutId); // 타이머가 필요없을때는 없애줘야 버그를 피할 수 있다.
		$screen.classList.remove('ready');
		$screen.classList.add('waiting');
		$screen.textContent = '너무 성급하시군요';
	} else if (event.target.classList.contains('now')) {
		//클릭화면, 초록
		//끝 시간 재기
		//시간 차이 저장하기
		endTime = new Date();
		const current = endTime - startTime;
		records.push(current);
		//평균값 구할때 reduce
		const average = records.reduce((a, c) => a + c) / records.length;
		$result.textContent = `현재 ${current}ms, 평균 ${average}ms`;
		//상위 5개, 빨리 클릭한 순으로 보여주기
		const topFive = records.sort((a, b) => a - b).slice(0, 5);
		topFive.forEach((top, idx) => {
			$result.append(document.createElement('br'), `${idx + 1}위 : ${top}ms`);
		});
		startTime = null; // 안써도 되지만 만약을 대비해서 초기화시켜줌
		endTime = null; // 안써도 되지만 만약을 대비해서 초기화시켜줌
		$screen.classList.remove('now');
		$screen.classList.add('waiting');
		$screen.textContent = '클릭해서 시작하세요';
	}
});
