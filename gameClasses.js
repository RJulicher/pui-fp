// This file contains mainly button classes for now
var stats;
var wallColor;
var savedMonsters;

var statUpdatePending = false;
var wallUpdatePending = false;
var finalScreenPending = false;
var lastStatUpdate = 0;
var restarting = false;

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
  monsterState  = -1;
  restarting = true;
  stats         = [0,0,0,0,0];
  serializeGame()
  statUpdatePending = true;
}

function save(){
  savedMonsters.push({"name": document.querySelector("#monsterName > input").value,
                      "wallColor": wallColor, "monsterStage": monsterStage, "stats": stats})
  localStorage.setItem("savedMonsters", JSON.stringify(savedMonsters));
  document.querySelector("#save").style.display = "none";
}

function createResults(maxStat){
  var flavorText = [
    ["Very Well Fed", 
    "Hey there! So, you know how you've been taking care of that adorable pet monster of yours? "+
    "Well, it seems like you might have been a bit too generous with the snacks. Your lovable creature "+
    "has undergone a slight transformation and is now rocking this charmingly quirky eldritch "+
    "abomination vibe. No worries, though! Your pet's unique look just adds to its charm. Who knew that "+
    "overfeeding could turn your monster into the cutest cthulhu buddy in town?"],
    ["Happy Boi",
    "So, you've been showering your pet monster with loads of love and pets, right? Well, it turns out "+
    "your little buddy has become a clingy aficionado of affection. Now, it's on a mission for more "+
    "petting at any cost — picture an adorable monster that's just insatiable for those cuddles. Brace "+
    "yourself for some serious cuteness overload, because your pet is on a relentless quest for more snuggles and pets!"],
    ["You've Trained It...To Let You Put On a Hat.",
    "You trained your pet monster just so you could slap a hat on it for kicks? Well, that's a unique "+
    "use of time and effort, isn't it? I mean, I guess everyone has their own priorities, and yours "+
    "apparently include turning your little monster into a hat-wearing sideshow. I can't decide if it's "+
    "oddly amusing or just a tad absurd, but hey, to each their own, right? Your monster must be the "+
    "talk of the town with its, um, fashion-forward choices. And also for being a blob monster freaking out "+
    "neighborhood kids on its nightly outings. Mostly that. But you've truly set the bar high for "+
    "unconventional pet training goals."],
    ["These Legs Are Made For Walkin'",
    "Hold up, you're telling me you walked your pet monster so much that it evolved legs for better "+
    "fitness? I'm a bit baffled here. I mean, walks are great and all, but monster evolution? That's a "+
    "whole new level. Did your creature hit the evolutionary gym on those strolls? It's like the fitness "+
    "gods decided your pet needed an upgrade. I'm not sure if it's bizarre or just a stroke of evolutionary "+
    "genius, but kudos to you for unintentionally turning your monster into a walking marvel!"],
    ["I Think You're The Real Monster Here...",
    "Hey, so you adopted a pet monster, but it sounds like things took a bit of a turn, huh? I hate to "+
    "be the bearer of bad news, but neglecting your poor creature to the point where it's got depression "+
    "and is literally melting? That's a whole new level of pet parenting gone wrong. I mean, seriously, how "+
    "do you even let it get to that point? It's like a monster-shaped puddle of regret. Time to step up "+
    "your pet care game, don't you think? That sad, melting monster deserves better than to be the poster "+
    "child for neglect."],
  ];
  var header = document.querySelector("#results > h2");
  header.innerHTML = flavorText[maxStat][0];
  var description = document.querySelector("#results > p");
  description.innerHTML = flavorText[maxStat][1];
}