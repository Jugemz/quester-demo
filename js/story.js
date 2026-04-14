function drawStory() {

  // challenge mode
  if (resource.challengeArray) {
    const activityStory = resource.challengeArray[activityArrayIndex].activity;

    const storyContainer = createElement('div', ['story-container'], activityModalContentContainerTop);

    const story = createElement('div', ['story', activityStory.style.material], storyContainer);
    transformElement(
      story,
      activityStory.item.transform.translateX,
      activityStory.item.transform.translateY,
      activityStory.item.transform.rotate
    );

    const storyTitle = createElement('p', ['story-title', activityStory.style.text.title], story);
    storyTitle.innerHTML = parseInlineToolText(activityStory.item.title);

    const storyAuthor = createElement('p', ['story-author', activityStory.style.text.author], story);
    storyAuthor.innerHTML = parseInlineToolText(activityStory.item.author);

    for (let j = 0; j < activityStory.item.paragraph.length; j++) {
      const storyParagraph = createElement(
        'p',
        ['story-paragraph', activityStory.style.text.paragraph],
        story
      );
      storyParagraph.innerHTML = parseInlineToolText(activityStory.item.paragraph[j]);
    }
  }

  // normal activity mode
  else {
    const activityStory = resource.activityArray[activityArrayIndex - 1].content.story;

    const storyContainer = createElement('div', ['story-container'], activityModalContentContainerTop);

    const story = createElement('div', ['story', activityStory.style.material], storyContainer);
    transformElement(
      story,
      activityStory.item.transform.translateX,
      activityStory.item.transform.translateY,
      activityStory.item.transform.rotate
    );

    const storyTitle = createElement('p', ['story-title', activityStory.style.text.title], story);
    storyTitle.innerHTML = parseInlineToolText(activityStory.item.title);

    const storyAuthor = createElement('p', ['story-author', activityStory.style.text.author], story);
    storyAuthor.innerHTML = parseInlineToolText(activityStory.item.author);

    for (let j = 0; j < activityStory.item.paragraph.length; j++) {
      const storyParagraph = createElement(
        'p',
        ['story-paragraph', activityStory.style.text.paragraph],
        story
      );
      storyParagraph.innerHTML = parseInlineToolText(activityStory.item.paragraph[j]);
    }
  }
}