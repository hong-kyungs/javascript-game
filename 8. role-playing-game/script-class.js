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

class Game {
	constructor(name) {
		this.monster = null;
		this.hero = null;
		this.monsterList = [
			{ name: '슬라임', hp: 25, att: 10, xp: 10 },
			{ name: '스켈레톤', hp: 50, att: 15, xp: 20 },
			{ name: '마왕', hp: 150, att: 35, xp: 50 },
		];
		this.start(name);
	}
	//게임을 시작하는 start 메서드
	start(name) {
		$gameMenu.addEventListener('submit', this.onGameMenuInput);
		$battleMenu.addEventListener('submit', this.onBattleMenuInput);
		this.changeScreen('game');
		this.hero = new Hero(this, name);
		this.updateHeroStat();
	}
	//게임을 종료하는 quit 메서드

	//화면은 전환하는 changeScreen 메서드
	changeScreen(screen) {
		if (screen === 'start') {
			$startScreen.style.display = 'block';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'none';
		} else if (screen === 'game') {
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'block';
			$battleMenu.style.display = 'none';
		} else if (screen === 'battle') {
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'block';
		}
	}

	//일반 메뉴를 담당하는 onGameMenuInput 메서드
	onGameMenuInput = (event) => {
		event.preventDefault();
		const input = event.target['menu-input'].value;
		if (input === '1') {
			//모험
			this.changeScreen('battle');
			//몬스터 생성
			const randomIndex = Math.floor(Math.random() * this.monsterList.length);
			const randomMonster = this.monsterList[randomIndex];
			this.monster = new Monster(
				this,
				randomMonster.name,
				randomMonster.hp,
				randomMonster.att,
				randomMonster.xp
			);
			//몬스터 상태 표시
			this.updateMonsterStat();
			//몬스터 나타났다는 메시지 표시
			this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다.`);
		} else if (input === '2') {
			//휴식
		} else if (input === '3') {
			//종료
		}
	};

	//전투를 담당하는 onBattleMenuInput 메서드
	onBattleMenuInput = (event) => {
		event.preventDefault();
		const input = event.target['menu-input'].value;
		if (input === '1') {
			//공격
			this.changeScreen('battle');
			const { hero, monster } = this;
			hero.attack(monster);
			monster.attack(hero);
			this.showMessage(
				'${hero.att}의 데미지를 주고, ${monster.arr}의 데미지를 받았다.'
			);
			this.updateHeroStat();
			this.updateMonsterStat();
		} else if (input === '2') {
			//회복
		} else if (input === '3') {
			//도망
			this.changeScreen('game');
		}
	};

	//히어로의 상태변화
	updateHeroStat() {
		const { hero } = this;
		if (hero === null) {
			$heroName.textContent = '';
			$heroLevel.textContent = '';
			$heroHp.textContent = '';
			$heroXp.textContent = '';
			$heroatt.textContent = '';
			return;
		}
		$heroName.textContent = hero.name;
		$heroLevel.textContent = `${hero.lev}Lev`;
		$heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
		$heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
		$heroatt.textContent = `ATT: ${hero.att}`;
	}

	//몬스터의 상태변화
	updateMonsterStat() {
		const { monster } = this;
		if (monster === null) {
			$monsterName.textContent = '';
			$monsterHp.textContent = '';
			$monsterAtt.textContent = '';
			return;
		}
		$monsterName.textContent = monster.name;
		$monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
		$monsterAtt.textContent = `ATT: ${monster.att}`;
	}

	//메시지 표시
	showMessage(text) {
		$message.textContent = text;
	}
}

class Hero {
	constructor(game, name) {
		this.game = game;
		this.name = name;
		this.lev = 1;
		this.maxHp = 100;
		this.hp = 100;
		this.xp = 0;
		this.att = 10;
	}
	attack(target) {
		target.hp -= this.att;
	}
	heal(monster) {
		this.hp += 20;
		this.hp -= monster.att;
	}
}

class Monster {
	constructor(game, name, hp, att, xp) {
		this.game = game;
		this.name = name;
		this.maxHp = hp;
		this.hp = hp;
		this.xp = xp;
		this.att = att;
	}
	attack(target) {
		target.hp -= this.att;
	}
}

let game = null;
$startScreen.addEventListener('submit', (event) => {
	event.preventDefault();
	const name = event.target['name-input'].value;
	game = new Game(name);
});
