function drawMultipleChoice(activityIndex) {
  // create alias
  let activitymultipleChoice = resource.activityArray[activityArrayIndex - 1].content.multipleChoice;

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
    /*
    if (activitymultipleChoice.length <= 4) {
      if (i < 2) {
        machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnLeft);
      }
      if (i > 1) {
        machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnRight);
      }
    } else {
      if (i < 3) {
        machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnLeft);
      }
      if (i > 2) {
        machineItemMultipleChoice = createElement("div", ["machine-item-multiple-choice", "machine-item"], machineColumnRight);
      }
    }
    */
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
    }
  }
}
