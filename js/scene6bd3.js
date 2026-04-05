/////////////
// draw scene
/////////////

function drawScene(activityArrayIndex) {

  let activitySceneButtonText;
  let playerImage;
  let dialogueText;
  let playerName;

  if (resource.activityArray[activityArrayIndex-1].type !== "code-box") {

    // modify scene based on state
    if (resource.activityArray[activityArrayIndex-1].state === "incomplete") {

      // set player text
      for (let j = 0; j < characterArray.length; j++) {
        if ("name" in characterArray[j] && characterArray[j].name === playerCharacters[playerCharacterIndex]) {
          activitySceneButtonText = characterArray[j].dialogue.start;
          playerImage = characterArray[j].asset;
          playerName = characterArray[j].name;
        }
      }
      if (playerCharacterIndex < playerCharacters.length-1){
        playerCharacterIndex = playerCharacterIndex+1;    
      } 
      else {
        playerCharacterIndex = 0;
      }

      // set character tex
      dialogueText = resource.activityArray[activityArrayIndex-1].dialogue.incomplete;
      
    }
    if (resource.activityArray[activityArrayIndex-1].state === "complete") {
    
      // set player text
      for (let j = 0; j < characterArray.length; j++) {
        if ("name" in characterArray[j] && characterArray[j].name === playerCharacters[playerCharacterIndex]) {
          activitySceneButtonText = characterArray[j].dialogue.okay;
          playerImage = characterArray[j].asset;
          playerName = characterArray[j].name;
        }
      }
      if (playerCharacterIndex < playerCharacters.length-1){
        playerCharacterIndex = playerCharacterIndex+1;    
      } 
      else {
        playerCharacterIndex = 0;
      }

      // set character tex
      dialogueText = resource.activityArray[activityArrayIndex-1].dialogue.complete;
    }

    // create elements
    const activitySceneWrapper = createElement('div', ['activity-scene-wrapper'], activityModal);
    const activitySceneContainer = createElement('div', ['activity-scene-container', 'activity-scene-container--open'], activitySceneWrapper);
    const activityScenedialogueWrapper = createElement('div', ['activity-scene-dialogue-wrapper', 'activity-scene-dialogue-wrapper--close'], activitySceneContainer);
    const activitySceneDialogueTrail = createElement('div', ['activity-scene-dialogue-trail'], activityScenedialogueWrapper);
    const activitySceneCharacterName = createElement('p', ['activity-scene-character-name',], activityScenedialogueWrapper);
    const activityScenedialogue = createElement('p', ['activity-scene-dialogue'], activityScenedialogueWrapper);
    let activitySceneTopic;
    if (resource.activityArray[activityArrayIndex-1].state === "incomplete") {
      activitySceneTopic = createElement('p', ['activity-scene-topic', 'activity-scene-topic--hidden'], activityScenedialogueWrapper);
    }
    const activitySceneButton = createElement('div', ['activity-scene-button', 'activity-scene-button--close'], activitySceneContainer);
    const activitySceneCharacter = createElement('div', ['activity-scene-character', 'activity-scene-character--hidden'], activitySceneContainer);
    const activitySceneBackground = createElement('div', ['activity-scene-background'], activitySceneContainer);
    const activityScenePlayerFrame = createElement('div', ['activity-scene-player-frame', 'activity-scene-player-frame--hidden'], activitySceneContainer);
    const activityScenePlayer = createElement('div', ['activity-scene-player', 'activity-scene-player--close'], activitySceneContainer);
    const activityScenePlayerName = createElement('p', ['activity-scene-player-name'], activitySceneButton);
    const activityScenePlayerText = createElement('p', ['activity-scene-player-text'], activitySceneButton);
    const activitySceneDialogueTrailPlayer = createElement('div', ['activity-scene-dialogue-trail-player'], activitySceneButton);
    const activitySceneButtonStart = createElement('button', ['activity-scene-button-start', 'activity-scene-button-start--hidden'], activitySceneButton);
    setIpadActiveState(activitySceneButtonStart);

    // modify elements
    setTimeout(toggleClass, 900, activitySceneCharacter, "activity-scene-character--hidden", "activity-scene-character--visible");
    setTimeout(toggleClass, 1300, activityScenedialogueWrapper, "activity-scene-dialogue-wrapper--close", "activity-scene-dialogue-wrapper--open");
    activitySceneButtonStart.addEventListener('click', myFunction);
    function myFunction() {
      toggleClass(activitySceneContainer, "activity-scene-container--open", "activity-scene-container--close");
      setTimeout(toggleClass, 500, activitySceneWrapper, null, 'state-display-none');
      setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--hidden", "activity-modal-content-container-toggle--visible");
    }
    activityScenePlayer.style.backgroundImage = 'url(assets/player/' + playerImage + ')';
    /* activitySceneBackground.style.backgroundImage = `url(assets/resource/activity/${resource.activityArray[activityArrayIndex-1].assets.sceneBackground})`; */
    activitySceneCharacter.style.backgroundImage =     "url(resource/" + resourceTheme + "/assets/activity/character/" + resource.activityArray[activityArrayIndex-1].assets.characterShopkeeper + ")";
    activitySceneCharacterName.textContent = resource.activityArray[activityArrayIndex-1].characterName.toUpperCase();
    activityScenePlayerName.textContent = playerName.toUpperCase();
    if (resource.activityArray[activityArrayIndex-1].state === "incomplete") {
      activitySceneTopic.textContent = "Topic: " + resource.activityArray[activityArrayIndex-1].topic;
    }
    activitySceneButtonStart.textContent = "START";
    /* activitySceneInstructions.innerHTML = "<strong>Directions:</strong> " + resource.activityArray[activityArrayIndex-1].instructions; */

    // open scene button when text is finished
    let activitySceneButtonTimer = (dialogueText.length * 20) + 500;
    let activitySceneStartButtonTimer = (activitySceneButtonText.length * 20);
    /* setTimeout(toggleClass, activitySceneButtonTimer + 500, activitySceneInstructions, "opacity-0", "opacity-1"); */
    if (resource.activityArray[activityArrayIndex-1].state === "incomplete") {
      setTimeout(toggleClass, activitySceneButtonTimer + 1700, activitySceneTopic, "activity-scene-topic--hidden", "activity-scene-topic--visible");
    }
    setTimeout(toggleClass, activitySceneButtonTimer + 1700, activityScenePlayerFrame, "activity-scene-player-frame--hidden", "activity-scene-player-frame--visible");
    /* setTimeout(toggleClass, activitySceneButtonTimer + 1100, activitySceneCharacter, null, "activity-scene-character--pushed-left"); */
    setTimeout(toggleClass, activitySceneButtonTimer + 1700, activityScenePlayer, "activity-scene-player--close", "activity-scene-player--open");
    setTimeout(toggleClass, activitySceneButtonTimer + 1700, activitySceneCharacter, null, "activity-scene-characater--blackout");
    setTimeout(toggleClass, activitySceneButtonTimer + 2000, activitySceneButton, "activity-scene-button--close", "activity-scene-button--open");
    setTimeout(toggleClass, activitySceneButtonTimer + 2000 + activitySceneStartButtonTimer, activitySceneButtonStart, "activity-scene-button-start--hidden", "activity-scene-button-start--visible");

    setTimeout(addText,800,dialogueText, activityScenedialogue);
    setTimeout(addText, activitySceneButtonTimer + 700, activitySceneButtonText, activityScenePlayerText);
    // add text typewriter-style
    function addText(text, element){
      for (let i = 0; i < text.length; i++) {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = text[i]; 
        characterSpan.style.opacity = 0;       
        setTimeout(addText,1000);
        function addText(){
            setTimeout(() => {
                characterSpan.style.opacity = 1;
            }, i * 20);
        }
        element.appendChild(characterSpan);
      }
    }
    }


}



