let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');
const onClickNumber = (event) => {
	//return() => {}가 생략됨. 화살표함수는 중괄호({})와 return이 붙으면 생략 가능.
	//함수안에 함수가 있다. or 함수가 함수를 리턴하고 있다 라고 이해하면 된다.
	//=>1. 고차함수(high order function) : () => () => {}
	//=>2. 고차함수를 쓰지 않고 중복을 제거하는 방법 () => {}
	if (operator) {
		numTwo += event.target.textContent;
	} else {
		numOne += event.target.textContent;
	}
	$result.value += event.target.textContent;
};

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);
document.querySelector('#plus').addEventListener('click', () => {});
document.querySelector('#minus').addEventListener('click', () => {});
document.querySelector('#divide').addEventListener('click', () => {});
document.querySelector('#multiply').addEventListener('click', () => {});
document.querySelector('#calculate').addEventListener('click', () => {});
document.querySelector('#clear').addEventListener('click', () => {});
