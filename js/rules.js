const ACTION_UP = {r:-1, c:0};
const ACTION_DOWN = {r:1, c:0};
const ACTION_LEFT = {r:0, c:-1};
const ACTION_RIGHT = {r:0, c:1};

let currentPowerUpAction = ACTION_LEFT;
function movePowerUp(){
    game.powerUp.cOff += currentPowerUpAction.c;
    game.powerUp.rOff += currentPowerUpAction.r;

    let p = game.powerUp.level;
    let n = game.powerUp.level * -1;
    if (game.powerUp.cOff == n && game.powerUp.rOff == p) currentPowerUpAction = ACTION_UP;
    if (game.powerUp.cOff == n && game.powerUp.rOff == n) currentPowerUpAction = ACTION_RIGHT;
    if (game.powerUp.cOff == p && game.powerUp.rOff == n) currentPowerUpAction = ACTION_DOWN;
    if (game.powerUp.cOff == p && game.powerUp.rOff == p) currentPowerUpAction = ACTION_LEFT;

    // paint spot for powerUp
    let c = game.player.c + game.powerUp.cOff;
    let r = game.player.r + game.powerUp.rOff;
    if (game.powerUp.active && r >= 0 && r < ROWS && c >=0 && c < COLS) game.board[r][c] = game.player.colorIndex;

    if (game.player.powerUpBar > 0 && game.powerUp.active)
        game.player.powerUpBar -= 0.5;

    if (game.player.powerUpBar == 0) {
        game.powerUp.active = false;
        game.powerUp.level += 1;
        game.powerUp.cOff = game.powerUp.level;
        game.powerUp.rOff = game.powerUp.level;
        console.log("game.powerUp.level = " + game.powerUp.level);
        POWER_UP_MAX = (game.powerUp.level * 2) * 4;
    };
}

function moveEnemy(){
    // try to find direction of biggest masslet rec = recommendDirectionForPlayer(game.enemy);
    let rec = recommendDirectionForPlayer(game.enemy);
    //console.log(["rec = ",rec]);
    if (game.board[game.enemy.r + rec.r][game.enemy.c + rec.c] == WALL) return;
    
    game.enemy.r += rec.r;
    game.enemy.c += rec.c;
    
    if (game.board[game.enemy.r][game.enemy.c] != game.enemy.colorIndex){
        if (game.enemy.powerUpBar < POWER_UP_MAX) game.enemy.powerUpBar += 1;
    }
    
    game.board[game.enemy.r][game.enemy.c] = P2;
}

function recommendDirectionForPlayer(p){
    let up = p.r == 0 || game.board[p.r - 1][p.c] == p.colorIndex ? -1 : 0;
    let dn = p.r + 1 == ROWS || game.board[p.r + 1][p.c] == p.colorIndex ? -1 : 0;
    let lf = p.c == 0 || game.board[p.r][p.c - 1] == p.colorIndex ? -1 : 0;
    let rt = p.c + 1 == COLS || game.board[p.r][p.c + 1] == p.colorIndex ? -1 : 0;
    
    if (up >= 0 && game.board[p.r - 1][p.c] == WALL) up = -1;
    if (dn >= 0 && game.board[p.r + 1][p.c] == WALL) dn = -1;
    if (lf >= 0 && game.board[p.r][p.c - 1] == WALL) lf = -1;
    if (rt >= 0 && game.board[p.r][p.c + 1] == WALL) rt = -1;

   // console.log(["blocks",up,dn,lf,rt]);

    // LOOP THROUGH THE BOARD
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (game.board[r][c] != p.colorIndex && game.board[r][c] != WALL){
                if (r > p.r && dn > -1) dn += 1;
                if (r < p.r && up > -1) up += 1;
                if (c > p.c && rt > -1) rt += 1;
                if (c < p.c && lf > -1) lf += 1;
            }
        }
    }
    
    // now find biggest
    //console.log([up,dn,lf,rt]);
    let max = indexOfMax([up,dn,lf,rt]);
    return [
        ACTION_UP,
        ACTION_DOWN,
        ACTION_LEFT,
        ACTION_RIGHT
    ][max];
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
        if (arr[i] == max && Math.random() > 0.5) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function updateScore(){
    let p1 = 0;
    let p2 = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (game.board[r][c] == P1) p1 += 1;
            if (game.board[r][c] == P2) p2 += 1;
        }
    }
    game.score = [p1,p2];
}