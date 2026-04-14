function drawPoem() {

    function appendParsedPoemText(targetElement, text) {
        if (!text || typeof text !== "string") {
            return;
        }

        const textParts = text.split(/(\[.*?\]|\*M\*\(.*?\))/);

        textParts.forEach(part => {

            // underline tag: [TEXT]
            if (part.startsWith('[') && part.endsWith(']')) {
                const underlinedText = part.slice(1, -1);
                const span = document.createElement('span');
                span.textContent = underlinedText;
                span.style.textDecoration = 'underline';
                targetElement.appendChild(span);
            }

            // magnifier tag: *M*(TEXT)
            else if (part.startsWith('*M*(') && part.endsWith(')')) {
                const mgText = part.slice(4, -1);
                const span = document.createElement('span');
                span.textContent = mgText;
                span.classList.add('mg-font-target');
                span.setAttribute('data-tool-tag', 'mg-font');
                targetElement.appendChild(span);
            }

            // normal text
            else {
                targetElement.appendChild(document.createTextNode(part));
            }
        });
    }

    // challenge mode
    if (resource.challengeArray) {

        const activityPoem = resource.challengeArray[activityArrayIndex].activity;

        const poemContainer = createElement('div', ['poem-container'], activityModalContentContainerTop);

        const poem = createElement('div', ['poem', activityPoem.style.material], poemContainer);
        transformElement(
            poem,
            activityPoem.item.transform.translateX,
            activityPoem.item.transform.translateY,
            activityPoem.item.transform.rotate
        );

        const poemTitle = createElement('p', ['poem-title', activityPoem.style.text.title], poem);
        appendParsedPoemText(poemTitle, activityPoem.item.title);

        const poemAuthor = createElement('p', ['poem-author', activityPoem.style.text.author], poem);
        appendParsedPoemText(poemAuthor, activityPoem.item.author);

        for (let i = 0; i < activityPoem.item.paragraph.length; i++) {
            const poemStanza = createElement('p', ['poem-stanza'], poem);

            for (let j = 0; j < activityPoem.item.paragraph[i].length; j++) {
                const poemParagraph = createElement(
                    'p',
                    ['poem-paragraph', activityPoem.style.text.paragraph],
                    poemStanza
                );

                appendParsedPoemText(poemParagraph, activityPoem.item.paragraph[i][j]);
            }
        }
    }

    // normal activity mode
    else {

        const activityPoem = resource.activityArray[activityArrayIndex - 1].content.poem;

        const poemContainer = createElement('div', ['poem-container'], activityModalContentContainerTop);

        const poem = createElement('div', ['poem', activityPoem.style.material], poemContainer);
        transformElement(
            poem,
            activityPoem.item.transform.translateX,
            activityPoem.item.transform.translateY,
            activityPoem.item.transform.rotate
        );

        const poemTitle = createElement('p', ['poem-title', activityPoem.style.text.title], poem);
        appendParsedPoemText(poemTitle, activityPoem.item.title);

        const poemAuthor = createElement('p', ['poem-author', activityPoem.style.text.author], poem);
        appendParsedPoemText(poemAuthor, activityPoem.item.author);

        for (let i = 0; i < activityPoem.item.paragraph.length; i++) {
            const poemStanza = createElement('p', ['poem-stanza'], poem);

            for (let j = 0; j < activityPoem.item.paragraph[i].length; j++) {
                const poemParagraph = createElement(
                    'p',
                    ['poem-paragraph', activityPoem.style.text.paragraph],
                    poemStanza
                );

                appendParsedPoemText(poemParagraph, activityPoem.item.paragraph[i][j]);
            }
        }
    }
}