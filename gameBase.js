const monsterImgs = {
  MONSTERMAIN: new Two.Texture("./assets/monsterMain.png")
};

const actionImgs = {
  FEED:   new Two.Texture("./assets/feed.png"),
  PET:    new Two.Texture("./assets/pet.png"),
  TRAIN:  new Two.Texture("./assets/train.png"),
  WALK:   new Two.Texture("./assets/walk.png")
};

var two;
var monsterStage;
var wall;
var width;
var statText;
var statBars;

function drawGameScreen(two){
  // general game area variables
  width = two.width * 0.9;
  var x     = two.width * 0.5;  // center X val
  var wallHeight    = 350;
  var floorHeight   = wallHeight * 0.25;
  var dockHeight    = 125;
  // draw wall and floor
  var wallY = (wallHeight * 0.5) + 50;
  wall = two.makeRectangle(x, wallY, width, wallHeight);
  wall.fill = wallColor;
  wall.noStroke();

  var floorY = (wallHeight + 50) - floorHeight * 0.5;
  var floor = two.makeRectangle(x, floorY, width, floorHeight);
  floor.fill = '#6A6358';
  floor.noStroke();

  // draw game contents
  drawMonster(two, x, floorY);
  drawColorButtons(two, wall, width, wallHeight);
  drawActionButtons(two, wallHeight, dockHeight, width);
  drawStats(two, wallHeight, dockHeight, width);
}

function drawMonster(two, x, floorY){
  two.makeSprite(monsterImgs.MONSTERMAIN, x, floorY-100);
}

function drawColorButtons(two, wall, wallHeight){
  var x     = two.width * 0.5;  // center X val
  var colorButtonYStart = 40 + (wallHeight * 0.1);
  var areaEdge          = x + (width * 0.5);

  var blueButton = new colorButton(two, wall, '#75C5CA', areaEdge, colorButtonYStart);
  blueButton.draw(two);
  var separation        = blueButton.size + 5;

  var greenButton = new colorButton(two, wall, '#A8DFA6', areaEdge, colorButtonYStart + separation);
  greenButton.draw(two);

  var pinkButton = new colorButton(two, wall, '#DFC1D7', areaEdge, colorButtonYStart + (separation * 2));
  pinkButton.draw(two);

  var greyButton = new colorButton(two, wall, '#97A0A0', areaEdge, colorButtonYStart + (separation * 3));
  greyButton.draw(two);
}

function drawActionButtons(two, wallHeight, dockHeight){
  var x             = two.width * 0.5;  // center X val
  var topGap        = 50; // gap between top and main game area
  var dockMidpointY = topGap + wallHeight + (dockHeight * 0.5) + 20;

  var rect = two.makeRoundedRectangle(x, dockMidpointY, width, dockHeight, 20);
  rect.fill = '#B7C3C3';
  rect.noStroke();

  var actionGap = width * 0.25;

  var feed = new actionButton(x - (actionGap + (actionGap * 0.5)), dockMidpointY, two, actionImgs.FEED, 0);
  feed.draw();

  var pet = new actionButton(x - (actionGap * 0.5), dockMidpointY, two, actionImgs.PET, 1);
  pet.draw();

  var train = new actionButton(x + (actionGap * 0.5), dockMidpointY, two, actionImgs.TRAIN, 2);
  train.draw();

  var walk  = new actionButton(x + (actionGap + (actionGap * 0.5)), dockMidpointY, two, actionImgs.WALK, 3);
  walk.draw();
}

function drawStatBars(){
  var statHeight    = 75;
  var totalGap      = 50 + 20 + 50;
  var midpointBarY  = totalGap + 350 + 120;
  var x             = two.width * 0.5;  // center X val
  var textGap       = width * 0.2;

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

function drawStats(two, wallHeight, dockHeight){
  var statHeight    = 75;
  var totalGap      = 50 + 20 + 50;
  var midpointBarY  = totalGap + wallHeight + dockHeight;
  var midpointTextY = totalGap + wallHeight + dockHeight + (statHeight + 20);
  var x             = two.width * 0.5;  // center X val
  var textGap       = width * 0.2;

  console.log("drawing stats");
  var styles = {
    size: 15,
    color: 'black'
  };

  drawStatBars(two, x, textGap, statHeight, midpointBarY);

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
    fullscreen: true
  };
  var elem = document.body;
  two = new Two(params).appendTo(elem);

  drawGameScreen(two);

  // Don’t forget to tell two to draw everything to the screen
  two.bind('update', update);
  two.play();
}

function update(frameCount) {
  var totalStatVal = 0;
  for (let i = 0; i < stats.length; i++){
    if (stats[i] > 10){
      stats[i] = 10;
    }
    totalStatVal += stats[i];
  }
  if (totalStatVal > 20){
    for (let i = 0; i < stats.length; i++){
      stats[i] = 0;
    }
    console.log("Next monster stage reached!");
    monsterStage++;
  }

  wall.fill = wallColor;
  statText[0].value = "fullness: " + stats[0];
  statText[1].value = "happiness: " + stats[1];
  statText[2].value = "training: " + stats[2];
  statText[3].value = "activity: " + stats[3];
  statText[4].value = "neglect: " + stats[4];

  statBars[0].remove();
  statBars[1].remove();
  statBars[2].remove();
  statBars[3].remove();
  statBars[4].remove();

  drawStatBars()

  //console.log("wallColor is " + wallColor);
}