// This file contains mainly button classes for now
var stats = [0,0,0,0,0];
var wallColor;
var fullness;
var happiness;
var training;
var activity;
var neglect;

var statUpdatePending = false;
var lastStatUpdate = 0;

function changeWallColor(){
  console.log("colorButton clicked");
  wallColor = event.currentTarget.value;
  //this.two.update();
  console.log("this button's color is " + event.currentTarget.value + 
                ", wall color changed to " + wallColor);
}

function updateStat(){
  console.log("Updating stat " + event.currentTarget.value)
  stats[parseInt(event.currentTarget.value)]++;
  statUpdatePending = true;
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
    //this.two.update();

    // Nasty little hack workaround with a self-calling function to get
    // the renderer to actually acknowledge the color
    
    /*
    rect._renderer.elem.addEventListener('click', function(passedColor) {
      return function(e) {changeWallColor(passedColor); };
    } (this.color), false);
    */
  }
}