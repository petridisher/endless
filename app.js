const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const menu = document.getElementById("menu");
    const modeSelector = document.getElementById("modeSelector");
    const graphicsQuality = document.getElementById("graphicsQuality");

    let playerSize, obstacleSize, powerUpSize;
    let obstacleSpeed = 20;
    let obstacleFrequency = 20;
    let powerUpFrequency = 250;
    let initialLives = 3;

    let playerX, playerY, targetX, targetY, score, obstacles, powerUps, lives;
    let isMouseDown = false;
    let touchX;
    let invincible = false;
    let invincibleCounter = 0;
    let gameInterval;

    const playerImg = new Image();
    playerImg.src = 'player.png';
    const playerImg1 = new Image();
    playerImg1.src = 'player1.png';
    const obstacleImg = new Image();
    obstacleImg.src = 'obstacle.png';
    const obstacle1Img = new Image();
    obstacle1Img.src = 'obstacle1.png';
    const reinforcedImg = new Image();
    reinforcedImg.src = 'playerReinforced.png';
    const reinforced1Img = new Image();
    reinforced1Img.src = 'playerReinforced1.png';
    const invincibilityImg = new Image();
    invincibilityImg.src = 'Invincibility.png';
    const lifeImg = new Image();
    lifeImg.src = 'Life.png';
    const overlayImage = new Image();
    overlayImage.src = 'overlay.png';
    const buyImg = new Image();
    buyImg.src = 'buy.png';

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function setVariablesForMode(mode) {
        if (mode === "mobile") {
            playerSize = window.innerWidth / 7;
            obstacleSize = window.innerWidth / 7;
            powerUpSize = window.innerWidth / 7;
            obstacleSpeed = 12;
            obstacleFrequency = 20;
            powerUpFrequency = 150;
            initialLives = 3;
        } else {
            playerSize = window.innerWidth / 20;
            obstacleSize = window.innerWidth / 20;
            powerUpSize = window.innerWidth / 20;
            obstacleSpeed = 12;
            obstacleFrequency = 30;
            powerUpFrequency = 250;
            initialLives = 3;
        }
    }

function loopDifficulty() {
  setInterval(function() {
    // code here the thing that makes it harder
obstacleSpeed += 1;
obstacleFrequency -= 1;
powerUpFrequency += 10;
  }, 15000); // 15 seconds in milliseconds
}
        // increases the difficulty after each 30s
        loopDifficulty();

    function init() {
        setVariablesForMode(modeSelector.value);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        playerX = targetX = (canvas.width - playerSize) / 2;
        playerY = targetY = canvas.height - playerSize - 100;
        score = 0;
        lives = initialLives;
        obstacles = [];
        powerUps = [];
        setInterval(gameLoop, 1000 / 60);
    }

    function startGame() {
        menu.style.display = 'none';
        const mode = modeSelector.value;
        if (mode === "mobile") {
            canvas.addEventListener("touchstart", handleTouchStart);
            canvas.addEventListener("touchend", handleTouchEnd);
            canvas.addEventListener("touchmove", handleTouchMove);
        } else {
            canvas.addEventListener("mousedown", handleMouseDown);
            canvas.addEventListener("mouseup", handleMouseUp);
            canvas.addEventListener("mousemove", handleMouseMove);
        }
        init();
    }

    function handleMouseDown(event) {
        isMouseDown = true;
        handleMouseMove(event);
    }

    function handleMouseUp() {
        isMouseDown = false;
    }

    function handleMouseMove(event) {
        if (isMouseDown) {
            targetX = event.clientX - playerSize / 2;
            boundPlayerPosition();
        }
    }

    function handleTouchStart(event) {
        event.preventDefault();
        touchX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        touchX = undefined;
    }

    function handleTouchMove(event) {
        event.preventDefault();
        touchX = event.touches[0].clientX;
    }

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        if (!isGamePaused) {
            score++;
            if (score % obstacleFrequency === 0) {
                const obstacleX = Math.random() * (canvas.width - obstacleSize);
                obstacles.push({ x: obstacleX, y: -obstacleSize });
            }
            if (score % powerUpFrequency === 0) {
                const powerUpX = Math.random() * (canvas.width - powerUpSize);
                const powerUpType = Math.random() < 0.5 ? "life" : "invincible";
                powerUps.push({ x: powerUpX, y: -powerUpSize, type: powerUpType });
            }
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].y += obstacleSpeed;
                if (obstacles[i].y > canvas.height) {
                    obstacles.splice(i, 1);
                    i--;
                } else if (!invincible && isColliding(playerX, playerY, playerSize, playerSize, obstacles[i].x, obstacles[i].y, obstacleSize, obstacleSize)) {
                    lives--;
                    if (lives <= 0) {
                        document.location.reload();
                    }
                    obstacles.splice(i, 1);
                    i--;
                }
            }
            for (let i = 0; i < powerUps.length; i++) {
                powerUps[i].y += obstacleSpeed;
                if (powerUps[i].y > canvas.height) {
                    powerUps.splice(i, 1);
                    i--;
                } else if (isColliding(playerX, playerY, playerSize, playerSize, powerUps[i].x, powerUps[i].y, powerUpSize, powerUpSize)) {
                    if (powerUps[i].type === "life") {
                        lives++;
                    } else if (powerUps[i].type === "invincible") {
                        invincible = true;
                        invincibleCounter = 180;
                    }
                    powerUps.splice(i, 1);
                    i--;
                }
            }
            if (invincible) {
                invincibleCounter--;
                if (invincibleCounter <= 0) {
                    invincible = false;
                }
            }
            if (touchX !== undefined) {
                targetX = touchX - playerSize / 2;
                boundPlayerPosition();
            }
            // Smoothly move player towards target position
            playerX = lerp(playerX, targetX, 0.1);
        }
    }

    function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2;
    }

    function boundPlayerPosition() {
        if (targetX < 0) targetX = 0;
        if (targetX > canvas.width - playerSize) targetX = canvas.width - playerSize;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //draw player sprite
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerImg, playerX, playerY, playerSize, playerSize);

        for (const obstacle of obstacles) {
            ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacleSize, obstacleSize);
        }
        for (const powerUp of powerUps) {
            if (powerUp.type === "life") {
                ctx.drawImage(lifeImg, powerUp.x, powerUp.y, powerUpSize, powerUpSize);
            } else {
                ctx.drawImage(invincibilityImg, powerUp.x, powerUp.y, powerUpSize, powerUpSize);
            }
        }
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(overlayImage, 0, 0, canvas.width, 100);
        if (!isGamePaused) {
            ctx.fillStyle = "#000";
            ctx.font = "20px ka1";
            ctx.fillText("Score: " + score, 10, 80);
            ctx.fillText("Lives: " + lives, 10, 40);
            // Draw pause icon
            ctx.drawImage(buyImg, canvas.width - 100, 10, 50, 50); // Adjust position and size as needed

            if (invincible) {
                ctx.fillStyle = "lime";
                ctx.font = "25px ka1";
                ctx.fillText(Math.ceil(invincibleCounter / 60), canvas.width / 2, 250);
            }
        }
    }

    let isGamePaused = false;

    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("touchstart", handleCanvasClick);

    function handleCanvasClick(event) {
        // Prevent default behavior for touch events to avoid double event triggering
        if (event.type === "touchstart") {
            event.preventDefault();
        }

        // Get the click or touch position
        const rect = canvas.getBoundingClientRect();
        let clickX, clickY;

        if (event.type === "touchstart") {
            clickX = event.touches[0].clientX - rect.left;
            clickY = event.touches[0].clientY - rect.top;
        } else {
            clickX = event.clientX - rect.left;
            clickY = event.clientY - rect.top;
        }

        // Check if the click/touch is within the pause icon area
        if (clickX >= canvas.width - 100 && clickX <= canvas.width - 50 &&
            clickY >= 10 && clickY <= 60) {
            if (!isGamePaused) {
                pauseGame();
            } else {
                unpauseGame();
            }
        }
    }

    function pauseGame() {
        isGamePaused = true;
        menu.style.display = 'flex';
        menu.innerHTML = `
            <h1>Paused</h1>
            <button onclick="unpauseGame()">Unpause</button>
            <button onclick="openStore()">Store</button>
            <button onclick="playerSkinDefault()">Default Skin</button>
            <button onclick="buybanana()">BUY BANANA EDITION (20.000 score)</button>
            <button onclick="document.location.reload()">reset</button>
        `;
    }

function unpauseGame() {
menu.style.display = 'none';
    var unpauseCounter = 180; // Three seconds at 60 frames per second
    var unpauseInterval = setInterval(function() {
        if (unpauseCounter > 0) {
            ctx.fillStyle = "lime";
            ctx.font = "25px ka1";
            ctx.fillText(Math.ceil(unpauseCounter / 60), canvas.width / 2, 250);
            unpauseCounter--;
        } else {
            clearInterval(unpauseInterval); // Stop the countdown
            isGamePaused = false;
        }
    }, 1000 / 60); // 60 frames per second
}

let isPlayer1 = true;  // Toggle state for player
let isObstacle1 = true; // Toggle state for obstacle
let isPlayerReinforced = false; // Flag for player reinforced skin
// animate
function animate() {
    if (isPlayerReinforced) {
        if (isPlayer1) {
            playerImg.src = 'playerReinforced.png';
        } else {
            playerImg.src = 'playerReinforced1.png';
        }
    } else {
        if (isPlayer1) {
            playerImg.src = 'player1.png';
        } else {
            playerImg.src = 'player.png';
        }
    }

    if (isObstacle1) {
        obstacleImg.src = 'obstacle1.png';
    } else {
        obstacleImg.src = 'obstacle.png';
    }

    isPlayer1 = !isPlayer1; // Toggle the state for player
    isObstacle1 = !isObstacle1; // Toggle the state for obstacle
}

// Function to set playerReinforced flag
function setPlayerReinforced(isReinforced) {
    isPlayerReinforced = isReinforced;
}


setInterval(animate, 50);
