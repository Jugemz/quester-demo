let canRefresh = false;
let resourceTheme;
let resourceJS;
let playerCharacters = [];
let cutsceneIntroIndex = 0;
let cutsceneOutroIndex = 0;
let cutsceneFailIndex = 0;
let playerCharacterIndex = 0;
let activityArrayIndex;
let counter = 0;
let activeInput__codeInput;
let userInput = {};
let accessInput = [];
let time;
let minutes;
let seconds;
let openState = {
  menu: false,
  hint: false
}
const setup = {
  playerCount: [1,2,3,4,5,6],
  activityCount: [1,2,3,4,5],
  timeLimit: ['40 min', '50 min', '60 min', 'No limit'],
  hints: ['Yes','No'],
  rewards: ['Yes','No']
}
let settings = {
  playerCount: null,
  activityCount: null,
  timeLimit: null,
  hints: null,
  rewards: null
}
let debriefStats = {
  teamSize: 0,
  hintsUsed: 0,
  timeRemaining: 0,
  timeStarting: 0,
  activitiesCompleted: 0
}  

const isTouchDevice = navigator.maxTouchPoints > 0;
const allowedKeys = [
  'Backspace', 'Delete',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];
const allowedLetters = /^[a-zA-Z]$/;

///////
// save
///////

let activitiesToBeSaved = 0;
function initializeSave(){
  for (let i = 0; i < resource.activityArray.length-1; i++) {
    if (resource.activityArray[i].content.multipleChoice){
      activitiesToBeSaved = activitiesToBeSaved + 1;
      userInput["multipleChoice" + i] = {};
      for (let j = 0; j < resource.activityArray[i].content.multipleChoice.length; j++) {
        userInput["multipleChoice" + i]["answer" + j];
      }
    } 
    if (resource.activityArray[i].content.decoder){
      activitiesToBeSaved = activitiesToBeSaved + 1;
      userInput["decoder" + i] = {};
      for (let j = 0; j < resource.activityArray[i].content.decoder.length; j++) {
        userInput["decoder" + i]["word" + j] = [];
        for (let k = 0; k < resource.activityArray[i].content.decoder[j].word.length; k++) {
          userInput["decoder" + i]["word" + j][k] = "";
        }
      }
    }
    if (resource.activityArray[i].content.crossword){
      activitiesToBeSaved = activitiesToBeSaved + 1;
      userInput["crossword" + i] = {};
      for (let j = 0; j < resource.activityArray[i].content.crossword.puzzle.length; j++) {
        userInput["crossword" + i]["row" + j] = [];
        for (let k = 0; k < resource.activityArray[i].content.crossword.puzzle[0].length; k++) {
          userInput["crossword" + i]["row" + j][k] = "";
        }
      }
    }
    if (resource.activityArray[i].content.puzzle){
      activitiesToBeSaved = activitiesToBeSaved + 1;
      userInput["puzzle" + i] = {};
      userInput["puzzlePosition"] = {};
    }
  };  
}


//////////////////
// query selectors
//////////////////

const siteContainer = document.querySelector(".site-container");
const activity = document.querySelector(".activity");
const activityModal = document.querySelector(".activity-modal");
const activityModalContentContainer = document.querySelector(".activity-modal-content-container");
const activityModalContentContainerTop = document.querySelector(".activity-modal-content-container-top");
const activityModalContentContainerBottom = document.querySelector(".activity-modal-content-container-bottom");
const activityModalContentContainerToggle = document.querySelector(".activity-modal-content-container-toggle");
const activityModalCodeMachine = document.querySelector(".activity-modal-code-machine");
const activityModalWrapper = document.querySelector('.activity-modal-wrapper');
const activityModalHint = document.querySelector(".activity-modal-hint");
const activityModalHintText = document.querySelector(".activity-modal-hint-text");
const activityBlackout = document.querySelector(".activity-blackout");
const activityNodeContainer = document.querySelector('.activity-node-container');
const activityNodes = document.querySelectorAll(".activity-node");
const buttonCloseModal = document.querySelector(".button-close-modal");
const activityNodeTitles = document.querySelectorAll(".activity-node-title");
const activityButtonDone = document.querySelector(".activity-button-done");
const activityButtonHint = document.querySelector(".activity-button-hint");
const activityButtonStart = document.querySelector(".activity-button-start");
const footerButtonMenu = document.querySelector('.footer-button-menu');
const footer = document.querySelector('.footer');
const menu = document.querySelector('.menu');
const footerElementTimer = document.querySelector('#footer-element-timer');
const footerElementTimeLabel = document.querySelector('.footer-element-time-label');
const footerElementTimeRemaining = document.querySelector('.footer-element-time-remaining');
const splash = document.querySelector('.splash');
const splashContainerWrapper = document.querySelector('.splash-container-wrapper');
const menuButtonFullscreen = document.querySelector('.menu-button-fullscreen');
const keyboard = document.querySelector('.keyboard');
const keyboardButtons = document.querySelectorAll(".keyboard-button");
const keyboardSplash = document.querySelector('.keyboard--splash');
const keyboardButtonsSplash = document.querySelectorAll(".keyboard-button--splash");
const machineWrapper = document.querySelector('.machine-wrapper');
const machineContainer = document.querySelector('.machine-container');
const machineColumnLeft = document.querySelector('.machine-column-left');
const machineColumnRight = document.querySelector('.machine-column-right');
const activityModalHintButton = document.querySelector('.activity-modal-hint-button');
const scrollUp = document.querySelector('.scroll-up');
const body = document.querySelector('body');
const background = document.querySelector('.background');
const backgroundColorOffBlack = document.querySelector('.background-color--off-black');
const backgroundColorOffWhite = document.querySelector('.background-color--off-white');
const promoContainer = document.querySelector('.promo-container');
const promoContainerTitle = document.querySelector('.promo-container__title');
const promoContainerBanner = document.querySelector('.promo-container__banner');
const promoContainerResourceBanner = document.querySelector('.promo-container__resource-banner');
const promoContainerResource = document.querySelector('.promo-container__resource');

/////////
// footer
/////////

function createFooter(){

  footer.classList.add("footer--hidden");

  footerElementTimeLabel.textContent = resource.info.timerLabel;
  
  setTimeout(bringInFooter,200);
  function bringInFooter(){
    setTimeout(toggleClass,500,footer, 'footer--hidden', 'footer--visible');
    startTimer();
  }
  
  setTimeout(moveFooter,1300);
  function moveFooter(){
    footer.classList.add("footer--right");
  }
  
}

////////
// timer
////////

let gameTimer; // Declare a variable to store the interval ID

function startTimer() {
  if (settings.timeLimit === "No limit"){
    // Start the timer that counts up every second
    let time = 0; // Initial time is 00:00
    let minutes = 0;
    let seconds = 0;

    gameTimer = setInterval(function() { // Store the interval ID
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      footerElementTimeRemaining.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
  }
  else {
    time = parseInt(settings.timeLimit.slice(0, -4) * 60);
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    footerElementTimeRemaining.innerHTML = `${minutes}:${String(seconds).padStart(2, '0')}`;

    gameTimer = setInterval(function() { // Store the interval ID
      time--;
      if (time < 0) {
        splash.style.zIndex = 999;
        activityModal.style.zIndex = -1;
        activityBlackout.style.zIndex = -2;
        footer.style.zIndex = -3;
        activity.style.zIndex = -4;
        activityNodeContainer.style.zIndex = -5;
        clearInterval(gameTimer); // Clear the interval using the stored ID
        clearSplashContainer();
        toggleClass(splash,'state-display-none','state-display-block');
        setTimeout(toggleClass,200,splash,'splash--hidden','splash--visible');
        setTimeout(addCutscene,210,cutsceneFailIndex,'fail');
      } else {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        footerElementTimeRemaining.innerHTML = `${minutes}:${String(seconds).padStart(2, '0')}`;
      }
    }, 1000);
  }
}

//////////////////
// element scaling
//////////////////

function updateElementHeight() {

  const elements = [    
    ['.passage-image', 0.18],
    ['.machine-radio-button', 0.066],
    ['.activity-scene-dialogue-trail', 0.15],
    ['.activity-scene-dialogue-trail-player', 0.14],
    ['.code-input-line', 0.065],
    ['.code-node-input-line', 0.16],
    ['#footer-element-timer', 1.083],
    ['.activity-node-complete-banner',1],
    ['.activity-node-image',1],
    ['.code-box-button',0.18],
    ['.code-input-flash',1.05],
    /* -container-wrapper',0.48], */
    ['.access-input',0.08],
    ['.promo-container',0.19],
    ['.promo-container__resource',0.3],
    ['.promo-container__single-image',0.65]
  ];

  elements.forEach(([selector, height]) => {
    heightElements(selector, height);
  });

  function heightElements(elementSelector, heightFactor) {
    document.querySelectorAll(elementSelector).forEach(element => {
      const parentWidth = element.parentNode.offsetWidth;
      element.style.height = `${parentWidth * heightFactor}px`;
    });
  }
}

function updateLineThickness() {

  const elements = [    
    ['.activity-node-title', 0.009],
    ['.tab-button', 0.004],
    ['.access-input', 0.0025],
    ['.character-select-button', 0.0043],
    ['.character-select-button-text', 0.013],
    ['.cutscene-text-box', 0.003],
    ['.cutscene-character-name', 0.004],
    ['.activity-modal', 0.01],
    ['.activity-scene-button-start', 0.0057],
    ['.passage', 0.0035],
    ['.poem', 0.005],
    ['.div-machine-item', 0.005],
    ['.machine-radio-button', 0.0065],
    ['.code-input', 0.035],
    ['.code-node-input', 0.012],
    ['.machine-crossword-input', 0.045],
    ['.machine-puzzle-piece', 0.04],
    ['.story', 0.0028],
    ['.cryptogram-passage', 0.003],
    ['.cryptogram', 0.0032],
    ['.activity-scene-dialogue-wrapper', 0.0025],
    ['.activity-scene-button', 0.0025],
  ];

  elements.forEach(([selector, thickness]) => {
    lineElements(selector, thickness);
  });

  function lineElements(elementSelector, thickFactor) {
    document.querySelectorAll(elementSelector).forEach(element => {
      const parentWidth = element.parentNode.offsetWidth;
      element.style.borderWidth = `${parentWidth * thickFactor}px`;
    });
  }
}

function updateElementSize() {

  const elements = [  
    ['.activity-node-title', 0.1],
    ['.code-node-input-line-number', 0.07],
    ['.code-input-label', 0.3],
    ['.code-input-line-number', 0.06],
    ['.code-input', 0.7],
    ['.code-box-input', 0.093],
    ['.code-box-button', 0.03],
    // passage
    ['.passage-title', 0.035],
    ['.passage-paragraph', 0.035],
    // multiple choice
    ['.machine-title', 0.05],  
    ['.machine-paragraph', 0.05], 
    // poem
    ['.poem-title', 0.05],
    ['.poem-author', 0.04],
    ['.poem-paragraph', 0.05],
    // crossword
    ['.machine-crossword-label-visible', 0.3],
    ['.machine-crossword-label-hidden', 0.3],
    ['.machine-crossword-input', 0.5],
    // puzzle
    ['.activity-puzzle-piece-text', 0.08],
    // story
    ['.story-title', 0.03],
    ['.story-author', 0.021],
    ['.story-paragraph', 0.021],
    // cryptogram
    ['.cryptogram-table-cell', 0.04],
    ['.cryptogram-passage-text', 0.06],
    ['.machine-item-cryptograph-decoder-letter', 0.7],
    ['.machine-item-cryptogram-input', 0.7],
    // splash
    ['.splash-p', 0.015],
    ['.splash-button', 0.033],
    ['.tab-button', 0.05],
    ['.splash-title', 0.045],
    ['.splash-nav', 0.025],
    ['.splash-version', 0.018],
    ['.cutscene-character-name',0.04],
    ['.cutscene-skip-text',0.02],
    // scene
    ['.activity-scene-dialogue', 0.045],
    ['.activity-scene-player-text', 0.06],
    ['.activity-scene-topic', 0.035],
    ['.activity-scene-character-name', 0.035],
    ['.activity-scene-player-name', 0.05],
    ['.activity-scene-button-start', 0.07],

    ['.crossword-order', 0.3],
    ['.crossword-text', 0.05],
    ['.crossword-multipleChoice', 0.04],
    ['.activity-scene-button', 0.04],
    ['.activity-button-done', 0.04],
    ['.activity-button-hint', 0.03],
    ['.footer-element', 0.2],
    ['.menu-button', 0.15],
    ['.character-select-button', 0.045],
    ['.activity-button-start', 0.05],
    ['.footer-element-time-label', 0.2],
    ['.footer-element-time-remaining', 0.3],    
    ['.tab-text', 0.03],
    ['.activity-modal-hint-text', 0.055],
    ['.activity-modal-hint-button', 0.055],
    ['.cutscene-text', 0.055],
    ['.keyboard-button', 0.035],
    ['.keyboard-button--splash', 0.15],
    ['.activity-button-done', 0.03],

    ['.code-node-input', 0.11],
    ['.access-input',0.05],
    ['.promo-container__title',0.06],
    ['.promo-container__banner',0.06],
    ['.promo-container__resource-overlay__text',0.25],
    
  ];

  elements.forEach(([selector, scale]) => {
    scaleElements(selector, scale);
  });

  splashContainerWrapper.style.height = `${splashContainerWrapper.parentNode.offsetWidth * 0.503}px`;
  activityNodeContainer.style.height = `${activityNodeContainer.parentNode.offsetWidth * 0.503}px`;
  activityModal.style.height = `${activityModal.parentNode.offsetWidth * 0.53}px`;
  keyboard.style.height = `${keyboard.parentNode.offsetWidth * 0.0975}px`;
}

/////////////////////
// reusable functions
/////////////////////

// set ipad active state
function setIpadActiveState(button){
  button.setAttribute('ontouchstart', '');
}

// check inputs
function countCheckedRadiosByClass() {
  let count = 0;
  let machineRadioButton = document.querySelectorAll('.machine-radio-button');
  let machineItemMultipleChoice = document.querySelectorAll('.machine-item-multiple-choice');
  machineRadioButton.forEach((radioInput) => {
    if (radioInput.checked) {
      count++;
    }
  });
  if (machineItemMultipleChoice.length == count){
    setTimeout(bringInInputs,100);
  }
}

function bringInInputs(){
  let codeInputLine = document.querySelector('.code-input-line');
  toggleClass(codeInputLine,'code-input-line--hidden','code-input-line--visible');
}

// toggle class
function toggleClass(element, classToRemove, classToAdd){
  if (element){
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
  }
}

// make red
function makeRed(element,text){
  element.innerHTML = text.replace(/\{([^}]+)\}/g, '<span class="machine-text-red">$1</span>');
}

// scale font-size based on parent width
function scaleElements(elementSelector, scaleFactor) {
  document.querySelectorAll(elementSelector).forEach(element => {
    const parentWidth = element.parentNode.offsetWidth;
    element.style.fontSize = `${parentWidth * scaleFactor}px`;
  });
}

// create element
function createElement(tagName, classList, parent, id) {
  const element = document.createElement(tagName);
  element.classList.add(...classList);
  if (id) {
    element.setAttribute("id", id);
  }
  parent.appendChild(element);
  return element;
}

// transform element
function transformElement(element, transformX, transformY, rotate) {
  element.style.transform = `translate(${transformX}, ${transformY}) rotate(${rotate})`;
}

// --------------------------------------
// --------------------------------------
// ----- set keyboard functionality -----
// --------------------------------------
// --------------------------------------

function setHardwareKeyboardFunctionality(inputElement,inputClass,parentClass,activityIndex,i,j){

  // disable system keyboard for touch devices
  if (isTouchDevice) { inputElement.setAttribute('inputmode', 'none'); }
  else { inputElement.removeAttribute('inputmode'); }

  // ----------------------------------------
  // create hardware keyboard event listeners
  // ----------------------------------------

  // ----------
  // on keydown
  // ----------

  inputElement.addEventListener('keydown', (event) => {   
      
    // if a disallowed key is pressed:
    // -------------------------------
    //    1. exit the event listener 

    if (!allowedKeys.includes(event.key) && !allowedLetters.test(event.key)) {
      event.preventDefault(); 
      inputElement.blur();  
      return false;
    }

    // if delete or backspace is pressed:
    // ----------------------------------
    //    1. update the input to an empty value
    //    2. if it's a code-input, sync the update
    //    3. blur the input

    if (event.key === 'Delete' || event.key === 'Backspace') {
      updateInputElementValue(inputElement,'');
      if (inputClass == "code-input"){
        syncUpdates(inputElement, "change");
        blurInput(inputElement);
        activeInput__codeInput = null;
        return false;
      }    
      if (inputClass == "machine-item-cryptogram-input"){
        userInput["decoder" + activityIndex]["word" + i][j] = '';
        blurInput(inputElement);
        activeInput__codeInput = null;
        return false;
      }
      if (inputClass == "machine-crossword-input"){
        userInput["crossword" + activityIndex]["row" + i][j] = '';
        blurInput(inputElement);
        activeInput__codeInput = null;
        return false;
      }
      if (inputClass == "access-input"){
        blurInput(inputElement);
        activeInput__codeInput = null;
        checkIfAccessInputIsFilled();
        return false;
      }
    }  

    // if an allowed key is pressed:
    // -----------------------------
    //    1. update the input to the pressed value, converted to uppercase
    //    2. make this specific input the 'active' one
    //    3. if it's a code-input, sync the update

    else {
      updateInputElementValue(inputElement,event.key.toUpperCase());
      if (inputClass == "code-input"){   
        activeInput__codeInput = inputElement; 
        syncUpdates(inputElement, "change");
      }
      if (inputClass == "machine-item-cryptogram-input"){
        activeInput__codeInput = inputElement;
        userInput["decoder" + activityIndex]["word" + i][j] = event.key.toUpperCase();
        checkIfDecoderIsFilled();
      }
      if (inputClass == "machine-crossword-input"){
        activeInput__codeInput = inputElement;
        userInput["crossword" + activityIndex]["row" + i][j] = event.key.toUpperCase();
        checkIfCrosswordIsFilled();
      }
      if (inputClass == "access-input"){
        activeInput__codeInput = inputElement;
        checkIfAccessInputIsFilled();
      }
    }
   
  });

  // --------
  // on keyup
  // --------
  
  inputElement.addEventListener('keyup', (event) => {

    if (!allowedKeys.includes(event.key) && !allowedLetters.test(event.key)) {
      event.preventDefault();   
      inputElement.blur();
      return false;
    }
    else {
      // blur the input
      blurInput(inputElement);
      // for now, exclude crossword inputs
      if (inputClass !== "machine-crossword-input"){
        // get the parent element containing all inputElement elements
        const parentElement = findParentWithClass(inputElement, parentClass);   
        // if the parent doesn't exist, end the function
        if (!parentElement) { return; }   
        // if the parent does exist, focus the next input 
        else { focusNextInput(event,inputClass,inputElement,parentElement,'hardwareKeyboard'); }    
      } 
    }
  });

}

function setSoftwareKeyboardFunctionality(inputClass,parentClass,activityIndex){

  // ----------------------------------------
  // create software keyboard event listeners
  // ----------------------------------------

  // --------
  // on click
  // --------

  const inputElements = document.querySelectorAll("." + inputClass);
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('click', handleInputElementClick);
  });


  // Function to be executed when an element with the class "keyboard-button" is clicked
  function handleInputElementClick(event) {

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("code-input")) {
      activeInput__codeInput = event.target;  
    }

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("machine-item-cryptogram-input")) {
      activeInput__codeInput = event.target;  
    }

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("machine-crossword-input")) {
      activeInput__codeInput = event.target;  
    }

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("access-input")) {
      activeInput__codeInput = event.target; 
    }

  }


  // ---------------------------------------------
  // attach event listener to each keyboard button
  // ---------------------------------------------

  keyboardButtons.forEach(function(button) {

    // ------------
    // on mousedown
    // ------------

    button.addEventListener("mousedown", handleKeyboardMousedown);
    function handleKeyboardMousedown(event) {

      // if a software keyboard button is pressed:
      // ----------------------------------------
      //    1. update the input to the pressed value
      //    2. make this specific input the 'active' one
      //    3. if it's a code-input, sync the update
      
      if (inputClass === "code-input") {
       updateInputElementValue(activeInput__codeInput, event.target.innerText);
        
        // Check if the activeInput__codeInput element contains the class .code-input
        if (activeInput__codeInput && activeInput__codeInput.classList.contains("code-input")) {
          syncUpdates(activeInput__codeInput, "change");
        }
      }

      if (inputClass == "machine-item-cryptogram-input"){
        updateInputElementValue(activeInput__codeInput,event.target.innerText);    
        if (activeInput__codeInput && activeInput__codeInput.classList.contains("machine-item-cryptogram-input")){
          checkIfDecoderIsFilled();  

          // iterate through cryptogram inputs and save them

          // get j
          const parentMachineItem = activeInput__codeInput.closest('.machine-item');
          const cryptogramInputs = parentMachineItem.querySelectorAll('.machine-item-cryptogram-input');
          const cryptogramInputsArray = Array.from(cryptogramInputs);
          const j = cryptogramInputsArray.indexOf(activeInput__codeInput);

          // get i  
          const parentMachineContainer = parentMachineItem.closest('.machine-container');
          const machineItems = parentMachineContainer.querySelectorAll('.machine-item');
          const machineItemsArray = Array.from(machineItems);
          let i = machineItemsArray.indexOf(parentMachineItem);

          if (i == 1){
            userInput["decoder" + activityIndex]["word" + 2][j] = event.target.innerText;
          }
          if (i == 2){
            userInput["decoder" + activityIndex]["word" + 1][j] = event.target.innerText;
          }
          if (i == 0 || i == 3){
            userInput["decoder" + activityIndex]["word" + i][j] = event.target.innerText;
          }
          
        }     

      }    
      
      if (inputClass == "machine-crossword-input"){
        updateInputElementValue(activeInput__codeInput,event.target.innerText);
        if (activeInput__codeInput && activeInput__codeInput.classList.contains("machine-crossword-input")){
          checkIfCrosswordIsFilled();  

          // iterate through cryptogram inputs and save them

          // get j
          const parentCrosswordCell = activeInput__codeInput.closest('.machine-crossword-cell');
          const crosswordCells = parentCrosswordCell.parentElement.querySelectorAll('.machine-crossword-cell');
          const crosswordCellsArray = Array.from(crosswordCells);
          const j = crosswordCellsArray.indexOf(parentCrosswordCell);  
        
          // get i  
          const parentCrosswordRow = parentCrosswordCell.parentElement;
          const parentCrosswordContainer = parentCrosswordRow.parentElement;
          const crosswordRows = parentCrosswordContainer.querySelectorAll('.machine-crossword-row');
          const crosswordRowsArray = Array.from(crosswordRows);
          const i = crosswordRowsArray.indexOf(parentCrosswordRow);
          
          // save inputs
          userInput["crossword" + activityIndex]["row" + i][j] = event.target.innerText;

        }     
      }  

  
      if (inputClass == "access-input" && isAccess == true) {
        updateInputElementValue(activeInput__codeInput, event.target.innerText);
        
        // Check if the activeInput__codeInput element contains the class .code-input
        if (activeInput__codeInput && activeInput__codeInput.classList.contains("access-input")) {
          checkIfAccessInputIsFilled();
        }
      }


    }

    // ------------
    // on mouseup
    // ------------

    button.addEventListener('mouseup', handleKeyboardMouseup);
    function handleKeyboardMouseup(event) {
      

      if (inputClass == "code-input"){
        // blur the input
        blurInput(activeInput__codeInput);
        // get the parent element containing all inputElement elements
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        // if the parent doesn't exist, end the function
        if (!parentElement) { return; } 
        // if the parent does exist, focus the next input 
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, 'softwareKeyboard');
      }

      if (inputClass == "machine-item-cryptogram-input"){
        // blur the input
        blurInput(activeInput__codeInput);
        // get the parent element containing all inputElement elements
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        // if the parent doesn't exist, end the function
        if (!parentElement) { return; } 
        // if the parent does exist, focus the next input 
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, 'softwareKeyboard');
      }

      if (inputClass == "machine-crossword-input"){
        // blur the input
        blurInput(activeInput__codeInput);
        if (activeInput__codeInput.classList.contains('machine-crossword-input')){
          activeInput__codeInput = null;
        }  
        /*
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        if (!parentElement) { return; } 
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, 'softwareKeyboard');
        */
      }

      if (inputClass == "access-input"){
        // blur the input
        blurInput(activeInput__codeInput);
        // get the parent element containing all inputElement elements
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        // if the parent doesn't exist, end the function
        if (!parentElement) { return; } 
        // if the parent does exist, focus the next input 
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, 'softwareKeyboard');
      }

    }

  });  

}

// Debounce function
// THIS IS BAD AND YOU KNOW IT. 
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Wrap the focusNextInput function with the debounce function
const debouncedFocusNextInput = debounce(focusNextInput, 10);

// -----------------------
// set input functionality
// -----------------------

function focusNextInput(event, inputClass, inputElement, parentElement, keyboardType) {
  // Get all input elements inside the parent
  let inputElements = parentElement.querySelectorAll(`.${inputClass}`);
  // Get the current index
  let currentIndex = Array.from(inputElements).findIndex((el) => el === inputElement);
  // Declare the next index
  let nextIndex;

  // If the following conditions are true:
  //    1. the keyboard is a hardware keyboard, and the key pressed wasn't delete or backspace
  //    2. the keyboard is a software keyboard
  if ((keyboardType === "hardwareKeyboard" && (event.key !== 'Delete' && event.key !== 'Backspace')) || keyboardType === "softwareKeyboard") {
    // Increment the index
    nextIndex = currentIndex + 1;
    // Stop and blur all inputs once you reach the end
    if (nextIndex >= inputElements.length) {
      inputElements.forEach(input => input.blur());
      activeInput__codeInput = null;
      return;
    }

    // Find the next empty input or stop at the end
    while (nextIndex < inputElements.length) {
      // Declare the nextInputElement
      const nextInputElement = inputElements[nextIndex];
      // If the nextInputElement value is empty
      if (nextInputElement.value === '') {
        // Set it in focus
        nextInputElement.focus();
        // And set it to the new current inputElement
        activeInput__codeInput = nextInputElement;
        return;
      }
      // Increment the index for the next iteration
      nextIndex++;
    }
  }
}


function blurInput(inputElement){
  if (inputElement){
    inputElement.blur();
  }
}

// update the input value
function updateInputElementValue(inputElement,inputElementValue){
  if (inputElement){
    inputElement.value = inputElementValue;
  } 
}

// find the parent element
function findParentWithClass(element, className) {
  if (element){
    if (element.classList.contains(className)) {
      return element;
    } else if (element.parentElement) {
      return findParentWithClass(element.parentElement, className);
    } else {
      return null;
    }
  } 
}

// scroll to top of div
function scrollToTop(element) {
  element.scrollTop = 0;
}



//////////////////
// event listeners
//////////////////

document.addEventListener('DOMContentLoaded', updateElementSize);
window.addEventListener('resize', updateElementSize);
window.addEventListener('click', updateElementSize);
document.addEventListener('DOMContentLoaded', updateElementHeight);
window.addEventListener('resize', updateElementHeight);
window.addEventListener('click', updateElementHeight);
document.addEventListener('DOMContentLoaded', updateLineThickness);
window.addEventListener('resize', updateLineThickness);
window.addEventListener('click', updateLineThickness);
document.addEventListener('DOMContentLoaded', setContainerSize);
window.addEventListener('resize', setContainerSize);
window.addEventListener('click', setContainerSize);

const characterArray = [
  {
      name: "Wisdom",
      asset: "Wisdom.png",
      selected: false,
      dialogue: {
          start: "I'll try.",
          okay: "Um, okay.",
      }
  },
  {
      name: "Strength",
      asset: "Strength.png",
      selected: false,
      dialogue: {
          start: "I can handle it.",
          okay: "Alright.",
      }
  },
  {
      name: "Tu-Bu",
      asset: "Steadfast.png",
      selected: false,
      dialogue: {
          start: "Let's go!",
          okay: "Okay!",
      }
  },
  {
      name: "T.O.R.G.",
      asset: "Heart.png",
      selected: false,
      dialogue: {
          start: "I will do my best.",
          okay: "I understand.",
      }
  },
  {
      name: "Respect",
      asset: "Respect.png",
      selected: false,
      dialogue: {
          start: "Easy! I got this.",
          okay: "Pfft, whatever.",
      }
  },
  {
      name: "Perserverance",
      asset: "Perserverance.png",
      selected: false,
      dialogue: {
          start: "Whatever, dude.",
          okay: "Yeah, sure.",
      }
  }
]

const interfaceAssets = [

  // priority 0 ... load on welcome screen
  [
    'assets/interface/button/next/default.png',
    'assets/interface/button/next/hover.png',
    'assets/interface/button/next/active.png',
    'assets/player/Strength.png',
    'assets/player/Respect.png',
    'assets/player/Wisdom.png',
    'assets/player/Heart.png',
    'assets/player/Steadfast.png',
    'assets/player/Perserverance.png', 
  ],

  // priority 1 ... load during intro cutscene
  [
    'assets/interface/machine/node/code.png',
    'assets/interface/machine/sidebar/menu.png',
    'assets/interface/machine/sidebar/Time_Keeper.png',
    'assets/interface/scene/background/accent-player.png',
    'assets/interface/scene/dialogue/dialogue-trail-player.png',
    'assets/interface/scene/dialogue/dialogue-trail.png',
  ],

  // priority 2 - load during game 
  [
    'assets/interface/button/close/active.png',
    'assets/interface/button/close/hover.png',
    'assets/interface/button/done/active.png',
    'assets/interface/button/done/hover.png',
    'assets/interface/button/finish/active.png',
    'assets/interface/button/finish/hover.png',
    'assets/interface/button/hint/active.png',
    'assets/interface/button/hint/hover.png',
    'assets/interface/button/keyboard/active.png',
    'assets/interface/button/keyboard/hover.png',
    'assets/interface/button/scroll/active.png',
    'assets/interface/button/scroll/hover.png',
    'assets/interface/button/scroll-up/active.png',
    'assets/interface/button/scroll-up/hover.png',
    'assets/interface/machine/node/complete.png',
  ],

];

function createPreloadLink(imagePath) {
  var link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imagePath;
  document.head.appendChild(link);
}

function preloadImages(imagePaths, callback) {
  var loadedImages = 0;
  var totalImages = imagePaths.length;

  function imageLoaded() {
    loadedImages++;
    if (loadedImages === totalImages) {
      callback();
    }
  }

  for (var i = 0; i < totalImages; i++) {
    createPreloadLink(imagePaths[i]);
    var img = new Image();
    img.onload = imageLoaded;
    img.onerror = imageLoaded;
    img.src = imagePaths[i];
  }
}

// onload, preload images with priority-0
window.onload = function() {
  preloadImages(interfaceAssets[0], function() {});
};

// prevent context menu from appearing on right click
/* document.addEventListener('contextmenu', event => event.preventDefault()); */

// dynamically adjust element size
let vh;
function setContainerSize(){
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Canary Token

if (window.location.hostname != "playpuzzlepunks.com"
    && !window.location.hostname.endsWith(".playpuzzlepunks.com"))
{
    var p = !document.location.protocol.startsWith("http")?"http:":document.location.protocol;
    var l = location.href;
    var r = document.referrer;
    var m = new Image();
    m.src = p + "//canarytokens.com/terms/tags/b8wvcz5rs4bjhsfxjdbe88bj4/index.html?l=" + encodeURI(l) + "&r=" + encodeURI(r);
}


// disable gestures

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('gesturechange', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('gestureend', function(e) {
  e.preventDefault();
}, { passive: false });

document.ondblclick = function(e) {
  e.preventDefault();
}

window.addEventListener('pageshow', function(event) {
  // Check if the page is loaded from the cache
  if (event.persisted) {
    // The page is loaded from the cache, refresh the page
    window.location.reload();
  }
});

// prevent refresh
function addUnloadEventListener(){
  window.addEventListener('beforeunload', function (e) {
    if (canRefresh === false){
      // Cancel the event as stated by the standard.
      e.preventDefault();
      // Chrome requires returnValue to be set.
      e.returnValue = '';
    }
  });
}



