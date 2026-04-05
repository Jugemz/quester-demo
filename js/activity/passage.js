function drawPassage(i) {

  let activityPassage;
  let passageStyleMaterial;
  let passageStyleText;

  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  if (resource.challengeArray){
    // create aliases
    activityPassage = resource.challengeArray[activityArrayIndex].activity;
    passageStyleMaterial = resource.challengeArray[activityArrayIndex].activity.style.material;
    passageStyleText = resource.challengeArray[activityArrayIndex].activity.style.text;
  }
  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
  else {
    // create aliases
    activityPassage = resource.activityArray[activityArrayIndex-1].content.passage;
    passageStyleMaterial = resource.activityArray[activityArrayIndex-1].content.passage.style.material;
    passageStyleText = resource.activityArray[activityArrayIndex-1].content.passage.style.text;
  }
  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

  // create container
  const passageContainer = createElement("div", ["passage-container"], activityModalContentContainerTop);

  // create elements inside container
  for (let i = 0; i < activityPassage.item.length; i++) {
      const passage = createElement("div", ["passage", passageStyleMaterial], passageContainer);
      transformElement(passage, activityPassage.item[i].transform.translateX, activityPassage.item[i].transform.translateY, activityPassage.item[i].transform.rotate); 
      const passageImage = createElement("div", ["passage-image"], passage);
      passageImage.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/passage/" + activityPassage.item[i].image + ")";
      const passageTextContainer  = createElement("div", ["passage-text-container"], passage);
      const passageTitle = createElement("p", ["passage-title", passageStyleText.title], passageTextContainer);
      passageTitle.textContent = activityPassage.item[i].title;

      const passageParagraph = createElement("p", ["passage-paragraph", passageStyleText.paragraph], passageTextContainer); 
      passageParagraph.innerHTML = processParagraph(activityPassage.item[i].paragraph); 
  }
}



function processParagraph(paragraph) {
  return paragraph.replace(/\[(.*?)\]/g, '<span style="text-decoration: underline;">$1</span>');
}
