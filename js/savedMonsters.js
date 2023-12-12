// -------------------------HOUSEKEEPING-------------------------

// Monster images to show in saved monster cards
const monsterThumbnails = [
    "./assets/feedFinal.png",
    "./assets/petFinal.png",
    "./assets/trainFinal.png",
    "./assets/walkFinal.png",
    "./assets/neglectFinal.png"
];

// Show monster collection window
function showSavedMonsters(){
    document.getElementById("monsterContainer").style.display = "block";
    var monsterContent = document.getElementById("monsterContent");

    // If we have monsters in the collection, dynamically populate our collection window
    for (let i = 0; i < savedMonsters.length; i++){
        var monster = savedMonsters[i];

        var monsterSegment = document.createElement("button");
        monsterSegment.classList.add("monsterSegment");
        monsterSegment.style.backgroundColor = monster.wallColor;

        var maxStat = 0;
        var runningMax = 0;
        for (let j = 0; j < monster.stats.length; j++){
            if (monster.stats[j] > runningMax) {
                maxStat = j;
                runningMax = monster.stats[j];
            }
        }
        var img = document.createElement("img");
        img.src = monsterThumbnails[maxStat];
        monsterSegment.appendChild(img);
        
        var monsterHeader = document.createElement("h1");
        monsterHeader.innerHTML = monster.name;
        monsterSegment.appendChild(monsterHeader);

        var monsterStats = document.createElement("p");
        monsterStats.innerHTML = "fullness: " + monster.stats[0] + "<br> happiness: " + monster.stats[1] + 
                                "<br> training: " + monster.stats[2] + "<br> activity: " + monster.stats[3] + 
                                "<br> neglect: " + monster.stats[4];
        monsterSegment.appendChild(monsterStats);

        monsterContent.appendChild(monsterSegment);
    }

    // Otherwise, tell user we've got nothing available
    if (savedMonsters.length == 0){
        var monsterPrompt = document.createElement("h3");
        monsterPrompt.innerHTML = "No monsters kept here yet!";

        monsterContent.appendChild(monsterPrompt);
    }
}

// Close the collection window. This dynamically removes all monsters to reduce the complexity of
// keeping the window updated in the background.
function hideSavedMonsters(){
    document.getElementById("monsterContainer").style.display = "none";

    var content = document.getElementById("monsterContent");
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
}