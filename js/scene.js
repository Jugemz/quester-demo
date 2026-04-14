//////////////
// scene helpers
//////////////

function getSceneShopkeeperBaseAsset(activity) {
  if (!activity || !activity.assets) {
    return "";
  }

  return activity.assets.characterShopkeeper || "";
}

function getSceneShopkeeperOverlayAsset(activity) {
  if (!activity || !activity.assets) {
    return "";
  }

  return activity.assets.magnifierCharacterShopkeeper || "";
}

function isMagnifierActive() {
  return typeof getActiveTool === "function" && getActiveTool() === "magnifier";
}

function refreshCurrentSceneToolState() {
  if (
    typeof resource === "undefined" ||
    !resource ||
    !Array.isArray(resource.activityArray)
  ) {
    return;
  }

  if (
    typeof activityArrayIndex === "undefined" ||
    activityArrayIndex === null ||
    activityArrayIndex === undefined
  ) {
    return;
  }

  const activeActivity = resource.activityArray[activityArrayIndex - 1];
  if (!activeActivity) return;

  const activitySceneCharacter = document.querySelector(".activity-scene-character");
  const activitySceneCharacterOverlay = document.querySelector(".activity-scene-character-overlay");

  if (!activitySceneCharacter || !activitySceneCharacterOverlay) return;

  const overlayAsset = getSceneShopkeeperOverlayAsset(activeActivity);

  if (overlayAsset) {
    activitySceneCharacterOverlay.style.backgroundImage =
      "url(resource/" + resourceTheme + "/assets/activity/character/" + overlayAsset + ")";
  } else {
    activitySceneCharacterOverlay.style.backgroundImage = "none";
  }

  if (!isMagnifierActive()) {
    activitySceneCharacter.classList.remove("activity-scene-character--tool-hover");
  }
}

/////////////
// draw scene
/////////////

function drawScene(activityArrayIndex) {
  let activitySceneButtonText;
  let playerImage;
  let dialogueText;
  let playerName;

  if (resource.challengeArray) {
    if (resource.challengeArray[activityArrayIndex].info.type !== "code-box") {
      if (resource.challengeArray[activityArrayIndex].info.state === "incomplete") {
        if (gameMode === "preview") {
          playerImage = "";
          playerName = "";
          activitySceneButtonText = "";
        } else {
          for (let j = 0; j < characterArray.length; j++) {
            if ("name" in characterArray[j] && characterArray[j].name === playerCharacters[playerCharacterIndex]) {
              let startDialogueOptions = characterArray[j].dialogue.start;
              let randomStartDialogue = startDialogueOptions[Math.floor(Math.random() * startDialogueOptions.length)];
              activitySceneButtonText = randomStartDialogue;
              playerImage = characterArray[j].asset;
              playerName = characterArray[j].name;
            }
          }

          if (playerCharacterIndex < playerCharacters.length - 1) {
            playerCharacterIndex = playerCharacterIndex + 1;
          } else {
            playerCharacterIndex = 0;
          }
        }

        dialogueText = resource.challengeArray[activityArrayIndex].intro.dialogue.incomplete;
      }

      if (resource.challengeArray[activityArrayIndex].info.state === "complete") {
        if (gameMode === "preview") {
          playerImage = "";
          playerName = "";
          activitySceneButtonText = "";
        } else {
          for (let j = 0; j < characterArray.length; j++) {
            if ("name" in characterArray[j] && characterArray[j].name === playerCharacters[playerCharacterIndex]) {
              let okayDialogueOptions = characterArray[j].dialogue.okay;
              let randomOkayDialogue = okayDialogueOptions[Math.floor(Math.random() * okayDialogueOptions.length)];
              activitySceneButtonText = randomOkayDialogue;
              playerImage = characterArray[j].asset;
              playerName = characterArray[j].name;
            }
          }

          if (playerCharacterIndex < playerCharacters.length - 1) {
            playerCharacterIndex = playerCharacterIndex + 1;
          } else {
            playerCharacterIndex = 0;
          }
        }

        dialogueText = resource.challengeArray[activityArrayIndex].intro.dialogue.complete;
      }

      const activitySceneWrapper = createElement("div", ["activity-scene-wrapper"], activityModal);
      const activitySceneContainer = createElement("div", ["activity-scene-container", "activity-scene-container--open"], activitySceneWrapper);
      const activityScenedialogueWrapper = createElement("div", ["activity-scene-dialogue-wrapper", "activity-scene-dialogue-wrapper--close"], activitySceneContainer);
      createElement("div", ["activity-scene-dialogue-trail"], activityScenedialogueWrapper);
      const activitySceneCharacterName = createElement("p", ["activity-scene-character-name"], activityScenedialogueWrapper);
      const activityScenedialogue = createElement("p", ["activity-scene-dialogue"], activityScenedialogueWrapper);

      let activitySceneTopic;
      if (resource.challengeArray[activityArrayIndex].info.state === "incomplete") {
        activitySceneTopic = createElement("p", ["activity-scene-topic", "activity-scene-topic--hidden"], activityScenedialogueWrapper);
      }

      const activitySceneButton = createElement("div", ["activity-scene-button", "activity-scene-button--close"], activitySceneContainer);
      const activitySceneButtonStart = createElement("button", ["activity-scene-button-start", "activity-scene-button-start--hidden"], activitySceneContainer);
      const activitySceneCharacter = createElement("div", ["activity-scene-character", "activity-scene-character--hidden"], activitySceneContainer);
      const activitySceneCharacterBase = createElement("div", ["activity-scene-character-base"], activitySceneCharacter);
      const activitySceneCharacterOverlay = createElement("div", ["activity-scene-character-overlay"], activitySceneCharacter);

      createElement("div", ["activity-scene-background"], activitySceneContainer);
      const activityScenePlayerFrame = createElement("div", ["activity-scene-player-frame", "activity-scene-player-frame--hidden"], activitySceneContainer);
      const activityScenePlayer = createElement("div", ["activity-scene-player", "activity-scene-player--close"], activitySceneContainer);
      const activityScenePlayerName = createElement("p", ["activity-scene-player-name"], activitySceneButton);
      const activityScenePlayerText = createElement("p", ["activity-scene-player-text"], activitySceneButton);
      createElement("div", ["activity-scene-dialogue-trail-player"], activitySceneButton);

      if (gameMode === "preview") {
        activitySceneButton.classList.add("state-display-none");
      }

      setIpadActiveState(activitySceneButtonStart);

      setTimeout(toggleClass, 900, activitySceneCharacter, "activity-scene-character--hidden", "activity-scene-character--visible");
      setTimeout(toggleClass, 1300, activityScenedialogueWrapper, "activity-scene-dialogue-wrapper--close", "activity-scene-dialogue-wrapper--open");

      activitySceneButtonStart.addEventListener("click", function () {
        toggleClass(activitySceneContainer, "activity-scene-container--open", "activity-scene-container--close");
        setTimeout(toggleClass, 500, activitySceneWrapper, null, "state-display-none");
        setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--hidden", "activity-modal-content-container-toggle--visible");

        if (gameMode !== "preview") {
          const draggableElements = document.querySelectorAll(".drag-and-drop");
          draggableElements.forEach(function (el) {
            el.classList.add("draggable--hidden");
            setTimeout(function makeVisible() {
              toggleClass(el, "draggable--hidden", "draggable--visible");
            }, 700);
          });
        }
      });

      activityScenePlayer.style.backgroundImage = "url(assets/player/" + playerImage + ")";
      activitySceneCharacterBase.style.backgroundImage =
        "url(resource/" + resourceTheme + "/assets/activity/character/" + resource.challengeArray[activityArrayIndex].intro.asset + ")";
      activitySceneCharacterOverlay.style.backgroundImage = "none";

      activitySceneCharacterName.textContent = resource.challengeArray[activityArrayIndex].intro.character.toUpperCase();
      activityScenePlayerName.textContent = playerName.toUpperCase();

      if (resource.challengeArray[activityArrayIndex].info.state === "incomplete") {
        activitySceneTopic.textContent = resource.challengeArray[activityArrayIndex].info.education.topic;
      }

      activitySceneButtonStart.textContent = gameMode === "preview" ? "NEXT" : "START";

      let delay__sceneButton = 500;
      let delay__addText = 700;
      let delay__addText2 = 800;
      let delay__addText3 = 1000;
      let delay__sceneTopic = 1700;
      let delay__closeButton = 2000;

      if (gameMode === "preview") {
        typewriterDelay = 5;
        activityScenePlayerFrame.classList.add("state-display-none");
      }

      let activitySceneButtonTimer = dialogueText.length * typewriterDelay + delay__sceneButton;
      let activitySceneStartButtonTimer = activitySceneButtonText.length * typewriterDelay;

      if (resource.challengeArray[activityArrayIndex].info.state === "incomplete") {
        setTimeout(toggleClass, activitySceneButtonTimer + delay__sceneTopic, activitySceneTopic, "activity-scene-topic--hidden", "activity-scene-topic--visible");
      }

      setTimeout(toggleClass, activitySceneButtonTimer + delay__sceneTopic, activityScenePlayerFrame, "activity-scene-player-frame--hidden", "activity-scene-player-frame--visible");
      setTimeout(toggleClass, activitySceneButtonTimer + delay__sceneTopic, activityScenePlayer, "activity-scene-player--close", "activity-scene-player--open");
      setTimeout(toggleClass, activitySceneButtonTimer + delay__sceneTopic, activitySceneCharacter, null, "activity-scene-characater--blackout");
      setTimeout(toggleClass, activitySceneButtonTimer + delay__closeButton, activitySceneButton, "activity-scene-button--close", "activity-scene-button--open");
      setTimeout(toggleClass, activitySceneButtonTimer + delay__closeButton + activitySceneStartButtonTimer, activitySceneButtonStart, "activity-scene-button-start--hidden", "activity-scene-button-start--visible");

      setTimeout(addText, delay__addText2, dialogueText, activityScenedialogue);
      setTimeout(addText, activitySceneButtonTimer + delay__addText, activitySceneButtonText, activityScenePlayerText);

      function addText(text, element) {
        for (let i = 0; i < text.length; i++) {
          const characterSpan = document.createElement("span");
          characterSpan.innerText = text[i];
          characterSpan.style.opacity = 0;

          setTimeout(function revealCharacter() {
            setTimeout(() => {
              characterSpan.style.opacity = 1;
            }, i * typewriterDelay);
          }, delay__addText3);

          element.appendChild(characterSpan);
        }
      }
    }
  } else {
    if (resource.activityArray[activityArrayIndex - 1].type !== "code-box") {
      if (resource.activityArray[activityArrayIndex - 1].state === "incomplete") {
        if (gameMode === "preview") {
          playerImage = "";
          playerName = "";
          activitySceneButtonText = "";
        } else {
          for (let j = 0; j < characterArray.length; j++) {
            if ("name" in characterArray[j] && characterArray[j].name === playerCharacters[playerCharacterIndex]) {
              let startDialogueOptions = characterArray[j].dialogue.start;
              let randomStartDialogue = startDialogueOptions[Math.floor(Math.random() * startDialogueOptions.length)];
              activitySceneButtonText = randomStartDialogue;

              playerImage = characterArray[j].asset;
              playerName = characterArray[j].name;
            }
          }

          if (playerCharacterIndex < playerCharacters.length - 1) {
            playerCharacterIndex = playerCharacterIndex + 1;
          } else {
            playerCharacterIndex = 0;
          }
        }

        dialogueText = resource.activityArray[activityArrayIndex - 1].dialogue.incomplete;
      }

      if (resource.activityArray[activityArrayIndex - 1].state === "complete") {
        for (let j = 0; j < characterArray.length; j++) {
          if ("name" in characterArray[j] && characterArray[j].name === playerCharacters[playerCharacterIndex]) {
            let okayDialogueOptions = characterArray[j].dialogue.okay;
            let randomOkayDialogue = okayDialogueOptions[Math.floor(Math.random() * okayDialogueOptions.length)];
            activitySceneButtonText = randomOkayDialogue;

            playerImage = characterArray[j].asset;
            playerName = characterArray[j].name;
          }
        }

        if (playerCharacterIndex < playerCharacters.length - 1) {
          playerCharacterIndex = playerCharacterIndex + 1;
        } else {
          playerCharacterIndex = 0;
        }

        dialogueText = resource.activityArray[activityArrayIndex - 1].dialogue.complete;
      }

      const activitySceneWrapper = createElement("div", ["activity-scene-wrapper"], activityModal);
      const activitySceneContainer = createElement("div", ["activity-scene-container", "activity-scene-container--open"], activitySceneWrapper);
      const activityScenedialogueWrapper = createElement("div", ["activity-scene-dialogue-wrapper", "activity-scene-dialogue-wrapper--close"], activitySceneContainer);
      createElement("div", ["activity-scene-dialogue-trail"], activityScenedialogueWrapper);
      const activitySceneCharacterName = createElement("p", ["activity-scene-character-name"], activityScenedialogueWrapper);
      const activityScenedialogue = createElement("p", ["activity-scene-dialogue"], activityScenedialogueWrapper);

      let activitySceneTopic;
      if (resource.activityArray[activityArrayIndex - 1].state === "incomplete") {
        activitySceneTopic = createElement("p", ["activity-scene-topic", "activity-scene-topic--hidden"], activityScenedialogueWrapper);
      }

      const activitySceneButton = createElement("div", ["activity-scene-button", "activity-scene-button--close"], activitySceneContainer);
      const activitySceneCharacter = createElement("div", ["activity-scene-character", "activity-scene-character--hidden"], activitySceneContainer);
      const activitySceneCharacterBase = createElement("div", ["activity-scene-character-base"], activitySceneCharacter);
      const activitySceneCharacterOverlay = createElement("div", ["activity-scene-character-overlay"], activitySceneCharacter);

      createElement("div", ["activity-scene-background"], activitySceneContainer);
      const activityScenePlayerFrame = createElement("div", ["activity-scene-player-frame", "activity-scene-player-frame--hidden"], activitySceneContainer);
      const activityScenePlayer = createElement("div", ["activity-scene-player", "activity-scene-player--close"], activitySceneContainer);
      const activityScenePlayerName = createElement("p", ["activity-scene-player-name"], activitySceneButton);
      const activityScenePlayerText = createElement("p", ["activity-scene-player-text"], activitySceneButton);
      createElement("div", ["activity-scene-dialogue-trail-player"], activitySceneButton);
      const activitySceneButtonStart = createElement("button", ["activity-scene-button-start", "activity-scene-button-start--hidden"], activitySceneContainer);

      setIpadActiveState(activitySceneButtonStart);

      if (gameMode === "preview") {
        activitySceneButton.classList.add("state-display-none");
      }

      setTimeout(toggleClass, 900, activitySceneCharacter, "activity-scene-character--hidden", "activity-scene-character--visible");
      setTimeout(toggleClass, 1300, activityScenedialogueWrapper, "activity-scene-dialogue-wrapper--close", "activity-scene-dialogue-wrapper--open");

      activitySceneButtonStart.addEventListener("click", function () {
        toggleClass(activitySceneContainer, "activity-scene-container--open", "activity-scene-container--close");
        setTimeout(toggleClass, 500, activitySceneWrapper, null, "state-display-none");
        setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--hidden", "activity-modal-content-container-toggle--visible");

        if (gameMode !== "preview") {
          const draggableElements = document.querySelectorAll(".draggable");
          draggableElements.forEach(function (el) {
            el.classList.add("draggable--hidden");
            setTimeout(function makeVisible() {
              toggleClass(el, "draggable--hidden", "draggable--visible");
            }, 600);
          });
        }
      });

      activityScenePlayer.style.backgroundImage = "url(assets/player/" + playerImage + ")";

      const activeActivity = resource.activityArray[activityArrayIndex - 1];
      const baseAsset = getSceneShopkeeperBaseAsset(activeActivity);
      const overlayAsset = getSceneShopkeeperOverlayAsset(activeActivity);

      activitySceneCharacterBase.style.backgroundImage =
        "url(resource/" + resourceTheme + "/assets/activity/character/" + baseAsset + ")";

      if (overlayAsset) {
        activitySceneCharacterOverlay.style.backgroundImage =
          "url(resource/" + resourceTheme + "/assets/activity/character/" + overlayAsset + ")";
      } else {
        activitySceneCharacterOverlay.style.backgroundImage = "none";
      }

      activitySceneCharacter.addEventListener("mouseenter", function () {
        if (!isMagnifierActive()) return;
        if (!overlayAsset) return;

        activitySceneCharacter.classList.add("activity-scene-character--tool-hover");
      });

      activitySceneCharacter.addEventListener("mouseleave", function () {
        activitySceneCharacter.classList.remove("activity-scene-character--tool-hover");
      });

      activitySceneCharacterName.textContent = resource.activityArray[activityArrayIndex - 1].characterName.toUpperCase();
      activityScenePlayerName.textContent = playerName.toUpperCase();

      if (resource.activityArray[activityArrayIndex - 1].state === "incomplete") {
        activitySceneTopic.textContent = resource.activityArray[activityArrayIndex - 1].topic;
      }

      activitySceneButtonStart.textContent = gameMode === "preview" ? "NEXT" : "START";

      if (gameMode === "preview") {
        typewriterDelay = 5;
        activityScenePlayerFrame.classList.add("state-display-none");
      }

      let activitySceneButtonTimer = dialogueText.length * typewriterDelay + 500;
      let activitySceneStartButtonTimer = activitySceneButtonText.length * typewriterDelay;

      if (resource.activityArray[activityArrayIndex - 1].state === "incomplete") {
        setTimeout(toggleClass, activitySceneButtonTimer + 1700, activitySceneTopic, "activity-scene-topic--hidden", "activity-scene-topic--visible");
      }

      setTimeout(toggleClass, activitySceneButtonTimer + 1700, activityScenePlayerFrame, "activity-scene-player-frame--hidden", "activity-scene-player-frame--visible");
      setTimeout(toggleClass, activitySceneButtonTimer + 1700, activityScenePlayer, "activity-scene-player--close", "activity-scene-player--open");
      setTimeout(toggleClass, activitySceneButtonTimer + 1700, activitySceneCharacter, null, "activity-scene-characater--blackout");
      setTimeout(toggleClass, activitySceneButtonTimer + 2000, activitySceneButton, "activity-scene-button--close", "activity-scene-button--open");
      setTimeout(toggleClass, activitySceneButtonTimer + 2000 + activitySceneStartButtonTimer, activitySceneButtonStart, "activity-scene-button-start--hidden", "activity-scene-button-start--visible");

      setTimeout(addText, 800, dialogueText, activityScenedialogue);
      setTimeout(addText, activitySceneButtonTimer + 700, activitySceneButtonText, activityScenePlayerText);

      function addText(text, element) {
        for (let i = 0; i < text.length; i++) {
          const characterSpan = document.createElement("span");
          characterSpan.innerText = text[i];
          characterSpan.style.opacity = 0;

          setTimeout(function revealCharacter() {
            setTimeout(() => {
              characterSpan.style.opacity = 1;
            }, i * typewriterDelay);
          }, 1000);

          element.appendChild(characterSpan);
        }
      }
    }
  }
}