/////////////////////////////////////////
// draw code inputs at bottom of activity
/////////////////////////////////////////

function drawCodeInput(activityArrayIndex) {
  if (resource.challengeArray) {
    if (resource.challengeArray[activityArrayIndex].info.type !== "code-box") {
      const codeInputLine = createElement(
        "div",
        [
          "code-input-line",
          "code-input-line--activity",
          "code-input-line--hidden",
          "code-input-line-" + activityArrayIndex
        ],
        activityModalCodeMachine
      );

      if (gameMode === "preview") {
        codeInputLine.classList.add("state-pointer-events-none");
      }

      if (resource.challengeArray[activityArrayIndex].info.state === "complete") {
        keyboard.style.pointerEvents = "none";
      } else {
        keyboard.style.pointerEvents = "auto";
        toggleClass(codeInputLine, "code-input-line--visible", "code-input-line--hidden");

        if (resource.challengeArray[activityArrayIndex].questions.info.type === "multiple-choice") {
          countCheckedRadiosByClass();
        }
      }

      for (let j = 0; j < resource.challengeArray[activityArrayIndex].questions.code.userArray.length; j++) {
        const codeInputContainer = createElement(
          "div",
          [
            "code-input-container",
            "code-input-container-" + activityArrayIndex + "-" + j,
            "code-input-container--incomplete"
          ],
          codeInputLine
        );

        createElement(
          "div",
          [
            "code-input-flash",
            "code-input-flash--hidden",
            "code-input-flash-" + activityArrayIndex + "-" + j
          ],
          codeInputContainer
        );

        const codeInputLabel = createElement(
          "p",
          ["code-input-label", "code-input-label-" + j],
          codeInputContainer
        );

        const codeInput = createElement(
          "input",
          [
            "code-input",
            "code-input-" + activityArrayIndex + "-" + j,
            "code-input--incomplete",
            "input-functionality-default"
          ],
          codeInputContainer
        );

        codeInputLabel.textContent = j + 1;
        codeInput.type = "text";
        codeInput.maxLength = 1;

        if (resource.challengeArray[activityArrayIndex].info.state === "complete") {
          setComplete(activityArrayIndex);
          bringInInputs();
        }

        setHardwareKeyboardFunctionality(codeInput, "code-input", "code-input-line--activity");
        syncUpdates(codeInput, "load");

        if (gameMode === "preview") {
          const codeString = resource.challengeArray[activityArrayIndex].questions.code.answer;
          const codeArray = codeString.split("");
          codeInput.value = codeArray[j];
        }
      }

      setSoftwareKeyboardFunctionality("code-input", "code-input-line--activity");
    }
  } else {
    if (resource.activityArray[activityArrayIndex - 1].type !== "code-box") {
      const codeInputLine = createElement(
        "div",
        [
          "code-input-line",
          "code-input-line--activity",
          "code-input-line--hidden",
          "code-input-line-" + (activityArrayIndex - 1)
        ],
        activityModalCodeMachine
      );

      if (gameMode === "preview") {
        codeInputLine.classList.add("state-pointer-events-none");
      }

      if (resource.activityArray[activityArrayIndex - 1].state === "complete") {
        keyboard.style.pointerEvents = "none";
      } else {
        keyboard.style.pointerEvents = "auto";
        toggleClass(codeInputLine, "code-input-line--visible", "code-input-line--hidden");

        if (resource.activityArray[activityArrayIndex - 1].content.multipleChoice) {
          countCheckedRadiosByClass();
        }
      }

      for (let j = 0; j < resource.activityArray[activityArrayIndex - 1].userCode.length; j++) {
        const codeInputContainer = createElement(
          "div",
          [
            "code-input-container",
            "code-input-container-" + (activityArrayIndex - 1) + "-" + j,
            "code-input-container--incomplete"
          ],
          codeInputLine
        );

        createElement(
          "div",
          [
            "code-input-flash",
            "code-input-flash--hidden",
            "code-input-flash-" + (activityArrayIndex - 1) + "-" + j
          ],
          codeInputContainer
        );

        const codeInputLabel = createElement(
          "p",
          ["code-input-label", "code-input-label-" + j],
          codeInputContainer
        );

        const codeInput = createElement(
          "input",
          [
            "code-input",
            "code-input-" + (activityArrayIndex - 1) + "-" + j,
            "code-input--incomplete",
            "input-functionality-default"
          ],
          codeInputContainer
        );

        codeInputLabel.textContent = j + 1;
        codeInput.type = "text";
        codeInput.maxLength = 1;

        if (resource.activityArray[activityArrayIndex - 1].state === "complete") {
          setComplete(activityArrayIndex);
          bringInInputs();
        }

        setHardwareKeyboardFunctionality(codeInput, "code-input", "code-input-line--activity");
        syncUpdates(codeInput, "load");

        if (gameMode === "preview") {
          const codeString = resource.activityArray[activityArrayIndex - 1].code;
          const codeArray = codeString.split("");
          codeInput.value = codeArray[j];
        }
      }

      setSoftwareKeyboardFunctionality("code-input", "code-input-line--activity");
    }
  }
}

/////////////////////////////////////////
// tool helpers for current activity state
/////////////////////////////////////////

function getCurrentActivityData() {
  if (typeof resource === "undefined" || !resource || !Array.isArray(resource.activityArray)) {
    return null;
  }

  if (typeof currentActivity === "undefined" || currentActivity === null || currentActivity === undefined) {
    return null;
  }

  return resource.activityArray[currentActivity - 1] || null;
}

function getActivityDataByIndex(i) {
  if (resource.challengeArray) {
    return resource.challengeArray[i] || null;
  }

  return resource.activityArray[i - 1] || null;
}

function getShopkeeperAssetForActivity(activity) {
  if (!activity || !activity.assets) {
    return "";
  }

  const activeTool = typeof getActiveTool === "function" ? getActiveTool() : null;

  if (activeTool === "magnifier" && activity.assets.magnifierCharacterShopkeeper) {
    return activity.assets.magnifierCharacterShopkeeper;
  }

  return activity.assets.characterShopkeeper || "";
}

function refreshCurrentActivityToolState() {
  const activity = getCurrentActivityData();
  if (!activity) return;

  const shopkeeperImageEl = document.querySelector(".img-character-shopkeeper");
  if (!shopkeeperImageEl) return;

  const assetName = getShopkeeperAssetForActivity(activity);
  if (!assetName) return;

  shopkeeperImageEl.src = `${resource.path}assets/activity/character/${assetName}`;

  shopkeeperImageEl.classList.remove("image-clue-target");
  delete shopkeeperImageEl.dataset.clue;

  if (
    activity.assets &&
    Array.isArray(activity.assets.imageClues)
  ) {
    activity.assets.imageClues.forEach(function(imageClue) {
      if (!imageClue || !imageClue.selector || !imageClue.clue) return;

      if (imageClue.selector === ".img-character-shopkeeper") {
        shopkeeperImageEl.classList.add("image-clue-target");
        shopkeeperImageEl.dataset.clue = imageClue.clue;
      }
    });
  }
}
function getActivityBackgroundAssetForActivity(activity) {
  if (!activity || !activity.assets) {
    return "";
  }

  return activity.assets.activityBackground || "";
}

function parseToolTags(text) {
  if (!text) return "";

  text = text.replace(/\*M\*\((.*?)\)/g, function(match, content) {
    return `<span data-tool-tag="mg-font" class="tool-target">${content}</span>`;
  });

  return text;
}

/////////////////////////////////////////
// clue tracker helpers
/////////////////////////////////////////
function getImageCluesForActivity(activity) {
  if (!activity || !activity.assets || !Array.isArray(activity.assets.imageClues)) {
    return [];
  }

  return activity.assets.imageClues
    .filter(function(item) {
      return item && typeof item.clue === "string" && item.clue.trim() !== "";
    })
    .map(function(item) {
      return item.clue.trim();
    });
}

function getAllCluesForActivity(activity) {
  if (!activity) return [];

  if (
    activity.assets &&
    Array.isArray(activity.assets.clueOrder) &&
    activity.assets.clueOrder.length
  ) {
    return activity.assets.clueOrder
      .filter(function(clue) {
        return typeof clue === "string" && clue.trim() !== "";
      })
      .map(function(clue) {
        return clue.trim();
      });
  }

  const cluePool = [];

  const textClues = getMagnifierCluesForActivity(activity);
  textClues.forEach(function(clue) {
    if (!cluePool.includes(clue)) {
      cluePool.push(clue);
    }
  });

  const imageClues = getImageCluesForActivity(activity);
  imageClues.forEach(function(clue) {
    if (!cluePool.includes(clue)) {
      cluePool.push(clue);
    }
  });

  return cluePool;
}

function bindImageCluesForActivity(activity) {
  if (!activity || !activity.assets || !Array.isArray(activity.assets.imageClues)) {
    return;
  }

  activity.assets.imageClues.forEach(function(imageClue) {
    if (!imageClue || !imageClue.selector || !imageClue.clue) return;

    const elements = document.querySelectorAll(imageClue.selector);

    elements.forEach(function(element) {
      element.classList.add("image-clue-target");
      element.dataset.clue = imageClue.clue;
    });
  });
}

function getConfiguredClueCount(activity) {
  if (!activity || !activity.assets || typeof activity.assets !== "object") {
    return null;
  }

  if (Number.isFinite(Number(activity.assets.numberOfClues))) {
    return Number(activity.assets.numberOfClues);
  }

  if (Number.isFinite(Number(activity.assets.numberofClues))) {
    return Number(activity.assets.numberofClues);
  }

  if (Number.isFinite(Number(activity.assets.clueCount))) {
    return Number(activity.assets.clueCount);
  }

  return null;
}

function getMagnifierCluesForActivity(activity) {
  if (!activity) return [];

  const clueMatches = [];

  function scanValue(value) {
    if (typeof value === "string") {
      const matches = value.match(/\*M\*\((.*?)\)/g);

      if (matches) {
        matches.forEach(function(match) {
          const cleaned = match.replace(/^\*M\*\(/, "").replace(/\)$/, "").trim();

          if (cleaned && !clueMatches.includes(cleaned)) {
            clueMatches.push(cleaned);
          }
        });
      }

      return;
    }

    if (Array.isArray(value)) {
      value.forEach(scanValue);
      return;
    }

    if (value && typeof value === "object") {
      Object.values(value).forEach(scanValue);
    }
  }

  scanValue(activity);
  return clueMatches;
}

function getTotalCluesForActivity(activity) {
  const configuredCount = getConfiguredClueCount(activity);

  if (configuredCount !== null) {
    return configuredCount;
  }

  return getMagnifierCluesForActivity(activity).length;
}

function initializeClueTrackerForActivity(i) {
  const activityData = getActivityDataByIndex(i);
  const activityCluePool = getAllCluesForActivity(activityData);

  if (typeof resetClueTracker === "function") {
    resetClueTracker(activityCluePool);
  }

  if (typeof updateClueTrackerVisibility === "function") {
    updateClueTrackerVisibility();
  }

  bindImageCluesForActivity(activityData);
}

/////////////////////////////////////////
// sync all code input updates
/////////////////////////////////////////

function syncUpdates(input, action) {
  const classes = input.className.split(" ");
  const ijClass = classes.find(className => className.startsWith("code-input-"));
  const ijArr = ijClass.split("-").slice(2).map(Number);

  if (resource.challengeArray) {
    if (action === "change") {
      resource.challengeArray[ijArr[0]].questions.code.userArray[ijArr[1]] = input.value.toUpperCase();
    }

    const selector = `.code-input-${ijArr[0]}-${ijArr[1]}`;
    const allCodeInputFields = document.querySelectorAll(selector);

    allCodeInputFields.forEach(field => {
      field.value = resource.challengeArray[ijArr[0]].questions.code.userArray[ijArr[1]].toUpperCase();
    });
  } else {
    if (action === "change") {
      resource.activityArray[ijArr[0]].userCode[ijArr[1]] = input.value.toUpperCase();
    }

    const selector = `.code-input-${ijArr[0]}-${ijArr[1]}`;
    const allCodeInputFields = document.querySelectorAll(selector);

    allCodeInputFields.forEach(field => {
      field.value = resource.activityArray[ijArr[0]].userCode[ijArr[1]].toUpperCase();
    });
  }

  setComplete(activityArrayIndex);
}

////////////////////////////
// set the state to complete
////////////////////////////

function setComplete(activityArrayIndex) {
  if (resource.challengeArray) {
    let numInputsFilled = resource.challengeArray[activityArrayIndex].questions.code.userArray.filter(value => value !== "").length;
    let answerArray = resource.challengeArray[activityArrayIndex].questions.code.answer.split("");
    let userArray = resource.challengeArray[activityArrayIndex].questions.code.userArray;

    if (
      resource.challengeArray[activityArrayIndex].questions.code.answer !== userArray.join("").toUpperCase() &&
      numInputsFilled === resource.challengeArray[activityArrayIndex].questions.code.answer.length
    ) {
      findNonIdenticalIndices(answerArray, userArray);
    }

    function findNonIdenticalIndices(arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          let wrongInputs = document.getElementsByClassName("code-input-" + activityArrayIndex + "-" + i);
          let codeInputFlashes = document.getElementsByClassName("code-input-flash-" + activityArrayIndex + "-" + i);
          let codeInputContainers = document.querySelectorAll(".code-input-container-" + activityArrayIndex + "-" + i);

          codeInputContainers.forEach((codeInputContainer) => {
            codeInputContainer.classList.add("code-input--wrong");
            codeInputContainer.addEventListener("animationend", removeWrongShake);

            function removeWrongShake() {
              codeInputContainer.classList.remove("code-input--wrong");
            }
          });

          for (let j = 0; j < wrongInputs.length; j++) {
            if (codeInputFlashes[j]) {
              toggleClass(codeInputFlashes[j], "code-input-flash--hidden", "code-input-flash--visible");
              codeInputFlashes[j].addEventListener("animationend", removeWrongInputs);
              setTimeout(clearInput, 600);

              function clearInput() {
                wrongInputs[j].value = "";
                wrongInputs[j].blur();
                syncUpdates(wrongInputs[j], "change");
              }

              function removeWrongInputs() {
                toggleClass(codeInputFlashes[j], "code-input-flash--visible", "code-input-flash--hidden");
              }
            }
          }
        }
      }
    }

    if (
      resource.challengeArray[activityArrayIndex].questions.code.answer ===
      resource.challengeArray[activityArrayIndex].questions.code.userArray.join("").toUpperCase()
    ) {
      if (resource.challengeArray[activityArrayIndex].info.state !== "complete") {
        debriefStats.activitiesCompleted = debriefStats.activitiesCompleted + 1;
      }

      resource.challengeArray[activityArrayIndex].info.state = "complete";
      keyboard.style.pointerEvents = "none";

      let completionDelay = (resource.challengeArray[activityArrayIndex].questions.code.answer.length) * 50 + 50;

      setTimeout(toggleClass, completionDelay, activityButtonDone, "activity-button-done--close", "activity-button-done--open");

      activityButtonDone.addEventListener("click", function () {
        setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--visible", "activity-modal-content-container-toggle--hidden");
        setTimeout(closeActivityModal, 50);
        clearActivity();
      });

      toggleClass(activityButtonHint, "activity-button-hint--visible", "activity-button-hint--hidden");

      for (let k = 0; k < resource.challengeArray[activityArrayIndex].questions.code.answer.length; k++) {
        let codeInputs = document.querySelectorAll(".code-input-" + activityArrayIndex + "-" + k);
        let codeInputLabels = document.querySelectorAll(".code-input-label-" + k);
        let codeInputContainers = document.querySelectorAll(".code-input-container-" + activityArrayIndex + "-" + k);

        codeInputContainers.forEach((codeInputContainer) => {
          setTimeout(makeComplete, k * 50, codeInputContainer, "code-input-container--incomplete", "code-input-container--complete");
        });

        codeInputs.forEach((codeInput) => {
          codeInput.blur();
          setTimeout(makeComplete, k * 50, codeInput, "code-input--incomplete", "code-input--complete");
        });

        codeInputLabels.forEach((codeInputLabel) => {
          if (codeInputLabel) {
            codeInputLabel.style.color = "rgba(var(--off-white), 1)";
            codeInputLabel.innerHTML = "&#x2713";
          }
        });
      }

      function makeComplete(arg1, arg2, arg3) {
        toggleClass(arg1, arg2, arg3);

        let allComplete = true;
        for (let i = 0; i < resource.challengeArray.length - 1; i++) {
          if (resource.challengeArray[i].info.state !== "complete") {
            allComplete = false;
            break;
          }
        }

        if (allComplete) {
          let codeBoxButton = document.querySelector(".code-box-button");
          toggleClass(codeBoxButton, "code-box-button--hidden", "code-box-button--visible");

          let codeNode = document.querySelector("#activity-node-" + resource.challengeArray.length);
          toggleClass(codeNode, "activity-node--disabled", "activity-node--enabled");
        }
      }

      resource.challengeArray.forEach((activity, i) => {
        let activityNode = document.querySelector("#activity-node-" + (i + 1));
        setTimeout(updateActivityState, 300, activityNode, activity.info.state);
      });
    }
  } else {
    let numInputsFilled = resource.activityArray[activityArrayIndex - 1].userCode.filter(value => value !== "").length;
    let answerArray = resource.activityArray[activityArrayIndex - 1].code.split("");
    let userArray = resource.activityArray[activityArrayIndex - 1].userCode;

    if (
      resource.activityArray[activityArrayIndex - 1].code !== userArray.join("").toUpperCase() &&
      numInputsFilled === resource.activityArray[activityArrayIndex - 1].code.length
    ) {
      findNonIdenticalIndices(answerArray, userArray);
    }

    function findNonIdenticalIndices(arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          let wrongInputs = document.getElementsByClassName("code-input-" + (activityArrayIndex - 1) + "-" + i);
          let codeInputFlashes = document.getElementsByClassName("code-input-flash-" + (activityArrayIndex - 1) + "-" + i);
          let codeInputContainers = document.querySelectorAll(".code-input-container-" + (activityArrayIndex - 1) + "-" + i);

          codeInputContainers.forEach((codeInputContainer) => {
            codeInputContainer.classList.add("code-input--wrong");
            codeInputContainer.addEventListener("animationend", removeWrongShake);

            function removeWrongShake() {
              codeInputContainer.classList.remove("code-input--wrong");
            }
          });

          for (let j = 0; j < wrongInputs.length; j++) {
            if (codeInputFlashes[j]) {
              toggleClass(codeInputFlashes[j], "code-input-flash--hidden", "code-input-flash--visible");
              codeInputFlashes[j].addEventListener("animationend", removeWrongInputs);
              setTimeout(clearInput, 600);

              function clearInput() {
                wrongInputs[j].value = "";
                wrongInputs[j].blur();
                syncUpdates(wrongInputs[j], "change");
              }

              function removeWrongInputs() {
                toggleClass(codeInputFlashes[j], "code-input-flash--visible", "code-input-flash--hidden");
              }
            }
          }
        }
      }
    }

    if (
      resource.activityArray[activityArrayIndex - 1].code ===
      resource.activityArray[activityArrayIndex - 1].userCode.join("").toUpperCase()
    ) {
      if (resource.activityArray[activityArrayIndex - 1].state !== "complete") {
        debriefStats.activitiesCompleted = debriefStats.activitiesCompleted + 1;
      }

      resource.activityArray[activityArrayIndex - 1].state = "complete";
      keyboard.style.pointerEvents = "none";

      let completionDelay = (resource.activityArray[activityArrayIndex - 1].code.length) * 50 + 50;

      setTimeout(toggleClass, completionDelay, activityButtonDone, "activity-button-done--close", "activity-button-done--open");

      activityButtonDone.addEventListener("click", function () {
        setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--visible", "activity-modal-content-container-toggle--hidden");
        setTimeout(closeActivityModal, 50);
        clearActivity();
      });

      toggleClass(activityButtonHint, "activity-button-hint--visible", "activity-button-hint--hidden");

      for (let k = 0; k < resource.activityArray[activityArrayIndex - 1].code.length; k++) {
        let codeInputs = document.querySelectorAll(".code-input-" + (activityArrayIndex - 1) + "-" + k);
        let codeInputLabels = document.querySelectorAll(".code-input-label-" + k);
        let codeInputContainers = document.querySelectorAll(".code-input-container-" + (activityArrayIndex - 1) + "-" + k);

        codeInputContainers.forEach((codeInputContainer) => {
          setTimeout(makeComplete, k * 50, codeInputContainer, "code-input-container--incomplete", "code-input-container--complete");
        });

        codeInputs.forEach((codeInput) => {
          codeInput.blur();
          setTimeout(makeComplete, k * 50, codeInput, "code-input--incomplete", "code-input--complete");
        });

        codeInputLabels.forEach((codeInputLabel) => {
          if (codeInputLabel) {
            codeInputLabel.style.color = "rgba(var(--off-white), 1)";
            codeInputLabel.innerHTML = "&#x2713";
          }
        });
      }

      function makeComplete(arg1, arg2, arg3) {
        toggleClass(arg1, arg2, arg3);

        let allComplete = true;
        for (let i = 0; i < resource.activityArray.length - 1; i++) {
          if (resource.activityArray[i].state !== "complete") {
            allComplete = false;
            break;
          }
        }

        if (allComplete) {
          let codeBoxButton = document.querySelector(".code-box-button");
          toggleClass(codeBoxButton, "code-box-button--hidden", "code-box-button--visible");

          let codeNode = document.querySelector("#activity-node-" + resource.activityArray.length);
          toggleClass(codeNode, "activity-node--disabled", "activity-node--enabled");
        }
      }

      resource.activityArray.forEach((activity, i) => {
        let activityNode = document.querySelector("#activity-node-" + (i + 1));
        setTimeout(updateActivityState, 300, activityNode, activity.state);
      });
    }
  }
}

/////////////////
// activity modal
/////////////////

buttonCloseModal.addEventListener("click", function () {
  toggleClass(activityModalWrapper, "overflow-y-hidden", "overflow-y-scroll");
  setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--visible", "activity-modal-content-container-toggle--hidden");
  setTimeout(closeActivityModal, 50);
  setTimeout(clearActivity, 300);
});

activityButtonHint.addEventListener("click", () => {
  openHintModal("incrementHintCount");
});

activityModalHintButton.addEventListener("click", () => {
  openHintModal();
});

function scrollToBottom() {
  activityModalWrapper.scrollTo({ top: activityModalWrapper.scrollHeight, behavior: "smooth" });
}

function scrollItUp() {
  activityModalWrapper.scrollTo({ top: 0, behavior: "smooth" });
}

activityModalContentContainerToggle.addEventListener("click", scrollToBottom);
scrollUp.addEventListener("click", scrollItUp);

function openHintModal(parameter) {
  if (resource.challengeArray) {
    if (resource.challengeArray[activityArrayIndex].info.hint.isUsed === false && parameter === "incrementHintCount") {
      resource.challengeArray[activityArrayIndex].info.hint.isUsed = true;
      debriefStats.hintsUsed = debriefStats.hintsUsed + 1;
    }
  } else {
    if (resource.activityArray[activityArrayIndex - 1].isHintUsed === false && parameter === "incrementHintCount") {
      resource.activityArray[activityArrayIndex - 1].isHintUsed = true;
      debriefStats.hintsUsed = debriefStats.hintsUsed + 1;
    }
  }

  if (openState.hint === false) {
    toggleClass(activityModalHint, "activity-modal-hint--hidden", "activity-modal-hint--visible");
    openState.hint = true;
  } else {
    toggleClass(activityModalHint, "activity-modal-hint--visible", "activity-modal-hint--hidden");
    openState.hint = false;
  }
}

function openActivityModal(i) {
  if (resource.challengeArray) {
    if (resource.challengeArray[i].info.type === "code-box") {
      return false;
    }

    let nodes = document.querySelectorAll('.activity-node:not([id^="activity-node-' + (i + 1) + '"])');

    nodes.forEach(function (node) {
      toggleClass(node, "activity-node--not-clicked", "activity-node--clicked");
      node.classList.remove("activity-node--visible");
    });

    setTimeout(bringNodesBack, 1000);

    function bringNodesBack() {
      nodes.forEach(function (node) {
        toggleClass(node, "activity-node--clicked", "activity-node--not-clicked");
      });
    }

    toggleClass(activity, "state-display-none", "state-display-block");
    setTimeout(toggleClass, 600, activityModal, "activity-modal--close", "activity-modal--open");
    setTimeout(addTopBackgroundImage, 2000);

    function addTopBackgroundImage() {
      if (resource.challengeArray[activityArrayIndex].activity.info.asset.scope === "global") {
        activityModalContentContainerTop.style.backgroundImage =
          "url(assets/activity/columnSort/" + resource.challengeArray[activityArrayIndex].activity.info.asset.path + ")";
      } else if (resource.challengeArray[activityArrayIndex].activity.info.asset.scope === "local") {
        activityModalContentContainerTop.style.backgroundImage =
          "url(resource/" + resourceTheme + "/assets/activity/local/" + resource.challengeArray[activityArrayIndex].activity.info.asset.path + ")";
      } else {
        activityModalContentContainerTop.style.backgroundImage =
          "url(resource/" + resourceTheme + "/assets/activity/background/" + resource.challengeArray[activityArrayIndex].activity.info.asset + ")";
      }
    }

    if (settings.hints === "No" || resource.challengeArray[i].info.state === "complete") {
      toggleClass(activityButtonHint, "activity-button-hint--visible", "activity-button-hint--hidden");
    } else {
      toggleClass(activityButtonHint, "activity-button-hint--hidden", "activity-button-hint--visible");
    }
  } else {
    if (resource.activityArray[i].type === "code-box") {
      return false;
    }

    let nodes = document.querySelectorAll('.activity-node:not([id^="activity-node-' + (i + 1) + '"])');

    nodes.forEach(function (node) {
      toggleClass(node, "activity-node--not-clicked", "activity-node--clicked");
      node.classList.remove("activity-node--visible");
    });

    setTimeout(bringNodesBack, 1000);

    function bringNodesBack() {
      nodes.forEach(function (node) {
        toggleClass(node, "activity-node--clicked", "activity-node--not-clicked");
      });
    }

    toggleClass(activity, "state-display-none", "state-display-block");
    setTimeout(toggleClass, 600, activityModal, "activity-modal--close", "activity-modal--open");
    setTimeout(addTopBackgroundImage, 2000);

    function addTopBackgroundImage() {
      const activityData = resource.activityArray[activityArrayIndex - 1];
      const backgroundAsset = getActivityBackgroundAssetForActivity(activityData);

      activityModalContentContainerTop.style.backgroundImage =
        "url(resource/" + resourceTheme + "/assets/activity/background/" + backgroundAsset + ")";
    }

    if (settings.hints === "No" || resource.activityArray[i].state === "complete") {
      toggleClass(activityButtonHint, "activity-button-hint--visible", "activity-button-hint--hidden");
    } else {
      toggleClass(activityButtonHint, "activity-button-hint--hidden", "activity-button-hint--visible");
    }
  }
}

function closeActivityModal() {
  if (openState.hint === true) {
    setTimeout(openHintModal, 300);
  }

  setTimeout(scrollToTop, 300, activityModalWrapper);
  toggleClass(activityModal, "activity-modal--open", "activity-modal--close");
  setTimeout(toggleClass, 300, activity, "state-display-block", "state-display-none");
  setTimeout(removeTopBackgroundImage, 2000);

  function removeTopBackgroundImage() {
    activityModalContentContainerTop.style.backgroundImage = "none";
  }

  toggleClass(activityButtonDone, "activity-button-done--open", "activity-button-done--close");
  toggleClass(activityModalContentContainer, "activity-modal-content-container--right", "activity-modal-content-container--left");
  toggleClass(activityModalContentContainerToggle, "activity-modal-content-container-toggle--bottom", "activity-modal-content-container-toggle--top");
}

function initializeClueTrackerForActivity(i) {
  const activityData = getActivityDataByIndex(i);
  const activityCluePool = getAllCluesForActivity(activityData);

  if (typeof resetClueTracker === "function") {
    resetClueTracker(i, activityCluePool);
  }

  if (typeof updateClueTrackerVisibility === "function") {
    updateClueTrackerVisibility();
  }

  bindImageCluesForActivity(activityData);
}

function drawActivity(i) {
  const activityData = getActivityDataByIndex(i);

  if (!activityData) {
    return;
  }

  if (resource.challengeArray) {
    if (activityData.info.type !== "code-box") {
      let hint = activityData.info.hint.text;
      let highlightedHint = hint.replace(/\[(.*?)\]/g, '<span class="hint-text--highlight">$1</span>');
      activityModalHintText.innerHTML = highlightedHint;
    }
  } else {
    if (activityData.type !== "code-box") {
      let hint = activityData.hint || "";
      let highlightedHint = hint.replace(/\[(.*?)\]/g, '<span class="hint-text--highlight">$1</span>');
      activityModalHintText.innerHTML = highlightedHint;

      let activityType = activityData.type;

      switch (activityType) {
        case "cryptogram":
          if (typeof drawActivity_cryptogram === "function") {
            drawActivity_cryptogram(i);
          }
          break;

        case "passage":
          if (typeof drawActivity_passage === "function") {
            drawActivity_passage(i);
          }
          break;

        case "poem":
          if (typeof drawActivity_poem === "function") {
            drawActivity_poem(i);
          }
          break;

        case "story":
          if (typeof drawActivity_story === "function") {
            drawActivity_story(i);
          }
          break;

        case "puzzle":
          if (typeof drawActivity_puzzle === "function") {
            drawActivity_puzzle(i);
          }
          break;

        case "crossword":
          if (typeof drawActivity_crossword === "function") {
            drawActivity_crossword(i);
          }
          break;

        case "decoder":
          if (typeof drawActivity_decoder === "function") {
            drawActivity_decoder(i);
          }
          break;

        case "multiple-choice":
          if (typeof drawActivity_multipleChoice === "function") {
            drawActivity_multipleChoice(i);
          }
          break;

        default:
          break;
      }
    }
  }

  refreshCurrentActivityToolState();
  initializeClueTrackerForActivity(i);

  
}function clearActivity() {
  const activityModal = document.querySelector(".activity-modal");

  const childrenToRemove = activityModal.querySelectorAll(
    ":not(.scroll-up):not(.activity-modal-hint-button):not(.activity-modal-hint-container):not(.activity-modal-hint-wrapper):not(.machine-column):not(.machine-column-right):not(.machine-column-left):not(.machine-container):not(.activity-modal-screen):not(.activity-modal-code-machine):not(.activity-modal-wrapper):not(.activity-modal-content-container):not(.activity-modal-content-container-top):not(.activity-modal-content-container-bottom):not(.activity-modal-content-container-toggle):not(.button-close-modal):not(.activity-button-done):not(.activity-button-hint):not(.activity-modal-hint):not(.activity-modal-hint-text):not(.keyboard):not(.keyboard-row):not(.keyboard-button)"
  );

  childrenToRemove.forEach(child => child.remove());
}