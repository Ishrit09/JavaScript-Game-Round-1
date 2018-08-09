let gridSize = 40;
let gridMargin = 10;
let gridSpace = 8;
let scoreHeight = 30;
let canvasWidth = COLS * gridSize + 2 * gridMargin + (COLS - 1) * gridSpace;
let canvasHeight = ROWS * gridSize + 2 * gridMargin + (COLS - 1) * gridSpace + scoreHeight;

let colors = [
    "#e24b3d",
    "#2572c4",
    "orange",
    "pink",
    "green"
];

function translateXY(r,c){
    let x = c * (gridSize + gridSpace) + gridSize / 2 + gridMargin;
    let y = r * (gridSize + gridSpace) + gridSize / 2 + gridMargin;
    return {
        x:x, y:y
    };
}

function drawPlayer(p){
    
    stroke("white");
    let w = Math.sin(frameCount / 3) * 3 + 6;
    strokeWeight(w);

    let coord = translateXY(p.r,p.c);
        
    fill(colors[p.colorIndex]);
    ellipse(coord.x,coord.y,gridSize /2);

    addParticle(
        coord.x,coord.y, // x,  y
        Math.random(),Math.random(), // dx, dy
        0,0.05,     // ddx,ddy
        100,     // life
        4        // colorIndex
    );
}

function drawBoard(){
    noStroke();
    // LOOP THROUGH THE BOARD
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {

            let coord = translateXY(r,c);
            
            let cellValue = game.board[r][c];
            fill(colors[cellValue]);
            ellipse(coord.x,coord.y,gridSize /2);
        }
    }
}

function drawScore(){
    noStroke();
    fill("white"); // optional
    textSize(18);  // optional

    let s1 = 'player 1: ' + game.score.player1;
    textAlign(LEFT);
    text(s1, gridMargin, canvasHeight - scoreHeight + 11);
  
    let s2 = 'player 2: ' + game.score.player2;
    textAlign(RIGHT);
    text(s2, canvasWidth - gridMargin, canvasHeight - scoreHeight + 11);

}

let particles = [];

function addParticle(
    x,y,
    dx,dy,
    ddx,ddy,
    life,
    colorIndex
){
  particles.push(
      {
        x:x,y:y,
        dx:dx,dy:dy,
        ddx:ddx,ddy:ddy,
        life:life,
        colorIndex:colorIndex 
      }
  )
}

addParticle(
    100,100, // x,  y
    0.1,0.1, // dx, dy
    0,0.01,     // ddx,ddy
    100,     // life
    4        // colorIndex
);

function drawParticles(){
    let i = particles.length;
    while(i--){
        let p = particles[i];

        fill("white");
        ellipse(p.x, p.y, p.life / 10);

        // change the position
        p.x += p.dx;
        p.y += p.dy;

        p.dx += p.ddx;
        p.dy += p.ddy;

        p.life += -1;

        if (p.life == 0) {
            particles.splice(i,1);
        }
    }
}