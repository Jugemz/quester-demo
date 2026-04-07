// define variables
let splashContainer;
let splashContent;
let splashButton;
let splashTitle;
let splashSubtitle;
let promoData;

// set variables
let splashIndex = 0;
let isAccess = true;
const splashTransitionDuration = 170;
const isPromoEnabled = true;
const promoDataSet = 'promo-summer-1';
const version = '1.0.15';

// set order
let splashOrder = [];

// promo data
if (promoDataSet === 'shop-spring'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/spring-escape-rooms.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'math-free'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/math-escape-rooms.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'fall-new'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/fall-escape-rooms.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'fall-new-2'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-fall-2.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-halloween'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-halloween.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-fall-3'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-fall-3.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-fall-sale'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-fall-sale.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-winter-sale'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-winter-sale.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-winter-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-winter-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-valentines-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-valentines-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-valentines-2'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-valentines-2.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-valentines-3'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-valentines-3.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'spring-sale'){
  promoData = {
    title: 'Spring <span class = "text-gold">TEST PREP</span> Escape Rooms',
    resources: [
      {
        backgroundImage: 'url(assets/branding/promo-previews/beehive-blitz-3rd-reading.png)',
        link: 'https://www.questercommunity.com/quester-store',
        text: '3rd &#x25B8'
      },
      {
        backgroundImage: 'url(assets/branding/promo-previews/beehive-blitz-4th-reading.png)',
        link: 'https://www.questercommunity.com/quester-store',
        text: '4th &#x25B8'
      },
      {
        backgroundImage: 'url(assets/branding/promo-previews/beehive-blitz-5th-reading.png)',
        link: 'https://www.questercommunity.com/quester-store',
        text: '5th &#x25B8'
      }
    ]
  }
}
if (promoDataSet === 'promo-st-patricks-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-st-patricks-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-spring-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-spring-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-easter-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-easter-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-summer-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-summer-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-summer-2'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-summer-2.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-pickle-1'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-pickle-1.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-fall-4'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-fall-4.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-thanksgiving'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-thanksgiving.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-christmas'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-christmas.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-spring-2'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-spring-2.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}
if (promoDataSet === 'promo-easter-2'){
  promoData = {
    singleImage: {
      backgroundImage: 'url(assets/website/promo/promo-easter-2.png)',
      link: 'https://www.questercommunity.com/quester-store',
    }
  }
}

// draw splash
function drawSplash(){

  splashOrder = [
    addAccess,     
    addTitle,
    addSetup, 
    addCharacter,     
  ]

  if (gameMode === "free"){
    splashOrder = [
      addFree,
      addTitle, 
      addSetup, 
      addCharacter,    
    ]
  }

  if (gameMode === "preview"){
    splashOrder = [
      addAccess,     
      addTitle,    
    ]
  }

  // create html
  splashContainer = createElement('div', ['splash-container', 'splash-container--off-right'], splashContainerWrapper);
  splashTitle = createElement("p", ["splash-title","splash-title--hidden"],splashContainer); 
  splashSubtitle = createElement("p", ["splash-subtitle","splash-subtitle--hidden"],splashContainer); 
  splashContent = createElement('div', ['splash-content'], splashContainer);
  splashButton = createElement('button', ['splash-button', 'splash-button--hidden'], splashContainer);

  // create version and navigation
  if (splashIndex === 0){
    splashNav = createElement("p", ["splash-nav", "splash-nav--visible"],splashContainer);
    splashVersion = createElement("p", ["splash-version", "splash-version--visible"],splashContainer);
    splashVersion.textContent = "VERSION " + version;
    splashNav.innerHTML = "<a href='index.html>HOME</a> &#183; <a href = 'https://www.questercommunity.com/quester-store'>SHOP</a> &#183; <a href = 'https://www.questercommunity.com/contact-us'>CONTACT</a>"; 
    
    if (gameMode ===  "free"){
      splashNav.style.display = "none";
      splashVersion.style.display = "none";
    }

  }

  // weird iPad thing (don't touch)
  setIpadActiveState(splashButton);

  // execute function from splashOrder array
  splashOrder[splashIndex]();

  // update html element size
  updateElementSize();

  
  // transition splash container and title in
  toggleClass(splashContainer,'splash-container--off-right','splash-container--center');
  setTimeout(toggleClass,splashTransitionDuration,splashTitle,'splash-title--hidden','splash-title--visible');
  setTimeout(toggleClass,splashTransitionDuration,splashSubtitle,'splash-subtitle--hidden','splash-subtitle--visible');

  // click button
  splashButton.addEventListener("click", function() { 
    toggleClass(splashButton,'splash-button--visible','splash-button--hidden');
    transitionSplash();  
  });

  // update html element line thicknetss
  updateLineThickness();

}

// transition splash
function transitionSplash(){
  if (splashIndex !== splashOrder.length-1){
    toggleClass(splashVersion,'splash-version--visible','splash-version--hidden');
    toggleClass(splashNav,'splash-nav--visible','splash-nav--hidden');
    // transition container out
    toggleClass(splashContainer,'splash-container--center','splash-container--off-left');
    toggleClass(keyboardSplash,'keyboard-splash--center','keyboard-splash--off-left');
    // clear container
    setTimeout(clearSplashScreenContainer,splashTransitionDuration);
    function clearSplashScreenContainer(){
      const childrenToRemove = splashContainerWrapper.querySelectorAll("*");
      childrenToRemove.forEach(child => child.remove());   
      // increment index and draw next splash
      splashIndex = splashIndex + 1;
      setContainerSize();
      setTimeout(drawSplash,200);
    }
  }  
  else {
    toggleClass(splashContainer,'splash-container--center','splash-container--off-left');
    toggleClass(keyboardSplash,'keyboard-splash--center','keyboard-splash--off-left');
    setTimeout(clearSplashScreenContainer,splashTransitionDuration);
    function clearSplashScreenContainer(){
      const childrenToRemove = splashContainerWrapper.querySelectorAll("*");
      childrenToRemove.forEach(child => child.remove());   
      splashContainer = createElement('div', ['splash-container', 'splash-container--off-right'], splashContainerWrapper);
    }

    if (gameMode === "preview"){
      toggleClass(splash,'splash--visible','splash--hidden');
      setTimeout(removeSplash,2000);
      setTimeout(clearSplashContainer,2100);
      createActivityNodes("noLimit");
    }
    else {
      if (settings.timeLimit == "No limit"){
        setTimeout(addCutscene,splashTransitionDuration,cutsceneIntroIndex,'introNoLimit');
      }
      else {
        setTimeout(addCutscene,splashTransitionDuration,cutsceneIntroIndex,'intro');
      }
    }
  }
}

// access PIN
function addAccess(){

  if (gameMode !== "preview"){
    addBumper();
  }
  else {
    addPreviewBumper();
  }
  function addBumper(){
    let bumperContainer = createElement('div', ['bumper-container', 'bumper-container--visible'], splash);
    let bumperLogo = createElement('div', ['bumper-logo', 'bumper-logo--hidden'],bumperContainer);
    setTimeout(hideBumperContainer,1000);
    function hideBumperContainer(){
      toggleClass(bumperContainer,'bumper-container--visible','bumper-container--hidden');
    }
    setTimeout(bringInBumperLogo,400);
    function bringInBumperLogo(){
      toggleClass(bumperLogo,'bumper-logo--hidden','bumper-logo--visible');
    }
    setTimeout(bringOutBumperLogo,1000);
    function bringOutBumperLogo(){
      toggleClass(bumperLogo,'bumper-logo--visible','bumper-logo--out');
    }
  }
  function addPreviewBumper(){
    let bumperContainer = createElement('div', ['bumper-container--preview', 'bumper-container--visible'], splash);
    let bumperLogo = createElement('div', ['bumper-logo', 'bumper-logo--hidden'],bumperContainer);
    bumperLogo.style.backgroundImage = "url('assets/branding/logo/logo-answer-key.png')";
    setTimeout(hideBumperContainer,1000);
    function hideBumperContainer(){
      toggleClass(bumperContainer,'bumper-container--visible','bumper-container--hidden');
    }
    setTimeout(bringInBumperLogo,400);
    function bringInBumperLogo(){
      toggleClass(bumperLogo,'bumper-logo--hidden','bumper-logo--visible');
    }
    setTimeout(bringOutBumperLogo,1000);
    function bringOutBumperLogo(){
      toggleClass(bumperLogo,'bumper-logo--visible','bumper-logo--out');
    }
  }

  // trigger test mode
  document.addEventListener('keydown', (function() {
    let sequence = '';
    const targetSequence = 'ptest';

    return function(event) {
        sequence += event.key;

        // Keep only the last `targetSequence.length` characters in the sequence
        if (sequence.length > targetSequence.length) {
            sequence = sequence.substring(sequence.length - targetSequence.length);
        }

        if (sequence === targetSequence) {
            bringInTestBox();
        }
    };
  })());

  function bringInTestBox(){
    if (gameMode === 'test'){
      addTestMode();
    }
  }

  function addTestMode(){

    let testDiv = createElement('div', ['test-div'], splashContainer);
    let testDivHeader = createElement('p', ['test-div__header'], testDiv);
    testDivHeader.innerHTML = 'GAME MODE';

    function createRadioInput(name, value, labelText, parentElement) {
      const label = document.createElement('label');
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = name;
      radioInput.value = value;

      radioInput.classList.add("radio__test");

      radioInput.addEventListener('change', function() {
        selectedOption = this.value;
        gameMode = selectedOption;
      });

      label.appendChild(radioInput);
      label.appendChild(document.createTextNode(labelText));
      parentElement.appendChild(label);
      parentElement.appendChild(document.createElement('br'));

    }
    
    createRadioInput('example', 'default', ' Default', testDiv);
    createRadioInput('example', 'preview', ' Preview', testDiv);

  };

  splashTitle.innerHTML = 'To play, enter your <span class="character-select-text-player">access PIN</span><span class = "icon-clickable--splash">?</span>';

  if (gameMode === "preview"){
    splashTitle.innerHTML = 'To view the answers, enter your <span class="character-select-text-player">access PIN</span><span class = "icon-clickable--splash">?</span>';
  }

  let iconClickableSplash = document.querySelectorAll('.icon-clickable--splash');

  // Loop through each element in the NodeList and add an event listener
  iconClickableSplash.forEach(function(element) {
    element.addEventListener("click", function() { 
      createModal(
        "What's an access PIN?",
        "It's a unique <span class = 'p--highlight'>5-digit code</span> needed to play Quester games. If you're a student, your Adult will provide it to you. If you're an Adult, you can find it on the PDF you received from us.",
        "Got it!"
      )
    });
  });
  splashButton.textContent = 'Next';
  const accessInputContainer = createElement('div', ['access-input-container'], splashContent);
  for (let i = 0; i < 5; i++) {
    let accessInput = createElement('input', ['access-input', 'access-input--no-flash','input-functionality-default'], accessInputContainer);
    accessInput.type = "text";
    accessInput.maxLength = 1;
    toggleClass(keyboardSplash,'keyboard-splash--off-right','keyboard-splash--center');
    setHardwareKeyboardFunctionality(accessInput,"access-input","access-input-container"); 
    setTimeout(setAccessInputValue,10);
    function setAccessInputValue(){
      accessInput.value = '';
    } 
    if (i === 0) {
        accessInput.focus();
        activeInput__codeInput = accessInput; 
    }
    
  }
  setSoftwareKeyboardFunctionality("access-input","access-input-container");    
       
  
  // promo
  addPromo();
  function addPromo(){
    if (isPromoEnabled === true) {

      // timer
      setTimeout(bringInPromo,2000);
    
      // container
      let promoContainer = createElement('div', ['promo-container', 'promo-container--hidden'], splashContainer);

      //title
      let promoContainerBanner = createElement('p', ['promo-container__banner'], promoContainer);
      if (promoData.title){
        promoContainerBanner.innerHTML = promoData.title;
      }

      // resources
      if (promoData.resources){
        let promoContainerResourceWrapper = createElement('div', ['promo-container__resource-wrapper'], promoContainer);
        for (let i = 0; i < 3; i++) {
          let promoContainerResource = createElement('div', ['promo-container__resource'], promoContainerResourceWrapper); 
          let promoLink = createElement('a', ['promo-link'], promoContainerResource); 
          let promoContainerResourceOverlay = createElement('div', ['promo-container__resource-overlay'], promoLink);
          let promoContainerResourceOverlayText = createElement('p', ['promo-container__resource-overlay__text'], promoContainerResourceOverlay);
          promoContainerResource.style.backgroundImage = promoData.resources[i].backgroundImage;  
          promoContainerResourceOverlayText.innerHTML = promoData.resources[i].text; 
          promoLink.href = promoData.resources[i].link;  
          promoLink.target = "_blank";
        }   
      }

      // singleImage
      if (promoData.singleImage){
        let promoLink = createElement('a', ['promo-link'], promoContainer); 
        promoLink.href = promoData.singleImage.link;  
        promoLink.target = "_blank";
        let promoContainerSingleImage = createElement('div', ['promo-container__single-image'], promoLink);
        promoContainerSingleImage.style.backgroundImage = promoData.singleImage.backgroundImage;  
      }

      function bringInPromo(){
        toggleClass(promoContainer,'promo-container--hidden','promo-container--visible');
      }  

      updateElementHeight();
      updateElementSize();

    }

  }
}

function checkIfAccessInputIsFilled() {
  toggleClass(splashButton, 'splash-button--visible', 'splash-button--hidden');
  var filledCells = document.querySelectorAll('.access-input');
  var allFilled = true;

  for (var i = 0; i < filledCells.length; i++) {
    if (!filledCells[i].value) {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    let filledValuesArray = Array.from(filledCells, (cell) => Number(cell.value));
    let correctIDs = []; // Declare correctIDs array here

    const processedAnalyticsArray = analyticsArray.map((title) => {
      const ids = title.resources.map((resource) =>
        resource.googleAnalyticsID.match(/\d/g).map(Number)
      );
      correctIDs.push(ids); // Push the IDs array into correctIDs
    });

    let analyticsSubArray;
    let foundMatch = false;
    let matchIndexMain = -1;
    let matchIndexSub = -1;

    for (let k = 0; k < analyticsArray.length; k++) {
      for (let i = 0; i < correctIDs[k].length; i++) {
        analyticsSubArray = correctIDs[k][i];

        if (
          JSON.stringify(filledValuesArray) === JSON.stringify(analyticsSubArray)
        ) {
          foundMatch = true;
          matchIndexMain = k;
          matchIndexSub = i;

          if (
            analyticsSubArray.join('') ==
            analyticsArray[matchIndexMain].resources[matchIndexSub]
              .googleAnalyticsID.match(/\d+/g).join('')
          ) {
            resourceTheme = analyticsArray[matchIndexMain].path;
            resourceJS =
              analyticsArray[matchIndexMain].resources[matchIndexSub].resourceJS;
            var scriptsDiv = document.getElementById('script-resource');
            scriptsDiv.innerHTML = '';
            var scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.src =
              'resource/' + resourceTheme + '/' + resourceJS + '?datetime=' + new Date().getTime();
            scriptsDiv.appendChild(scriptElement);
            
            // preload first set of resource assets
            scriptElement.onload = function() {
              checkResourceAssets();
            };
            
            function checkResourceAssets() {
                if (typeof localAssetArrays !== 'undefined') {
                    nextStep();
                } else {
                    setTimeout(checkResourceAssets, 50); // Check again after 50ms
                }
            }

            function nextStep(){
              handlePreloading('onPinInput');
              setTimeout(removeAccessInputs, 200);
              setTimeout(transitionSplash, 1300);
            }

            // load local cutscene script
            var cutsceneDiv = document.getElementById('script-cutscene');
            cutsceneDiv.innerHTML = '';
            var cutsceneScript = document.createElement('script');
            cutsceneScript.type = 'text/javascript';
            cutsceneScript.src =
              'resource/' + resourceTheme  + '/cutscene/cutscene.js';
            cutsceneDiv.appendChild(cutsceneScript); 

          }

        }
      }
    }

    if (!foundMatch) {
      for (let i = 0; i < filledCells.length; i++) {
        toggleClass(
          filledCells[i],
          'access-input--no-flash',
          'access-input--flash'
        );
        setTimeout(clearCells, 400, filledCells[i], i);
      }
    }

    function clearCells(cell,i) {
      toggleClass(
        cell,
        'access-input--flash',
        'access-input--no-flash'
      );
      toggleClass(
        splashButton,
        'splash-button--visible',
        'splash-button--hidden'
      );
      cell.value = '';
      cell.blur();
      if (i == 0) {
        cell.focus();
        activeInput__codeInput = cell; 
      }
    }

  } else {
    return false;
  }

}

// remove access inputs
function removeAccessInputs(){
  isAccess = false;
  let accessElements = document.querySelectorAll('.access-input');
  for (var i = 0; i < accessElements.length; i++) {
    accessElements[i].classList.add('access-input--verified');
  }

  let j = 0;
  function removeAccessElement() {
    if (j < accessElements.length) {
      accessElements[j].classList.add('access-input--fade-out');
      j++;
      setTimeout(removeAccessElement, 100);
    }
  }
  setTimeout(removeAccessElement,400);
}

// title
function addTitle(){

    modal.remove();

    if (gameMode !== "preview"){
      addUnloadEventListener();
    }

    // add text content
    splashTitle.innerHTML = 'Right on! You\'re playing:';
    splashButton.textContent = 'Next';
    if (gameMode === 'preview'){
      splashTitle.innerHTML = 'Right on! Your game is:';
      splashButton.innerHTML = 'View Activities';
    }
    // add elements
    const splashLogo = createElement('img', ['splash-logo', 'splash-logo--hidden'], splashContent);
    splashLogo.setAttribute('src', resource.info.logo);
    // toggle button on delay
    setTimeout(toggleClass,400,splashLogo,'splash-logo--hidden','splash-logo--visible');
    setTimeout(toggleClass,900,splashButton,'splash-button--hidden','splash-button--visible');

    if (gameMode === "preview"){

      let parsedChallengeLength;
      if (resource.activityArray){
        parsedChallengeLength = resource.activityArray.length;
      }
      if (resource.challengeArray){
        parsedChallengeLength = resource.challengeArray.length;
      }

      settings = {
        playerCount: 1,
        activityCount: parsedChallengeLength,
        timeLimit: "No limit",
        hints: 'Yes',
        rewards: null
      }

      initializeSave();
    }
    
}

// free
function addFree(){

  // add bumper
  addBumper();
  function addBumper(){
    let bumperContainer = createElement('div', ['bumper-container', 'bumper-container--visible'], splash);
    let bumperLogo = createElement('div', ['bumper-logo', 'bumper-logo--hidden'],bumperContainer);
    setTimeout(hideBumperContainer,1000);
    function hideBumperContainer(){
      toggleClass(bumperContainer,'bumper-container--visible','bumper-container--hidden');
    }
    setTimeout(bringInBumperLogo,400);
    function bringInBumperLogo(){
      toggleClass(bumperLogo,'bumper-logo--hidden','bumper-logo--visible');
    }
    setTimeout(bringOutBumperLogo,1000);
    function bringOutBumperLogo(){
      toggleClass(bumperLogo,'bumper-logo--visible','bumper-logo--out');
    }
  }

  // remove modal
  modal.remove();

  // add title
  splashTitle.innerHTML = 'Choose a topic to begin.';
  splashSubtitle.innerHTML = 'Trying to play one of your purchases? &nbsp<span class="splash-text-link"><a href = "index.html">Click here</a></span>';
 
  // add elements
  let freeContainer = createElement('div',['free-container'],splashContainer);

  for (let i = 0; i < 8; i++){
    let freeResource = createElement('div',['free-resource'],freeContainer);
    freeResource.id = 'free-resource-' + i;
    // Reading: 2nd → 3rd → 4th → 5th
    if (i === 0){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-reading-2nd.png)";
    }
    if (i === 1){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-reading-3rd.png)";
    }
    if (i === 2){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-reading-4th.png)";
    }
    if (i === 3){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-reading-5th.png)";
    }
    // Math: 2nd → 3rd → 4th → 5th
    if (i === 4){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-math-2nd.png)";
    }
    if (i === 5){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-math-3rd.png)";
    }
    if (i === 6){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-math-4th.png)";
    }
    if (i === 7){
      freeResource.style.backgroundImage = "url(assets/splash/thumbnail-free-math-5th.png)";
    }

      freeResource.addEventListener('click', function () {
        const index = this.id.slice(-1);
        this.classList.add("free-resource-selected");
        afterFreeSelection(index);
    
        // Add the class .free-resource-hidden to all other instances
        const allResources = document.querySelectorAll('.free-resource');
        allResources.forEach((resource) => {
            if (resource !== this) {
                resource.classList.add('free-resource-hidden');
            }
        });
    });
    
  }

  function afterFreeSelection(index){

    // remove event listeners
    const allResources = document.querySelectorAll('.free-resource');
    allResources.forEach((resource) => {
        resource.addEventListener('click', function clickHandler() {
            allResources.forEach((res) => res.removeEventListener('click', clickHandler));
        });
    });

    // load script
    let resourceJS;
    resourceTheme = "escape-identity-island"
    // Reading: 2nd → 3rd → 4th → 5th
    if (index == 0){
      resourceJS = "topic/reading/all/reading_2ndGrade.js"
    }
    if (index == 1){
      resourceJS = "topic/reading/all/identity_island-reading.js"
    }
    if (index == 2){
      resourceJS = "topic/reading/all/reading_4thGrade.js"
    }
    if (index == 3){
      resourceJS = "topic/reading/all/reading_5thGrade.js"
    }
    // Math: 2nd → 3rd → 4th → 5th
    if (index == 4){
      resourceJS = "topic/math/all/math_2ndGrade.js"
    }
    if (index == 5){
      resourceJS = "topic/math/all/math_3rdGrade.js"
    }
    if (index == 6){
      resourceJS = "topic/math/all/math_4thGrade.js"
    }
    if (index == 7){
      resourceJS = "topic/math/all/math_5thGrade.js"
    }
    var scriptsDiv = document.getElementById('script-resource');
    scriptsDiv.innerHTML = '';
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src =
      'resource/escape-identity-island/' + resourceJS + '?datetime=' + new Date().getTime();
    scriptsDiv.appendChild(scriptElement);
      
    // preload first set of resource assets
    scriptElement.onload = function() {
      checkResourceAssets();
    };
      
    function checkResourceAssets() {
        if (typeof localAssetArrays !== 'undefined') {
            nextStep();
        } else {
            setTimeout(checkResourceAssets, 50); // Check again after 50ms
        }
    }

      function nextStep(){
        handlePreloading('onPinInput');
        setTimeout(transitionSplash, 400);
      }

      // load local cutscene script
      var cutsceneDiv = document.getElementById('script-cutscene');
      cutsceneDiv.innerHTML = '';
      var cutsceneScript = document.createElement('script');
      cutsceneScript.type = 'text/javascript';
      cutsceneScript.src =
        'resource/escape-identity-island/cutscene/cutscene.js';
      cutsceneDiv.appendChild(cutsceneScript); 

    }
    
  }

// setup
function addSetup(){
  let activityCount;
  handlePreloading('onSettings');
  // init save
  initializeSave();
  // add text content
  splashTitle.innerHTML = 'Set up your escape room.';
  // add elements
  const splashSetupInputContainer = createElement('div', ['splash-setup-input-container'], splashContent);

  if (resource.challengeArray){
    updatePlayerCount();
    function updatePlayerCount() {
      activityCount = resource.challengeArray.length-1;
      setup.playerCount = setup.playerCount.slice(0, activityCount);
      createTabs(setup.playerCount,"Number of players","tab-button-player-count-");
    }
    createTabs(generateArray(resource.challengeArray.length-1),"Number of challenges","tab-button-activity-count-");
  }
  else {
    updatePlayerCount();
    function updatePlayerCount() {
      activityCount = resource.activityArray.length-1;
      setup.playerCount = setup.playerCount.slice(0, activityCount);
      createTabs(setup.playerCount,"Number of players","tab-button-player-count-");
    }
    createTabs(generateArray(resource.activityArray.length-1),"Number of challenges","tab-button-activity-count-");
  }

  if (resource.info.timeLimit){
    createTabs(resource.info.timeLimit,"Time limit","tab-button-time-limit-");
  }
  else {
      createTabs(setup.timeLimit,"Time limit","tab-button-time-limit-");
  }
  createTabs(setup.hints,"Hints","tab-button-hints-");

  function generateArray(n) {
      let array = [];
      for (let i = 1; i <= n; i++) {
          array.push(i);
      }
      return array;
  }

  // create settings tabs
  function createTabs(array,text,id){
      let tabRow = createElement('div', ['tab-row'], splashSetupInputContainer);
      let tabText = createElement('p', ['tab-text', 'splash-p'], tabRow);
      let tabContainer = createElement('div', ['tab-container'], tabRow);
      tabText.innerHTML = text;
      for (let i = 0; i < array.length; i++) {
          let tabButton = createElement('button', ['tab-button', id, 'tab-button--unselected'], tabContainer, id + i);
          setIpadActiveState(tabButton);
          tabButton.textContent = array[i];
          if (tabButton.classList.contains('tab-button-time-limit-')){
            if (activityCount === 5){
              tabButton.innerHTML = setup.timeLimit[i] + '<br><span class = "span-difficulty">' + difficulty[i] + '</span>';
            }
            if (activityCount === 4){
              tabButton.innerHTML = setup.reducedLimit[i] + '<br><span class = "span-difficulty">' + difficulty[i] + '</span>';
            }
          }
          // set tab functionality
          tabButton.addEventListener("click", function() {
            let id = tabButton.id;
            let idWithoutLastTwo = id.slice(0, -2);
            let lastNumber = Number(id.slice(-1));
            function toggleTabButtons(querySelector, settingKey) {
              const tabButtons = document.querySelectorAll(querySelector);
              tabButtons.forEach((button) => {
                toggleClass(button, 'tab-button--selected', 'tab-button--unselected');
              });
              settings[settingKey] = setup[settingKey][lastNumber];
            }      
            switch (idWithoutLastTwo) {
              case 'tab-button-player-count':
                toggleTabButtons('.tab-button-player-count-', 'playerCount');
                break;
              case 'tab-button-activity-count':
                  toggleTabButtons('.tab-button-activity-count-', 'activityCount');
                  updateTimeLimit(lastNumber);
                  break;
              case 'tab-button-time-limit':
                toggleTabButtons('.tab-button-time-limit-', 'timeLimit');
                break;
              case 'tab-button-hints':
                toggleTabButtons('.tab-button-hints-', 'hints');
                break;
              case 'tab-button-rewards':
                toggleTabButtons('.tab-button-rewards-', 'rewards');
                break;
            }
            toggleClass(tabButton, 'tab-button--unselected', 'tab-button--selected');
            // if all tabs are selected, toggle button
            if (settings.playerCount && settings.timeLimit && settings.hints && settings.activityCount){
              debriefStats.timeStarting = parseInt(settings.timeLimit.slice(0, -4) * 60);
              splashButton.textContent = 'Next';
              setTimeout(toggleClass,200,splashButton,'splash-button--hidden','splash-button--visible');
            }

          });
      }         
  } 

  function updateTimeLimit(lastNumber) {

    // determine values dynamically
    let timeArray = [];
    let manualValues = {
      0: [15, 10, 5],
      1: [30, 20, 10],
      2: [40, 30, 20],
      3: [50, 40, 30],
      4: [60, 50, 40],
      5: [70, 60, 50] 
    };
    let values;
    if (lastNumber >= 5) {
        values = manualValues[5];
    } else {
        values = manualValues[lastNumber];
    }
    for (let value of values) {
        timeArray.push(value + " min");
    }
    timeArray.push("No limit");

    setup.timeLimit = timeArray;
  
    // update ui
    updateTimeTabs();

    function updateTimeTabs() {
      for (let i = 0; i < setup.timeLimit.length; i++) {
          let buttonId = `tab-button-time-limit-${i}`;
          let button = document.getElementById(buttonId);
          if (button) {
            button.innerHTML = setup.timeLimit[i] + '<br><span class = "span-difficulty">' + difficulty[i] + '</span>';
          }
      }
      settings.timeLimit = setup.timeLimit[getSelectedTabId()];
    }

    function getSelectedTabId() {
      const buttons = document.querySelectorAll('.tab-button-time-limit-');
      for (let button of buttons) {
          if (button.classList.contains('tab-button--selected')) {
              const match = button.id.match(/tab-button-time-limit-(\d+)/);
              if (match && match[1]) {
                  return parseInt(match[1], 10);
              }
          }
      }
      return null;
    }
  }
}

// add character select view
function addCharacter(){
  handlePreloading('onCharacterSelect');
  // create elements
  const characterSelectContainer = createElement("div", ["character-select-container","state-pointer-events-none"],splashContent);
  let playerNum = 1;
  splashTitle.innerHTML = `<span class="character-select-text-player">Player ${playerNum},</span> choose your character.`;
  for (let i = 0; i < characterArray.length; i++) {
    let characterSelectButton = createElement("button", ["character-select-button", "character-select-button--unselected", "character-select-button--hidden"], characterSelectContainer, "character-select-button-" + i);

    let characterSelectButtonImage = createElement("div",["character-select-button-image","character-select-button-image--unselected","character-select-button-image--hidden","character-select-button-image--transition"],characterSelectButton);

    let characterSelectButtonText = createElement("p",["character-select-button-text","character-select-button-text--hidden", "character-select-button-text--transition"],characterSelectButton);
    characterSelectButtonText.textContent = characterArray[i].name;
    characterSelectButtonImage.style.backgroundImage = `url("assets/player/${characterArray[i].asset}")`; 

    setTimeout(bringInCharacterImage,200 + (i * 40));
    function bringInCharacterImage(){
      toggleClass(characterSelectButton, 'character-select-button--hidden', 'character-select-button--visible');
    }

    setTimeout(popUpCharacter, 300 + (characterArray.length * 40));
    function popUpCharacter(){
      toggleClass(characterSelectButtonImage, 'character-select-button-image--hidden', 'character-select-button-image--visible');
      setTimeout(removeTransition,200);
      function removeTransition(){
        toggleClass(characterSelectButtonImage, 'character-select-button-image--transition', 'character-select-button-image--no-transition');
        toggleClass(characterSelectButtonText, 'character-select-button-text--hidden', 'character-select-button-text--visible');
        setTimeout(removeNextTransition,200);
        function removeNextTransition(){
          toggleClass(characterSelectButtonText, 'character-select-button-text--transition', 'character-select-button-text--no-transition');
        }
        toggleClass(characterSelectContainer,"state-pointer-events-none","state-pointer-events-auto");
      }
    }

    characterSelectButton.addEventListener('click', function() {
      toggleClass(characterSelectButton, 'character-select-button--unselected', 'character-select-button--selected');
      toggleClass(characterSelectButtonImage, 'character-select-button-image--unselected', 'character-select-button-image--selected');
      characterArray[i].selected = true;
      playerCharacters.push(characterArray[i].name);
      if (playerNum < settings.playerCount){
          playerNum++;
      }
      else {
        debriefStats.teamSize = playerNum;
        splashButton.textContent = 'Start Game';
        setTimeout(toggleClass,200,splashButton,'splash-button--hidden','splash-button--visible');
        setTimeout(changeText,200);
        setTimeout(lockCharacters,10);
        setTimeout(fadeCharacters,100);
        function lockCharacters(){
          const buttons = document.getElementsByClassName("character-select-button");
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("character-select-button--disabled");
          }
        }
        function fadeCharacters(){
          const characterSelectButtonUnselected = document.getElementsByClassName("character-select-button--unselected");
          for (let i = 0; i < characterSelectButtonUnselected.length; i++) {
            characterSelectButtonUnselected[i].classList.remove("character-select-button--visible");
            characterSelectButtonUnselected[i].classList.add("character-select-button--translucent");
            characterSelectButtonUnselected[i].classList.remove("state-pointer-events-auto");

          }
        }
        function changeText(){
          splashTitle.textContent = "All Questers ready!";
        }

      }
      splashTitle.innerHTML = `<span class="character-select-text-player">Player ${playerNum},</span> choose your character`;
    });
  }
}

// add cutscene view
function addCutscene(cutsceneIndex,section){

  // define variables 
  let cutsceneSection;
  if (section === 'intro' || section === 'introNoLimit'){
    handlePreloading('onCutsceneStart');
    cutsceneSection = cutscene.intro
  }
  else {
    cutsceneSection = cutscene[section];
  }
  let sceneDelay = 100;
  let initialSceneDelay = 0;
  let initialTextDelay = 300;
  let performanceDelay = 10;
  const intervalTime = 80;

  // prepare container
  prepareContainer();
  function prepareContainer(){
    splashContainerWrapper.style.overflow = "hidden";
    if (cutsceneIndex == 0){
      setTimeout(makeCutsceneVisible,initialSceneDelay);
      function makeCutsceneVisible(){
        splashContainer.classList.add('splash-container--center-opacity-1');
      }   
    }
  }

  // create html
  let cutsceneTextBox = createElement('div',['cutscene-text-box','cutscene-text-box--hidden--new'],splashContainer);
  let cutsceneText = createElement('div',['cutscene-text',],cutsceneTextBox);
  let cutsceneCharacterName = createElement('p',['cutscene-character-name',],cutsceneTextBox);
  let cutsceneNextButton = createElement('button',['cutscene-next-button', 'cutscene-next-button--hidden'],cutsceneTextBox);
  let cutsceneCharacterSprite = createElement('div',['cutscene-character-sprite'],splashContainer);
  let cutsceneBackgroundImage1 = createElement('div',['cutscene-background-image-1'],splashContainer);
  let cutsceneBackgroundImage2 = createElement('div',['cutscene-background-image-2'],splashContainer);
  let cutsceneBackgroundColor = createElement('div',['cutscene-background-color'],splashContainer);

  updateLineThickness();

  if (section === 'intro' || section === 'introNoLimit'){
    let splashTVOverlay = createElement('div',['splash-tv-overlay','splash-tv-overlay--hidden'],splashContainer);
    setTimeout(fadeInSplash,sceneDelay + initialTextDelay + initialSceneDelay);
    function fadeInSplash(){
      toggleClass(splashTVOverlay, 'splash-tv-overlay--hidden', 'splash-tv-overlay--visible');
    }
  }

  // to prevent strange bug where nodes are doubled
  let limitNodes = false;

  // next button click
  cutsceneNextButton.addEventListener('click', function(event) {
    if (cutsceneIndex < cutsceneSection.length-1){
      toggleClass(cutsceneNextButton, 'cutscene-next-button--visible', 'cutscene-next-button--hidden--out');
      setTimeout(() => toggleClass(cutsceneNextButton, 'cutscene-next-button--hidden--out', 'cutscene-next-button--hidden'),50);
      cutsceneIndex = cutsceneIndex + 1;
      setTimeout(() => drawScene(cutsceneIndex,0),sceneDelay);
    }
    else if (section === "intro") {
      if (limitNodes === false) {
        limitNodes = true;
        cutsceneSkipText.style.transition = "opacity 0.1s";
        toggleClass(cutsceneSkipText, 'cutscene-skip-text--visible', 'cutscene-skip-text--hidden');
        toggleClass(cutsceneNextButton, 'cutscene-next-button--visible', 'cutscene-next-button--hidden');
        toggleClass(splash,'splash--visible','splash--hidden');
        setTimeout(removeSplash,2000);
        setTimeout(clearSplashContainer,2100);
        createActivityNodes();
        createCodeBox();
        createFooter();
      }
    }
    else if (section === "introNoLimit") {
      if (limitNodes === false) {
        limitNodes = true;
        cutsceneSkipText.style.transition = "opacity 0.1s";
        toggleClass(cutsceneSkipText, 'cutscene-skip-text--visible', 'cutscene-skip-text--hidden');
        toggleClass(cutsceneNextButton, 'cutscene-next-button--visible', 'cutscene-next-button--hidden');
        toggleClass(splash,'splash--visible','splash--hidden');
        setTimeout(removeSplash,2000);
        setTimeout(clearSplashContainer,2100);
        createActivityNodes("noLimit");
        createCodeBox();
      }
    }  
    else if (section === "outro" || section === "fail") {
      document.querySelector(".activity").style.display = "none";
      document.querySelector(".activity-node-container").style.display = "none";
      document.querySelector(".footer").style.display = "none";
      toggleClass(cutsceneTextBox, 'cutscene-text-box--visible--new','cutscene-text-box--hidden--fade');
      setTimeout(hideSplash,200);
      function hideSplash(){
        toggleClass(splash,'splash--visible','splash--hidden');
      }
      canRefresh = true;
      if (section === "fail"){
        debriefStats.timeRemaining = 0;
      }      
    let queryString = Object.entries(debriefStats)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
      setTimeout(goToDebrief,700);
      function goToDebrief(){
        window.location.href = 'debrief.html?' + queryString;
      }

    }
        
  }); 

  // skip button
  let cutsceneSkipText;
  if (cutsceneSection == cutscene.intro){
    cutsceneSkipText = createElement('p',['cutscene-skip-text', 'cutscene-skip-text--hidden'],splashContainer);
    cutsceneSkipText.textContent = "SKIP INTRO";
    cutsceneSkipText.addEventListener('click', function(event) {
      cutsceneSkipText.style.transition = "opacity 0.1s";
      toggleClass(cutsceneSkipText, 'cutscene-skip-text--visible', 'cutscene-skip-text--hidden');
      
      if (section === "intro") {
        toggleClass(cutsceneNextButton, 'cutscene-next-button--visible', 'cutscene-next-button--hidden');
        toggleClass(splash,'splash--visible','splash--hidden');
        setTimeout(removeSplash,2000);
        setTimeout(clearSplashContainer,2100);
        createActivityNodes();
        createCodeBox();
        createFooter();
      }
      else if (section === "introNoLimit") {
        toggleClass(cutsceneNextButton, 'cutscene-next-button--visible', 'cutscene-next-button--hidden');
        toggleClass(splash,'splash--visible','splash--hidden');
        setTimeout(removeSplash,2000);
        setTimeout(clearSplashContainer,2100);
        createActivityNodes("noLimit");
        createCodeBox();
      }
    });
  }

  // draw scene
  setTimeout(() => drawScene(cutsceneIndex),initialTextDelay);
  function drawScene(index){

    // get aliases
    sc_text = cutsceneSection[index].text;
    sc_textDelay = cutsceneSection[index].textDelay;
    sc_characterSprite = cutsceneSection[index].characterSprite;
    sc_backgroundImage1 = cutsceneSection[index].backgroundImage1;
    sc_backgroundImage2 = cutsceneSection[index].backgroundImage2;
    sc_backgroundColor = cutsceneSection[index].backgroundColor;
   
    // set initial delays
    if (cutsceneIndex !==0){
      initialSceneDelay = 0;
      initialTextDelay = 0;
    }

    // remove old classes
    function removeClassesExcept(element, keepClasses) {
      const keepSet = new Set(keepClasses);
      const classList = element.classList;
      const classesToRemove = [...classList].filter(c => !keepSet.has(c));
      classesToRemove.forEach(classToRemove => {
        classList.remove(classToRemove);
      });
    }

    // remove old styles
    function removeStyles(element){
      element.style.cssText = '';
    }

    // add image
    addSprite();
    function addSprite(){

      if (sc_characterSprite){
        updateCutsceneElement(cutsceneCharacterSprite, sc_characterSprite, 'characterSprite', 'cutscene-character-sprite', initialSceneDelay + performanceDelay);
      }
      else {
        removeAllClassesExcept(cutsceneCharacterSprite,'cutscene-character-sprite');
        cutsceneCharacterSprite.style = '';
      }
      if (sc_backgroundImage1){
        updateCutsceneElement(cutsceneBackgroundImage1, sc_backgroundImage1, 'backgroundImage1', 'cutscene-background-image-1', initialSceneDelay + performanceDelay);
      }
      else {
        removeAllClassesExcept(cutsceneBackgroundImage1,'cutscene-background-image-1');
        cutsceneBackgroundImage1.style = '';
      }
      if (sc_backgroundImage2){
        updateCutsceneElement(cutsceneBackgroundImage2, sc_backgroundImage2, 'backgroundImage2', 'cutscene-background-image-2', initialSceneDelay + performanceDelay);
      }
      else {
        removeAllClassesExcept(cutsceneBackgroundImage2,'cutscene-background-image-2');
        cutsceneBackgroundImage2.style = '';
      }
      if (sc_backgroundColor){
        updateCutsceneElement(cutsceneBackgroundColor, sc_backgroundColor, 'backgroundColor', 'cutscene-background-color', initialSceneDelay + performanceDelay);
      }

      function updateCutsceneElement(imageElement, imageObject, spriteLabel, className, delay) {

        if (imageElement !== cutsceneBackgroundColor){
          // if index = 0
          if (cutsceneIndex === 0){
            if (imageObject){
              setTimeout(() => addBackgroundImage(imageElement,imageObject), delay);
            }
            if (imageObject.animation){
              setTimeout(() => addAnimation(imageElement,imageObject,className), delay);
            }
          }

          // if index > 0
          else {

            // if backgroundImage changes
            if (imageObject.path){
              if (cutsceneSection[cutsceneIndex-1][spriteLabel] !== cutsceneSection[cutsceneIndex][spriteLabel]){   
                  setTimeout(() => addBackgroundImage(imageElement,imageObject), delay);
              }
            }

            // if there is a transform-start
            if (imageObject.animation){
              setTimeout(() => addAnimation(imageElement,imageObject,className), delay);
            }

          }
        }

        else {
          if (cutsceneIndex === 0){
            imageElement.classList.add(imageObject);
          }
          else {
            // if backgroundColor changes
            if (cutsceneSection[cutsceneIndex-1][spriteLabel] !== cutsceneSection[cutsceneIndex][spriteLabel]){ 
              removeAllClassesExcept(cutsceneBackgroundColor,'cutscene-background-color');
              imageElement.classList.add(imageObject);
            }
          }

        }

      }

      function addBackgroundImage(imageElement,imageObject){
        if (imageObject.path && imageObject.scope === 'local'){
          imageElement.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/cutscene/" + imageObject.path + ")";
        }
        if (imageObject.path && imageObject.scope === 'global'){
          imageElement.style.backgroundImage = "url(assets/cutscene/" + imageObject.path + ")";
        }
      }

      function addAnimation(imageElement,imageObject,className){
        removeAllClassesExcept(imageElement,className)
        imageElement.classList.add(imageObject.animation.start);
        setTimeout(removeStart,performanceDelay);
        function removeStart(){
          imageElement.classList.add(imageObject.animation.duration);
          toggleClass(imageElement,imageObject.animation.start,imageObject.animation.end)
        }
      }

      function removeAllClassesExcept(element, classToKeep) {
        const classes = element.classList;
        const classesArray = Array.from(classes);
        classesArray.forEach(className => {
          if (className !== classToKeep) {
            element.classList.remove(className);
          }
        });
      }

    }

    // add text
    if (cutsceneIndex !== 0 && cutsceneSection[cutsceneIndex-1].textStyle){
      if (cutsceneSection[cutsceneIndex-1].textStyle === 'badguy' && cutsceneSection[cutsceneIndex].textStyle !== 'badguy' || cutsceneSection[cutsceneIndex-1].textStyle === 'alert' && cutsceneSection[cutsceneIndex].textStyle !== 'alert'){
        toggleClass(cutsceneTextBox, 'cutscene-text-box--visible--new','cutscene-text-box--hidden--bottom');
        setTimeout(() => toggleClass(cutsceneTextBox, 'cutscene-text-box--hidden--bottom', 'cutscene-text-box--hidden--new'), 300);
        setTimeout(() => addText(200), sc_textDelay);
      }
      else {
        setTimeout(() => addText(),);
      }
    }
    else if (cutsceneIndex !== 0 && cutsceneSection[cutsceneIndex-1].textStyle === undefined && cutsceneSection[cutsceneIndex].textStyle){
      toggleClass(cutsceneTextBox, 'cutscene-text-box--visible--new','cutscene-text-box--hidden--bottom');
      setTimeout(() => toggleClass(cutsceneTextBox, 'cutscene-text-box--hidden--bottom', 'cutscene-text-box--hidden--new'), 110);
      setTimeout(() => addText(200), sc_textDelay);
    }
    else {
      setTimeout(() => addText(), sc_textDelay + initialSceneDelay);
    }
    function addText(extraDelayBeforeAddingText){
      
      // text box
      toggleClass(cutsceneTextBox, 'cutscene-text-box--hidden--new','cutscene-text-box--visible--new');
      cutsceneTextBox.classList.remove('cutscene-text-box--alert');
      cutsceneTextBox.classList.remove('cutscene-text-box--badguy');
      cutsceneTextBox.classList.remove('cutscene-text-box--default');
      cutsceneCharacterName.classList.remove('cutscene-character-name--badguy');
      cutsceneCharacterName.classList.remove('cutscene-character-name--default');
      cutsceneCharacterName.classList.remove('cutscene-character-name--alert');
      if (cutsceneSection[index].textStyle){
        if (cutsceneSection[index].textStyle === 'badguy'){
          cutsceneTextBox.classList.add('cutscene-text-box--badguy');
          cutsceneCharacterName.classList.add('cutscene-character-name--badguy');
        }
        if (cutsceneSection[index].textStyle === 'alert'){
          cutsceneTextBox.classList.add('cutscene-text-box--alert');
          cutsceneCharacterName.classList.add('cutscene-character-name--alert');
        }
      }
      else {
        cutsceneTextBox.classList.add('cutscene-text-box--default');
        cutsceneCharacterName.classList.add('cutscene-character-name--default');
      }

      // name
      cutsceneCharacterName.textContent = sc_characterSprite.name;

     // text
     setTimeout(() => addTextByTypewriter(cutsceneText, sc_text, typewriterDelay), initialTextDelay);
      function addTextByTypewriter(elementClass, text, speed) {
        
        elementClass.style.visibility = "hidden";
        elementClass.innerHTML = ''; // Clear here

        let delay;
        if (extraDelayBeforeAddingText){
          delay = 150 + extraDelayBeforeAddingText;
        }
        else {
          delay = 150;
        }

        setTimeout(continueFunction,delay);
      
        function continueFunction() {
          elementClass.style.visibility = "visible";
          const letters = text.split('');
          letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.classList.add('typewriter-letter');
            elementClass.appendChild(span);
            setTimeout(() => {
              span.style.opacity = 1;
            }, speed * index);
          });
        }
      }

    }

    // add next button
    if (!sc_textDelay){
      sc_textDelay = 0;
    }
    if (!initialSceneDelay || cutsceneIndex !== 0){
      initialSceneDelay = 0;
    }
    if (!sc_text){
      sc_text.length = 0;
    }
    if (!initialTextDelay){
      initialTextDelay = 0;
    }
    setTimeout(bringInNextButton,sc_textDelay + initialSceneDelay + sc_text.length*typewriterDelay + initialTextDelay + 200);
    function bringInNextButton(){
      toggleClass(cutsceneNextButton,'cutscene-next-button--hidden--out','cutscene-next-button--visible');
      toggleClass(cutsceneNextButton,'cutscene-next-button--hidden','cutscene-next-button--visible');
      if (cutsceneIndex === 0){
        toggleClass(cutsceneSkipText, 'cutscene-skip-text--hidden', 'cutscene-skip-text--visible');
      }
    } 

  }

  // update html element size
  updateElementSize();

  // weird iPad thing (don't touch)
  setIpadActiveState(cutsceneNextButton);
}

// empty the splash
function clearSplashContainer(){
  const childrenToRemove = splashContainer.querySelectorAll(":not(.splash-p--footer):not(a)");
  childrenToRemove.forEach(child => child.remove()); 
}

// remove the splash
function removeSplash(){
  toggleClass(splash, 'state-display-block', 'state-display-none');
}

document.addEventListener("DOMContentLoaded", function() {
  drawSplash();
});