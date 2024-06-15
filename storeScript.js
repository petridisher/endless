//store starts
function openStore() { // OPEN STORE BUTTON
    pauseGame(); // Pause the game when opening the store
    const pauseMenu = document.getElementById("menu");
    const unpauseButton = pauseMenu.querySelector('button'); // Get the unpause button
    const pausedText = pauseMenu.querySelector('h1'); // Get the "Paused" text
    unpauseButton.style.display = 'none'; // Hide the unpause button
    pausedText.style.display = 'none'; // Hide the "Paused" text
    pauseMenu.innerHTML = `
        <div class="store" id="store">
            <h1>Store</h1>
<button onclick="closeStore()">Close Store</button>
<button onclick="openSkinStore()">Skins</button>
<button onclick="openPowerStore()">Powers</button>
        </div>
    `;
    document.getElementById("store").style.display = 'flex';
}
function openPowerStore() { // OPEN POWER STORE BUTTON
    pauseGame(); // Pause the game when opening the store
    const pauseMenu = document.getElementById("menu");
    const unpauseButton = pauseMenu.querySelector('button'); // Get the unpause button
    const pausedText = pauseMenu.querySelector('h1'); // Get the "Paused" text
    unpauseButton.style.display = 'none'; // Hide the unpause button
    pausedText.style.display = 'none'; // Hide the "Paused" text
    pauseMenu.innerHTML = `
        <div class="store" id="store">
            <h1>Store</h1>
<button onclick="openStore()">EXIT</button>
<button onclick="buyLife()">Buy Life (1.500 score)</button>
<button onclick="buyBomb()">Buy Bomb (2.000 score)</button>
<button onclick="buySlowMotion()">Buy Slow Motion (2.500 score)</button>
        </div>
    `;
    document.getElementById("store").style.display = 'flex';
}
function openSkinStore() { // OPEN SKIN STORE BUTTON
    pauseGame(); // Pause the game when opening the store
    const pauseMenu = document.getElementById("menu");
    const unpauseButton = pauseMenu.querySelector('button'); // Get the unpause button
    const pausedText = pauseMenu.querySelector('h1'); // Get the "Paused" text
    unpauseButton.style.display = 'none'; // Hide the unpause button
    pausedText.style.display = 'none'; // Hide the "Paused" text
    pauseMenu.innerHTML = `
        <div class="store" id="store">
            <h1>Store</h1>
<button onclick="openStore()">EXIT</button>
<button onclick="buyReinforcement()">Reinforced Princess (5.000 score)</button>
        </div>
    `;
    document.getElementById("store").style.display = 'flex';
}
function closeStore() { // CLOSE STORE BUTTON
    const pauseMenu = document.getElementById("menu");
    const unpauseButton = pauseMenu.querySelector('button'); // Get the unpause button
    const pausedText = pauseMenu.querySelector('h1'); // Get the "Paused" text
    unpauseButton.style.display = 'block'; // Display the unpause button when closing the store
    pausedText.style.display = 'block'; // Display the "Paused" text when closing the store
    document.getElementById("store").style.display = 'none';
    // Restore the original pause menu
    pauseMenu.innerHTML = `
        <h1>Paused</h1>
        <button onclick="unpauseGame()">Unpause</button>
        <button onclick="openStore()">Store</button>
        <button onclick="playerSkinDefault()">Default Skin</button>
        <button onclick="buybanana()">BUY BANANA EDITION (20.000 score)</button>
        <button onclick="document.location.reload()">reset</button>
    `;
}
    function buyLife() {
        if (score >= 1500) {
            score -= 1500;
            lives++;
        } else {
            alert("Not enough score to buy a life!");
        }
    }
        // Function to activate bomb power-up
        function buyBomb() {
            if (score >= 2000) {
                score -= 2000;
                clearObstacles(); // Call function to clear all obstacles
            } else {
                alert("Not enough score to buy a bomb!");
            }
        }

        // Function to clear all obstacles
        function clearObstacles() {
            obstacles = []; // Clear all obstacles from the screen
        }

        // Function to activate slow motion power-up
        function buySlowMotion() {
            if (score >= 2500) {
                score -= 2500;
                activateSlowMotion(); // Call function to activate slow motion
            } else {
                alert("Not enough score to buy slow motion!");
            }
        }

        // Function to activate slow motion
        function activateSlowMotion() {
            obstacleSpeed *= 0.2; // Reduce obstacle speed
            setTimeout(() => {
                obstacleSpeed *= 2; // Restore obstacle speed after 30 seconds
            }, 30000);
        }
let boughtreinforced = 0;
        // Function to buy reinforcement princess skin
        function buyReinforcement() {
        if (boughtreinforced = 0){
            if (score >= 5000) {
                score -= 5000;
                bought.reinforced = 1;
                lives += 10
                obstacleSpeed *= 0.8
                playerImg.src = 'playerReinforced.png'; // Change player skin
            } else {
                alert("Not enough score to buy reinforcement!");
            }
        } else { playerImg.src = 'playerReinforced.png'; setPlayerReinforced(true)} //change player skin
}
        // Function to buy default skin
        function playerSkinDefault() {
setPlayerReinforced(false)
playerImg.src = 'player.png'
}
function buybanana(){
if (score >= 20000) {
score += 99999;
lives += 99999;
// BANANIFY
        cloudImg.src = 'banana.png';
        playerImg.src = 'banana.png';
        obstacleImg.src = 'banana.png';
        invincibilityImg.src = 'banana.png';
        lifeImg.src = 'banana.png';
        overlayImage.src = 'banana.png';
        buyImg.src = 'banana.png';
        document.body.style.backgroundColor = "yellow";

}else {alert("NOT ENOUGH BANANAS TO BANANIFY");
}
}
        window.onresize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            boundPlayerPosition();
        };
//store ends
