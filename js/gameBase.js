// -------------------------HOUSEKEEPING-------------------------

// Images for use in animations by Two.js
const monsterImgs = [
  new Two.Texture("./assets/monsterFed.png"),
  new Two.Texture("./assets/monsterPet.png"),
  new Two.Texture("./assets/monsterTrained.png"),
  new Two.Texture("./assets/monsterWalked.png"),
  new Two.Texture("./assets/monsterNeglected.png")
];

const monsterIconImgs = [
  new Two.Texture("./assets/feedIcon.png"),
  new Two.Texture("./assets/petIcon.png"),
  new Two.Texture("./assets/trainIcon.png"),
  new Two.Texture("./assets/walkIcon.png"),
  new Two.Texture("./assets/neglectIcon.png")
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

// variables needed to track animation
var monsterState; // monster icon state
var animationStartFrame;

// Game graphic elements. Yes, they needed to be global.
var wall;
var floor;
var monster;
var monsterIcon;
var statText;
var statBars;
var help;

// Spacing tracker variables
var width;
var wallHeight;
var floorHeight;
var dockHeight;

// Write game to localStorage
function serializeGame(){
  localStorage.setItem("wallColor", wallColor);
  localStorage.setItem("monsterStage", monsterStage);
  localStorage.setItem("stats", JSON.stringify(stats));
  localStorage.setItem("name", JSON.stringify(document.querySelector("#monsterName > input").value));
}

// -------------------------GAME AREA DRAWING-------------------------

// Draws the wall and floor of the game screen
function drawGameScreen(){
  // general game area variables
  var x         = two.width * 0.5;  // center X val
  
  var wallY = (wallHeight * 0.5) + 20;
  wall = two.makeRectangle(x, wallY, width, wallHeight);
  wall.fill = wallColor;
  wall.noStroke();

  var floorY = (wallHeight + 20) - floorHeight * 0.5;
  floor = two.makeRectangle(x, floorY, width, floorHeight);
  floor.fill = '#6A6358';
  floor.noStroke();
}

// Draws the bars of the stat section of the screen
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

// Handles all of the stat section drawing
function drawStats(wallHeight, dockHeight){
  var statHeight    = 75;
  var totalGap      = 20 + 10 + 50;
  var midpointBarY  = totalGap + wallHeight + dockHeight;
  var midpointTextY = totalGap + wallHeight + dockHeight + (statHeight + 10);
  var x             = two.width * 0.5;  // center X val
  var textGap       = 90;

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


// -------------------------MONSTER DRAWING-------------------------


// Draws the monster in any non-final state
function drawMonster(frameCount, bringToTop){
  var x = two.width * 0.5;
  var y = ((wallHeight + 20) - floorHeight * 0.5)-100;
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
    if (difference > 100){
      monsterState = -1;
      animationStartFrame = frameCount;
      bringToTop = true;
    }
    else {
      monster = two.makeSprite(monsterImgs[monsterState], x, y);
      monsterIcon = two.makeSprite(monsterIconImgs[monsterState], x+150, y-100);
    }
  }
  
  // DEFAULT STATE
  if (bringToTop && monsterState == -1){
    if (monster != null){
      monster.remove();
      if (monsterIcon != null){
        monsterIcon.remove();
      }
    }
    monster = two.makeImageSequence(monsterMain, x, y, 7, true);
  }
}

// Draw the final screen
function drawFinal(){
  var maxStat;
  maxStat = 0;
  runningMax = 0;
  for (let i = 0; i < stats.length; i++){
    if (stats[i] > runningMax) {
      maxStat = i;
      runningMax = stats[i];
    }
  }

  if (finalScreenPending){
    // Remove what needs removing
    for (let i = 0; i < statText.length; i++){
      statText[i].remove();
      statBars[i].remove();
    }

    var actionDiv = document.getElementById("actionOptions");
    actionDiv.style.display = "none";
    var colorDiv = document.getElementById("colorButtons");
    colorDiv.style.display = "none";

    createResults(maxStat);

    // Show restart and results
    var results = document.getElementById("results");
    results.style.display = "flex";
    var restart = document.getElementById("restart");
    restart.style.display = "block";
    var save = document.getElementById("save");
    save.style.display = "block";
  }

  // Handle screen resizing
  monster.remove();
  if (monsterIcon != null) monsterIcon.remove();
  var x = two.width * 0.5;
  var y = ((wallHeight + 20) - floorHeight * 0.5)-100;

  if (maxStat == 0) y -= 68;
  monster = two.makeSprite(monsterFinalImgs[maxStat], x, y);
  finalScreenPending = false;
}


// -------------------------INITIALIZATION AND UPDATING-------------------------


// Initialize everything, draw the screen, and start the update loop
function init(){
  // initializing game variables
  wallColor           = (localStorage.getItem("wallColor") || "#EAEAEA");
  monsterState        = -1;
  animationStartFrame = 0;
  monsterIcon         = null;
  monster             = null;
  monsterStage        = (parseInt(JSON.parse(localStorage.getItem("monsterState"))) || 0);
  stats               = (JSON.parse(localStorage.getItem("stats")) || [0,0,0,0,0]);
  savedMonsters       = (JSON.parse(localStorage.getItem("savedMonsters")) || []);
  statUpdatePending   = true;
  lastStatUpdate      = 0;

  // initialize game screen
  var params = {
    fullscreen: false,
    width: window.innerWidth - 20,
    height: 680
  };
  var elem = document.querySelector("#gameArea");
  two = new Two(params).appendTo(elem);

  width         = two.width - 90;
  wallHeight    = 350;
  floorHeight   = wallHeight * 0.25;
  dockHeight    = 125;

  // draw game contents
  drawGameScreen();
  drawStats(wallHeight, dockHeight, width);
  drawMonster(0, true);

  // tell two to draw everything to the screen
  two.bind('update', update);
  two.play();
}

// Refresh everything on the screen as needed
function refreshScreen(frameCount){
  for (let i = 0; i < statText.length; i++){
    statText[i].remove();
    statBars[i].remove();
  }
  if (monsterStage < 1) drawStats(wallHeight, dockHeight, width);

  // If the size of the window or the wall color is updated,
  // redraw the background
  if (window.innerWidth != two.width + 20 || wallUpdatePending){
    two.width = window.innerWidth - 20;
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
      drawMonster(frameCount, restarting);
      restarting = false;

      var buttonDiv = document.getElementById("actionOptions");
      if (buttonDiv.style.display != "flex"){
        buttonDiv.style.display = "flex";
        var colorDiv = document.getElementById("colorButtons");
        colorDiv.style.display = "flex";
      }
      var restart = document.getElementById("restart");
      if (restart.style.display != "none"){
        restart.style.display = "none";
        var results = document.getElementById("results");
        results.style.display = "none";
        var save = document.getElementById("save");
        save.style.display = "block";
      }
    }
  }

  // If we're at the final stage
  if (monsterStage == 1){
    drawFinal();
  }

  serializeGame();
}

// Update stats and refresh screen
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

  if (restarting){
    lastStatUpdate      = frameCount;
  }

  // Handle neglect
  if ((frameCount - lastStatUpdate) > 500 && stats[4] < 10 && monsterStage < 1){
    stats[4]++;
    totalStatVal++;
    monsterState = 4;
    statUpdatePending = true;
  }

  // Handle stat update
  if (statUpdatePending){
    lastStatUpdate      = frameCount;
    animationStartFrame = frameCount;
    statUpdatePending   = false;
  }

  if (totalStatVal >= 20 && monsterStage != 1){
    monsterStage = 1;
    finalScreenPending = true;
  }

  refreshScreen(frameCount);
}