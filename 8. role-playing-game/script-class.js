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
			this.quit();
		}
	};

	//전투를 담당하는 onBattleMenuInput 메서드
	onBattleMenuInput = (event) => {
		event.preventDefault();
		const input = event.target['battle-input'].value;
		if (input === '1') {
			//공격
			this.changeScreen('battle');
			const { hero, monster } = this;
			hero.attack(monster);
			monster.attack(hero);
			if (hero.hp <= 0) {
				this.showMessage(`${hero.lev}레벨에서 전사. 새 주인공을 생성하세요.`);
				this.quit();
			} else if (monster.hp <= 0) {
				this.showMessage(`몬스터를 잡아 ${monster.xp}경험치를 얻었다`);
				hero.getXp(monster.xp);
				this.monster = null;
				this.changeScreen('game');
			} else {
				// 전투 진행 중
				this.showMessage(
					`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
				);
			}
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

	//게임을 종료하는 quit 메서드 - 모든 것을 초기화
	quit() {
		this.hero = null;
		this.monster = null;
		this.updateHeroStat();
		this.updateMonsterStat();
		$gameMenu.removeEventListener('submit', this.onGameMenuInput);
		$battleMenu.removeEventListener('submit', this.onBattleMenuInput);
		this.changeScreen('start');
		game = null;
	}
}

class Unit {
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

class Hero extends Unit {
	constructor(game, name) {
		super(game, name, 100, 10, 0); //부모 클래스의 생성자 호출
		this.lev = 1; // 그 외 속성
	}
	//만약 attack 부분이 부모클래스와 똑같다면 생략가능
	attack(target) {
		super.attack(target); //부모 클래스의 attack
		//부모 클래스 attack 외의 동작
		console.log('영웅이 공격');
	}
	heal(monster) {
		this.hp += 20;
		this.hp -= monster.att;
	}
	getXp(xp) {
		this.xp += xp;
		if (this.xp >= this.lev * 15) {
			// 경험치를 다 채우면
			this.xp -= this.lev * 15;
			this.lev += 1; // 레벨업하면
			this.maxHp += 5; // 최대체력이 5증가하고,
			this.att += 5; // 공격력이 5증가하고
			this.hp = this.maxHp; // 체력을 회복한다
			this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
		}
	}
}

class Monster extends Unit {
	constructor(game, name, hp, att, xp) {
		super(game, name, hp, att, xp);
	}
	attack(target) {
		super.attack(target);
		console.log('몬스터가 공격');
	}
}

let game = null;
$startScreen.addEventListener('submit', (event) => {
	event.preventDefault();
	const name = event.target['name-input'].value;
	game = new Game(name);
});
