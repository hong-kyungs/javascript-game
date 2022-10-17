const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
//주인공
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroatt = document.querySelector('#hero-att');
//몬스터
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');

const $message = document.querySelector('#message');

const hero = {
	name: '',
	lev: 1,
	maxHp: 100,
	hp: 100,
	xp: 0,
	att: 10,
	attack(monster) {
		//attack : function(monster) {} 를 위처럼 생략가능
		monster.hp -= this.att;
		this.hp -= monster.att;
	},
	heal(monster) {
		this.hp += 20;
		this.hp -= monster.att;
	},
};

let monster = null;
const monsterList = [
	{ name: '슬라임', hp: 25, att: 10, xp: 10 },
	{ name: '스켈레톤', hp: 50, att: 15, xp: 20 },
	{ name: '마왕', hp: 150, att: 35, xp: 50 },
];

$startScreen.addEventListener('submit', (event) => {
	event.preventDefault();
	//id를 부여한 폼 내부의 태그는 자동으로 event.target안에 id가 연결된다
	//<input id="name-input"> 을 event.target['name-input']로 불러올 수 있다
	const name = event.target['name-input'].value;
	$startScreen.style.display = 'none';
	$gameMenu.style.display = 'block';
	$heroName.textContent = name;
	$heroLevel.textContent = `${hero.lev}Lev`;
	$heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
	$heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
	$heroAtt.textContent = `ATT: ${hero.att}`;
	hero.name = name;
});

$gameMenu.addEventListener('submit', (event) => {
	event.preventDefault();
	const input = event.target['menu-input'].value;
	if (input === '1') {
		//모험
		$gameMenu.style.display = 'none';
		$battleMenu.style.display = 'block';
		const monster = JSON.parse(
			JSON.stringify(monsterList[Math.floor(Math.random * monsterList.length)])
		);
		monster.maxHp = monster.hp;
		$monsterName.textContent = monster.name;
		$monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
		$monsterAtt.textContent = `ATT: ${monster.att}`;
	} else if (input === '2') {
		//휴식
	} else if (input === '3') {
		//종료
	}
});

// 전투모드
$battleMenu.addEventListener('submit', (event) => {
	event.preventDefault();
	const input = event.target['battle-input'].value;
	if (input === '1') {
		// 공격
		hero.attack(monster);
		monster.attack(hero);
		$monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
		$message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
	} else if (input === '2') {
		// 회복
	} else if (input === '3') {
		// 도망
	}
});
