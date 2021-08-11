//Initilize the button interactivity
const atkButton = document.getElementById("attackButton")
atkButton.addEventListener('mouseup', attackEnemyShip);

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

//function that sets the footer content back to its default
function returnToPlayerTurnState() {
    footer.innerHTML = '<div class="footFlex"><h2 id="attackButton">Attack</h2><h2 id="healButton">Heal</h2></div>';
    //reinitialize the buttons
    const atkButton = document.getElementById("attackButton")
    atkButton.addEventListener('mouseup', attackEnemyShip);
}

function attackEnemyShip() {
    //Retrieve the UI number displayed
    let numberDisplayingEnemyHealth = document.getElementById("enemyHealthNum").textContent;
    let enemyHealthAsNum = parseInt(numberDisplayingEnemyHealth);
    console.log(`The extracted number for the health is ${enemyHealthAsNum}`)

    //Retrieve the green bar in the UI
    const greenHealthBar = document.getElementById("enemyHealthBarGreen");//get the element
    let enemyHealthBar = window.getComputedStyle(greenHealthBar, null).getPropertyValue('width'); //get the width of the element
    let enemyHealthBarWidth = parseInt(enemyHealthBar); //turn the width of the green bar into a number in JS
    
    //Determine hit or not
    let accuracyRoll = getAccuracyRoll()

    //Alter webpage to display hit or miss
    if (accuracyRoll > 78) { 
        footer.innerHTML = '<h2 id="missMessage">You missed!</h2>'
    } else if (accuracyRoll <= 78) {
        let hitAmt = calculateHitDmgAmt();
        footer.innerHTML = `<h2 id=hitMessage> You have hit for ${hitAmt}!</h2>`
        
        //Update Health Number
        let newHealthNum = enemyHealthAsNum - hitAmt;
        document.getElementById("enemyHealthNum").textContent = newHealthNum;
        
        //Update Health Bar
        greenHealthBar.style.width = `${newHealthNum}px`;
    }

    setTimeout(enemyTurn, 3500);
    setTimeout(returnToPlayerTurnState, 7000)
}

function enemyTurn() {
    //Retrieve the UI number displayed
    let numberDisplayingUserHealth = document.getElementById("userHealthNum").textContent;
    let userHealthAsNum = parseInt(numberDisplayingUserHealth);
    console.log(`The extracted number for the health is ${userHealthAsNum}`)

    //Retrieve the green bar in the UI
    const greenHealthBar = document.getElementById("userHealthBarGreen");//get the element
    let userHealthBar = window.getComputedStyle(greenHealthBar, null).getPropertyValue('width'); //get the width of the element
    let userHealthBarWidth = parseInt(userHealthBar); //turn the width of the green bar into a number in JS

    //Determine hit or not
    let accuracyRoll = getAccuracyRoll()

    if (accuracyRoll > 78) { 
        footer.innerHTML = '<h2 id="enemyMissMessage">The enemy ship missed!</h2>'
    } else if (accuracyRoll <= 78) {
        let hitAmt = calculateHitDmgAmt();
        footer.innerHTML = `<h2 id=enemyHitMessage> You have been hit for ${hitAmt}!</h2>`
        
        //Update Health Number
        let newHealthNum = userHealthAsNum - hitAmt;
        document.getElementById("userHealthNum").textContent = newHealthNum;
        
        //Update Health Bar
        greenHealthBar.style.width = `${newHealthNum}px`;
    }
}