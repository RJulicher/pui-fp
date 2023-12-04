const monsterImgs = [
  new Two.Texture("./assets/monsterFed.png"),
  new Two.Texture("./assets/monsterPet.png"),
  new Two.Texture("./assets/monsterTrained.png"),
  new Two.Texture("./assets/monsterWalked.png"),
];

const monsterIconImgs = [
  new Two.Texture("./assets/feedIcon.png"),
  new Two.Texture("./assets/petIcon.png"),
  new Two.Texture("./assets/trainIcon.png"),
  new Two.Texture("./assets/walkIcon.png"),
];

const monsterMainImgs = [
  new Two.Texture("./assets/monsterMain1.png"),
  new Two.Texture("./assets/monsterMain2.png"),
  new Two.Texture("./assets/monsterMain3.png"),
  new Two.Texture("./assets/monsterMain4.png"),
  new Two.Texture("./assets/monsterMain5.png"),
  new Two.Texture("./assets/monsterMain6.png")
];

const monsterFinalImgs = [
  new Two.Texture("./assets/feedFinal.png"),
  new Two.Texture("./assets/petFinal.png"),
  new Two.Texture("./assets/trainFinal.png"),
  new Two.Texture("./assets/walkFinal.png"),
  new Two.Texture("./assets/neglectFinal.png")
];

const monsterMain = [
  monsterMainImgs[1],monsterMainImgs[2],
  monsterMainImgs[3],monsterMainImgs[1],
  monsterMainImgs[4],monsterMainImgs[5]
];

var two; // Graphics canvas

var monsterStage; // Stage of monster growth

// variables needed to track animation
var monsterState;
var animationStartFrame;

// Game graphic elements
var wall;
var floor;
var monster;
var monsterIcon;
var statText;
var statBars;
var help;

var width;
var wallHeight;
var floorHeight;
var dockHeight;

var maxStat;


// Draws the wall and floor of the game screen
function drawGameScreen(){
  // general game area variables
  var x         = two.width * 0.5;  // center X val
  // draw wall and floor
  var wallY = (wallHeight * 0.5) + 50;
  wall = two.makeRectangle(x, wallY, width, wallHeight);
  wall.fill = wallColor;
  wall.noStroke();

  var floorY = (wallHeight + 50) - floorHeight * 0.5;
  floor = two.makeRectangle(x, floorY, width, floorHeight);
  floor.fill = '#6A6358';
  floor.noStroke();
}

function drawStatBars(x, textGap, statHeight, midpointBarY){
  statBars = [two.makeRectangle(x - (textGap * 2), midpointBarY + (statHeight-(stats[0] * 5)), 50, (stats[0] * 10)),
    two.makeRectangle(x - textGap, midpointBarY + (statHeight-(stats[1] * 5)), 50, (stats[1] * 10)),
    two.makeRectangle(x, midpointBarY + (statHeight-(stats[2] * 5)), 50, (stats[2] * 10)),
    two.makeRectangle(x + textGap, midpointBarY + (statHeight-(stats[3] * 5)), 50, (stats[3] * 10)),
    two.makeRectangle(x + (textGap * 2), midpointBarY + (statHeight-(stats[4] * 5)), 50, (stats[4] * 10))];
  
  statBars[0].fill = '#FA003F'; statBars[0].noStroke();
  statBars[1].fill = '#83B692'; statBars[1].noStroke();
  statBars[2].fill = '#ECA400'; statBars[2].noStroke();
  statBars[3].fill = '#372549'; statBars[3].noStroke();
  statBars[4].fill = '#883677'; statBars[4].noStroke();
}

function drawStats(wallHeight, dockHeight){
  var statHeight    = 75;
  var totalGap      = 50 + 10 + 50;
  var midpointBarY  = totalGap + wallHeight + dockHeight;
  var midpointTextY = totalGap + wallHeight + dockHeight + (statHeight + 10);
  var x             = two.width * 0.5;  // center X val
  var textGap       = 90;

  //console.log("drawing stats");
  var styles = {
    size: 15,
    color: 'black'
  };

  drawStatBars(x, textGap, statHeight, midpointBarY);

  statText = [two.makeText("fullness: " + stats[0], x - (textGap * 2), midpointTextY, styles),
    two.makeText("happiness: " + stats[1], x - textGap, midpointTextY, styles),
    two.makeText("training: " + stats[2], x, midpointTextY, styles),
    two.makeText("activity: " + stats[3], x + textGap, midpointTextY, styles),
    two.makeText("neglect: " + stats[4], x + (textGap * 2), midpointTextY, styles)];
}




function drawMonster(frameCount, bringToTop){
  var x = two.width * 0.5;
  var y = ((wallHeight + 50) - floorHeight * 0.5)-100;
  var difference = frameCount - animationStartFrame;

  // If the monster isn't currently in default state, show reaction or switch states
  if (monsterState != -1){
    if (monster != null){
      monster.remove();
      if (monsterIcon != null){
        monsterIcon.remove();
      }
    }

    // animation runtime has expired, switch to default
    if (difference > 50){
      monsterState = -1;
      animationStartFrame = frameCount;
      bringToTop = true;
    }
    else {
      //console.log("monsterState is " + monsterState);
      monster = two.makeSprite(monsterImgs[monsterState], x, y);
      monsterIcon = two.makeSprite(monsterIconImgs[monsterState], x+150, y-100);
    }
  }
  
  // DEFAULT
  if (bringToTop && monsterState == -1){
    if (monster != null){
      monster.remove();
      if (monsterIcon != null){
        monsterIcon.remove();
      }
    }
    //console.log("Drawing monster at " + x + ", " + y)
    monster = two.makeImageSequence(monsterMain, x, y, 7, true);
  }
}

function drawFinal(){
  if (finalScreenPending){
    maxStat = 0;
    runningMax = 0;
    for (let i = 0; i < stats.length; i++){
      if (statTotals[i] > runningMax) {
        maxStat = i;
        runningMax = statTotals[i];
      }
    }

    // Remove what needs removing
    for (let i = 0; i < statText.length; i++){
      statText[i].remove();
      statBars[i].remove();
    }

    var actionDiv = document.getElementById("actionOptions");
    actionDiv.style.display = "none";

    // Show restart
    var restart = document.getElementById("restart");
    restart.style.display = "block";

    finalScreenPending = false;
  }

  monster.remove();
  if (monsterIcon != null) monsterIcon.remove();
  var x = two.width * 0.5;
  var y = ((wallHeight + 50) - floorHeight * 0.5)-100;

  if (maxStat == 0) y -= 68;
  monster = two.makeSprite(monsterFinalImgs[maxStat], x, y);
  finalScreenPending = false;
}







// Make an instance of two and place it on the page.
function init(){
  // initializing game variables
  wallColor           = "#EAEAEA";
  monsterState        = -1;
  animationStartFrame = 0;
  monsterIcon         = null;
  monster             = null;
  monsterStage        = 0;
  
  // initialize game screen
  var params = {
    fullscreen: false,
    width: window.innerWidth,
    height: 680
  };
  var elem = document.querySelector("#gameArea");
  two = new Two(params).appendTo(elem);

  width         = two.width - 90;
  wallHeight    = 350;
  floorHeight   = wallHeight * 0.25;
  dockHeight    = 125;

  drawGameScreen();
  drawStats(wallHeight, dockHeight, width);

  // draw game contents
  drawMonster(0, true);

  // Don’t forget to tell two to draw everything to the screen
  two.bind('update', update);
  two.play();
}

function refreshScreen(frameCount){
  for (let i = 0; i < statText.length; i++){
    statText[i].remove();
    statBars[i].remove();
  }
  if (monsterStage < 1) drawStats(wallHeight, dockHeight, width);

  // If the size of the window or the wall color is updated,
  // redraw the background
  if (window.innerWidth != two.width || wallUpdatePending){
    //console.log("Redrawing the stage!");
    two.width = window.innerWidth;


    // reset everything in the game background
    wall.remove();
    floor.remove();
    drawGameScreen();
    wallUpdatePending = false;

    if (monsterStage < 1){
      drawMonster(frameCount, true);
    }
    else{
      drawFinal();
    }
  }

  // update the monster as needed
  else {
    if (monsterStage < 1){
      drawMonster(frameCount, false);

      var buttonDiv = document.getElementById("actionOptions");
      if (buttonDiv.style.display != "flex"){
        buttonDiv.style.display = "flex";
      }

      var restart = document.getElementById("restart");
      if (restart.style.display != "none"){
        restart.style.display = "none";
      }
    }
  }

  // If we're at the final stage
  if (monsterStage == 1){
    drawFinal();
  }
}

function update(frameCount) {
  width         = two.width - 90;

  // Handle moving into the next stage if needed
  var totalStatVal = 0;
  for (let i = 0; i < stats.length; i++){
    if (stats[i] > 10){
      stats[i] = 10;
    }
    totalStatVal += stats[i];
  }

  // Handle stat update
  if (statUpdatePending){
    lastStatUpdate      = frameCount;
    animationStartFrame = frameCount;
    statUpdatePending   = false;
  }
  // Handle neglect
  if ((frameCount - lastStatUpdate) > 500 && stats[4] < 10 && monsterStage < 1){
    stats[4]++;
    totalStatVal++;
    lastStatUpdate = frameCount;
  }

  if (totalStatVal >= 20){
    for (let i = 0; i < stats.length; i++){
      statTotals[i] += stats[i];
      //console.log("stat " + i + " is " + stats[i]);
      //console.log("statTotal " + i + " is " + statTotals[i]);
      stats[i] = 0;
    }

    console.log("Next monster stage reached!");
    monsterStage++;
    if (monsterStage == 1) finalScreenPending = true;
  }

  refreshScreen(frameCount);
}