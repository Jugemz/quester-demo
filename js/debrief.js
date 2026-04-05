const teamSize = document.querySelector(".debrief-stat-teamSize");
const hintsUsed = document.querySelector(".debrief-stat-hintsUsed");
const activitiesCompleted = document.querySelector(".debrief-stat-activitiesCompleted");
const timeRemaining = document.querySelector(".debrief-stat-timeRemaining");
const finalScore = document.querySelector(".debrief-stat-finalScore");
const rankArray = ["TOT","PAL","CREW","DOOD","QUAVERING QUAZARS"]

const teamSizeModifier = document.querySelector(".debrief-stat-teamSize-modifier");
const hintsUsedModifier = document.querySelector(".debrief-stat-hintsUsed-modifier");
const activitiesCompletedModifier = document.querySelector(".debrief-stat-activitiesCompleted-modifier");
const timeRemainingModifier = document.querySelector(".debrief-stat-timeRemaining-modifier");

const teamSizeMeter = document.querySelector(".debrief-meter-teamSize");
const hintsUsedMeter = document.querySelector(".debrief-meter-hintsUsed");
const activitiesCompletedMeter = document.querySelector(".debrief-meter-activitiesCompleted");
const timeRemainingMeter = document.querySelector(".debrief-meter-timeRemaining");
const scoreMeter = document.querySelector(".score-meter");
const footerContainer = document.querySelector(".footer-container");
const scoreContainer = document.querySelector(".score-container");
const medalContainer = document.querySelector(".medal-container");
const pageWrapper = document.querySelector(".page-wrapper");
const imageOutcome = document.querySelector(".image-outcome");

const statTeam = document.querySelector(".stat-team");
const statActivities = document.querySelector(".stat-activities");
const statTime = document.querySelector(".stat-time");
const statHints = document.querySelector(".stat-hints");
const statScore = document.querySelector(".stat-score");

const buttonExit = document.querySelector(".button__exit");

let queryString = window.location.search.substring(1);
let statElements = [
    statTeam, statActivities, statHints, statTime, statScore
]

// Parse the query string into an object
let retrievedDebriefStats = {};
queryString.split('&').forEach(function (param) {
  let [key, value] = param.split('=');
  retrievedDebriefStats[decodeURIComponent(key)] = decodeURIComponent(value);
  setTimeout(updateDebrief,10);
});

function updateDebrief(){

  // Global object to store preloaded images
  var preloadedImages = [];

  // Function to preload images
  function preloadImages(imageUrls) {
      imageUrls.forEach(function(url) {
          var img = new Image();
          img.src = url;
          preloadedImages[url] = img;
      });
  }

  // Usage
  var imageUrls = [
    "assets/debrief/medal/medal-1.png",
    "assets/debrief/medal/medal-2.png",
    "assets/debrief/medal/medal-3.png",
    "assets/debrief/medal/medal-4.png",
    "assets/debrief/medal/medal-5.png"
  ];

  preloadImages(imageUrls);


  
    /*
    retrievedDebriefStats.teamSize = 2;
    retrievedDebriefStats.hintsUsed = 2;
    retrievedDebriefStats.activitiesCompleted = 0;
    retrievedDebriefStats.timeRemaining = 2000;
    retrievedDebriefStats.timeStarting = 3600;
    retrievedDebriefStats.outcome = 'victory';
    */
    
    

    if (retrievedDebriefStats.outcome === 'fail'){
        imageOutcome.style.backgroundImage =  "url(assets/debrief/outcome/fail.png)";
    }
    else if (retrievedDebriefStats.outcome === 'victory'){
        imageOutcome.style.backgroundImage =  "url(assets/debrief/outcome/victory.png)";
    }

    function convertSecondsToMinutes(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
      
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      
        return formattedMinutes + ":" + formattedSeconds;
      }
    
    if (!isNaN(retrievedDebriefStats.timeRemaining) && !isNaN(retrievedDebriefStats.timeStarting)){
        let totalSeconds = retrievedDebriefStats.timeStarting-retrievedDebriefStats.timeRemaining; 
        timeRemainingModifier.textContent = convertSecondsToMinutes(totalSeconds) + ' spent';
    }
    else {
        timeRemainingModifier.textContent = 'no limit';
    }

    if (retrievedDebriefStats.teamSize == 1){
        teamSizeModifier.textContent = retrievedDebriefStats.teamSize + ' person';
    }
    else {
        teamSizeModifier.textContent = retrievedDebriefStats.teamSize + ' people';
    }

    if (retrievedDebriefStats.hintsUsed == 1){
        hintsUsedModifier.textContent = retrievedDebriefStats.hintsUsed + ' used';
    }
    else {
        hintsUsedModifier.textContent = retrievedDebriefStats.hintsUsed + ' used';
    }

    if (retrievedDebriefStats.activitiesCompleted == 1){
        activitiesCompletedModifier.textContent = retrievedDebriefStats.activitiesCompleted + ' completed';
    }
    else {
        activitiesCompletedModifier.textContent = retrievedDebriefStats.activitiesCompleted + ' completed';
    }

    /* start score at 0 */
    let score = 0;

    /* number of players */
    let teamScore = 250;
    let teamModifier;
    teamModifier = teamScore - retrievedDebriefStats.teamSize * 42 + 42;
    teamScore += teamModifier;

    /* activities completed */
    let activityScore = 0;
    let activityModifier;
    activityModifier = Math.min(Math.max(activityScore + retrievedDebriefStats.activitiesCompleted * 63, 0), 250)
    activityScore += activityModifier;

    /* hints used */
    let hintScore = 200;
    let hintModifier;
    hintModifier = Math.max(0, hintScore - retrievedDebriefStats.hintsUsed * 50 + 50);
    hintScore += hintModifier;

    /* time to completion */
    let timeScore = 0;
    let timeModifier;
    if (!isNaN(retrievedDebriefStats.timeRemaining) && !isNaN(retrievedDebriefStats.timeStarting)){
        let timeRatio = 350 / retrievedDebriefStats.timeStarting;
        timeScore += Math.round(timeRatio * retrievedDebriefStats.timeRemaining);
        timeModifier = Math.min(timeScore, 250);
    }
    else {
        timeModifier = 0;
    }
    

    score = Math.round(teamModifier + activityModifier + hintModifier + timeModifier);
    score.textContent = score;


    /* modifiers */    
    teamSize.innerHTML = '+' + teamModifier;
    activitiesCompleted.innerHTML = '+' + activityModifier;
    hintsUsed.innerHTML = '+' + hintModifier;
    timeRemaining.innerHTML = '+' + timeModifier;
    finalScore.innerHTML = '= ' + score;


    function bringInStats(){
        for (let i = 0; i <= statElements.length; i++){
            setTimeout(toggleClass,(i * 300),statElements[i],"stat--hidden","stat--visible");
        }      
    }

    function bringInScoreMeter(){

        updateElementHeight();

        toggleClass(scoreContainer,"score-container--hidden","score-container--visible");
        setTimeout(toggleClass,200,medalContainer,"medal-container--hidden","medal-container--visible");
        let calculatedRank;

        setTimeout(bringInNext,500);
        function bringInNext(){
            if (score < 350){
                calculatedRank = rankArray[0];
                addMedal([1]);
                addScoreMeter('0.045');
            }
            if (score >= 350 && score < 700){
                calculatedRank = rankArray[0,1];
                addMedal([1,2]);
                addScoreMeter('0.275');
            }
            if (score >= 700 && score < 800){
                calculatedRank = rankArray[0,1,2];
                addMedal([1,2,3]);
                addScoreMeter('0.5');
            }
            if (score >= 800 && score < 900){
                calculatedRank = rankArray[0,1,2,3];
                addMedal([1,2,3,4]);
                addScoreMeter('0.725');
            }
            if (score >= 900 && score <= 1000){
                calculatedRank = rankArray[0,1,2,3,4];
                addMedal([1,2,3,4,5]);
                addScoreMeter('1');
            }     
        }
       
    
        function addMedal(array){

            for (let i = 1; i <= array.length; i++){

                function staggerMedal(){
                    let imgMedal = document.getElementById("img-medal-" + i);
                    imgMedal.src = "assets/debrief/medal/medal-" + i + ".png";
                    toggleClass(imgMedal,"img-medal--hidden","img-medal--visible");    
                    let rank = document.querySelector(".debrief-stat-rank-" + i);
                    rank.textContent = rankArray[i-1];
                    toggleClass(rank,"debrief-stat-rank--light-brown","debrief-stat-rank--black");
                    if (i == array.length){
                        let divMedalContainer = document.getElementById("div-medal-container-" + i);
                        setTimeout(addEmphasis,400);
                        function addEmphasis(){
                            divMedalContainer.classList.add("div-medal-container--hidden"); 
                            setTimeout(toggleClass,0,divMedalContainer,"div-medal-container--hidden","div-medal-container--visible");
                            setTimeout(toggleClass,0,divMedalContainer,"div-medal-container--visible","div-medal-container--emphasis");
                        }
                    }
                }
                setTimeout(staggerMedal, i * (1000 / array.length));
                
            }

            
        }
    
        function addScoreMeter(percentage){    
            scoreMeter.style.transform = `scaleX(${percentage})`;
        }
    }

    function bringInFooter(){
        toggleClass(footerContainer,"footer-container--hidden","footer-container--visible");
    }

    function bringInExit(){
      toggleClass(buttonExit,"button__exit--hidden","button__exit--visible");
    }

    // image and crack animation
    setTimeout(bringInImage,500);
    function bringInImage(){
        updateElementHeight();
        toggleClass(imageOutcome,"image-outcome--out","image-outcome--in");
    }

    // hide page wrapper
    function bringInPageWrapper(){
        toggleClass(pageWrapper,"page-wrapper--visible","page-wrapper--hidden");
    }
    
    let debriefDelay = 3200;
    let bringInWrapperDelay = 2300;
    setTimeout(bringInPageWrapper,bringInWrapperDelay);
    setTimeout(bringInStats,debriefDelay);
    setTimeout(bringInScoreMeter,statElements.length * 300 + 100 + debriefDelay);
    setTimeout(bringInExit, (statElements.length * 300) + 2500 + debriefDelay);
    /*
    setTimeout(bringInFooter, (statElements.length * 300) + 2000 + debriefDelay);
    */
}

function toggleClass(element, classToRemove, classToAdd){
    if (element){
        element.classList.remove(classToRemove);
        element.classList.add(classToAdd);
    }
}




// modal

let isModalVisible = false;

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalParagraph = document.querySelector('.modal__paragraph');
const modalButton = document.querySelector('.modal__button');
const modalPopup = document.querySelector('.modal__popup');
const modalBlackout = document.querySelector('.modal__blackout');
const modalX = document.querySelector('.modal__x');

const iconDebrief = document.getElementById('icon-clickable--debrief');

function createModal(title,paragraph,button){
  modalTitle.innerHTML = title;
  modalParagraph.innerHTML = paragraph;
  modalButton.innerHTML = button;
  toggleModalVisibility();
}

modalBlackout.addEventListener("click", function() { 
  toggleModalVisibility();
});

modalButton.addEventListener("click", function() { 
  toggleModalVisibility();
});

modalX.addEventListener("click", function() { 
  toggleModalVisibility();
});

function toggleModalVisibility(){
  if (isModalVisible === false){
    toggleClass(modal,"modal--hidden","modal--visible");
    toggleClass(modalPopup,"modal__popup--hidden","modal__popup--visible");
    toggleClass(modalBlackout,"modal__blackout--hidden","modal__blackout--visible");
    isModalVisible = true;
    return false;
  }
  else {
    toggleClass(modalPopup,"modal__popup--visible","modal__popup--hidden");
    toggleClass(modalBlackout,"modal__blackout--visible","modal__blackout--hidden");
    setTimeout(hideModal,200);
    function hideModal(){
      toggleClass(modal,"modal--visible","modal--hidden");
    }
    isModalVisible = false;
    return false;
  }
}

iconDebrief.addEventListener("click", function() { 
  createModal(
    "How is your score calculated?",
    "Your score is determined by <span class = 'p--highlight'>the sum of 4 stats:</span> players, challenges, hints, and time. Each is worth up to 250 points. For a higher score, you must complete every available challenge, all while minimizing the number of players on your team, the number of hints used, and the time spent.<br>\
    ",
    "Got it!"
  )
});



/*
const debriefAssets = [

    '../assets/debrief/medal/medal-1-hidden.png',
    '../assets/debrief/medal/medal-1.png',
    '../assets/debrief/medal/medal-2-hidden.png',
    '../assets/debrief/medal/medal-2.png',
    '../assets/debrief/medal/medal-3-hidden.png',
    '../assets/debrief/medal/medal-3.png',
    '../assets/debrief/medal/medal-4-hidden.png',
    '../assets/debrief/medal/medal-4.png',
    '../assets/debrief/medal/medal-5-hidden.png',
    '../assets/debrief/medal/medal-5.png',
    '../assets/debrief/misc/bean.png',
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
    preloadImages(debriefAssets, function() {});
  };
*/
  
let vh;
function setContainerSize(){
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}


// font
function updateFontSize() {
    const elements = [  
      ['.p-title', 0.035],
      ['.p-debrief-title', 0.15],
      ['.p-debrief-subtitle', 0.15],
      ['.p-debrief-stat', 0.3],
      ['.debrief-stat-rank', 0.12],
      ['.a-footer', 0.025],
    ];
    elements.forEach(([selector, scale]) => {
      scaleElements(selector, scale);
    });
    function scaleElements(elementSelector, scaleFactor) {
        document.querySelectorAll(elementSelector).forEach(element => {
            const parentWidth = element.parentNode.offsetWidth;
            element.style.fontSize = `${parentWidth * scaleFactor}px`;
        });
    }    
}

document.addEventListener('DOMContentLoaded', updateFontSize);
window.addEventListener('resize', updateFontSize);
window.addEventListener('click', updateFontSize);

// height

function updateElementHeight() {
    const elements = [    
        ['.debrief-container', 0.5],
        ['.footer-container', 0.06],
        ['.img-medal', 1.5],
        ['.img-footer', 0.05],
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

function updateAbsoluteElements() {

    const elements = [  
      ['.image-outcome', 0.8, 'widthHeight'],
      ['.icon-clickable--debrief', 0.04, 'fontSize'],
      ['.style-border--default', 0.0025, 'borderWidth'],
      ['.style-border--debrief', 0.004, 'borderWidth'],
      ['.modal__popup', 0.67, 'width'],
      ['.modal__title', 0.029, 'fontSize'],
      ['.button__exit', 0.022, 'fontSize'],
      ['.modal__paragraph', 0.02, 'fontSize'],
      ['.modal__button', 0.026, 'fontSize'],
      ['.modal__x', 0.027, 'fontSize'],
      ['.modal__x', 0.029, 'widthHeight']
    ]
  
    elements.forEach(([selector, scale, type]) => {
      scaleAbsolutely(selector, scale, type);
    });

    // scale absolutely
    function scaleAbsolutely(elementSelector, scaleFactor, type) {
    const siteContainer = document.querySelector('.debrief-container');
    if (siteContainer) {
      if (type === "fontSize"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.fontSize = `${siteContainerWidth * scaleFactor}px`;
        });
      }
      if (type === "widthHeight"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.width = `${siteContainerWidth * scaleFactor}px`;
          element.style.height = `${siteContainerWidth * scaleFactor}px`;
        });
      }
      if (type === "borderWidth"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.borderWidth = `${siteContainerWidth * scaleFactor}px`
        });
      }
      if (type === "height"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.height = `${siteContainerWidth * scaleFactor}px`
        });
      }
      if (type === "width"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.width = `${siteContainerWidth * scaleFactor}px`
        });
      }
      if (type === "marginTop"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.marginTop = `${siteContainerWidth * scaleFactor}px`
        });
      }
      if (type === "marginLeft"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.marginLeft = `${siteContainerWidth * scaleFactor}px`
        });
      }
      if (type === "marginRight"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.marginRight = `${siteContainerWidth * scaleFactor}px`
        });
      }
      if (type === "marginBottom"){
        const siteContainerWidth = siteContainer.offsetWidth;
        document.querySelectorAll(elementSelector).forEach(element => {
          element.style.marginBottom = `${siteContainerWidth * scaleFactor}px`
        });
      }
    }
    }
   
}
  
document.addEventListener('DOMContentLoaded', updateElementHeight);
window.addEventListener('resize', updateElementHeight);
window.addEventListener('click', updateElementHeight);

document.addEventListener('DOMContentLoaded', updateAbsoluteElements);
window.addEventListener('resize', updateAbsoluteElements);
window.addEventListener('click', updateAbsoluteElements);