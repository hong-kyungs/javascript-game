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

// 가위바위보의 규칙찾기
// 가위: 1, 바위: 0, 보: -1로 생각하고 내가 낸 것과 컴퓨터가 낸 두값의 차이로 공통규칙 찾아내기
//나\컴퓨터  가위  바위  보
//가위				0     1    2
//바위        -1    0    1
//보          -2    -1   0
const scoreTable = {
	rock: 0,
	scissors: 1,
	paper: -1,
};

//버그예제
//ex) clickbutton 5번 클릭하면(호출), 인터벌 1번, 2번, 3번, 4번, 5번(마지막인 5번만 intervalID에 저장)
//그 다음에 버튼을 클릭하면 clearInterval로 5번만 취소되고,
//1~4번은 실행되게 된다. 그래서 클릭할수록 그림이 더 빠르게 돌아간다.
let clickable = true;
let score = 0;
const clickButton = () => {
	//clickable이라는 변수를 만들어 버튼을 클릭하는 동안에는 false로 만든다.
	//이때 if문의 조건식이 false가 되므로 버튼을 클릭해도 코드가 실행되지 않는다.
	//1초 뒤에 타이머를 재개할 때 clickable을 true로 만들어 다시 if문 내부가 실행될 수 있게 한다.
	if (clickable) {
		clearInterval(intervalID);
		clickable = false;
		const myChoice =
			event.target.textContent === '바위'
				? 'rock'
				: event.target.textContent === '가위'
				? 'scissors'
				: 'paper';
		const myScore = scoreTable[myChoice];
		const computerScore = scoreTable[computerChoice];
		const diff = myScore - computerScore;
		console.log(computerChoice, myChoice, computerScore, myScore, diff);
		let message;
		if (diff === -1 || diff === 2) {
			score += 1;
			message = '승리';
		} else if (diff === 1 || diff === -2) {
			score -= 1;
			message = '패배';
		} else {
			message = '무승부';
		}
		$score.textContent = `${message} 총: ${score}점`;

		/*
		if (myChoice === 'rock') {
			if (computerChoice === 'rock') {
				console.log('무승부');
			} else if (computerChoice === 'scissors') {
				console.log('승리');
			} else if (computerChoice === 'paper') {
				console.log('패배');
			}
		} else if (myChoice === 'scissors') {
			if (computerChoice === 'scissors') {
				console.log('무승부');
			} else if (computerChoice === 'paper') {
				console.log('승리');
			} else if (computerChoice === 'rock') {
				console.log('패배');
			}
		} else if (myChoice === 'paper') {
			if (computerChoice === 'paper') {
				console.log('무승부');
			} else if (computerChoice === 'rock') {
				console.log('승리');
			} else if (computerChoice === 'scissors') {
				console.log('패배');
			}
		}
		*/
		//점수 계산 및 화면 표시
		setTimeout(() => {
			clickable = true;
			clearInterval(intervalID);
			intervalID = setInterval(changeComputerHand, 50);
		}, 1000);
	}
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
