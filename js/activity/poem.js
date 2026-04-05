function drawPoem(){

    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
    if (resource.challengeArray){

        // create aliases
        let activityPoem = resource.challengeArray[activityArrayIndex].activity;
    
        // create container
        const poemContainer = createElement('div',['poem-container'],activityModalContentContainerTop);

        // create elements inside container
        const poem = createElement('div',['poem', activityPoem.style.material],poemContainer);
        transformElement(poem, activityPoem.item.transform.translateX, activityPoem.item.transform.translateY, activityPoem.item.transform.rotate); 
        const poemTitle = createElement('p',['poem-title', activityPoem.style.text.title],poem);  
        poemTitle.textContent = activityPoem.item.title;
        const poemAuthor = createElement('p',['poem-author', activityPoem.style.text.author],poem);
        poemAuthor.textContent = activityPoem.item.author;
        for (let i = 0; i < activityPoem.item.paragraph.length; i++) {
            const poemStanza = createElement('p',['poem-stanza'],poem);
            for (let j = 0; j < activityPoem.item.paragraph[i].length; j++){
                const poemParagraph = createElement('p',['poem-paragraph', activityPoem.style.text.paragraph],poemStanza);

                // Process the text and create nodes
                const textParts = activityPoem.item.paragraph[i][j].split(/(\[.*?\])/);
                textParts.forEach(part => {
                    if (part.startsWith('[') && part.endsWith(']')) {
                        const underlinedText = part.slice(1, -1);
                        const underlinedSpan = document.createElement('span');
                        underlinedSpan.textContent = underlinedText;
                        underlinedSpan.style.textDecoration = 'underline';
                        poemParagraph.appendChild(underlinedSpan);
                    } else {
                        poemParagraph.appendChild(document.createTextNode(part));
                    }
                });
            }
        }

    }
    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
    else {

        // create aliases
        let activityPoem = resource.activityArray[activityArrayIndex-1].content.poem;
    
        // create container
        const poemContainer = createElement('div',['poem-container'],activityModalContentContainerTop);

        // create elements inside container
        const poem = createElement('div',['poem', activityPoem.style.material],poemContainer);
        transformElement(poem, activityPoem.item.transform.translateX, activityPoem.item.transform.translateY, activityPoem.item.transform.rotate); 
        const poemTitle = createElement('p',['poem-title', activityPoem.style.text.title],poem);  
        poemTitle.textContent = activityPoem.item.title;
        const poemAuthor = createElement('p',['poem-author', activityPoem.style.text.author],poem);
        poemAuthor.textContent = activityPoem.item.author;
        for (let i = 0; i < activityPoem.item.paragraph.length; i++) {
            const poemStanza = createElement('p',['poem-stanza'],poem);
            for (let j = 0; j < activityPoem.item.paragraph[i].length; j++){
                const poemParagraph = createElement('p',['poem-paragraph', activityPoem.style.text.paragraph],poemStanza);

                // Process the text and create nodes
                const textParts = activityPoem.item.paragraph[i][j].split(/(\[.*?\])/);
                textParts.forEach(part => {
                    if (part.startsWith('[') && part.endsWith(']')) {
                        const underlinedText = part.slice(1, -1);
                        const underlinedSpan = document.createElement('span');
                        underlinedSpan.textContent = underlinedText;
                        underlinedSpan.style.textDecoration = 'underline';
                        poemParagraph.appendChild(underlinedSpan);
                    } else {
                        poemParagraph.appendChild(document.createTextNode(part));
                    }
                });
            }
        }

    }
    // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌


}  
  
