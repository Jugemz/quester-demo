// store user inputs
let inputValues = {};

// challenge mode
function drawCryptogram(i) {
  const activityCryptogram = resource.challengeArray[activityArrayIndex].activity;

  const cryptogramContainer = createElement(
    "div",
    ["cryptogram-container"],
    activityModalContentContainerTop
  );

  // passages
  const cryptogramPassageContainer = createElement(
    "div",
    ["cryptogram-passage-container"],
    cryptogramContainer
  );

  for (let i = 0; i < activityCryptogram.item.passage.length; i++) {
    const cryptogramPassage = createElement(
      "div",
      ["cryptogram-passage", activityCryptogram.style.material],
      cryptogramPassageContainer
    );

    const cryptogramPassageText = createElement(
      "p",
      ["cryptogram-passage-text", activityCryptogram.style.text.paragraph],
      cryptogramPassage
    );

    const rawText = activityCryptogram.item.passage[i].text.paragraph;
    cryptogramPassageText.innerHTML = styleText(parseInlineToolText(rawText));

    transformElement(
      cryptogramPassage,
      activityCryptogram.item.passage[i].transform.translateX,
      activityCryptogram.item.passage[i].transform.translateY,
      activityCryptogram.item.passage[i].transform.rotate
    );
  }

  // cryptogram table
  const cryptogram = createElement(
    "div",
    ["cryptogram", activityCryptogram.style.material],
    cryptogramContainer
  );

  transformElement(
    cryptogram,
    activityCryptogram.item.cryptogram.transform.translateX,
    activityCryptogram.item.cryptogram.transform.translateY,
    activityCryptogram.item.cryptogram.transform.rotate
  );

  const cryptogramTable = createElement("table", ["cryptogram-table"], cryptogram);
  const symbolArray = [
    "AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM",
    "NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ"
  ];
  const cellsPerRow = Math.ceil(symbolArray.length / 2);

  for (let row = 0; row < 2; row++) {
    const cryptogramRow = createElement("tr", ["cryptogram-table-row"], cryptogramTable);

    for (let cell = 0; cell < cellsPerRow; cell++) {
      const index = row * cellsPerRow + cell;

      const cryptogramCell = createElement(
        "td",
        ["cryptogram-table-cell", activityCryptogram.style.text.paragraph],
        cryptogramRow
      );

      if (index < symbolArray.length) {
        const letters = symbolArray[index];
        const firstLetter = letters.charAt(0);
        const secondLetter = letters.charAt(1);
        cryptogramCell.innerHTML = `${firstLetter}<br>${secondLetter}`;
      }
    }
  }
}

// normal activity mode
function drawActivity_cryptogram(activityArrayIndex) {
  const activityCryptogram = resource.activityArray[activityArrayIndex - 1].content.cryptogram;

  const cryptogramContainer = createElement(
    "div",
    ["cryptogram-container"],
    activityModalContentContainerTop
  );

  // passages
  const cryptogramPassageContainer = createElement(
    "div",
    ["cryptogram-passage-container"],
    cryptogramContainer
  );

  for (let i = 0; i < activityCryptogram.passage.length; i++) {
    const cryptogramPassage = createElement(
      "div",
      ["cryptogram-passage", activityCryptogram.passage[i].style.material],
      cryptogramPassageContainer
    );

    const cryptogramPassageText = createElement(
      "p",
      ["cryptogram-passage-text", activityCryptogram.passage[i].style.paragraph],
      cryptogramPassage
    );

    const rawText = activityCryptogram.passage[i].text.paragraph;
    cryptogramPassageText.innerHTML = styleText(parseInlineToolText(rawText));

    transformElement(
      cryptogramPassage,
      activityCryptogram.passage[i].transform.translateX,
      activityCryptogram.passage[i].transform.translateY,
      activityCryptogram.passage[i].transform.rotate
    );
  }

  // cryptogram table
  const cryptogram = createElement(
    "div",
    ["cryptogram", activityCryptogram.style.material],
    cryptogramContainer
  );

  transformElement(
    cryptogram,
    activityCryptogram.transform.translateX,
    activityCryptogram.transform.translateY,
    activityCryptogram.transform.rotate
  );

  const cryptogramTable = createElement("table", ["cryptogram-table"], cryptogram);
  const symbolArray = resource.activityArray[activityArrayIndex - 1].symbol;
  const cellsPerRow = Math.ceil(symbolArray.length / 2);

  for (let row = 0; row < 2; row++) {
    const cryptogramRow = createElement("tr", ["cryptogram-table-row"], cryptogramTable);

    for (let cell = 0; cell < cellsPerRow; cell++) {
      const index = row * cellsPerRow + cell;

      const cryptogramCell = createElement(
        "td",
        ["cryptogram-table-cell", activityCryptogram.style.text],
        cryptogramRow
      );

      if (index < symbolArray.length) {
        const letters = symbolArray[index];
        const firstLetter = letters.charAt(0);
        const secondLetter = letters.charAt(1);
        cryptogramCell.innerHTML = `${firstLetter}<br>${secondLetter}`;
      }
    }
  }
}