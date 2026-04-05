//create elements
function drawActivity_decoder(activityIndex) {
  let activityDecoder = resource.activityArray[activityArrayIndex - 1].content.decoder;
  for (let i = 0; i < activityDecoder.length; i++) {
    let machineItemCryptogramDecoder;
    let machineItemCryptogramInputColumn;
    let machineItemCryptogramInput;
    if (i == 0) {
      machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnLeft);
    }
    if (i == 1) {
      machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnRight);
    } 
    if (i == 2) {
      machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnLeft);
    } 
    if (i == 3) {
      machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnRight);
    }  
    const machineItemCryptogramDecoderTitle = createElement('p', ['machine-title'], machineItemCryptogramDecoder);
    machineItemCryptogramDecoderTitle.textContent = activityDecoder[i].title;
    makeRed(machineItemCryptogramDecoderTitle, activityDecoder[i].title);
    
    const machineItemCryptogramInputContainer = createElement('div', ['machine-item-cryptogram-input-container'], machineItemCryptogramDecoder);



    
    let matchResult = activityDecoder[i].word.match(/\[(.)\]/);
    let indexOfMatchResult = matchResult.index;
    let activityDecoderWord = activityDecoder[i].word.replace(/\[(.)\]/g, '$1');




    for (let j = 0; j < activityDecoderWord.length; j++) {
      machineItemCryptogramInputColumn = createElement('div', ['machine-item-cryptogram-input-column'], machineItemCryptogramInputContainer);
      let machineItemCryptogramDecoderLetter = createElement('p', ['machine-item-cryptograph-decoder-letter'], machineItemCryptogramInputColumn);
      let individualLetter = activityDecoderWord.split("")[j];
      machineItemCryptogramDecoderLetter.textContent = individualLetter.replace(/[\[\]]/g, '');
      machineItemCryptogramInput = createElement('input', ['machine-item-cryptogram-input', 'input-functionality-default'], machineItemCryptogramInputColumn);
      machineItemCryptogramInput.type = 'text';
      machineItemCryptogramInput.maxLength = '1';

      if (j == indexOfMatchResult){
        machineItemCryptogramInput.classList.add('input-red');
      }

      // set hardware keyboard functionality
      setHardwareKeyboardFunctionality(machineItemCryptogramInput,"machine-item-cryptogram-input","machine-item-cryptogram-input-container",activityIndex,i,j); 

      // load user inputs
      machineItemCryptogramInput.value = userInput["decoder" + activityIndex]["word" + i][j];

    }
  }

  checkIfDecoderIsFilled();

  // set software keyboard functionality
  setSoftwareKeyboardFunctionality("machine-item-cryptogram-input","machine-item-cryptogram-input-container",activityIndex);


}


function checkIfDecoderIsFilled(){
  var filledCells = document.querySelectorAll('.machine-item-cryptogram-input');
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
    // Not all filled cells have a value entered
    return false;
  }
}


