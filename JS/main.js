const delay = ms => new Promise(res => setTimeout(res, ms)); //used for async

let clickCount = 0; //Used to track one's progress through the game

function updateCount(increaseBy){ //A function that increases the clickcount and sets the count accordingly
    clickCount += increaseBy;  
    document.getElementById("mainCount").textContent = clickCount + " times"
}


clickerButton.addEventListener("click", ()=> { //A simple on-click function that opens the light switch and closes the other one
    if (clickCount > 26)
        breakClicker();
    updateCount(1)

    if (clickCount > 19)
        document.getElementById("lightSwitchButton").style.display = "flex";
})

function breakClicker() { //disables the main box so that it can no longer be clicked.
    document.getElementById("clickerButton").disabled = "true";
    document.getElementById("clickerButton").style.height = "240px";
    document.getElementById("clickerButton").style.border = "0px solid black"
    document.getElementById("clickerButton").style.backgroundImage = "url('images/decrepidButton.png')";
}

//Up next, here's an async function that acts as a queue for an animation to start
lightSwitchButton.addEventListener("click", async ()=>{
    //switch the lights picture and see if it's ready to break
    document.getElementById("lightSwitchButton").style.backgroundImage = "url('images/lightSwitchOff.png')";
    if(clickCount > 83)
    {
        breakSwitch();
        return;
    }

    //if not broken, do the normal animation
    document.getElementById("popUp").style.backgroundImage = "url('images/emptyBulb.png')";
    document.getElementById("popUp").style.height = "400px";
    await delay(2000);
    document.getElementById("popUp").style.height = "0px";
    document.getElementById("lightSwitchButton").style.backgroundImage = "url('images/lightSwitchOn.png')";

    //unlock the basement door if enough points have been gathered
    updateCount(15)
    if (clickCount > 60)
        document.getElementById("downStairsButton").style.display = "flex";
})

//Disables the switch, much like the previous one, while also showing a unique animation.
async function breakSwitch(){
    document.getElementById("popUp").style.backgroundImage = "url('images/scareBulb.png')";
    document.getElementById("popUp").style.height = "400px";
    await delay(2000);
    document.getElementById("popUp").style.height = "0px";

    document.getElementById("lightSwitchButton").disabled = "true";
    document.getElementById("lightSwitchButton").style.height = "50px";
    document.getElementById("lightSwitchButton").style.width = "40px";
    document.getElementById("lightSwitchButton").style.backgroundImage = "url('images/brokenSwitch.png')";
    updateCount(15)
    
}

//for the basement door. This one's animation is even more in depth.
downStairsButton.addEventListener("click", async ()=>{
    if(clickCount > 143)
    {
        breakDoor();
        return;
    }
    document.getElementById("popUp").style.backgroundImage = "url('images/emptyStair1.png')";
    document.getElementById("popUp").style.height = "400px";
    await delay(1000);
    document.getElementById("popUp").style.backgroundImage = "url('images/emptyStair2.png')";
    await delay(1000);
    document.getElementById("popUp").style.backgroundImage = "url('images/emptyStair3.png')";
    await delay(2000);
    document.getElementById("popUp").style.height = "0px";

    updateCount(33);
})

//final button breaker. This one also makes it so that the win present displays.
async function breakDoor(){
    document.getElementById("popUp").style.backgroundImage = "url('images/emptyStair1.png')";
    document.getElementById("popUp").style.height = "400px";
    await delay(1000);
    document.getElementById("popUp").style.backgroundImage = "url('images/emptyStair2.png')";
    await delay(1000);
    document.getElementById("popUp").style.backgroundImage = "url('images/scareStair.png')";
    await delay(2000);
    document.getElementById("popUp").style.height = "0px";

    document.getElementById("downStairsButton").disabled = "true";
    document.getElementById("downStairsButton").style.backgroundImage = "url('images/bordedDoor.png')";
    updateCount(33)

    document.getElementById("endButton").style.display = "flex";
}