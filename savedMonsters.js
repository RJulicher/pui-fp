const monsterThumbnails = [
    "./assets/feedFinal.png",
    "./assets/petFinal.png",
    "./assets/trainFinal.png",
    "./assets/walkFinal.png",
    "./assets/neglectFinal.png"
];

function showSavedMonsters(){
    document.getElementById("monsterContainer").style.display = "block";

    var monsterContent = document.getElementById("monsterContent");
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
        img.id = i;
        img.src = monsterThumbnails[maxStat];
        monsterSegment.appendChild(img);
        
        var monsterHeader = document.createElement("h1");
        monsterHeader.innerHTML = monster.name;
        monsterSegment.appendChild(monsterHeader);

        monsterContent.appendChild(monsterSegment);
    }
}

function hideSavedMonsters(){
    document.getElementById("monsterContainer").style.display = "none";

    var content = document.getElementById("monsterContent");
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
}