function drawPassage() {
  let activityPassage;
  let passageStyleMaterial;
  let passageStyleText;

  // challenge mode
  if (resource.challengeArray) {
    activityPassage = resource.challengeArray[activityArrayIndex].activity;
    passageStyleMaterial = resource.challengeArray[activityArrayIndex].activity.style.material;
    passageStyleText = resource.challengeArray[activityArrayIndex].activity.style.text;
  }

  // normal activity mode
  else {
    activityPassage = resource.activityArray[activityArrayIndex - 1].content.passage;
    passageStyleMaterial = resource.activityArray[activityArrayIndex - 1].content.passage.style.material;
    passageStyleText = resource.activityArray[activityArrayIndex - 1].content.passage.style.text;
  }

  const passageContainer = createElement(
    "div",
    ["passage-container"],
    activityModalContentContainerTop
  );

  for (let i = 0; i < activityPassage.item.length; i++) {
    const passage = createElement(
      "div",
      ["passage", passageStyleMaterial],
      passageContainer
    );

    transformElement(
      passage,
      activityPassage.item[i].transform.translateX,
      activityPassage.item[i].transform.translateY,
      activityPassage.item[i].transform.rotate
    );

    const passageImage = createElement("div", ["passage-image"], passage);
    passageImage.style.backgroundImage =
      "url(resource/" +
      resourceTheme +
      "/assets/activity/passage/" +
      activityPassage.item[i].image +
      ")";

    const passageTextContainer = createElement(
      "div",
      ["passage-text-container"],
      passage
    );

    const passageTitle = createElement(
      "p",
      ["passage-title", passageStyleText.title],
      passageTextContainer
    );
    passageTitle.innerHTML = parseInlineToolText(activityPassage.item[i].title);

    const passageParagraph = createElement(
      "p",
      ["passage-paragraph", passageStyleText.paragraph],
      passageTextContainer
    );
    passageParagraph.innerHTML = parseInlineToolText(activityPassage.item[i].paragraph);
  }
}