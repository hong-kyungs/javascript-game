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
slice(0, 6) - index[0]부터 6개를 자르는 method
sort((a, b) => a - b) - 오름차순으로 정렬하는 method
*/
const winBall = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBall, bonus);
