let game = {
    score: [5,25],
    isRunning: false,
    player: {r:0,c:0,colorIndex:1, powerUpBar: 0},
    enemy:  {r:5,c:5,colorIndex:2, powerUpBar: 0},
    powerUp: {active: false, rOff: 1, cOff: 1, level: 1},
    board: null
};

// setup the board
const __ = 0;
const P1 = 1;
const P2 = 2;
const SPONGE = 3;
const WALL = 4;

const ROWS = 20;
const COLS = 30;

let POWER_UP_MAX = 8;

function setupBoard(){
    let board = [];
    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLS; c++) {
            row.push(__);
        }
        board.push(row);
    }

    // draw some walls
    setBoard(board,5,5,5,COLS - 5, WALL);
    setBoard(board,8,5,8,COLS - 5, WALL);
    setBoard(board,ROWS-5,5,ROWS-5,COLS - 5, WALL);

    //console.log(board);
    return board;
}

function setBoard(board,r1,c1,r2,c2,value){
    for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
            board[r][c] = value;
        }
    }

}