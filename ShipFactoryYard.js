//Initilize the button interactivity
const atkButton = document.getElementById("attackButton");
atkButton.addEventListener('mouseup', attackEnemyShip);
const healButton = document.getElementById("healButton");
healButton.addEventListener('mouseup', healUserShip);

let delayedActionOneTime = 2000;
let delayedActionTwoTime = 3750;

//debug attack button click counter
let atkButtonClickCount = 0;

//Get the footer element
const footer = document.getElementsByTagName("footer")[0];

//function that assesses accuracy as a percentage
function getAccuracyRoll() {
    let accuracyRoll = Math.floor(Math.random() * 101);
    atkButtonClickCount++;
    console.log(`The calculated accuracy roll for Attack button press number ${atkButtonClickCount} has been ${accuracyRoll}`);
    return accuracyRoll;
}

//function that returns an amount between 20 and 55
function calculateHitDmgAmt() {
    let dmgAmt = Math.floor(Math.random() * 36) + 20;
    console.log(`The amount the enemy ship has been hit for is ${dmgAmt}.`);
    return dmgAmt;
}

//function that returns an amount between 25 and 70
function calculateHealAmt() {
    let healAmt = Math.floor(Math.random() * 46) + 25;
    console.log(`The amount the user ship has healed for is ${healAmt}.`);
    return healAmt;
}

//function that sets the footer content back to its default
function returnToPlayerTurnState() {
    footer.innerHTML = '<div class="footFlex"><h2 id="attackButton">Attack</h2><h2 id="healButton">Heal</h2></div>';
    //reinitialize the buttons
    const atkButton = document.getElementById("attackButton")
    atkButton.addEventListener('mouseup', attackEnemyShip);
    const healButton = document.getElementById("healButton");
    healButton.addEventListener('mouseup', healUserShip);
}

function displayLoseSituation() {
    footer.innerHTML = '<div class="footFlex"><h2 id="loseMessage">Your journey ends here...</h2></div>';
    document.getElementById('userShip').style.animationName = 'LoseAnim';
    document.getElementById('userShip').style.animationFillMode = 'forwards';
    document.getElementById('userShip').style.animationIterationCount = 1;
}
function displayWinSituation() {
    footer.innerHTML = '<div class="footFlex"><h2 id="winMessage">You are victorious!</h2></div>';
    document.getElementById('enemyShip').style.animationName = 'LoseAnim';
    document.getElementById('enemyShip').style.animationFillMode = 'forwards';
    document.getElementById('enemyShip').style.animationIterationCount = 1;
}



function attackEnemyShip() {
    //Retrieve the UI number displayed
    let numberDisplayingEnemyHealth = document.getElementById("enemyHealthNum").textContent;
    let enemyHealthAsNum = parseInt(numberDisplayingEnemyHealth);
    console.log(`The extracted number for the health is ${enemyHealthAsNum}`)

    //Retrieve the green bar in the UI
    const greenHealthBar = document.getElementById("enemyHealthBarGreen");//get the element
    
    //Determine hit or not
    let accuracyRoll = getAccuracyRoll()

    //Alter webpage to display hit or miss
    if (accuracyRoll > 78) { 
        footer.innerHTML = '<h2 id="missMessage">You missed!</h2>'
        setTimeout(enemyTurn, 2000);
    } else if (accuracyRoll <= 78) {
        let hitAmt = calculateHitDmgAmt();
        footer.innerHTML = `<h2 id=hitMessage> You have hit for ${hitAmt}!</h2>`
        //Update Health Number
        let newHealthNum = enemyHealthAsNum - hitAmt;

        if (newHealthNum > 0) {
            document.getElementById("enemyHealthNum").textContent = newHealthNum;
            //Update Health Bar
            greenHealthBar.style.width = `${newHealthNum}px`;
            setTimeout(enemyTurn, 2000);
        } else if (newHealthNum <= 0) {
            document.getElementById("enemyHealthNum").textContent = 0;
            //Update Health Bar
            greenHealthBar.style.width = `0px`;
            displayWinSituation();
        }
    }
}



function healUserShip() {
    let numberDisplayingUserHealth = document.getElementById("userHealthNum").textContent;
    let userHealthAsNum = parseInt(numberDisplayingUserHealth);

    const greenHealthBar = document.getElementById("userHealthBarGreen");//get the element

    if (userHealthAsNum === 184) {
        footer.innerHTML = `<h2 id=enemyHitMessage> You are already at full health!</h2>`
        setTimeout(returnToPlayerTurnState, delayedActionOneTime);
    } else if (userHealthAsNum < 184) {

    let healAmt = calculateHealAmt();
    let newHealthNum = userHealthAsNum + healAmt;
    
    footer.innerHTML = `<h2 id=healMessage> You have healed for ${healAmt}!</h2>`
        
    //Update Health Number
    if (newHealthNum < 184) {
        document.getElementById("userHealthNum").textContent = newHealthNum;
        //Update Health Bar
        greenHealthBar.style.width = `${newHealthNum}px`;
    } else if (newHealthNum >= 184) {
        document.getElementById("userHealthNum").textContent = 184;
        //Update Health Bar
        greenHealthBar.style.width = `184px`;
    }
    setTimeout(enemyTurn, delayedActionOneTime);
    }
}


function enemyTurn() {
    //Retrieve the UI number displayed
    let numberDisplayingUserHealth = document.getElementById("userHealthNum").textContent;
    let userHealthAsNum = parseInt(numberDisplayingUserHealth);
    console.log(`The extracted number for the health is ${userHealthAsNum}`)

    //Retrieve the green bar in the UI
    const greenHealthBar = document.getElementById("userHealthBarGreen");//get the element

    //determineEnemyAction();

    //Determine hit or not
    let accuracyRoll = getAccuracyRoll()

    if (accuracyRoll > 78) { 
        footer.innerHTML = '<h2 id="enemyMissMessage">The enemy ship missed!</h2>'
        setTimeout(returnToPlayerTurnState, delayedActionTwoTime);
    } else if (accuracyRoll <= 78) {
        let hitAmt = calculateHitDmgAmt();
        footer.innerHTML = `<h2 id=enemyHitMessage> You have been hit for ${hitAmt}!</h2>`
        //Update Health Number
        let newHealthNum = userHealthAsNum - hitAmt;

        if (newHealthNum > 0) {
            document.getElementById("userHealthNum").textContent = newHealthNum;
            //Update Health Bar
            greenHealthBar.style.width = `${newHealthNum}px`;
            setTimeout(returnToPlayerTurnState, delayedActionTwoTime);
        } else if (newHealthNum <= 0) {
            document.getElementById("userHealthNum").textContent = 0;
            //Update Health Bar
            greenHealthBar.style.width = `0px`;
            displayLoseSituation();
        }
    }
}