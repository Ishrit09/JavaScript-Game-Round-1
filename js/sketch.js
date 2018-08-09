function setup() {
    
    createCanvas(canvasWidth, canvasHeight);
    ellipseMode(RADIUS);
    game.board = setupBoard();
}

function draw() {
    background(51);
    
    //drawScore();
    //drawTime();

    drawBoard();
    drawPlayer(game.player);
    drawPlayer(game.enemy);
    drawPowerUp();
    if (frameCount % 2 == 0 && game.powerUp.active) movePowerUp();
    drawParticles();
    updateScore();
    drawScore();
    
    if (frameCount % 20 == 0) moveEnemy();
    //moveEnemy();
}