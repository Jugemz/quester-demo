// store user inputs
let crosswordUserInputs = [];

function drawCrossword(activityIndex){

  // create alias
  let activityCrossword = resource.activityArray[activityArrayIndex-1].content.crossword;
 
  // create elements: question
  let machineItemCrosswordQuestions = createElement("div", ["machine-item-crossword-questions", "machine-item"], machineColumnLeft);
  let machineTitle = createElement('p',['machine-title'],machineItemCrosswordQuestions);
  machineTitle.textContent = activityCrossword.title;
  for (let i = 0; i < activityCrossword.paragraph.length; i++) {
    let crosswordQuestion = createElement('p',['machine-paragraph', 'machine-paragraph-crossword'],machineItemCrosswordQuestions);
    crosswordQuestion.textContent = activityCrossword.paragraph[i];
  }

  // create elements: puzzle
  let machineItemCrosswordPuzzle = createElement("div", ["machine-item-crossword-puzzle", "machine-item"], machineColumnRight);
  let machineCrosswordTable = createElement("table", ["machine-crossword-table"], machineItemCrosswordPuzzle);
  for (let i = 0; i <  activityCrossword.puzzle.length; i++) {
    let machineCrosswordRow = createElement("tr", ["machine-crossword-row"], machineCrosswordTable);
    for (let j = 0; j <  activityCrossword.puzzle[i].length; j++) {
      let machineCrosswordCell = createElement("td", ["machine-crossword-cell"], machineCrosswordRow);
      if ( activityCrossword.puzzle[i][j] !== "0") {
        let machineCrosswordInput = createElement("input",["machine-crossword-input","machine-crossword-cell-filled","input-functionality-default"],machineCrosswordCell);
        machineCrosswordInput.type = "text";
        machineCrosswordInput.maxLength = 1;
        const regex = /\((.+)\)/;
        const match =  activityCrossword.puzzle[i][j].match(regex);
        if (match) {
          let machineCrosswordLabelVisible = createElement("p",["machine-crossword-label-visible", "number"],machineCrosswordCell);
          machineCrosswordLabelVisible.textContent = match[1];
        }
        
        if ( activityCrossword.puzzle[i][j].includes("1") ||  activityCrossword.puzzle[i][j].includes("2") ||  activityCrossword.puzzle[i][j].includes("3") ||  activityCrossword.puzzle[i][j].includes("4") ||  activityCrossword.puzzle[i][j].includes("5") ||  activityCrossword.puzzle[i][j].includes("6")) {
          machineCrosswordInput.classList.add("machine-crossword-cell-red");
          let machineCrosswordLabelHidden = createElement("p",["machine-crossword-label-hidden"],machineCrosswordCell);
          if (match) {
            machineCrosswordLabelHidden.textContent =  activityCrossword.puzzle[i][j].charAt(3);
          }
          else {
             machineCrosswordLabelHidden.textContent =  activityCrossword.puzzle[i][j].charAt(0);
          }
        }    

        // set hardware keyboard functionality
        setHardwareKeyboardFunctionality(machineCrosswordInput,"machine-crossword-input","machine-crossword-table",activityIndex,i,j); 
        
        // load user inputs
        machineCrosswordInput.value = userInput["crossword" + activityIndex]["row" + i][j];

      }
      else { 
        machineCrosswordCell.classList.add("machine-crossword-cell-empty");
      }
    
    }
  }

  checkIfCrosswordIsFilled();

  // set software keyboard functionality
  setSoftwareKeyboardFunctionality("machine-crossword-input","machine-crossword-table",activityIndex);
  
}

// check if filled
function checkIfCrosswordIsFilled(){
  var filledCells = document.querySelectorAll('.machine-crossword-cell-filled');
  var allFilled = true;
  for (var i = 0; i < filledCells.length; i++) {
    if (!filledCells[i].value) {
      allFilled = false;
      break;
      
    }
  }
  if (allFilled) {
    setTimeout(bringInInputs,100);
  } else {
    return false;
  }
}

