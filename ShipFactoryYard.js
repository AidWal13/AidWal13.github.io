const userHealthBar = document.getElementById("userHealthBar");
let footer = document.getElementsByTagName('footer')[0];

let attackButton = document.getElementById('attackButton');
attackButton.addEventListener('click', AttackEnemy);

let healButton = document.getElementById('healButton');
healButton.addEventListener('click', healUser);

let feedbackStage1 = 2500;

// -------------------------------------------------------------------------------------------------------------------

function calcIfItHits(InverseAccuracy) {
    //To decide if it hit or not
    let accRoll = Math.floor(Math.random() * 101);
    //If accuracy is 85%, inverse accuracy is 15%
    if (accRoll > InverseAccuracy+1) {
        return true;
    } else {
        return false;
    }
}

function getDamageAmt() {
    //Calculate random number between 27 and 46 and return it.  This is the pixel amount subtracted
    dmgRoll = (Math.floor(Math.random() * 20)) + 27;
    return dmgRoll;
}

function getHealAmt() {
    //Calculate random number between 20 and 40 and return it.  This is the pixel amount subtracted
    healRoll = (Math.floor(Math.random() * 21)) + 20;
    return healRoll;
}

function menuReturnState(delay) {
    setTimeout(function() {
        footer.innerHTML = '<div class="footFlex"><h2 id="attackButton">Attack</h2><h2 id="healButton">Heal</h2></div>';
        let attackButton = document.getElementById('attackButton');
        let healButton = document.getElementById('healButton');
        attackButton.addEventListener('click', AttackEnemy);
        healButton.addEventListener('click', healUser);
      }, delay);
}

function makeYouWinState() {
    footer.innerHTML = "<h2>You have become victorious!</h2>";
}

function makeYouLoseState() {
    footer.innerHTML = "<h2>You have become fertilizer for the bottom feeders of the ocean!</h2>";
}

// ----------------------------------------------------------USER ACTIONS----------------------------------------------------


function AttackEnemy() {
    let enemyHealthBarGreen = document.getElementById("enemyHealthBarGreen"); //get the green bar to make it smaller
    let enemyHealthNumStringEl = document.getElementById('enemyHealthNum').textContent; //get the number element - "100"

    let enemyHealthBar = window.getComputedStyle(enemyHealthBarGreen, null).getPropertyValue('width'); //get the width in pixels as a string -> 184

    let enemyHealthBarWidth = parseInt(enemyHealthBar); //turn 184 into number, not string
    let enemyHealthNum = parseInt(enemyHealthNumStringEl);// turn "100" into number 100


    let hitBool = calcIfItHits(15);

    if (!hitBool) {
        footer.innerHTML = "<h2>You Missed!</h2>";
        enemyTurn();
        menuReturnState(3000);
    } else {
        let dmgAmt = getDamageAmt(); //this is out of 184 - 
        let dmgAmtAsPercent = Math.floor((dmgAmt/184) * 100); //turn the damage into a number out of 100
        let remainingWidth = enemyHealthBarWidth - dmgAmt; // 184 - damage that accounts for the 184 total

        footer.innerHTML = `<h2>You hit for ${dmgAmtAsPercent}!</h2>`;

        if (remainingWidth > 0) {
            enemyHealthBarGreen.style.width = `${remainingWidth}px`;
            document.getElementById('enemyHealthNum').textContent = `${enemyHealthNum - dmgAmtAsPercent}`;
            enemyTurn();
            menuReturnState(5000);
        } else if (remainingWidth <= 0) {
            enemyHealthBarGreen.style.width = '0px';
            document.getElementById('enemyHealthNum').textContent = `0`;
            enemyTurn();
            makeYouWinState(5000);
        }
    }
}

function healUser() {
    let userHealthBarGreen = document.getElementById("userHealthBarGreen"); //get your green bar
    let userHealthNumStringEl = document.getElementById('userHealthNum').textContent; //get the number element - "100"

    let userHealthBar = window.getComputedStyle(userHealthBarGreen, null).getPropertyValue('width'); //get the width in pixels as a string -> 184

    let userHealthBarWidth = parseInt(userHealthBar); //turn 184 into number, not string
    let userHealthNum = parseInt(userHealthNumStringEl);// turn "100" into number 100

    //first check if the ship is fully healed - if so, tell them and do nothing else.

    if (userHealthBarWidth === 184) {
        footer.innerHTML = `<h2>Your ship is already fully repaired!</h2>`;
        menuReturnState(5000);
    } else {
        let healAmt = getHealAmt(); //
        let healAmtAsPercent = Math.floor((healAmt/184) * 100); //
    
        let resultingWidth = userHealthBarWidth + healAmt; 
        console.log(resultingWidth);
        footer.innerHTML = `<h2>You healed for ${healAmtAsPercent}!</h2>`;
    
        if (resultingWidth < 184) {
            userHealthBarGreen.style.width = `${resultingWidth}px`;
            document.getElementById('userHealthNum').textContent = `${userHealthNum + healAmt}`;
        } else if (resultingWidth >= 184) {
            userHealthBarGreen.style.width = '184px';
            document.getElementById('userHealthNum').textContent = `100`;
            }
        enemyTurn();
        menuReturnState(5000);
    }
}


// ----------------------------------------------------------ENEMY ACTIONS----------------------------------------------------

/*
Get the health, and evaluate the possible risk. If high risk of losing, be slightly more likely to heal than normal.  If not, be much more likely to attack.
1. Get and evaluate health
2. Dictate chances of actions - Heal and attack
3. on Heal - add random amount to enemyhealth
4. on attack - deal random damage to userhealth
*/

function AttackUser() { //get user data, and change it
    let userHealthBarGreen = document.getElementById("userHealthBarGreen"), //get user green bar
        userHealthNumStringEl = document.getElementById('userHealthNum').textContent; //get the user number health element - "100"

    let userHealthBar = window.getComputedStyle(userHealthBarGreen, null).getPropertyValue('width'); //get the width in pixels as a string -> 184

    let userHealthBarWidth = parseInt(userHealthBar); //turn 184 into number, not string
    let userHealthNum = parseInt(userHealthNumStringEl);// turn "100" into number 100


    let hitBool = calcIfItHits(15);

    if (!hitBool) {
        setTimeout(function() {footer.innerHTML = "<h2>The Enemy Ship Missed!</h2>"}, 4500);
    } else {
        let dmgAmt = getDamageAmt(); //this is out of 184 - 
        let dmgAmtAsPercent = Math.floor((dmgAmt/184) * 100); //turn the damage into a number out of 100
        let remainingWidth = userHealthBarWidth - dmgAmt; // current width - damage that accounts for the 184 total
        
        setTimeout(function() {footer.innerHTML = `<h2>You've been hit for ${dmgAmtAsPercent}!</h2>`}, 5000);
        if (remainingWidth > 0) {
            userHealthBarGreen.style.width = `${remainingWidth}px`;
            document.getElementById('userHealthNum').textContent = `${userHealthNum - dmgAmtAsPercent}`;
        } else if (remainingWidth <= 0) {
            userHealthBarGreen.style.width = '0px';
            document.getElementById('userHealthNum').textContent = `0`;
            makeYouLoseState();
        }
    }
}

function HealEnemy() {
    let enemyHealthBarGreen = document.getElementById("enemyHealthBarGreen"); 
    let enemyHealthNumStringEl = document.getElementById('enemyHealthNum').textContent; 

    let enemyHealthBar = window.getComputedStyle(enemyHealthBarGreen, null).getPropertyValue('width');

    let enemyHealthBarWidth = parseInt(enemyHealthBar);
    let enemyHealthNum = parseInt(enemyHealthNumStringEl);

    //first check if the ship is fully healed - if so, tell them and do nothing else.
    
    let healAmt = getHealAmt(); 
    let healAmtAsPercent = Math.floor((healAmt/184) * 100);
    
    let resultingWidth = enemyHealthBarWidth + healAmt; 
    
    setTimeout(function() {footer.innerHTML = `<h2>Enemy ship healed for ${healAmtAsPercent}!</h2>`;}, 5000);
    
    setTimeout(function() {if (resultingWidth < 184) {
            enemyHealthBarGreen.style.width = `${resultingWidth}px`;
            document.getElementById('enemyHealthNum').textContent = `${enemyHealthNum + healAmt}`;
        } else if (resultingWidth >= 184) {
            enemyHealthBarGreen.style.width = '184px';
            document.getElementById('enemyHealthNum').textContent = `100`;
        }
    }, 5000);
    menuReturnState(5000);
    }

function enemyTurn(delay) {
    setTimeout(enemyTurnInternals(), delay);
}

function enemyTurnInternals() { //figure out what the enemy is going to do
    let enemyHealthNumStringEl = document.getElementById('enemyHealthNum').textContent; //get the number element for health
    let enemyHealthNum = parseInt(enemyHealthNumStringEl);// turn string health element into number 

    if(enemyHealthNum >= 45) { //if their health is greater than or equal to 45
        highHealthEnemyAction();
    } else {
        lowHealthEnemyAction();
    }
}

function highHealthEnemyAction() { //it is already known that the health bar is above 45
    let enemyHealthNumStringEl = document.getElementById('enemyHealthNum').textContent; //get the number element for health
    let enemyHealthNum = parseInt(enemyHealthNumStringEl);// turn string health element into number 

    let randomRoll = Math.floor(Math.random() * 101);

    if (randomRoll >= 70 && enemyHealthNum !== 0) { //this is the heal case
        console.log('enemy healing');
        HealEnemy();
    } else { //this is the attack case
        console.log('enemy attacking');
        AttackUser();
    }
}

function lowHealthEnemyAction() {
    let randomRoll = Math.floor(Math.random() * 101);

    if (randomRoll <= 40) { //this is the heal case - 40% of the time, heal
        console.log('enemy healing');
        HealEnemy();
    } else { //this is the attack case
        console.log('enemy attacking');
        AttackUser();
    }
}