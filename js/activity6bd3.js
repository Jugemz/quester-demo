/////////////////////////////////////////
// draw code inputs at bottom of activity
/////////////////////////////////////////

function drawCodeInput(activityArrayIndex){
  if (resource.activityArray[activityArrayIndex-1].type !== "code-box") {

    // create and append codeInput elements
    const codeInputLine = createElement("div", ["code-input-line","code-input-line--activity","code-input-line--hidden","code-input-line-" + (activityArrayIndex-1)], activityModalCodeMachine);
    if (resource.activityArray[activityArrayIndex-1].state === "complete"){
      keyboard.style.pointerEvents = "none";
    }
    else {
      keyboard.style.pointerEvents = "auto";
      toggleClass(codeInputLine,"code-input-line--visible","code-input-line--hidden");
      if (resource.activityArray[activityArrayIndex-1].content.multipleChoice){
        countCheckedRadiosByClass();
      }
    }
    for (let j = 0; j < resource.activityArray[activityArrayIndex-1].userCode.length; j++) {
        const codeInputContainer = createElement("div",["code-input-container", "code-input-container-" + + (activityArrayIndex-1) + "-" + j, "code-input-container--incomplete"],codeInputLine);
        const codeInputFlash = createElement("div",["code-input-flash", "code-input-flash--hidden", "code-input-flash-" + + (activityArrayIndex-1) + "-" + j],codeInputContainer);
        const codeInputLabel = createElement("p",["code-input-label", "code-input-label-" + j],codeInputContainer);
        const codeInput = createElement("input", ["code-input", "code-input-" + (activityArrayIndex-1) + "-" + j, "code-input--incomplete", "input-functionality-default"], codeInputContainer);
        codeInputLabel.textContent = j + 1;
        codeInput.type = "text";
        codeInput.maxLength = 1;
        
        if (resource.activityArray[activityArrayIndex-1].state === "complete"){
          setComplete(activityArrayIndex);
          bringInInputs();
        }

      // set hardware keyboard functionality
      setHardwareKeyboardFunctionality(codeInput,"code-input","code-input-line--activity"); 

      // sync updates
      syncUpdates(codeInput, "load", activityArrayIndex);

    } 
    
    // set software keyboard functionality
    setSoftwareKeyboardFunctionality("code-input","code-input-line--activity"); 

  } 

}

//////////////////////////////
// sync all code input updates
//////////////////////////////

function syncUpdates(input, action){
  
  const classes = input.className.split(" ");
  const ijClass = classes.find(className => className.startsWith("code-input-"));
  const ijArr = ijClass.split("-").slice(2).map(Number);

  // save to array
  if (action === "change"){
    resource.activityArray[ijArr[0]].userCode[ijArr[1]] = input.value.toUpperCase();
  }

  // update inputs
    const selector = `.code-input-${ijArr[0]}-${ijArr[1]}`;
    const allCodeInputFields = document.querySelectorAll(selector);
    allCodeInputFields.forEach(field => {
      field.value = resource.activityArray[ijArr[0]].userCode[ijArr[1]].toUpperCase();
    });  
  

  setComplete(activityArrayIndex);
}

////////////////////////////
// set the state to complete
////////////////////////////

function setComplete(activityArrayIndex){

  // if user input does not match the code
  let numInputsFilled = resource.activityArray[activityArrayIndex-1].userCode.filter(value => value !== "").length;
  let answerArray = resource.activityArray[activityArrayIndex-1].code.split("");
  let userArray = resource.activityArray[activityArrayIndex-1].userCode;
  if (resource.activityArray[activityArrayIndex-1].code !== userArray.join('').toUpperCase() && numInputsFilled == resource.activityArray[activityArrayIndex-1].code.length) {
    findNonIdenticalIndices(answerArray,userArray);
  }

  function findNonIdenticalIndices(arr1, arr2) {
  
    // Assuming both arrays have the same length for direct comparison
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        let wrongInputs = document.getElementsByClassName("code-input-" + (activityArrayIndex-1) + "-" + i);
        let codeInputFlashes = document.getElementsByClassName("code-input-flash-" + (activityArrayIndex-1) + "-" + i);
        let codeInputContainers = document.querySelectorAll(".code-input-container-" + (activityArrayIndex - 1) + "-" + i);

        codeInputContainers.forEach((codeInputContainer) => {
          codeInputContainer.classList.add("code-input--wrong");
          codeInputContainer.addEventListener('animationend', removeWrongShake);
          function removeWrongShake(){
            codeInputContainer.classList.remove("code-input--wrong");
          }
        });

        for (let j = 0; j < wrongInputs.length; j++) {
          if (codeInputFlashes[j]){
            toggleClass(codeInputFlashes[j],"code-input-flash--hidden","code-input-flash--visible");
            codeInputFlashes[j].addEventListener('animationend', removeWrongInputs);
            setTimeout(clearInput,600);
            function clearInput(){
              wrongInputs[j].value = "";
              wrongInputs[j].blur();
              syncUpdates(wrongInputs[j], "change", activityArrayIndex);
            }
          }
          function removeWrongInputs() {
            toggleClass(codeInputFlashes[j],"code-input-flash--visible","code-input-flash--hidden");
          }
        }
      }
    }
  }
  
  
  // if the correct code matches the user's code input
  if (resource.activityArray[activityArrayIndex-1].code === resource.activityArray[activityArrayIndex-1].userCode.join('').toUpperCase()) {
    // set state
    if (resource.activityArray[activityArrayIndex-1].state !== "complete"){
      debriefStats.activitiesCompleted = debriefStats.activitiesCompleted + 1;    
    }
    resource.activityArray[activityArrayIndex-1].state = "complete";  

    keyboard.style.pointerEvents = "none";

    // set button
    let completionDelay = (resource.activityArray[activityArrayIndex - 1].code.length) * 50 + 50;
    setTimeout(toggleClass,completionDelay,activityButtonDone, "activity-button-done--close","activity-button-done--open");
    activityButtonDone.addEventListener("click", function() {
      setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--visible", "activity-modal-content-container-toggle--hidden");     
      setTimeout(closeActivityModal,50);
      clearActivity();
    });

    // remove hint
    toggleClass(activityButtonHint,"activity-button-hint--visible","activity-button-hint--hidden");

    // set code inputs
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
          codeInputLabel.innerHTML = '&#x2713';
        }
      });
    } 
    
    // set complete state
    function makeComplete(arg1, arg2, arg3){ 
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

    // set node
    resource.activityArray.forEach((activity, i) => {
      let activityNode = document.querySelector("#activity-node-" + (i+1));
      setTimeout(updateActivityState, 300, activityNode, activity.state);
    });
    
  }
}

/////////////////
// activity modal
/////////////////

// event listeners
buttonCloseModal.addEventListener("click", function() {
  toggleClass(activityModalWrapper,"overflow-y-hidden","overflow-y-scroll");
  setTimeout(toggleClass, 500, activityModalContentContainerToggle, "activity-modal-content-container-toggle--visible", "activity-modal-content-container-toggle--hidden");
  setTimeout(closeActivityModal,50);
  setTimeout(clearActivity,300);
});
activityButtonHint.addEventListener('click', (event) => {
  openHintModal("incrementHintCount");
});
activityModalHintButton.addEventListener('click', (event) => {
  openHintModal();
});

// toggle
function scrollToBottom() {
  activityModalWrapper.scrollTo({ top: activityModalWrapper.scrollHeight, behavior: 'smooth' });
}
function scrollItUp() {
  activityModalWrapper.scrollTo({ top: 0, behavior: 'smooth' });
}

/*
function scrollToTop() {
  const scrollDuration = 400; // Adjust this value to control the scroll speed (in milliseconds)
  const scrollStep = -activityModalWrapper.scrollTop / (scrollDuration / 15);
  
  function scrollAnimation(timestamp) {
    const newScrollTop = activityModalWrapper.scrollTop + scrollStep;
    activityModalWrapper.scrollTop = newScrollTop;
    
    if (activityModalWrapper.scrollTop > 0) {
      requestAnimationFrame(scrollAnimation);
    }
  }
  
  requestAnimationFrame(scrollAnimation);
}
*/

activityModalContentContainerToggle.addEventListener('click', scrollToBottom);
scrollUp.addEventListener('click', scrollItUp);

// open and close hint modal
function openHintModal(parameter){
  if (resource.activityArray[activityArrayIndex-1].isHintUsed == false && parameter == "incrementHintCount"){
    resource.activityArray[activityArrayIndex-1].isHintUsed = true;
    debriefStats.hintsUsed = debriefStats.hintsUsed + 1;
  }

  if (openState.hint === false){
    toggleClass(activityModalHint, 'activity-modal-hint--hidden', 'activity-modal-hint--visible');
    openState.hint = true;
  } else if (openState.hint === true){
    toggleClass(activityModalHint, 'activity-modal-hint--visible', 'activity-modal-hint--hidden');
    openState.hint = false;
  } 
}

// open and close activity modal
function openActivityModal(i) {
    if (resource.activityArray[i].type === "code-box"){
      return false;
    }
    else {
      let nodes = document.querySelectorAll('.activity-node:not([id^="activity-node-' + (i + 1) + '"])');
      nodes.forEach(function(node) {
        // Apply the desired class to each node
        toggleClass(node,"activity-node--not-clicked","activity-node--clicked");
        node.classList.remove("activity-node--visible");
      });
      setTimeout(bringNodesBack,1000);
      function bringNodesBack(){
        nodes.forEach(function(node) {
          // Apply the desired class to each node
          toggleClass(node,"activity-node--clicked","activity-node--not-clicked");
        });
      }
      toggleClass(activity, "state-display-none", "state-display-block");
      setTimeout(toggleClass, 600, activityModal, "activity-modal--close", "activity-modal--open");
      setTimeout(addTopBackgroundImage,2000);
      function addTopBackgroundImage(){
        activityModalContentContainerTop.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/background/" + resource.activityArray[activityArrayIndex-1].assets.activityBackground + ")";
      }
      /* setTimeout(toggleClass, 150, activityBlackout, "activity-blackout--close", "activity-blackout--open"); */
      if (settings.hints === "No" || resource.activityArray[i].state === "complete"){
        toggleClass(activityButtonHint, 'activity-button-hint--visible', 'activity-button-hint--hidden');
      }
      else { 
        toggleClass(activityButtonHint,"activity-button-hint--hidden","activity-button-hint--visible");
      }
    }
}
function closeActivityModal(){
  if (openState.hint === true){
    setTimeout(openHintModal,300);
  }
  setTimeout(scrollToTop,300,activityModalWrapper);
  toggleClass(activityModal, "activity-modal--open", "activity-modal--close");
  /* toggleClass(activityBlackout, "activity-blackout--open", "activity-blackout--close"); */
  setTimeout(toggleClass, 300, activity, "state-display-block", "state-display-none");
  setTimeout(removeTopBackgroundImage,2000);
  function removeTopBackgroundImage(){
    activityModalContentContainerTop.style.backgroundImage = "none";
  }
  toggleClass(activityButtonDone, "activity-button-done--open","activity-button-done--close");
  toggleClass(activityModalContentContainer, 'activity-modal-content-container--right', 'activity-modal-content-container--left');
  toggleClass(activityModalContentContainerToggle, 'activity-modal-content-container-toggle--bottom', 'activity-modal-content-container-toggle--top');
}

// draw activity
function drawActivity(i){
  if (resource.activityArray[i-1].type !== "code-box") {
    let hint = resource.activityArray[i-1].hint;
    let highlightedHint = hint.replace(/\[(.*?)\]/g, '<span class="hint-text--highlight">$1</span>');
    activityModalHintText.innerHTML = highlightedHint;
    let activityType = resource.activityArray[i-1].type; 
    switch (activityType) {
      case "cryptogram":
          drawActivity_cryptogram(i);
          break;
  }
  }
}

// clear activity
function clearActivity(){
  const activityModal = document.querySelector(".activity-modal");
  const childrenToRemove = activityModal.querySelectorAll(":not(.scroll-up):not(.activity-modal-hint-button):not(.activity-modal-hint-container):not(.activity-modal-hint-wrapper):not(.machine-column):not(.machine-column-right):not(.machine-column-left):not(.machine-container):not(.activity-modal-screen):not(.activity-modal-code-machine):not(.activity-modal-wrapper):not(.activity-modal-content-container):not(.activity-modal-content-container-top):not(.activity-modal-content-container-bottom):not(.activity-modal-content-container-toggle):not(.button-close-modal):not(.activity-button-done):not(.activity-button-hint):not(.activity-modal-hint):not(.activity-modal-hint-text):not(.keyboard):not(.keyboard-row):not(.keyboard-button)");
  childrenToRemove.forEach(child => child.remove());
}

