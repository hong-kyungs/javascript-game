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
