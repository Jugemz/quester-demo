function createCodeBox(){

  // create and append codeNodeInputContainer
  const codeNode = document.querySelector("#activity-node-" + resource.activityArray.length);
  const codeNodeInputContainer = document.createElement("div");
  codeNodeInputContainer.classList.add("code-node-input-container");
  codeNode.insertBefore(codeNodeInputContainer, codeNode.firstChild);

  const codeBoxButton = createElement("button", ["code-box-button", "code-box-button--hidden"], codeNode);
  
  // end game
  codeBoxButton.addEventListener("click", function() {

    console.log(canRefresh);

    toggleClass(codeBoxButton, "code-box-button--visible", "code-box-button--hidden");

    // lock in time
    debriefStats.timeRemaining = time;
    clearInterval(gameTimer);

    // hide the timer
    toggleClass(footerElementTimer,"footer-element-timer--visible","footer-element-timer--hidden");

    // clear the container for good measure
    clearSplashContainer();

      // remove nodes
      const activityNodes = document.querySelectorAll(".activity-node");
      setTimeout(removeNodes,500);
      function removeNodes(){
        for (let index = 0; index < activityNodes.length; index++) {
          const node = activityNodes[index];
          setTimeout(() => {
            // Apply the new class to the current node
            toggleClass(node, 'activity-node--visible', 'activity-node--hidden');
            node.classList.add("activity-node--gameEnd");
          }, 200 * index); // Delay the execution based on the index
        }
        activityNodeContainer.classList.add('state-pointer-events-none');
      }
      
      // toggle splash screen
      toggleClass(splash,'state-display-none','state-display-block');
      setTimeout(toggleClass,((activityNodes.length * 200) + 200),splash,'splash--hidden','splash--visible');

      // toggle cutscene
      setTimeout(addCutscene,((activityNodes.length * 200) + 800),cutsceneOutroIndex,'outro',5000);
  });

  for (let i = 0; i < resource.activityArray.length-1; i++) {
    const codeNodeInputLine = createElement("div", ["code-input-line", "code-input-line-" + i, "code-node-input-line", "code-node-input-line-" + i], codeNodeInputContainer);
    /* const codeNodeInputLineNumber = createElement("p", ["code-input-line-number", "code-node-input-line-number"], codeNodeInputLine);
    codeNodeInputLineNumber.textContent = (i + 1 + ".").toString(); */
    for (let j = 0; j < resource.activityArray[i].userCode.length; j++) {
      const codeNodeInput = createElement("input", ["code-input", "code-input-" + i + "-" + j, "code-node-input", "code-node-input-" + (j + 1)], codeNodeInputLine);
      codeNodeInput.type = "text";
      codeNodeInput.readOnly = true;
    }
  }
}

function drawActivity_codeBox(){

    // make container unscrollable
    toggleClass(activityModalWrapper,"overflow-y-scroll","overflow-y-hidden");
    toggleClass(activityModalContentContainerToggle, "activity-modal-content-container-toggle--visible", "activity-modal-content-container-toggle--hidden");

   // create and append codeInputContainer
   const codeInputContainer = createElement("div", ["code-box-input-container"], activityModal);
   
 
   // create and append codeInputLine elements
   for (let i = 0; i < resource.activityArray.length-1; i++) {
      const codeInputLine = createElement("div", ["code-input-line", `code-input-line-${i}`, "code-box-activity-line"], codeInputContainer);

       // create and append codeInputLineNumber elements
       const codeInputLineNumber = createElement("p", ["code-input-line-number"], codeInputLine);
       /* codeInputLineNumber.textContent = resource.activityArray[i].title; */
 
       // create append codeInput elements to each line
       for (let j = 0; j < resource.activityArray[i].code.length; j++) {
          const codeInput = createElement("input", ["code-input", `code-input-${i}-${j}`, "code-box-input"], codeInputLine);
          codeInput.type = "text";
          codeInput.maxLength = 1;
          if (resource.activityArray[i].state === "complete"){
            toggleClass(codeInput, "code-input--incomplete", "code-input--complete");
          }
          syncUpdates(codeInput,"load");
       }
   }

}

