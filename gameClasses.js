// This file contains mainly button classes for now
var stats = [0,0,0,0,0];
var wallColor;
var fullness;
var happiness;
var training;
var activity;
var neglect;

function changeWallColor(color){
  console.log("colorButton clicked");
  wallColor = color;
  //this.two.update();
  console.log("this button's color is " + this.color + 
                ", wall color changed to " + wallColor);
}

function updateStat(statNum){
  console.log("Updating stat " + statNum)
  stats[statNum]++;
}

class colorButton {
  two = null;
  constructor(two, wall, color, areaEdge, y){
    this.color  = color;
    this.areaEdge = areaEdge;
    this.y      = y;
    this.rect   = null;
    this.size   = 30;
    this.two    = two;
    this.wall   = wall;
  }

  draw(){
    var x = this.areaEdge - this.size;
    var rect = this.two.makeRoundedRectangle(x, this.y, this.size, this.size, 10);
    rect.fill = this.color;
    rect.noStroke();
    this.two.update();

    // Nasty little hack workaround with a self-calling function to get
    // the renderer to actually acknowledge the color
    rect._renderer.elem.addEventListener('click', function(passedColor) {
      return function(e) {changeWallColor(passedColor); };
    } (this.color), false);
  }
}

class actionButton {
  two = null;
  constructor(x, y, two, image, statNum){
    this.x        = x
    this.y        = y;
    this.two      = two;
    this.image    = image;
    this.statNum  = statNum;
  }

  draw(){
    var button = this.two.makeSprite(this.image, this.x, this.y);
    this.two.update();

    // Nasty little hack workaround with a self-calling function to get
    // the renderer to actually acknowledge the color
    console.log("stat number is " + this.statNum);
    button._renderer.elem.addEventListener('click', function(num) {
      return function(e) {updateStat(num); };
    } (this.statNum), false);
  }
}