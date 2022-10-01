const candidate = Array(45)
	.fill()
	.map((v, i) => i + 1);

//숫자야구게임에서 무작위 숫자를 Math.random(), splice로 뽑은 것과는 달리
//카드를 섞고 앞에서부터 하나씩 가져오는 방식(피셔 예이츠 셔플, Fisher-Yates Shuffle)
const shuffle = []; //45개의 공이 랜덤하게 섞여서 배열되도록 한다.
while (candidate.length > 0) {
	const random = Math.floor(Math.random() * candidate.length); //무작위 인덱스 뽑기
	const spliceArray = candidate.splice(random, 1); //뽑은 값은 배열에 들어 있음
	const value = spliceArray[0]; //splice로 반환된 배열에 들어있는 값을 꺼내어
	shuffle.push(value); // shuffle 배열에 넣기
}
console.log(shuffle);
//조건이 간단하면 while문이 편하고, 조건이 복잡하면 for문이 편하다.
/*
for (let i = candidate.length; i > 0; i--) {
	const random = Math.floor(Math.random() * i); 
	const spliceArray = candidate.splice(random, 1); 
	const value = spliceArray[0]; 
	shuffle.push(value);
}
console.log(shuffle);
*/

//현재 shuffle안에는 45개의 공이 뽑힌 순서대로 배열되어있다.
/*
slice(0, 6) - index[0]부터 index[6]개를 자르는 method
sort((a, b) => a - b) - 오름차순으로 정렬하는 method
*/
const winBall = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBall, bonus);

const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');

function colorize(number, $tag) {
	if (number < 10) {
		$tag.style.backgroundColor = 'red';
		$tag.style.color = 'white';
	} else if (number < 20) {
		$tag.style.backgroundColor = 'orange';
	} else if (number < 30) {
		$tag.style.backgroundColor = 'yellow';
	} else if (number < 40) {
		$tag.style.backgroundColor = 'blue';
		$tag.style.color = 'white';
	} else {
		$tag.style.backgroundColor = 'green';
		$tag.style.color = 'white';
	}
}

//refactoring(리팩토링) 하는 법
//중복된 것들은 함수로 뺴면서, 중복된 부분을 매개변수로 만든다.
const drawBall = (number, $parent) => {
	const $ball = document.createElement('div');
	$ball.className = 'ball';
	$ball.textContent = number;
	colorize(number, $ball);
	$parent.appendChild($ball);
};

//[0, 1, 2, 3, 4, 5] -> [1000,2000,3000,4000,5000,6000]
for (let i = 0; i < winBall.length; i++) {
	setTimeout(() => {
		drawBall(winBall[i], $result);
	}, (i + 1) * 1000);
}

/*
setTimeout(() => {
	showBall(winBall[0], $result);
}, 1000);
setTimeout(() => {
	showBall(winBall[1], $result);
}, 2000);
setTimeout(() => {
	showBall(winBall[2], $result);
}, 3000);
setTimeout(() => {
	showBall(winBall[3], $result);
}, 4000);
setTimeout(() => {
	showBall(winBall[4], $result);
}, 5000);
setTimeout(() => {
	showBall(winBall[5], $result);
}, 6000);
*/

setTimeout(() => {
	drawBall(bonus, $bonus);
}, 7000);
