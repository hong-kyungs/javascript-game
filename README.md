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
>- 숫자를 넣지 않으면, 에러메세지생성  
>- 연달아 계산 가능  

- 계산기  
<img src="image/calculator.gif" width="300" height="200"/>

