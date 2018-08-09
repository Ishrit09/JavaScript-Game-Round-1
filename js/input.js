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
    }

    // the pacman code used to be here!!!
    pacman(game.player);

    calculateScore();
}

function moveEnemy() {
    if (Math.random() > 0.5)    // move horizontally
        // if ( human player is to the right of enemy) move enemy right
        if (game.player.c > game.enemy.c)
            game.enemy.c += 1;  // move to the right
        else
            game.enemy.c += -1; // move to the left

    else                        // move vertically
        if (game.player.r > game.enemy.r)
            game.enemy.r += 1;  // move to the right
        else
            game.enemy.r += -1; // move to the left




    

    pacman(game.enemy);
    calculateScore();
}

function pacman(p) {
    // when player goes off the screen left
    if (p.c < 0) p.c = COLS - 1;
    // when player goes off the screen top
    if (p.r < 0) p.r = ROWS - 1;

    // when player goes off the screen bottom
    if (p.r == ROWS) p.r = 0;
    // when player goes off the screen right
    if (p.c == COLS) p.c = 0;

    // this is where we "paint" the cell
    game.board[p.r][p.c] = p.colorIndex;
}