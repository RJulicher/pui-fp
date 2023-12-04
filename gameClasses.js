// This file contains mainly button classes for now
var stats = [0,0,0,0,0];
var statTotals = [0,0,0,0,0];
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
  monsterStage  = 0;
  stats         = [0,0,0,0,0];
  statTotals    = [0,0,0,0,0];
  statUpdatePending = true;
}