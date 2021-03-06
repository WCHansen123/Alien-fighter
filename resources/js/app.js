
var BtnSolo = document.getElementById("solo");
var BtnMulti = document.getElementById("Multiplayer");

BtnSolo.onclick = startSolo;
BtnMulti.onclick = startMultiplayer;

var leftSide = document.getElementById("LeftSide");
var rightSide = document.getElementById("RightSide");

var BtnBp1 = document.getElementById("BP1");
var BtnBp2 = document.getElementById("BP2");

var soloPlay;

BtnBp1.onclick = openSkillTreeP1;
BtnBp2.onclick = openSkillTreeP2;

var openSkillsP1 = false;
var openSkillsP2 = false;

var skillsP1 = document.getElementById("Open-SkillsP1");
var skillsP2 = document.getElementById("Open-SkillsP2");

var showHealthP1 = document.getElementById("ShowHealthP1");
var showHealthP2 = document.getElementById("ShowHealthP2");

var P1Pos = 0;
var P1PosHeight = 0;
var player1 = document.getElementById("P1");
var introP = document.getElementById("introP");

var attackaudio = new Audio('../resources/audio/attack.mp3');
var attackaudio2 = new Audio('../resources/audio/attack.mp3');

var introaudio = new Audio('../resources/audio/background.mp3');

var battleaudio = new Audio('../resources/audio/battle.wav');



///////////////////////////////////////////////////////////////////////////////

introaudio.play();
introaudio.loop = true; 

BtnSolo.style.display = "none";
BtnMulti.style.display = "none";

function startTitle() {
	setTimeout(function(){
		BtnSolo.className = 'fadeIn';
		BtnMulti.className = 'fadeIn';

		BtnSolo.style.display = "inline-block";
		BtnMulti.style.display = "inline-block";
	}, 11500);

	introP.className = 'bounce';
	introP.style.display = 'inline-block';
	document.getElementById('blaster').onclick = false;
	setTimeout(function(){ introP.src = "../resources/img/P1-heal/green__0027_jump_1.png"; }, 7500);
	setTimeout(function(){ introP.src = "../resources/img/idle.png"; document.getElementById('blaster').style.display = "none";  }, 7700);
	setTimeout(function(){ introidle(); }, 7000);

	
}


function startSolo() {
	introaudio.pause();
	battleaudio.play(); 
	battleaudio.loop = true;
	leftSide.style.display = "block";
	rightSide.style.display = "block";
	BtnSolo.style.display = "none";
	BtnMulti.style.display = "none";
	BtnBp2.disabled = true;
	soloPlay = true;
	introP.style.display = 'none';
}

function startMultiplayer() {
	leftSide.style.display = "block";
	rightSide.style.display = "block";
	BtnSolo.style.display = "none";
	BtnMulti.style.display = "none";
	BtnBp2.disabled = true;
	soloPlay = false;
}


function openSkillTreeP1() {

	if (openSkillsP1 === false) {
		skillsP1.style.display = "block";
		openSkillsP1 = true;
	}

	else{
		skillsP1.style.display = "none";
		openSkillsP1 = false;
	}
}

function openSkillTreeP2() {

	if (openSkillsP2 === false) {
		skillsP2.style.display = "block";
		openSkillsP2 = true;
	}

	else{
		skillsP2.style.display = "none";
		openSkillsP2 = false;
	}
}

///////////////////////////////////////////////////////////////////////////////

var HealthP1 = 25;
var HealthP2 = 25;

var Attackp1 = document.getElementById("AttackP1");
Attackp1.onclick = AttackP1;

var Attackp2 = document.getElementById("AttackP2");
Attackp2.onclick = AttackP2;

var Healp1 = document.getElementById("HealP1");
Healp1.onclick = HealP1;

var Healp2 = document.getElementById("HealP2");
Healp2.onclick = HealP2;

var Specialp1 = document.getElementById("SpecialP1");
Specialp1.onclick = SpecialP1;

var Specialp2 = document.getElementById("SpecialP2");
Specialp2.onclick = SpecialP2;


function AttackP1() {

	attackAni();

	var DMG = Math.floor((Math.random()*2) + 4);
	HealthP2 = HealthP2 - DMG;

	skillsP1.style.display = "none";
	openSkillsP1 = false;

	//////////  Writing data in player1 log  //////////
	setTimeout(function(){attackaudio.play()}, 500);

	var p = document.createElement("p");
	p.innerHTML = "Player 1 did " + DMG + " damage to player 2";
	document.getElementById("consolelogP1").append(p);

	var _ = document.createElement("p");
	_.innerHTML = "_________________________";
	document.getElementById("consolelogP1").append(_);

	///////////////////////////////////////////////////

	setTimeout(function(){ showHealthP2.innerHTML = HealthP2 + " health remaining"; }, 1850);


	BtnBp1.disabled = true;
	BtnBp2.disabled = false;

	if (soloPlay === true && HealthP2 > 0) {
		AI();
	}

	if (HealthP2 > 0) {
	setTimeout(function(){ hurtAni2() }, 1150)
}

	else if (HealthP2 < 1) {
		setTimeout(function(){ alert("Winner Player 1")}, 3500);
		setTimeout(function(){ deadani2(); }, 2000);
		
	}
}

function HealP1() {

	var Heal = Math.floor((Math.random() * 2) + 3);

	HealthP1 = HealthP1 + Heal;

	skillsP1.style.display = "none";
	openSkillsP1 = false;

	if (HealthP1 >= 25) {
		HealthP1 = 25;

		//////////  Writing data in player1 log  //////////

		var p = document.createElement("p");
		p.innerHTML = "player 2 healed till full health";
		document.getElementById("consolelogP1").append(p);
 
		var _ = document.createElement("p");
		_.innerHTML = "_________________________";
		 document.getElementById("consolelogP1").append(_);

		///////////////////////////////////////////////////
	}	

	else{

		var p = document.createElement("p");
		p.innerHTML = "Player 1 healed " + Heal + " health";
		document.getElementById("consolelogP1").append(p);

		var _ = document.createElement("p");
		_.innerHTML = "_________________________";
		document.getElementById("consolelogP1").append(_);
	}

	BtnBp1.disabled = true;
	BtnBp2.disabled = false;

	setTimeout(function(){ showHealthP1.innerHTML = HealthP1 + " health remaining"; }, 900);

	

	healani();

	if (soloPlay === true) {
		AI();
	}
}

function SpecialP1() {

	skillsP1.style.display = "none";

	var DMG = Math.floor((Math.random() * 4) + 4);
	HealthP2 = HealthP2 - DMG;

	var Heal = Math.floor((Math.random() * 3) + 1);
	HealthP1 = HealthP1 + Heal;

	//////////  Writing data in player1 log  //////////

	var p = document.createElement("p");
	p.innerHTML = "Player 2 did " + DMG + " damage to player 1 and healed";
	document.getElementById("consolelogP1").append(p);

	var _ = document.createElement("p");
	_.innerHTML = "_________________________";
	document.getElementById("consolelogP1").append(_);

	///////////////////////////////////////////////////

	document.getElementById("SpecialP1").disabled = true;

	BtnBp2.disabled = true;
	BtnBp1.disabled = false;

	setTimeout(function(){ showHealthP2.innerHTML = HealthP2 + " health remaining"; }, 1800);

		specialani();

	if (soloPlay === true) {
		AI();
	}
}


function AttackP2() {

	var DMG = Math.floor((Math.random()*2) + 4); 
	HealthP1 = HealthP1 - DMG;

	skillsP2.style.display = "none";
	openSkillsP2 = false;

	// BtnBp1.disabled = true;
	// BtnBp2.disabled = false;

	//////////  Writing data in player1 log  //////////

	setTimeout(function(){attackaudio2.play()}, 500);

	var p = document.createElement("p");
	p.innerHTML = "Player 2 did " + DMG + " damage to player 1";
	document.getElementById("consolelogP2").append(p);

	var _ = document.createElement("p");
	_.innerHTML = "_________________________";
	document.getElementById("consolelogP2").append(_);

	///////////////////////////////////////////////////

	
	setTimeout(function(){ showHealthP1.innerHTML = HealthP1 + " health remaining"; }, 1850);

	BtnBp2.disabled = true;
	BtnBp1.disabled = false;

	if (soloPlay === true) {
		attackAni2();
	}

	if (soloPlay === false) {
		attackAni2();
	}

	if (HealthP1 < 1) {
		setTimeout(function(){ deadani()}, 2500);
	}

	else if (HealthP1 > 0) {
	setTimeout(function(){ hurtAni() }, 1150)
}	
	
}

function HealP2() {

	var Heal = Math.floor((Math.random() * 2) + 3);

	HealthP2 = HealthP2 + Heal;

	skillsP2.style.display = "none";
	openSkillsP2 = false;

	if (HealthP2 >= 25) {

		HealthP2 = 25;
		var p = document.createElement("p");
		p.innerHTML = "player 2 healed till full health";
		document.getElementById("consolelogP2").append(p);
 
		var _ = document.createElement("p");
		_.innerHTML = "_________________________";
		 document.getElementById("consolelogP2").append(_);
	}	

	else{

		var p = document.createElement("p");
		p.innerHTML = "Player 2 healed " + Heal + " health";
		document.getElementById("consolelogP2").append(p);

		var _ = document.createElement("p");
		_.innerHTML = "_________________________";
		document.getElementById("consolelogP2").append(_);
	}

	BtnBp2.disabled = true;
	BtnBp1.disabled = false;

	
	setTimeout(function(){ showHealthP2.innerHTML = HealthP2 + " health remaining"; }, 900);

	healani2()
}

function SpecialP2() {

	document.getElementById("Open-SkillsP2").style.display = "none";

	var DMG = Math.floor((Math.random() * 4) + 4);
	HealthP1 = HealthP1 - DMG;

	var Heal = Math.floor((Math.random() * 3) + 1);
	HealthP2 = HealthP2 + Heal;

	var p = document.createElement("p");
	p.innerHTML = "Player 2 did " + DMG + " damage to player 1 and healed";
	document.getElementById("consolelogP2").append(p);


	var p = document.createElement("p");
	p.innerHTML = "_________________________";
	document.getElementById("consolelogP1").append(p);

	document.getElementById("SpecialP2").disabled = true;

	BtnBp2.disabled = true;
	BtnBp1.disabled = false;

	specialani2();

	
	setTimeout(function(){ showHealthP2.innerHTML = HealthP2 + " health remaining"; }, 1800);

}

function AI() {
	var bot =  Math.random();
	var special = true;

	if (HealthP2 > 10) {
		if (bot <= 0.1) {
			setTimeout(function(){ HealP2(); }, 2500);
		}	

		else if (bot <= 1) {
		setTimeout(function(){ AttackP2(); }, 2500);
			
		}
	}
	else{
		if (bot <= 0.48) {
			setTimeout(function(){ HealP2(); }, 2500);
		}	

		else if (bot <= 0.76 && special === true) {
			setTimeout(function(){ Specialp2(); }, 2500);
			special = false;
		}

		else if (bot <= 1) {
			setTimeout(function(){ AttackP2(); }, 2500);
		}
	}
}


function attackAni() {

	var player1 = document.getElementById("P1");
	

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0035_fire_1.png"; }, 150);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0036_fire_2.png"; }, 2050);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0037_fire_3.png"; }, 350);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0038_fire_4.png"; }, 450);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0039_fire_5.png"; }, 550);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0040_fire_6.png"; }, 650);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0041_fire_7.png"; }, 750);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0042_fire_8.png"; }, 850);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0043_fire_9.png"; }, 950);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0044_fire_10.png"; }, 1050);

	setTimeout(function(){ player1.src = "../resources/img/P1-attack/green__0045_fire_11.png"; }, 1150);

	setTimeout(function(){ player1.src = "../resources/img/idle.png"; }, 3000);
}
function attackAni2() {

	var player2 = document.getElementById("P2");

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0035_fire_1.png"; }, 150);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0036_fire_2.png"; }, 2050);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0037_fire_3.png"; }, 350);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0038_fire_4.png"; }, 450);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0039_fire_5.png"; }, 550);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0040_fire_6.png"; }, 650);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0041_fire_7.png"; }, 750);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0042_fire_8.png"; }, 850);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0043_fire_9.png"; }, 950);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0044_fire_10.png"; }, 1050);

	setTimeout(function(){ player2.src = "../resources/img/P2-attack/green__0045_fire_11.png"; }, 1150);

	setTimeout(function(){ player2.src = "../resources/img/idle2.png"; }, 3000);

	setTimeout(function(){ hurtAni(); }, 1150);

}
function hurtAni() {

	var player1 = document.getElementById("P1");

	setTimeout(function(){ player1.src = "../resources/img/P1-hurt/green__0019_hurt_2.png"; }, 150);

	setTimeout(function(){ player1.src = "../resources/img/P1-hurt/green__0020_hurt_3.png"; }, 250);

	setTimeout(function(){ player1.src = "../resources/img/P1-hurt/green__0021_hurt_4.png"; }, 350);

	setTimeout(function(){ player1.src = "../resources/img/idle.png"; }, 700);
}
function hurtAni2() {

	var player2 = document.getElementById("P2");

	setTimeout(function(){ player2.src = "../resources/img/P2-hurt/green__0019_hurt_2.png"; }, 150);

	setTimeout(function(){ player2.src = "../resources/img/P2-hurt/green__0020_hurt_3.png"; }, 250);

	setTimeout(function(){ player2.src = "../resources/img/P2-hurt/green__0021_hurt_4.png"; }, 350);

	setTimeout(function(){ player2.src = "../resources/img/idle2.png"; }, 700);
}
function deadani() {

	var player1 = document.getElementById("P1");

	setTimeout(function(){ player1.src = "../resources/img/P1-hurt/green__0019_hurt_2.png"; }, 150);

	setTimeout(function(){ player1.src = "../resources/img/P1-hurt/green__0020_hurt_3.png"; }, 250);

	setTimeout(function(){ player1.src = "../resources/img/P1-hurt/green__0021_hurt_4.png"; }, 350);

	setTimeout(function(){ player1.src = "../resources/img/P1-dead/green__0022_dead_1.png"; }, 450);

	setTimeout(function(){ player1.src = "../resources/img/P1-dead/green__0023_dead_2.png"; }, 550);

	setTimeout(function(){ player1.src = "../resources/img/P1-dead/green__0024_dead_3.png"; }, 650);

	setTimeout(function(){ player1.src = "../resources/img/P1-dead/green__0025_dead_4.png"; }, 750);

	setTimeout(function(){ player1.src = "../resources/img/P1-dead/green__0026_dead_5.png"; }, 850);
}
function deadani2() {

	var player2 = document.getElementById("P2");

	setTimeout(function(){ player2.src = "../resources/img/P2-hurt/green__0019_hurt_2.png"; }, 150);

	setTimeout(function(){ player2.src = "../resources/img/P2-hurt/green__0020_hurt_3.png"; }, 250);

	setTimeout(function(){ player2.src = "../resources/img/P2-hurt/green__0021_hurt_4.png"; }, 350);

	setTimeout(function(){ player2.src = "../resources/img/P2-dead/green__0022_dead_1.png"; }, 450);

	setTimeout(function(){ player2.src = "../resources/img/P2-dead/green__0023_dead_2.png"; }, 550);

	setTimeout(function(){ player2.src = "../resources/img/P2-dead/green__0024_dead_3.png"; }, 650);

	setTimeout(function(){ player2.src = "../resources/img/P2-dead/green__0025_dead_4.png"; }, 750);

	setTimeout(function(){ player2.src = "../resources/img/P2-dead/green__0026_dead_5.png"; }, 850);
}
function specialani() {
	var player1 = document.getElementById("P1");

	setTimeout(function(){ player1.src = "../resources/img/P1-special/green__0031_attack_1.png"; }, 150);

	setTimeout(function(){ player1.src = "../resources/img/P1-special/green__0032_attack_2.png"; }, 300);

	setTimeout(function(){ player1.src = "../resources/img/P1-special/green__0033_attack_3.png"; }, 450);

	setTimeout(function(){ player1.src = "../resources/img/P1-special/green__0034_attack_4.png"; }, 600);

	setTimeout(function(){ player1.src = "../resources/img/idle.png"; }, 1800);

}
function specialani2() {
	var player2 = document.getElementById("P2");

	setTimeout(function(){ player2.src = "../resources/img/P2-special/green__0031_attack_1.png"; }, 150);

	setTimeout(function(){ player2.src = "../resources/img/P2-special/green__0032_attack_2.png"; }, 300);

	setTimeout(function(){ player2.src = "../resources/img/P2-special/green__0033_attack_3.png"; }, 450);

	setTimeout(function(){ player2.src = "../resources/img/P2-special/green__0034_attack_4.png"; }, 600);

	setTimeout(function(){ player2.src = "../resources/img/idle2.png"; }, 1800);
}
function healani() {
	var player1 = document.getElementById("P1");

	setTimeout(function(){ player1.src = "../resources/img/P1-heal/green__0027_jump_1.png"; }, 150);

	setTimeout(function(){ player1.src = "../resources/img/P1-heal/green__0028_jump_2.png"; }, 300);

	setTimeout(function(){ player1.src = "../resources/img/P1-heal/green__0029_jump_3.png"; }, 450);

	setTimeout(function(){ player1.src = "../resources/img/P1-heal/green__0030_jump_4.png"; }, 600);

	setTimeout(function(){ player1.src = "../resources/img/P1-heal/green__0027_jump_1.png"; }, 750);

	setTimeout(function(){ player1.src = "../resources/img/idle.png"; }, 900);
}

function healani2() {
	var player2 = document.getElementById("P2");

	setTimeout(function(){ player2.src = "../resources/img/P2-heal/green__0027_jump_1.png"; }, 150);

	setTimeout(function(){ player2.src = "../resources/img/P2-heal/green__0028_jump_2.png"; }, 300);

	setTimeout(function(){ player2.src = "../resources/img/P2-heal/green__0029_jump_3.png"; }, 450);

	setTimeout(function(){ player2.src = "../resources/img/P2-heal/green__0030_jump_4.png"; }, 600);

	setTimeout(function(){ player2.src = "../resources/img/P2-heal/green__0027_jump_1.png"; }, 750);

	setTimeout(function(){ player2.src = "../resources/img/idle2.png"; }, 900);
}

function introidle() {
	var idle1 = Math.floor((Math.random() * 2) + 1);


	if (idle1 == 1) {

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0035_fire_1.png"; }, 5150);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0036_fire_2.png"; }, 5250);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0037_fire_3.png"; }, 5350);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0038_fire_4.png"; }, 5450);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0039_fire_5.png"; }, 5550);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0038_fire_4.png"; }, 7000);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0037_fire_3.png"; }, 7150);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0036_fire_2.png"; }, 7250);

	setTimeout(function(){ introP.src = "../resources/img/P1-attack/green__0035_fire_1.png"; }, 7350);

	setTimeout(function(){ introP.src = "../resources/img/idle.png"; }, 7450);

}
	else if (idle1 == 2) {
	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0035_fire_1.png"; }, 5150);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0036_fire_2.png"; }, 5250);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0037_fire_3.png"; }, 5350);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0038_fire_4.png"; }, 5450);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0039_fire_5.png"; }, 5550);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0038_fire_4.png"; }, 7000);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0037_fire_3.png"; }, 7150);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0036_fire_2.png"; }, 7250);

	setTimeout(function(){ introP.src = "../resources/img/P2-attack/green__0035_fire_1.png"; }, 7350);

	setTimeout(function(){ introP.src = "../resources/img/idle2.png"; }, 7450);

}
	setTimeout(function(){ introidle(); }, 15000);
}
