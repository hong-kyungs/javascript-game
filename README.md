Javascript로 웹게임 만들기 - by ZeroCho

## 1. 끝말잇기

> 끝말잇기 쿵쿵따게임.  
> 게임인원수는 게임시작시 설정가능하고, 3글자 단어를 올바르게 넣어야한 통과.

- 게임인원수 설정

  <img src="image/word-relay1.png" width="300" height="200"/>

- 제시한 단어가 3글자가 아닐경우 에러메세지

  <img src="image/word-relay2.png" width="300" height="200"/>

- 제시간 단어가 올바르지 않을 경우 에러메세지

  <img src="image/word-relay3.png" width="300" height="200"/>

- 게임참여자 순번 표시하기

```js
const order = parseInt(orderNumber.textContent)
if (order + 1 > number) {
  orderNumber.textContent = 1
} else {
  orderNumber.textContent = order + 1
}
```

---

## 2. 계산기

> 간단 계산기 만들기
>
> - 숫자를 넣지 않으면, 에러메세지생성
> - 연달아 계산 가능

- 계산기

<img src="image/calculator.gif" width="300" height="200"/>

---

## 3. 숫자야구게임

> 상대편이 숫자 1~9중에서 중복되지 않게 4개를 고른다. 10번의 기회가 주어지고, 상대편이 고른 숫자 4개를 맞추는 게임.  
> 틀릴때마다 힌트가 주어지는데, 맞힌 숫자의 개수(볼), 숫자뿐만 아니라 순서가 맞힌 개수(스트라이크), 틀린 개수(아웃)를 알려줍니다.

### 1. 무작위로 숫자 4개 뽑기(Math.random)

```js
const answer = []
for (let n = 0; n < 4; n += 1) {
  const index = Math.floor(Math.random() * numbers.length)
  answer.push(numbers[index])
  numbers.splice(index, 1)
}
```

### 2. 입력된 값 검사

1. 입력된 값이 4자리인지
2. 중복되는 숫자가 있는지
3. 이미 시도한 값은 아닌지

```js
function checkInput(input) {
  if (input.length !== 4) {
    return alert('4자리 숫자를 입력해주세요.')
  }
  if (new Set(input).size !== 4) {
    return alert('중복되지 않게 입력해주세요.')
  }
  if (tries.includes(input)) {
    return alert('이미 시도한 값입니다.')
  }
  return true
}
```

### 3. 스트라이크, 볼, 아웃으로 힌트를 준다. 맞추면 홈런!, 3아웃 이나 10회 동안 맞추지 못하면 패배!

<img src="image/baseball.gif" width="150" height="200"/>

---

## 4. LOTTO

> 타이머를 사용하여 로또추첨기 만들기  
> 랜덤으로 숫자를 골라서 6개의 당첨숫자와 1개의 보너스 숫자를 보여주기

<img src="image/lotto.gif" width="250" height="80"/>
