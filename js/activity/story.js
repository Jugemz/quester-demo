function drawStory(){


  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  if (resource.challengeArray){

    // create aliases
    let activityStory = resource.challengeArray[activityArrayIndex].activity;

    // create container
    const storyContainer = createElement('div',['story-container'],activityModalContentContainerTop);

    // create elements inside container
    const story = createElement('div',['story', activityStory.style.material],storyContainer);
    transformElement(story, activityStory.item.transform.translateX, activityStory.item.transform.translateY, activityStory.item.transform.rotate); 
    const storyTitle = createElement('p',['story-title', activityStory.style.text.title],story);  
    storyTitle.textContent = activityStory.item.title;
    const storyAuthor = createElement('p',['story-author', activityStory.style.text.author],story);
    storyAuthor.textContent = activityStory.item.author;
    for (let j = 0; j < activityStory.item.paragraph.length; j++){
      const storyParagraph = createElement('p',['story-paragraph', activityStory.style.text.paragraph],story);
      storyParagraph.textContent = activityStory.item.paragraph[j];
    }

  }
  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
  else {

    // create aliases
    let activityStory = resource.activityArray[activityArrayIndex-1].content.story;

    // create container
    const storyContainer = createElement('div',['story-container'],activityModalContentContainerTop);

    // create elements inside container
    const story = createElement('div',['story', activityStory.style.material],storyContainer);
    transformElement(story, activityStory.item.transform.translateX, activityStory.item.transform.translateY, activityStory.item.transform.rotate); 
    const storyTitle = createElement('p',['story-title', activityStory.style.text.title],story);  
    storyTitle.textContent = activityStory.item.title;
    const storyAuthor = createElement('p',['story-author', activityStory.style.text.author],story);
    storyAuthor.textContent = activityStory.item.author;
    for (let j = 0; j < activityStory.item.paragraph.length; j++){
      const storyParagraph = createElement('p',['story-paragraph', activityStory.style.text.paragraph],story);
      storyParagraph.textContent = activityStory.item.paragraph[j];
    }

  }
  // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

}  
