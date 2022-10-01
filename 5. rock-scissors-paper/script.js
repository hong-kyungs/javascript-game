const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = './rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`; // 0 0은 나중에 이미지의 세로, 가로위치 설정해준다
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
	scissors: '0',
	rock: '-230px',
	paper: '-440px',
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
	if (computerChoice === 'scissors') {
		// 가위면
		computerChoice = 'rock';
	} else if (computerChoice === 'rock') {
		// 바위면
		computerChoice = 'paper';
	} else if (computerChoice === 'paper') {
		// 보면
		computerChoice = 'scissors';
	}
	//background를 바꿀경우, backgroundSize까지 같이 바꿔주어야 에러를 피할 수 있다.
	//rspx.computerChoice -> 문자열을 찾을 떼, so 반드시 rspX[computerChoice]로 해야한다.
	//rspX['scissors'] => 0, rspX['rock'] => -230px, rspX['paper'] => -440px
	$computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
	$computer.style.backgroundSize = 'auto 200px';
};
setInterval(changeComputerHand, 50);
