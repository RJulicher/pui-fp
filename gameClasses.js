// This file contains mainly button classes for now
var stats = [0,0,0,0,0];
var wallColor;

var statUpdatePending = false;
var lastStatUpdate = 0;

function changeWallColor(){
  wallColor = event.currentTarget.value;
  //this.two.update();
  /*
  console.log("this button's color is " + event.currentTarget.value + 
                ", wall color changed to " + wallColor);
                */
}

function updateStat(){
  //console.log("Updating stat " + event.currentTarget.value)
  monsterState = parseInt(event.currentTarget.value);
  stats[parseInt(event.currentTarget.value)]++;
  statUpdatePending = true;
}