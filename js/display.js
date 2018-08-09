let gridSize = 12;
let gridMargin = 16;
let gridSpace = 2;
let powerUpWidth = 10;
let canvasWidth = COLS * gridSize + 2 * gridMargin + (COLS - 1) * gridSpace + (powerUpWidth + gridSpace) * 2;
let canvasHeight = ROWS * gridSize + 2 * gridMargin + (COLS - 1) * gridSpace;


let colors = [
    "#222",
    "#e24b3d",
    "#2572c4",
    "orange",
    "pink",
    "green"
];

// for {c:0, r:0} => {x:0, y:0}
// for {c:5, r:1} => {x:200, y:40}

function translateXY(r,c){
    let x = c * (gridSize + gridSpace) + gridSize / 2 + gridMargin + powerUpWidth + gridSpace;
    let y = r * (gridSize + gridSpace) + gridSize / 2 + gridMargin;
    return {
        x:x, y:y
    };
}

function drawPlayer(p){
    
    stroke(colors[p.colorIndex]);
    let w = Math.sin(frameCount / 3) * 3 + 6;
    strokeWeight(w);

    let coord = translateXY(p.r,p.c);
        
    fill("white");
    ellipse(coord.x,coord.y,gridSize /2);

    drawPowerUpBar(p);

    // let dir = recommendDirectionForPlayer(p);
    // let dcoord = translateXY(p.r + dir.r,p.c + dir.c);

    // noStroke();
    // fill("pink");
    // ellipse(dcoord.x,dcoord.y,gridSize /3);


}

function drawBoard(){
    noStroke();
    // LOOP THROUGH THE BOARD
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {

            let coord = translateXY(r,c);
            
            let cellValue = game.board[r][c];
            fill(colors[cellValue]);
            ellipse(coord.x,coord.y,gridSize /2, gridSize/2, 50);
        }
    }
}

function drawPowerUpBar(p){
    let powerUpMaxHeight = canvasHeight - gridMargin * 2; 
    let bottom = canvasHeight - gridMargin;
    let left = p.colorIndex == 1 ? 1 : canvasWidth - powerUpWidth + 1;
    let height = p.powerUpBar / POWER_UP_MAX * powerUpMaxHeight;
    
    if (p.powerUpBar == POWER_UP_MAX && frameCount % 4 == 0) {
        fill("white");

        if (frameCount % 12 == 0){
            let xDir = p.colorIndex == 1 ? 1 : -1;
            addParticle(left, bottom-height,xDir * 0.5,-0.3,0,0.5,20);
        }

    } else {
        fill(colors[p.colorIndex]);
    }
    noStroke();
    rect(left, bottom - height, powerUpWidth - 2, height);


}

function drawPowerUp(){
    if (!game.powerUp.active) return;


    let r = game.player.r + game.powerUp.rOff;
    let c = game.player.c + game.powerUp.cOff;
    let coord = translateXY(r,c);

    
    // now add particles
    if (game.powerUp.active){
        addParticle(coord.x, coord.y,
            game.powerUp.cOff / 0.5, game.powerUp.rOff/ 0.5,
            0, 0.1, 10);
    }

    if (!game.powerUp.active || frameCount % 4 != 2) return;
    noFill();
    stroke("white");
    strokeWeight(3);

    ellipse(coord.x,coord.y,gridSize /2);
    

}

let particles = [];
function addParticle(x,y,dx,dy,ddx,ddy,lifeSpan){
    particles.push(
        {x:x,y:y,dx:dx,dy:dy,ddx:ddx,ddy:ddy,lifeSpan:lifeSpan}
    );
}

function drawParticles(){
    fill("white");
    stroke("white");
    strokeWeight(2);
    let i = particles.length;
    while(i-- && i >= 0){
        let p = particles[i];
    
        translate(p.x, p.y);
        rotate(frameCount / 1.6);
        rect(-0.5*p.lifeSpan,-0.5*p.lifeSpan, p.lifeSpan,p.lifeSpan);
        resetMatrix();
        p.x += p.dx;
        p.dx += p.ddx;
        p.y += p.dy;
        p.dy += p.ddy;
        p.lifeSpan += -0.2;

        if  (p.lifeSpan <= 0) particles.splice(i,1); 
    }


}

function drawScore(){
    noStroke();
    
    // player 1
    fill(colors[game.player.colorIndex]);
    text(`player 1: ${game.score[0]}`, 20, canvasHeight - 15);
    // player 2
    fill(colors[game.enemy.colorIndex]);
    text(`player 2: ${game.score[1]}`, 20, canvasHeight - 5);
}