const spanVersion = document.querySelector(".span-version");
spanVersion.textContent = version;

function toggleCollapsible(event) {
  const parent = event.currentTarget.parentElement; // Get the parent element of the clicked .div__info-header
  const collapsibleElements = parent.querySelectorAll('.list__collapsible');
  const caretElements = parent.querySelectorAll('.div__info-caret');

  // Toggle the class .list__collapsible--open and .list__collapsible--close for each .list__collapsible element
  collapsibleElements.forEach((element) => {
    element.classList.toggle('list__collapsible--open');
    element.classList.toggle('list__collapsible--close');
  });

  // Toggle the class .div__info-caret--open and .div__info-caret--close for each .div__info-caret element
  caretElements.forEach((element) => {
    element.classList.toggle('div__info-caret--open');
    element.classList.toggle('div__info-caret--close');
  });
}

// Add click event listeners to each .div__info-header element
const infoHeaders = document.querySelectorAll('.div__info-header');
infoHeaders.forEach((header) => {
  header.addEventListener('click', toggleCollapsible);
});


function createAnswerKey(resourceThemeIndex, resourceIndex) {

  resourceTheme = analyticsArray[resourceThemeIndex].path;
  resourceJS = analyticsArray[resourceThemeIndex].resources[resourceIndex].resourceJS;
  var scriptsDiv = document.getElementById('script-resource');
  scriptsDiv.innerHTML = ''; 
  var scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'resource/' + resourceTheme + "/" + resourceJS;
  
  // Add the onload event handler to the script element
  scriptElement.onload = addAnswerKey;
  
  scriptsDiv.appendChild(scriptElement);
  

  function addAnswerKey(){
    const divAnswerKey = document.querySelector(".div__answer-key");
    divAnswerKey.classList.toggle('div__answer-key--hidden');
    divAnswerKey.classList.toggle('div__answer-key--visible');

    for (let i = 0; i < resource.activityArray.length - 1; i++) {
      let divAnswerKeyActivityContainer = createElement("div", ["div-answer-key-activity-container"], divAnswerKey);
      let divAnswerKeyTextContainer = createElement("div", ["div-answer-key-text-container"], divAnswerKeyActivityContainer);
      let pAnswerKeyTitle = createElement("p", ["p-answer-key__title"], divAnswerKeyTextContainer);
      let answerContainer = createElement("div", ["answer-container"], divAnswerKeyTextContainer);
      divAnswerKeyActivityContainer.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/background/" + resource.activityArray[i].assets.activityBackground + ")";
      for (let j = 0; j < resource.activityArray[i].code.length; j++) {
        let pAnswerKeyAnswer = createElement("p", ["p-answer-key__answer"], answerContainer);
        pAnswerKeyAnswer.textContent = resource.activityArray[i].code.charAt(j);
      }

      let pAnswerKeyInstructions = createElement("p", ["p-answer-key__instructions"], divAnswerKeyTextContainer);
      pAnswerKeyTitle.textContent = resource.activityArray[i].title;
      pAnswerKeyInstructions.textContent = resource.activityArray[i].hint; 

    }
  }
  
  
}

function createElement(tagName, classList, parent, id) {
const element = document.createElement(tagName);
element.classList.add(...classList);
if (id) {
  element.setAttribute("id", id);
}
parent.appendChild(element);
return element;
}


const divResourceList = document.querySelector('.div__resource-list');
for (let i = 0; i < analyticsArray.length; i++) {
  // create resource theme container
  let divResourceTheme = createElement("div", ["div__resource-theme"], divResourceList);
  /*
  let divResourceThemeLoadingWrapper = createElement("div", ["div__resource-theme-loading-wrapper","div__resource-theme-loading-wrapper--hidden"], divResourceTheme);
  */
  let pResourceTitle = createElement("p", ["p__resource-title"], divResourceTheme);
  divResourceTheme.style.backgroundImage = "url(resource/" + analyticsArray[i].path + "/assets/cutscene/main.png)";
  pResourceTitle.textContent = analyticsArray[i].title;
  
  for (let j = 0; j < analyticsArray[i].resources.length; j++) {
    let divResource= createElement("div", ["div__resource","div__resource--visible"], divResourceTheme);
    let pResourceTopic = createElement("p", ["p__resource","p__resource-topic"], divResource);
    let pResourceLevel = createElement("p", ["p__resource","p__resource-level"], divResource);
    pResourceLevel.textContent = analyticsArray[i].resources[j].level;
    pResourceTopic.textContent = analyticsArray[i].resources[j].topic;

    divResource.addEventListener("click", function() {

      /*
      const divResourceThemeLoadingWrappers = document.querySelectorAll(".div__resource-theme-loading-wrapper");
      divResourceThemeLoadingWrappers.forEach((divResourceThemeLoadingWrapper) => {
        divResourceThemeLoadingWrapper.classList.toggle('div__resource-theme-loading-wrapper--hidden');
        divResourceThemeLoadingWrapper.classList.toggle('div__resource-theme-loading-wrapper--visible');
      });
      */

      let buttonChoose = createElement("button", ["button__choose", "button__choose--visible"], divResourceTheme);
      buttonChoose.innerHTML = "CHOOSE ANOTHER";
      buttonChoose.addEventListener("click", function() {
        buttonChoose.classList.toggle('button__choose--visible');
        buttonChoose.classList.toggle('button__choose--hidden');
        location.reload();
      });

      createAnswerKey(i,j);
      divResource.classList.add("div__resource--clicked");
      divResource.parentNode.classList.add("div__resource--clicked");
      const elements = document.querySelectorAll(".div__resource");
      setTimeout(clearOtherNodes,10);
      function clearOtherNodes(){
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];   
          if (!element.classList.contains('div__resource--clicked')) {
              element.parentNode.removeChild(element);
          }
        }
        const divResourceThemes = document.querySelectorAll('.div__resource-theme');
        divResourceThemes.forEach((divResourceTheme) => {
          if (!divResourceTheme.classList.contains('div__resource--clicked')) {
            divResourceTheme.parentNode.removeChild(divResourceTheme);
          }
        });
        
      }
    });

  }
  
}