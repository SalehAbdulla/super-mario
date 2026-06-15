export default function init(){
    OpenLevel(new Level1());
    requestAnimationFrame(gameLoop);
}

let isPaused = false;
let restartPressed = false;

let lastFrameTime = 0;
export let deltaTime = 0;

const perfMonitor = new PerformanceMonitor();

function gameLoop(timestamp){

    if (isKeyDown("Escape") && !isPaused) {
        isPaused = true;
        isPaused = !isPaused;
    }

    if (!isKeyDown("Escape")) {
        isPaused = false;
    }

    if (isKeyDown("KeyR") && !restartPressed) {
        restartPressed = true;
        OpenLevel(new Level1());
    }

    if (!isKeyDown("KeyR")) {
        restartPressed = false;
    }

    if (isPaused) {
        deltaTime = (timestamp - lastFrameTime) / 1000;
        lastFrameTime = timestamp;

        if (hud) hud.update(0);

        perfMonitor.update(timestamp);
        requestAnimationFrame(gameLoop);
        return;
    }

    deltaTime = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;

    const gameData = {dt: deltaTime, timer: timeSinceStart};

    currentLevel.update(gameData);
    levelData.updateGameObjects(gameData);
    currentLevel.renderGameObjects();

    if (hud) hud.update(deltaTime);

    if (isFinite(deltaTime)) {
        timeSinceStart += deltaTime;
    }

    requestAnimationFrame(gameLoop);
    return;
}


function OpenLevel(level){
    if (!(level instanceof Level)) {
        return console.error("Invalid level object passed to OpenLevel");
    }

    if (currentLevel instanceof Level) {
        currentLevel.end();
    }

    currentLevel = level;
    destroyAllEntities(); // From draw file

    if (hud) hud.destroy();

    hud = new HUD(); // Create a new HUD for the new level

    isPaused = false;
    timeSinceStart = 0;
    currentLevel.start();
}

