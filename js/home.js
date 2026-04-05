////////////////////////
// create activity nodes
////////////////////////

function createActivityNodes(timeSelection){

    handlePreloading('onGameStart');

    activityNodeContainer.classList.remove('state-display-none');
    activityNodeContainer.classList.add('state-display-flex');

    
    // preload images with priority-2
    /*
    setTimeout(preloadImages2,3000);
    function preloadImages2(){
        preloadImages(globalAssets[2], function() {});
        preloadImages(resourceAssets[2], function() {});
    }
    */
    /* siteContainer.style.backgroundImage = `url(assets/resource/background/${resource.global.background})`; */

    function removeValuesAfterIndex(array, index) {
        array.splice(index + 1, array.length - index - 2);
    }

    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
    if (resource.challengeArray){
        removeValuesAfterIndex(resource.challengeArray, settings.activityCount-1);
    }
    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
    else {
        removeValuesAfterIndex(resource.activityArray, settings.activityCount-1);
    }
    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
    if (resource.challengeArray) {
        let challengeArrayLength;
        if (gameMode === "preview"){
            challengeArrayLength = resource.challengeArray.length-1;
        }
        else {
            challengeArrayLength = resource.challengeArray.length;
        }
        for (let i = 0; i < challengeArrayLength; i++) {
            let activity = resource.challengeArray[i];
            let activityNode = createElement("div", ["activity-node", "activity-node--not-clicked", "activity-node--hidden", "activity-node--unclickable"], activityNodeContainer, `activity-node-${i + 1}`);
            let activityNodeImage = createElement("div", ["activity-node-image"], activityNode);
            let activityNodeTitle;
            if (activity.info.type !== "code-box") {
                activityNodeImage.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/node/" + activity.info.asset + ")";
                activityNodeTitle = createElement("p", ["activity-node-title"], activityNode, `activity-node-title-${i + 1}`);
                activityNodeTitle.textContent = /*titlePrefix + */ activity.info.title;
            } else {
                activityNode.style.backgroundImage = `url(assets/interface/machine/node/code.png)`;
            }
    
            activityNode.addEventListener("touchstart", function () {
                activityNode.classList.add("activity-node-active");
            }, { passive: true });
    
            activityNode.addEventListener("touchend", function () {
                activityNode.classList.remove("activity-node-active");
            });
    
            activityNode.addEventListener("click", () => {
                activityArrayIndex = i;
                openActivityModal(i);
                drawActivityModule(i);
                drawScene(i);
                drawActivity(i);
                drawCodeInput(i);
            });
    
            updateActivityState(activityNode, activity.state);
    
            let nodeDelay;
            let nodeTimeFactor;
            if (timeSelection === "noLimit") {
                activityNodeContainer.classList.add("activity-node-container--center");
                activityModal.classList.add("activity-modal--center");
                nodeDelay = 800;
                nodeTimeFactor = 300;
            } else {
                activityNodeContainer.classList.add("activity-node-container--right");
                activityModal.classList.add("activity-modal--right");
                nodeDelay = 1700;
                nodeTimeFactor = 300;
            }
            setTimeout(toggleClass, (nodeDelay + i * nodeTimeFactor), activityNode, "activity-node--hidden", "activity-node--visible");
            setTimeout(toggleClass, (nodeDelay + (nodeTimeFactor * (resource.challengeArray.length + 1))), activityNode, "activity-node--unclickable", "activity-node--clickable");
        }
    }
    
    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
    else {

        let activityArrayLength;
        if (gameMode === "preview"){
            activityArrayLength = resource.activityArray.length-1;
        }
        else {
            activityArrayLength = resource.activityArray.length;
        }
        for (let i = 0; i < activityArrayLength; i++) {
            let activity = resource.activityArray[i];
            let activityNode = createElement("div", ["activity-node", "activity-node--not-clicked", "activity-node--hidden", "activity-node--unclickable"], activityNodeContainer, `activity-node-${i + 1}`);
            let activityNodeImage = createElement("div", ["activity-node-image"], activityNode);
            let activityNodeTitle;
            if (activity.type !== "code-box") {
                activityNodeImage.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/node/" + activity.assets.nodeBackground + ")";
                activityNodeTitle = createElement("p", ["activity-node-title"], activityNode, `activity-node-title-${i + 1}`);
                activityNodeTitle.innerHTML = activity.title;
            } else {
                activityNode.style.backgroundImage = `url(assets/interface/machine/node/code.png)`;
            }
        
            activityNode.addEventListener("touchstart", function () {
                activityNode.classList.add("activity-node-active");
            }, { passive: true });
        
            activityNode.addEventListener("touchend", function () {
                activityNode.classList.remove("activity-node-active");
            });
        
            activityNode.addEventListener("click", () => {
                activityArrayIndex = i + 1;
                openActivityModal(i);
                drawActivityModule(i);
                drawScene(i + 1);
                drawActivity(i + 1);
                drawCodeInput(i + 1);
            });
        
            updateActivityState(activityNode, activity.state);
        
            let nodeDelay;
            let nodeTimeFactor;
            if (timeSelection === "noLimit") {
                activityNodeContainer.classList.add("activity-node-container--center");
                activityModal.classList.add("activity-modal--center");
                nodeDelay = 800;
                nodeTimeFactor = 300;
            } else {
                activityNodeContainer.classList.add("activity-node-container--right");
                activityModal.classList.add("activity-modal--right");
                nodeDelay = 1700;
                nodeTimeFactor = 300;
            }
        
            setTimeout(toggleClass, (nodeDelay + i * nodeTimeFactor), activityNode, "activity-node--hidden", "activity-node--visible");
            setTimeout(toggleClass, (nodeDelay + (nodeTimeFactor * (resource.activityArray.length + 1))), activityNode, "activity-node--unclickable", "activity-node--clickable");
        }
        
        
    }
    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

}

function updateActivityState(activityNode, activityState) {
    activityNode.classList.remove("activity-node--incomplete", "activity-node--complete", "activity-node--disabled");

    switch (activityState) {
        case "incomplete":
            activityNode.classList.add("activity-node--incomplete");
            break;
        case "complete":
            let activityNodeCompleteBanner = createElement("div", ["activity-node-complete-banner"],activityNode);
            activityNode.classList.add("activity-node--complete");
            break;
        case "disabled":
            activityNode.classList.add("activity-node--disabled");
            break;
        case "enabled":
            activityNode.classList.add("activity-node--enabled");
            break;
        default:
            break;
    }
}

function drawActivityModule(i){

    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
    if (resource.challengeArray){

        let section = resource.challengeArray[activityArrayIndex];

        if (section.activity){
            if (section.activity.info.type === "dynamic"){
                drawDynamic(i);
            }
            if (section.activity.info.type === "passage-with-image"){
                drawPassage(i);
            }
            if (section.activity.info.type === "poem"){
                drawPoem(i);
            }
            if (section.activity.info.type === "puzzle"){
                drawPuzzle(i);
            }
            if (section.activity.info.type === "cryptogram"){
                drawCryptogram(i);
            }
            if (section.activity.info.type === "story"){
                drawStory(i);
            }
        }

        if (section.questions){
            if (section.questions.info.type === "multiple-choice"){
                drawMultipleChoice(i);
            }
            if (section.questions.info.type === "crossword"){
                drawCrossword(i);
            }
            if (section.questions.info.type === "decoder"){
                drawDecoder(i);
            }
        }

        if (section.info.type !== "challenge"){
            if (section.info.type === "code-box"){
                createCodeBox(i);
            }
        }
            
}
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

// ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
else {
        let activity = resource.activityArray[activityArrayIndex-1];
        if (activity.content.passage){
            drawPassage(i);
        }
        if (activity.content.multipleChoice){
            drawMultipleChoice(i);
        }
        if (activity.content.poem){
            drawPoem(i);
        }
        if (activity.content.crossword){
            drawCrossword(i);
        }
        if (activity.content.puzzle){
            drawPuzzle(i);
        }
        if (activity.content.story){
            drawStory(i);
        }
        if (activity.content.decoder){
            drawActivity_decoder(i);
        }
        if (activity.content.codeBox){
            createCodeBox(i);
        }
    }
    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌




}
  
