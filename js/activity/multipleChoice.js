function drawMultipleChoice(activityIndex) {

  if (gameMode === "preview"){
    machineContainer.classList.add("state-pointer-events-none");
  }

  let activitymultipleChoice;
  

  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  if (resource.challengeArray){
    activitymultipleChoice = resource.challengeArray[activityArrayIndex].questions.contentArray;
      // create elements
      for (let i = 0; i < activitymultipleChoice.length; i++) {
        let machineItemMultipleChoice;
        if (i == 0) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnLeft);
        }
        if (i == 1) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnRight);
        }
        if (i == 2) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnLeft);
        }
        if (i == 3) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnRight);
        }
        let machineTitle = createElement("p", ["machine-title"], machineItemMultipleChoice);
        machineTitle.innerHTML = styleText(activitymultipleChoice[i].title);

        // two-column support

        let machineMultipleChoiceColumn1;
        let machineMultipleChoiceColumn2;

        if (activitymultipleChoice[i].columns === 2){
          machineMultipleChoiceColumn1 = createElement("div", ["machine-multiple-choice-column", "machine-multiple-choice-column-1"], machineItemMultipleChoice);
          machineMultipleChoiceColumn2 = createElement("div", ["machine-multiple-choice-column", "machine-multiple-choice-column-2"], machineItemMultipleChoice);
        }
               
        for (let j = 0; j < activitymultipleChoice[i].paragraph.length; j++) {

          let machineMultipleChoiceLine;
          let machineRadioButton;
          let machineParagraph;

          // 2-column
          if (activitymultipleChoice[i].columns === 2){
            if (j === 0 || j === 1){
              machineMultipleChoiceLine = createElement("div", ["machine-multiple-choice-line", "machine-multiple-choice-line--2col"], machineMultipleChoiceColumn1);
            }
            if (j === 2 || j === 3){
              machineMultipleChoiceLine = createElement("div", ["machine-multiple-choice-line", "machine-multiple-choice-line--2col"], machineMultipleChoiceColumn2);
            }
            machineRadioButton = createElement("input", ["machine-radio-button", "machine-radio-button--2col"], machineMultipleChoiceLine);
            machineParagraph = createElement("p", ["machine-paragraph", "machine-paragraph--2col"], machineMultipleChoiceLine);
          }
          // 1-column
          else {
            machineMultipleChoiceLine = createElement("div", ["machine-multiple-choice-line"], machineItemMultipleChoice);          machineRadioButton = createElement("input", ["machine-radio-button"], machineMultipleChoiceLine);
            machineParagraph = createElement("p", ["machine-paragraph"], machineMultipleChoiceLine);
          }

          machineRadioButton.type = "radio";
          machineRadioButton.name = `multipleChoice_${i + 1}`;
          machineRadioButton.value = j;

          // save user inputs
          machineRadioButton.addEventListener("change", (event) => {
            userInput["multiple-choice" + activityIndex]["answer" + i] = event.target.value;

            // display code input once all radios are checked
            if (event.target.checked) {
                
              countCheckedRadiosByClass(activitymultipleChoice.length);

              // If there is a special answer type
              if (activitymultipleChoice[i].answerType && activitymultipleChoice[i].answerType === "numerals"){
                  let paragraphText = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span class="machine-highlight--show">$1</span>'));
                  machineParagraph.innerHTML = paragraphText;
              }
              else {
                  // Apply the styling to the corresponding paragraph
                  machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span class="machine-highlight-yellow">$1</span>'));
              }

              // Remove the styling from other paragraphs with the same name
              const radioButtons = document.getElementsByName(`multipleChoice_${i + 1}`);
              radioButtons.forEach((radio) => {
                if (radio !== event.target) {
                  const paragraph = radio.nextElementSibling;
                  paragraph.innerHTML = paragraph.innerHTML.replace(/<span class="machine-highlight-yellow">(\w)<\/span>/g, '$1');
                  if (activitymultipleChoice[i].answerType && activitymultipleChoice[i].answerType === "numerals"){
                    paragraph.innerHTML = paragraph.innerHTML.replace(/<span class="machine-highlight--show">(\w)<\/span>/g, '<span class="machine-highlight--hide">$1</span>');
                  }
                }
              });
            } else {
              // Remove the styling if radio input is deselected
              machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{|\}/g, ''));
            }
          });

          // load user inputs
          if (userInput["multiple-choice" + activityIndex]["answer" + i] == j) {
            machineRadioButton.checked = true;
            // If there is a special answer type
            if (activitymultipleChoice[i].answerType && activitymultipleChoice[i].answerType === "numerals"){
              machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span class="machine-highlight--show">$1</span>'));
            }
            else {
              // Apply the styling to the corresponding paragraph
              machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span   class="machine-highlight-yellow">$1</span>'));
            }
          }
          else {
            // If there is a special answer type
            if (activitymultipleChoice[i].answerType && activitymultipleChoice[i].answerType === "numerals"){
              machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span class="machine-highlight--hide">$1</span>'));
            }
            else {
            // remove square brackets
              machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{|\}/g, ''));
            }

          }

          // game mode: preview
          if (gameMode === "preview"){
            if (j === activitymultipleChoice[i].correctIndex){
              machineRadioButton.checked = true;
              const spanElement = machineParagraph.querySelector('span');
              // If there is a special answer type
              if (activitymultipleChoice[i].answerType && activitymultipleChoice[i].answerType === "numerals"){
                machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span class="machine-highlight--show">$1</span>'));
              }
              else {
                // Apply the styling to the corresponding paragraph
                machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\{(\w)\}/g, '<span   class="machine-highlight-yellow">$1</span>'));
              }
            }
          }

        }
      }
  }
  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
  else {
    // create alias
    activitymultipleChoice = resource.activityArray[activityArrayIndex - 1].content.multipleChoice;
      // create elements
      for (let i = 0; i < activitymultipleChoice.length; i++) {
        let machineItemMultipleChoice;
        if (i == 0) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnLeft);
        }
        if (i == 1) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnRight);
        }
        if (i == 2) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnLeft);
        }
        if (i == 3) {
          machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnRight);
        }
        let machineTitle = createElement("p", ["machine-title"], machineItemMultipleChoice);
        machineTitle.textContent = activitymultipleChoice[i].title;
        makeRed(machineTitle, activitymultipleChoice[i].title);
        for (let j = 0; j < activitymultipleChoice[i].paragraph.length; j++) {
          let machineMultipleChoiceLine = createElement("div", ["machine-multiple-choice-line"], machineItemMultipleChoice);
          let machineRadioButton = createElement("input", ["machine-radio-button"], machineMultipleChoiceLine);
          machineRadioButton.type = "radio";
          machineRadioButton.name = `multipleChoice_${i + 1}`;
          machineRadioButton.value = j;
          let machineParagraph = createElement("p", ["machine-paragraph"], machineMultipleChoiceLine);
          machineParagraph.innerHTML = activitymultipleChoice[i].paragraph[j];

          // save user inputs
          machineRadioButton.addEventListener("change", (event) => {
            userInput["multipleChoice" + activityIndex]["answer" + i] = event.target.value;

            // display code input once all radios are checked
            if (event.target.checked) {
                
              countCheckedRadiosByClass(activitymultipleChoice.length);

              // Apply the styling to the corresponding paragraph
              machineParagraph.innerHTML = activitymultipleChoice[i].paragraph[j].replace(/\[(\w)\]/g, '<span class="machine-highlight-yellow">$1</span>');
              
              // Remove the styling from other paragraphs with the same name
              const radioButtons = document.getElementsByName(`multipleChoice_${i + 1}`);
              radioButtons.forEach((radio) => {
                if (radio !== event.target) {
                  const paragraph = radio.nextElementSibling;
                  paragraph.innerHTML = paragraph.innerHTML.replace(/<span class="machine-highlight-yellow">(\w)<\/span>/g, '$1');
                }
              });
            } else {
              // Remove the styling if radio input is deselected
              machineParagraph.innerHTML = activitymultipleChoice[i].paragraph[j].replace(/\[|\]/g, '');
            }
          });

          // load user inputs
          if (userInput["multipleChoice" + activityIndex]["answer" + i] == j) {
            machineRadioButton.checked = true;
            // Apply the styling to the corresponding paragraph
            machineParagraph.innerHTML = activitymultipleChoice[i].paragraph[j].replace(/\[(\w)\]/g, '<span class="machine-highlight-yellow">$1</span>');
          }
          else {
            machineParagraph.innerHTML = activitymultipleChoice[i].paragraph[j].replace(/\[|\]/g, '');
          }

          // game mode: preview
          if (gameMode === "preview"){
            if (j === activitymultipleChoice[i].correctIndex){
              machineRadioButton.checked = true;
              const spanElement = machineParagraph.querySelector('span');
              // If there is a special answer type
              if (activitymultipleChoice[i].answerType && activitymultipleChoice[i].answerType === "numerals"){
                machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\[(\w)\]/g, '<span class="machine-highlight--show">$1</span>'));
              }
              else {
                // Apply the styling to the corresponding paragraph
                machineParagraph.innerHTML = styleText(activitymultipleChoice[i].paragraph[j].replace(/\[(\w)\]/g, '<span   class="machine-highlight-yellow">$1</span>'));
              }
            }
          }

        }



      }
  }
  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
}
