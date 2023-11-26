const monsterImgs = {
  MONSTERMAIN: new Two.Texture("./assets/monsterMain.png")
};

var two;
var monsterStage; // Stage of monster growth

// Game graphic elements
var wall;
var floor;
var monster;
var statText;
var statBars;
var help;

var width;
var wallHeight;
var floorHeight;
var dockHeight;

function drawGameScreen(){
  // general game area variables
  width         = two.width - 90;
  var x         = two.width * 0.5;  // center X val
  wallHeight    = 350;
  floorHeight   = wallHeight * 0.25;
  dockHeight    = 125;
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

function drawStatBars(){
  var statHeight    = 75;
  var totalGap      = 50 + 20 + 50;
  var midpointBarY  = totalGap + 350 + 120;
  var x             = two.width * 0.5;  // center X val
  var textGap       = 90;

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
  var totalGap      = 50 + 20 + 50;
  var midpointBarY  = totalGap + wallHeight + dockHeight;
  var midpointTextY = totalGap + wallHeight + dockHeight + (statHeight + 20);
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






// Make an instance of two and place it on the page.
function init(){
  // initializing game variables
  wallColor = "#EAEAEA";
  fullness  = 0;
  happiness = 0;
  training  = 0;
  activity  = 0;
  neglect   = 0;

  // initialize game screen
  var params = {
    fullscreen: false,
    width: window.innerWidth,
    height: 1000
  };
  var elem = document.querySelector("#gameArea");
  two = new Two(params).appendTo(elem);

  drawGameScreen(two);
  // draw game contents
  monster = two.makeSprite(monsterImgs.MONSTERMAIN, two.width * 0.5, ((wallHeight + 50) - floorHeight * 0.5)-100);
  drawStats(wallHeight, dockHeight, width);

  // Don’t forget to tell two to draw everything to the screen
  two.bind('update', update);
  two.play();
}

function refreshScreen(){
  two.width = window.innerWidth;

  // reset everything in the game area
  wall.remove();
  floor.remove();
  monster.remove();
  for (let i = 0; i < statText.length; i++){
    statText[i].remove();
    statBars[i].remove();
  }

  drawGameScreen();
  // draw game contents
  monster = two.makeSprite(monsterImgs.MONSTERMAIN, two.width * 0.5, ((wallHeight + 50) - floorHeight * 0.5)-100);
  drawStats(wallHeight, dockHeight, width);
}

function update(frameCount) {
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
    lastStatUpdate    = frameCount;
    statUpdatePending = false;
  }
  if ((frameCount - lastStatUpdate) > 500 && totalStatVal < 20 && stats[4] < 10){
    stats[4]++;
    totalStatVal++;
    lastStatUpdate = frameCount;
    console.log(frameCount);
  }

  if (totalStatVal > 20){
    for (let i = 0; i < stats.length; i++){
      stats[i] = 0;
    }
    console.log("Next monster stage reached!");
    monsterStage++;
  }
  
  refreshScreen();
}