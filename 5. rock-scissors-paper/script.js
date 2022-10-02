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
let intervalID = setInterval(changeComputerHand, 50);

//버그예제
//ex) clickbutton 5번 클릭하면(호출), 인터벌 1번, 2번, 3번, 4번, 5번(마지막인 5번만 intervalID에 저장)
//그 다음에 버튼을 클릭하면 clearInterval로 5번만 취소되고,
//1~4번은 실행되게 된다. 그래서 클릭할수록 그림이 더 빠르게 돌아간다.
const clickButton = () => {
	clearInterval(intervalID);
	//점수 계산 및 화면 표시
	setTimeout(() => {
		clearInterval(intervalID);
		intervalID = setInterval(changeComputerHand, 50);
	}, 1000);
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
