//create elements
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
function drawDecoder(activityIndex) {

    if (gameMode === "preview") {
        machineContainer.classList.add("state-pointer-events-none");
    }

    let activityDecoder = resource.challengeArray[activityArrayIndex].questions;
    for (let i = 0; i < activityDecoder.contentArray.length; i++) {
        let machineItemCryptogramDecoder;
        let machineItemCryptogramInputColumn;
        let machineItemCryptogramInput;

        if (i == 0) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnLeft);
        if (i == 1) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnRight);
        if (i == 2) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnLeft);
        if (i == 3) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnRight);

        const machineItemCryptogramDecoderTitle = createElement('p', ['machine-title'], machineItemCryptogramDecoder);
        machineItemCryptogramDecoderTitle.innerHTML = styleText(activityDecoder.contentArray[i].title);

        const machineItemCryptogramInputContainer = createElement('div', ['machine-item-cryptogram-input-container'], machineItemCryptogramDecoder);

        // --- PRECISION MAP LOGIC ---
        let originalWord = activityDecoder.contentArray[i].word;
        let activityDecoderWord = "";
        let goldPositions = [];
        let cleanIndex = 0;
        let isInsideBrackets = false;

        for (let char of originalWord) {
            if (char === '[') { isInsideBrackets = true; continue; }
            if (char === ']') { isInsideBrackets = false; continue; }
            activityDecoderWord += char;
            if (isInsideBrackets) goldPositions.push(cleanIndex);
            cleanIndex++;
        }

        for (let j = 0; j < activityDecoderWord.length; j++) {
            machineItemCryptogramInputColumn = createElement('div', ['machine-item-cryptogram-input-column'], machineItemCryptogramInputContainer);
            let machineItemCryptogramDecoderLetter = createElement('p', ['machine-item-cryptograph-decoder-letter'], machineItemCryptogramInputColumn);
            machineItemCryptogramDecoderLetter.textContent = activityDecoderWord[j];

            machineItemCryptogramInput = createElement('input', ['machine-item-cryptogram-input', 'input-functionality-default'], machineItemCryptogramInputColumn);
            machineItemCryptogramInput.type = 'text';
            machineItemCryptogramInput.maxLength = '1';

            if (activityDecoder.info.functionality === "noCode") {
                machineItemCryptogramDecoderLetter.classList.add("state-display-none");
                machineItemCryptogramInput.classList.add("state-aspect-ratio-input");
            }

            // Apply gold only to mapped positions
            if (goldPositions.includes(j)) {
                machineItemCryptogramInput.classList.add('input-red');
            }

            setHardwareKeyboardFunctionality(machineItemCryptogramInput, "machine-item-cryptogram-input", "machine-item-cryptogram-input-container", activityIndex, i, j);
            machineItemCryptogramInput.value = userInput["decoder" + activityIndex]["word" + i][j];

            if (gameMode === "preview") {
                machineItemCryptogramInput.value = activityDecoderWord[j];
            }
        }
    }

    checkIfDecoderIsFilled();
    setSoftwareKeyboardFunctionality("machine-item-cryptogram-input", "machine-item-cryptogram-input-container", activityIndex);
}
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

// ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
function drawActivity_decoder(activityIndex) {
    let activityDecoder = resource.activityArray[activityArrayIndex - 1].content.decoder;
    for (let i = 0; i < activityDecoder.length; i++) {
        let machineItemCryptogramDecoder;
        let machineItemCryptogramInputColumn;
        let machineItemCryptogramInput;

        if (i == 0) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnLeft);
        if (i == 1) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnRight);
        if (i == 2) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnLeft);
        if (i == 3) machineItemCryptogramDecoder = createElement('div', ['machine-item-cryptogram-decoder', 'machine-item'], machineColumnRight);

        const machineItemCryptogramDecoderTitle = createElement('p', ['machine-title'], machineItemCryptogramDecoder);
        machineItemCryptogramDecoderTitle.textContent = activityDecoder[i].title;
        makeRed(machineItemCryptogramDecoderTitle, activityDecoder[i].title);

        const machineItemCryptogramInputContainer = createElement('div', ['machine-item-cryptogram-input-container'], machineItemCryptogramDecoder);

        // --- PRECISION MAP LOGIC ---
        let originalWord = activityDecoder[i].word;
        let activityDecoderWord = "";
        let goldPositions = [];
        let cleanIndex = 0;
        let isInsideBrackets = false;

        for (let char of originalWord) {
            if (char === '[') { isInsideBrackets = true; continue; }
            if (char === ']') { isInsideBrackets = false; continue; }
            activityDecoderWord += char;
            if (isInsideBrackets) goldPositions.push(cleanIndex);
            cleanIndex++;
        }

        for (let j = 0; j < activityDecoderWord.length; j++) {
            machineItemCryptogramInputColumn = createElement('div', ['machine-item-cryptogram-input-column'], machineItemCryptogramInputContainer);
            let machineItemCryptogramDecoderLetter = createElement('p', ['machine-item-cryptograph-decoder-letter'], machineItemCryptogramInputColumn);
            machineItemCryptogramDecoderLetter.textContent = activityDecoderWord[j];

            machineItemCryptogramInput = createElement('input', ['machine-item-cryptogram-input', 'input-functionality-default'], machineItemCryptogramInputColumn);
            machineItemCryptogramInput.type = 'text';
            machineItemCryptogramInput.maxLength = '1';

            if (goldPositions.includes(j)) {
                machineItemCryptogramInput.classList.add('input-red');
            }

            setHardwareKeyboardFunctionality(machineItemCryptogramInput, "machine-item-cryptogram-input", "machine-item-cryptogram-input-container", activityIndex, i, j);
            machineItemCryptogramInput.value = userInput["decoder" + activityIndex]["word" + i][j];

            if (gameMode === "preview") {
                machineItemCryptogramInput.value = activityDecoderWord[j];
            }
        }
    }

    checkIfDecoderIsFilled();
    setSoftwareKeyboardFunctionality("machine-item-cryptogram-input", "machine-item-cryptogram-input-container", activityIndex);
}
// ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

function checkIfDecoderIsFilled() {
    var filledCells = document.querySelectorAll('.machine-item-cryptogram-input');
    var allFilled = true;
    for (var i = 0; i < filledCells.length; i++) {
        if (!filledCells[i].value) {
            allFilled = false;
            break;
        }
    }
    if (allFilled) {
        setTimeout(bringInInputs, 100);
    } else {
        return false;
    }
}