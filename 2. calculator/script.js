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
	if (!operator) {
		//비어있다
		numOne += event.target.textContent;
		$result.value += event.target.textContent;
		return;
	}
	//비어있지 않다
	if (!numTwo) {
		$result.value = '';
	}
	numTwo += event.target.textContent;
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

const onClickOperator = (op) => () => {
	if (numOne) {
		operator = op;
		$operator.value = op;
	} else {
		alert('숫자를 먼저 입력하세요.');
	}
};
document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document
	.querySelector('#minus')
	.addEventListener('click', onClickOperator('-'));
document
	.querySelector('#divide')
	.addEventListener('click', onClickOperator('/'));
document
	.querySelector('#multiply')
	.addEventListener('click', onClickOperator('*'));
document.querySelector('#calculate').addEventListener('click', () => {
	if (numTwo) {
		switch (operator) {
			case '+':
				$result.value = parseInt(numOne) + parseInt(numTwo);
				//break를 걸어줘야 멈춘다. 그렇지 않으면, 아래 모든 동작문이 실행된다.
				break;
			//-, *, / 는 문자열을 숫자로 바꾸기 때문에 굳이 parseInt를 해주지 않아도 된다.
			case '-':
				$result.value = numOne - numTwo;
				break;
			case '*':
				$result.value = numOne * numTwo;
				break;
			case '/':
				$result.value = numOne / numTwo;
				break;
			default:
				break;
		}
		//연달아 계산하기 추가.
		$operator.value = '';
		numOne = $result.value;
		operator = '';
		numTwo = '';
		/*
		if (operator === '+') {
			$result.value = parseInt(numOne) + parseInt(numTwo);
		} else if (operator === '-') {
			$result.value = numOne - numTwo;
		} else if (operator === '*') {
			$result.value = numOne * numTwo;
		} else if (operator === '/') {
			$result.value = numOne / numTwo;
		}
		*/
	} else {
		alert('숫자를 먼저 입력하세요.');
	}
});

document.querySelector('#clear').addEventListener('click', () => {
	numOne = '';
	operator = '';
	numTwo = '';
	$operator.value = '';
	$result.value = '';
});

/* practice!!!
const func = (msg) => () => {
	console.log(msg);
};
const innerFunc1 = func('Hello');
const innerFunc2 = func('Java');
const innerFunc3 = func();
innerFunc1();
innerFunc2();
innerFunc3();
*/
