function keyPressed() {
    console.log("keyPressed keyCode = " + keyCode);

    if (keyCode === LEFT_ARROW) {
        game.player.c += -1;
    } else if (keyCode === RIGHT_ARROW) {
        game.player.c += 1;
    } else if (keyCode === DOWN_ARROW) {
        game.player.r += 1;
    } else if (keyCode === UP_ARROW) {
        game.player.r += -1;
    } else if (keyCode === 32) {
        if (game.player.powerUpBar == POWER_UP_MAX){
            console.log("boom");
            game.powerUp.active = true;
        }
    } else if (keyCode === 77 /* M */) {
        moveEnemy();
    }

    // check bounds
    if (game.player.c < 0) game.player.c = COLS - 1;
    if (game.player.r < 0) game.player.r = ROWS - 1;

    // add power up if they are painting new spot
    if (game.board[game.player.r][game.player.c] != game.player.colorIndex){
        if (game.player.powerUpBar < POWER_UP_MAX) game.player.powerUpBar += 1;
    }
    // paint spot for player
    game.board[game.player.r][game.player.c] = game.player.colorIndex;
}