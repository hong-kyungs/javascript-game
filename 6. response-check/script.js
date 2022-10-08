const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
const records = [];
$screen.addEventListener('click', (event) => {
	if (event.target.classList.contains('waiting')) {
		//대기화면, 파랑
		$screen.classList.remove('waiting');
		$screen.classList.add('ready');
		$screen.textContent = '초록색이 되면 클릭하세요';
		const random = Math.floor(Math.random() * 1000) + 2000; // 2~3초사이,
		setTimeout(function () {
			event.target.classList.remove('ready');
			event.target.classList.add('now');
			$screen.textContent = '클릭하세요';
			//첫시간재기
			startTime = new Date();
		}, random);
	} else if (event.target.classList.contains('ready')) {
		//준비화면, 빨강
		alert('성급했습니다.');
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
		startTime = null; // 안써도 되지만 만약을 대비해서 초기화시켜줌
		endTime = null; // 안써도 되지만 만약을 대비해서 초기화시켜줌
		event.target.classList.remove('now');
		event.target.classList.add('waiting');
		$screen.textContent = '클릭해서 시작하세요';
	}
});
