// store user inputs
let inputValues = {};

function drawActivity_cryptogram(activityArrayIndex) {

  // create alias
  let activityCryptogram = resource.activityArray[activityArrayIndex-1].content.cryptogram;

  // create container
  const cryptogramContainer = createElement('div',['cryptogram-container'],activityModalContentContainerTop);

  // create elements inside container

  // passages
  const cryptogramPassageContainer = createElement('div',['cryptogram-passage-container'],cryptogramContainer);
  for (let i = 0; i < activityCryptogram.passage.length; i++ ){
    const cryptogramPassage = createElement('div',['cryptogram-passage',activityCryptogram.passage[i].style.material],cryptogramPassageContainer);
    const cryptogramPassageText = createElement('p',['cryptogram-passage-text',activityCryptogram.passage[i].style.paragraph],cryptogramPassage);
    cryptogramPassageText.innerHTML = activityCryptogram.passage[i].text.paragraph.replace(/\[(.*)\]/g, '<span class="paragraph--underline">$1</span>');
    transformElement(cryptogramPassage, activityCryptogram.passage[i].transform.translateX,activityCryptogram.passage[i].transform.translateY,activityCryptogram.passage[i].transform.rotate); 
  }

  // cryptogram
  const cryptogram = createElement('div',['cryptogram', activityCryptogram.style.material],cryptogramContainer);
  transformElement(cryptogram, activityCryptogram.transform.translateX, activityCryptogram.transform.translateY, activityCryptogram.transform.rotate); 
  const cryptogramTable = createElement('table',['cryptogram-table'],cryptogram);
  const symbolArray = resource.activityArray[activityArrayIndex - 1].symbol;
  const cellsPerRow = Math.ceil(symbolArray.length / 2);
  for (let row = 0; row < 2; row++) {
    const cryptogramRow = createElement('tr',['cryptogram-table-row'],cryptogramTable);
    for (let cell = 0; cell < cellsPerRow; cell++) {
      const index = row * cellsPerRow + cell;
      const cryptogramCell = createElement('td',['cryptogram-table-cell', activityCryptogram.style.text],cryptogramRow);
      if (index < symbolArray.length) {
        const letters = symbolArray[index];
        const firstLetter = letters.charAt(0);
        const secondLetter = letters.charAt(1);
        cryptogramCell.innerHTML = `${firstLetter}<br>${secondLetter}`;
      }    
    }
  }

  /*

  const cryptogramTextContainer = createElement('div', ['cryptogram-text-container'], activityModalContentContainerBottom);

  const textArray = resource.activityArray[activityArrayIndex-1].text;
  for (let i = 0; i < textArray.length; i++) {
    const cryptogramContainer = createElement('div', ['cryptogram-container'], cryptogramTextContainer);
    const textObject = textArray[i];

    const cryptogramText = createElement('p', ['cryptogram-text'], cryptogramContainer);
    cryptogramText.innerHTML = textObject.question;

    const cryptogramWordContainer = createElement('div', ['cryptogram-word-container'], cryptogramContainer);
    const cryptogramWord = createElement('p', ['cryptogram-word'], cryptogramWordContainer);
    cryptogramWord.innerHTML = textObject.word.replace(/\[|\]/g, ''); // remove brackets []

    switch(textObject.color) {
      case "blue":
        cryptogramWord.classList.add("cryptogram-word--blue");
        break;
      case "red":
        cryptogramWord.classList.add("cryptogram-word--red");
        break;
      case "green":
        cryptogramWord.classList.add("cryptogram-word--green");
        break;
      case "orange":
          cryptogramWord.classList.add("cryptogram-word--orange");
          break;
      default:
        cryptogramWord.classList.add("cryptogram-word");
        break;
    }

    const cryptogramInputContainer = createElement('div', ['cryptogram-input-container'], cryptogramContainer);

    for (let j = 0; j < cryptogramWord.innerHTML.length; j++) {
      const input = createElement('input', ['cryptogram-input'], cryptogramInputContainer);
      input.type = 'text';
      input.maxLength = '1';
    
      switch(textObject.color) {
        case "blue":
          input.classList.add("cryptogram-input--blue");
          break;
        case "red":
          input.classList.add("cryptogram-input--red");
          break;
        case "green":
          input.classList.add("cryptogram-input--green");
          break;
        case "orange":
            input.classList.add("cryptogram-input--orange");
            break;
      }
    
      // add event listener to save input value when changed
      input.addEventListener('input', (event) => {
        inputValues[`${i}-${j}`] = event.target.value;
      });
    
      // retrieve saved value and set as input value if exists
      const savedValue = inputValues[`${i}-${j}`];
      if (savedValue) {
        input.value = savedValue;
      }
    
      // check if the current letter corresponds to a letter that was formerly in brackets
      const currentLetter = cryptogramWord.innerHTML.charAt(j);
      console.log(textObject.word);
      if (textObject.word.includes(`[${currentLetter}]`)) {
        input.classList.add("cryptogram-input--highlight");
      }
    }
    
  }

*/
  
}
