const number = parseInt(prompt('몇 명이 참가하나요?'));
const input = document.querySelector('input');
const button = document.querySelector('button');
const givenWord = document.querySelector('#word');
const orderNumber = document.querySelector('#order');
let word; //제시어
let newWord; // 새로 입력한 단어

const onInput = (event) => {
	newWord = event.target.value;
};

const onClickButton = () => {
	//제시어가 비어있는가? 또는 입력한 단어가 올바른가?
	if (!word || word[word.length - 1] === newWord[0]) {
		//비어있다
		word = newWord; //입력한 단어가 제시어가 된다.
		givenWord.textContent = word;
		const order = parseInt(orderNumber.textContent); // 현재순서
		if (order + 1 > number) {
			orderNumber.textContent = 1;
		} else {
			orderNumber.textContent = order + 1;
		}
	} else {
		// 올바르지 않은가?
		alert('올바르지 않은 단어입니다.');
	}
	input.value = '';
	input.focus();
};

input.addEventListener('input', onInput);
button.addEventListener('click', onClickButton);
