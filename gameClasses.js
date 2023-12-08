// This file contains mainly button classes for now
var stats;
var statTotals;
var wallColor;

var statUpdatePending = false;
var wallUpdatePending = false;
var finalScreenPending = false;
var lastStatUpdate = 0;

function changeWallColor(){
  wallColor = event.currentTarget.value;
  wallUpdatePending = true;
}

function updateStat(){
  monsterState = parseInt(event.currentTarget.value);
  stats[parseInt(event.currentTarget.value)]++;
  statUpdatePending = true;
}

function restart(){
  console.log("restarting");
  monsterStage  = 0;
  stats         = [0,0,0,0,0];
  statTotals    = [0,0,0,0,0];
  statUpdatePending = true;
}