function drawStory(){

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




/*
function drawActivity_multipleChoice(activityArrayIndex){

  const multipleChoiceQuestionsContainer = document.createElement("div");
  multipleChoiceQuestionsContainer.classList.add("multiple-choice-questions-container");

  const column1 = document.createElement("div");
  column1.classList.add("multiple-choice-question-column");

  const column2 = document.createElement("div");
  column2.classList.add("multiple-choice-question-column");

  const multipleChoiceStory = document.createElement("p");
  multipleChoiceStory.classList.add("multiple-choice-story");
  multipleChoiceStory.innerHTML = resource.activityArray[activityArrayIndex-1].story;
  activityModalContentContainerLeft.appendChild(multipleChoiceStory);

  resource.activityArray[activityArrayIndex-1].text.forEach((question, index) => {
    const multipleChoiceQuestionWrapper = document.createElement("div");
    multipleChoiceQuestionWrapper.classList.add("multiple-choice-question-wrapper");
    const multipleChoiceQuestionText = document.createElement("p");
    multipleChoiceQuestionText.classList.add("multiple-choice-question-text");

    // Check if the question starts with a number and period, and if so, wrap it with a strong element
    const questionText = question.question.trim(); // Remove leading/trailing white space
    if (/^\d+\./.test(questionText)) { // Check if the question starts with a number followed by a period
      const strongElement = document.createElement("strong");
      strongElement.textContent = questionText.match(/^\d+\./)[0]; // Get the matched number and period
      multipleChoiceQuestionText.appendChild(strongElement);
      multipleChoiceQuestionText.appendChild(document.createTextNode(questionText.substring(strongElement.textContent.length))); // Add the rest of the question text after the bolded number and period
    } else {
      multipleChoiceQuestionText.textContent = questionText;
    }

    multipleChoiceQuestionWrapper.appendChild(multipleChoiceQuestionText);
    const multipleChoiceAnswersList = document.createElement("ul");
    multipleChoiceAnswersList.classList.add("multiple-choice-answers-list");
    question.answer.forEach((answer) => {
      const multipleChoiceAnswerListItem = document.createElement("li");
      multipleChoiceAnswerListItem.classList.add("multiple-choice-answer-list-item");
      if (/^[A-Z]\./.test(answer)) { // Check if the answer starts with a capital letter followed by a period
        const strongElement = document.createElement("strong");
        strongElement.textContent = answer.charAt(0); // Create a new element with the first character in bold
        multipleChoiceAnswerListItem.appendChild(strongElement);
        multipleChoiceAnswerListItem.appendChild(document.createTextNode(answer.substring(1))); // Add the rest of the answer text after the bolded character
      } else {
        multipleChoiceAnswerListItem.textContent = answer;
      }
      multipleChoiceAnswersList.appendChild(multipleChoiceAnswerListItem);
    });
    multipleChoiceQuestionWrapper.appendChild(multipleChoiceAnswersList);

    if (index < 3) {
      column1.appendChild(multipleChoiceQuestionWrapper); // Add the first three question wrappers to column1
    } else {
      column2.appendChild(multipleChoiceQuestionWrapper); // Add the remaining question wrappers to column2
    }
  });

  multipleChoiceQuestionsContainer.appendChild(column1);
  multipleChoiceQuestionsContainer.appendChild(column2);

  activityModalContentContainerRight.appendChild(multipleChoiceQuestionsContainer);
}
*/