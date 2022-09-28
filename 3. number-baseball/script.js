const input = document.querySelector('#input');
const form = document.querySelector('#form');
const logs = document.querySelector('#logs');

/*
const numbers = [1,2,3,4,5,6,7,8,9] 라고 해줄 수도 있지만 반복문 연습
*/
const numbers = []; //[1,2,3,4,5,6,7,8,9]
for (let n = 0; n < 9; n += 1) {
	numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n < 4; n += 1) {
	// 4번반복: 숫자 4개를 뽑기 위해서
	const index = Math.floor(Math.random() * numbers.length); //0~8, 1~9숫자의 index는 0~8, (9 - n)을 넣어주는 것보다 number.length를 넣어주면 자동으로 없어진 숫자만큼 length가 처리된다.
	answer.push(numbers[index]);
	numbers.splice(index, 1);
}
console.log(answer);

const tries = [];
function checkInput(input) {
	//검사하는 코드
	if (input.length !== 4) {
		//길이가 4가 아닌가
		return alert('4자리 숫자를 입력해주세요.');
	}
	if (new Set(input).size !== 4) {
		//중복된 숫자가 있는가
		// new Set() : 중복을 제거한 배열, 3114면 314만 출력
		return alert('중복되지 않게 입력해주세요.');
	}
	if (tries.includes(input)) {
		//이미 시도한 값은 아닌가
		return alert('이미 시도한 값입니다.');
	}
	return true;
}

//버튼 태그에 clicl이벤트를 달지 않고, form태그에 submit 이벤트를 달았다. input을 form태그로 감싸서 submit이벤트를 달면 enter키를 눌러 값을 제출할 수 있음.
form.addEventListener('submit', (event) => {
	event.preventDefault(); // 기본 동작 막기
	const value = input.value;
	input.value = '';
	//검사를 통과하면 true를 반환하고, 실패하면 false를 반환한다.

	if (!checkInput(value)) {
		return;
		//에러있음
		//alert의 입력값은 undefined 고, checkInput에서 걸리는게 있어서 alert가 출력되면 undefinded이 반환되고, undefined는 false로 처리된다.
	}

	//입력값 문제없음.
	if (answer.join('') === value) {
		//[3, 1, 4, 6] -> '3146'
		//
		logs.textContent = '홈런';
		return;
	}
	if (tries.length >= 9) {
		const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
		logs.appendChild(message);
		return;
	}
	tries.push(value);
});
