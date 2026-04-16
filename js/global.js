let gameMode;
let dragAndDropEdit = false;

let canRefresh = false;
let resourceTheme;
let resourceJS;
let playerCharacters = [];
let cutsceneIntroIndex = 0;
let cutsceneOutroIndex = 0;
let cutsceneFailIndex = 0;
let playerCharacterIndex = 0;
let activityArrayIndex;
let counter = 0;
let activeInput__codeInput;
let userInput = {};
let accessInput = [];
let time;
let minutes;
let seconds;
let isModalVisible = false;

let openState = {
  menu: false,
  hint: false
};


document.addEventListener("DOMContentLoaded", function () {
  const currentUrl = window.location.href;

  if (currentUrl.endsWith("answer-key.html") || currentUrl.endsWith("answer-key")) {
    gameMode = "preview";
  } else if (currentUrl.endsWith("free-play.html") || currentUrl.endsWith("free-play")) {
    gameMode = "free";
  } else {
    gameMode = "test";
    dragAndDropEdit = true;
  }

  updateClueTrackerVisibility();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Tab" || event.key === "Enter") {
    event.preventDefault();
  }
});

function parseInlineToolText(text) {
  if (!text || typeof text !== "string") {
    return "";
  }

  const parts = text.split(/(\[.*?\]|\*M\*\(.*?\))/g);

  return parts.map(part => {
    if (!part) {
      return "";
    }

    if (part.startsWith("[") && part.endsWith("]")) {
      const content = part.slice(1, -1);
      return `<span class="paragraph--underline">${content}</span>`;
    }

    if (part.startsWith("*M*(") && part.endsWith(")")) {
      const content = part.slice(4, -1);
      return `<span class="mg-font-target" data-tool-tag="mg-font">${content}</span>`;
    }

    return part;
  }).join("");
}

let setup = {
  playerCount: [1, 2, 3, 4, 5],
  activityCount: [1, 2, 3, 4, 5],
  timeLimit: ["60 min", "50 min", "40 min", "No limit"],
  reducedLimit: ["50 min", "40 min", "30 min", "No limit"],
  hints: ["Yes", "No"]
};

let difficulty = ["EASY", "NORMAL", "HARD", ""];

let settings = {
  playerCount: null,
  activityCount: null,
  timeLimit: null,
  hints: null,
  rewards: null
};

let debriefStats = {
  teamSize: 0,
  hintsUsed: 0,
  timeRemaining: 0,
  timeStarting: 0,
  activitiesCompleted: 0,
  outcome: null
};

let style = {
  border: {
    width: {
      none: "style-border-width--none",
      thin: "style-border-width--thin",
      default: "style-border-width--default"
    }
  },
  cell: {
    dimension: {
      size: {
        default: "style-cell-dimension-size--default",
        large: "style-cell-dimension-size--large"
      }
    }
  },
  misc: {
    material: {
      paper: "style-material--paper",
      metal: "style-material--metal"
    },
    padding: {
      half: "style-padding--half",
      default: "style-padding--default",
      double: "style-padding--double"
    },
    opacity: {
      percent0: "style-opacity--percent0"
    }
  },
  background: {
    size: {
      cover: "style-background-size--cover",
      contain: "style-background-size--contain"
    },
    repeat: {
      noRepeat: "style-background-repeat--no-repeat"
    },
    color: {
      lightGray: "style-background-color--light-gray",
      mediumGray: "style-background-color--medium-gray",
      brownLight: "style-background-color--brown-light",
      brown: "style-background-color--brown",
      salmon: "style-background-color--salmon",
      gold: "style-background-color--gold",
      teal: "style-background-color--teal",
      blue: "style-background-color--blue"
    }
  },
  text: {
    font: {
      default: {
        tag: "style-font--default__tag",
        title: "style-font--default__title",
        subtitle: "style-font--default__subtitle",
        paragraph: "style-font--default__paragraph",
        label: "style-font--default__label",
        fraction: "style-font--default__fraction",
        cryptogram: "style-font--default__cryptogram"
      },
      symbols: {
        tag: "style-font--symbols__tag",
        title: "style-font--symbols__title",
        paragraph: "style-font--symbols__paragraph",
        cryptogram: "style-font--symbols__cryptogram"
      },
      patterns: {
        paragraph: "style-font--patterns__paragraph",
        cryptogram: "style-font--patterns__cryptogram",
        key: "style-font--patterns__key"
      }
    },
    size: {
      tiny: "style-font--size__tiny",
      small: "style-font--size__small",
      mediumSmall: "style-font--size__mediumSmall",
      medium: "style-font--size__medium",
      large: "style-font--size__large"
    },
    align: {
      left: "style-align--left",
      right: "style-align--right",
      center: "style-align--center"
    },
    indent: {
      default: "style-font--indent__default"
    },
    brSplit: {
      default: "style-font--br-split__default"
    },
    padding: {
      default: {
        tag: "style-tag--default"
      },
      defaultSmallContainer: {
        tag: "style-tag--default--small-container"
      },
      double: {
        tag: "style-tag--double"
      },
      defaultNoBottom: {
        tag: "style-tag--default--no-bottom"
      },
      defaultNoBottomSmallContainer: {
        tag: "style-tag--default--no-bottom--small-container"
      }
    }
  },
  dimension: {
    width: {
      percent10: "style-width--percent-10",
      percent12: "style-width--percent-12",
      percent13: "style-width--percent-13",
      percent15: "style-width--percent-15",
      percent18: "style-width--percent-18",
      percent20: "style-width--percent-20",
      percent22: "style-width--percent-22",
      percent24: "style-width--percent-24",
      percent25: "style-width--percent-25",
      percent28: "style-width--percent-28",
      percent30: "style-width--percent-30",
      percent32: "style-width--percent-32",
      percent35: "style-width--percent-35",
      percent38: "style-width--percent-38",
      percent40: "style-width--percent-40",
      percent43: "style-width--percent-43",
      percent45: "style-width--percent-45",
      percent50: "style-width--percent-50",
      percent55: "style-width--percent-55",
      percent60: "style-width--percent-60",
      percent65: "style-width--percent-65",
      percent70: "style-width--percent-70",
      percent75: "style-width--percent-75",
      percent80: "style-width--percent-80",
      percent84: "style-width--percent-84",
      percent85: "style-width--percent-85",
      percent88: "style-width--percent-88",
      percent90: "style-width--percent-90",
      full: "style-width--full",
      puzzleWidth: "style-width--puzzle",
      auto: "style-width--auto",
      sort3Width: "style-width--sort-3",
      column3Width: "style-width--column-3",
      sort2Width: "style-width--sort-2",
      column2Width: "style-width--column-2",
      sort1Width: "style-width--sort-1",
      column1Width: "style-width--column-1",
      puzzleTextWidth: "style-width--puzzle-text"
    },
    height: {
      auto: "style-height--auto",
      full: "style-height--full",
      percent20: "style-height--percent-20",
      percent25: "style-height--percent-25",
      percent30: "style-height--percent-30",
      percent35: "style-height--percent-35",
      percent38: "style-height--percent-38",
      percent50: "style-height--percent-50",
      puzzleHeight: "style-height--puzzle"
    }
  },
  flexbox: {
    justifyContent: {
      spaceBetween: "style-justify-content--space-between",
      center: "style-justify-content--center"
    },
    alignItems: {
      center: "style-align-items--center",
      stretch: "style-align-items--stretch"
    },
    alignContent: {
      center: "style-align-content--center"
    },
    flexDirection: {
      column: "style-flex-direction--column"
    },
    flexGrow: {
      one: "style-flex-grow--one"
    }
  }
};

typewriterDelay = 10;

const isTouchDevice = navigator.maxTouchPoints > 0;
const allowedKeys = [
  "Backspace",
  "Delete",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
const allowedLetters = /^[a-zA-Z]$/;

///////
// save
///////

let activitiesToBeSaved = 0;

function initializeSave() {
  if (resource.challengeArray) {
    for (let i = 0; i < resource.challengeArray.length - 1; i++) {
      if (resource.challengeArray[i].activity.info.functionality === "drag-and-drop") {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["puzzle" + i] = {
          puzzlePosition: {}
        };
      }

      if (resource.challengeArray[i].activity.info.functionality === "puzzle") {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["puzzle" + i] = {
          puzzlePosition: {}
        };
      }

      if (resource.challengeArray[i].questions.info.type === "multiple-choice") {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["multiple-choice" + i] = {};
        for (let j = 0; j < resource.challengeArray[i].questions.contentArray.length; j++) {
          userInput["multiple-choice" + i]["answer" + j];
        }
      }

      if (resource.challengeArray[i].questions.info.type === "decoder") {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["decoder" + i] = {};
        for (let j = 0; j < resource.challengeArray[i].questions.contentArray.length; j++) {
          userInput["decoder" + i]["word" + j] = [];
          for (let k = 0; k < resource.challengeArray[i].questions.contentArray[j].word.length; k++) {
            userInput["decoder" + i]["word" + j][k] = "";
          }
        }
      }

      if (resource.challengeArray[i].questions.info.type === "crossword") {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["crossword" + i] = {};
        for (let j = 0; j < resource.challengeArray[i].questions.contentArray.puzzle.length; j++) {
          userInput["crossword" + i]["row" + j] = [];
          for (let k = 0; k < resource.challengeArray[i].questions.contentArray.puzzle[0].length; k++) {
            userInput["crossword" + i]["row" + j][k] = "";
          }
        }
      }
    }
  } else {
    for (let i = 0; i < resource.activityArray.length - 1; i++) {
      if (resource.activityArray[i].content.multipleChoice) {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["multipleChoice" + i] = {};
        for (let j = 0; j < resource.activityArray[i].content.multipleChoice.length; j++) {
          userInput["multipleChoice" + i]["answer" + j];
        }
      }

      if (resource.activityArray[i].content.decoder) {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["decoder" + i] = {};
        for (let j = 0; j < resource.activityArray[i].content.decoder.length; j++) {
          userInput["decoder" + i]["word" + j] = [];
          for (let k = 0; k < resource.activityArray[i].content.decoder[j].word.length; k++) {
            userInput["decoder" + i]["word" + j][k] = "";
          }
        }
      }

      if (resource.activityArray[i].content.crossword) {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["crossword" + i] = {};
        for (let j = 0; j < resource.activityArray[i].content.crossword.puzzle.length; j++) {
          userInput["crossword" + i]["row" + j] = [];
          for (let k = 0; k < resource.activityArray[i].content.crossword.puzzle[0].length; k++) {
            userInput["crossword" + i]["row" + j][k] = "";
          }
        }
      }

      if (resource.activityArray[i].content.puzzle) {
        activitiesToBeSaved = activitiesToBeSaved + 1;
        userInput["puzzle" + i] = {};
        userInput["puzzlePosition"] = {};
      }
    }
  }
}

//////////////////
// query selectors
//////////////////

const siteContainer = document.querySelector(".site-container");
const activity = document.querySelector(".activity");
const activityModal = document.querySelector(".activity-modal");
const activityModalContentContainer = document.querySelector(".activity-modal-content-container");
const activityModalContentContainerTop = document.querySelector(".activity-modal-content-container-top");
const activityModalContentContainerBottom = document.querySelector(".activity-modal-content-container-bottom");
const activityModalContentContainerToggle = document.querySelector(".activity-modal-content-container-toggle");
const activityModalCodeMachine = document.querySelector(".activity-modal-code-machine");
const activityModalWrapper = document.querySelector(".activity-modal-wrapper");
const activityModalHint = document.querySelector(".activity-modal-hint");
const activityModalHintText = document.querySelector(".activity-modal-hint-text");
const activityBlackout = document.querySelector(".activity-blackout");
const activityNodeContainer = document.querySelector(".activity-node-container");
const activityNodes = document.querySelectorAll(".activity-node");
const buttonCloseModal = document.querySelector(".button-close-modal");
const activityNodeTitles = document.querySelectorAll(".activity-node-title");
const activityButtonDone = document.querySelector(".activity-button-done");
const activityButtonHint = document.querySelector(".activity-button-hint");
const activityButtonStart = document.querySelector(".activity-button-start");
const footerButtonMenu = document.querySelector(".footer-button-menu");
const footer = document.querySelector(".footer");
const menu = document.querySelector(".menu");
const footerElementTimer = document.querySelector("#footer-element-timer");
const footerElementTimeLabel = document.querySelector(".footer-element-time-label");
const footerElementTimeRemaining = document.querySelector(".footer-element-time-remaining");
const clueTrackerPanelEl = document.getElementById("clue-tracker-panel");
const clueTrackerProgressEl = document.getElementById("clue-tracker-progress");
const clueTrackerListEl = document.getElementById("clue-tracker-list");
const splash = document.querySelector(".splash");
const splashContainerWrapper = document.querySelector(".splash-container-wrapper");
const menuButtonFullscreen = document.querySelector(".menu-button-fullscreen");
const keyboard = document.querySelector(".keyboard");
const keyboardButtons = document.querySelectorAll(".keyboard-button");
const keyboardSplash = document.querySelector(".keyboard--splash");
const keyboardButtonsSplash = document.querySelectorAll(".keyboard-button--splash");
const machineWrapper = document.querySelector(".machine-wrapper");
const machineContainer = document.querySelector(".machine-container");
const machineColumnLeft = document.querySelector(".machine-column-left");
const machineColumnRight = document.querySelector(".machine-column-right");
const activityModalHintButton = document.querySelector(".activity-modal-hint-button");
const scrollUp = document.querySelector(".scroll-up");
const body = document.querySelector("body");
const background = document.querySelector(".background");
const backgroundColorOffBlack = document.querySelector(".background-color--off-black");
const backgroundColorOffWhite = document.querySelector(".background-color--off-white");
const promoContainer = document.querySelector(".promo-container");
const promoContainerTitle = document.querySelector(".promo-container__title");
const promoContainerBanner = document.querySelector(".promo-container__banner");
const promoContainerResourceBanner = document.querySelector(".promo-container__resource-banner");
const promoContainerResource = document.querySelector(".promo-container__resource");

const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalParagraph = document.querySelector(".modal__paragraph");
const modalButton = document.querySelector(".modal__button");
const modalPopup = document.querySelector(".modal__popup");
const modalBlackout = document.querySelector(".modal__blackout");
const modalX = document.querySelector(".modal__x");

/////////////////////////
// clue tracker helpers
/////////////////////////

let clueRegistry = {};
let currentActivityKey = null;
let currentActivityCluePool = [];
let currentActivityCluesFound = [];
let currentActivityTotalClues = 0;

function isMagnifierUnlocked() {
  try {
    const raw = localStorage.getItem("clubhouseData");
    const data = raw ? JSON.parse(raw) : null;
    return Boolean(data?.unlockedTools?.magnifierRevealed);
  } catch (error) {
    return false;
  }
}

function updateClueTrackerVisibility() {
  if (!clueTrackerPanelEl) return;
  clueTrackerPanelEl.style.display = isMagnifierUnlocked() ? "block" : "none";
}

function ensureActivityRegistry(activityKey, activityCluePool) {
  if (!clueRegistry[activityKey]) {
    clueRegistry[activityKey] = {
      pool: Array.isArray(activityCluePool) ? activityCluePool.slice() : [],
      found: {}
    };
  } else {
    clueRegistry[activityKey].pool = Array.isArray(activityCluePool) ? activityCluePool.slice() : [];
  }

  clueRegistry[activityKey].pool.forEach(function(clue) {
    if (typeof clueRegistry[activityKey].found[clue] !== "boolean") {
      clueRegistry[activityKey].found[clue] = false;
    }
  });
}

function drawClueTracker() {
  if (!clueTrackerProgressEl || !clueTrackerListEl) return;

  clueTrackerProgressEl.textContent = `${currentActivityCluesFound.length} / ${currentActivityTotalClues} found`;

  const orderedActivityKeys = Object.keys(clueRegistry)
    .map(Number)
    .sort(function(a, b) { return a - b; });

  if (!orderedActivityKeys.length) {
    clueTrackerListEl.innerHTML = `<p class="clue-tracker-empty">Start searching for hidden clues...</p>`;
    return;
  }

  let html = "";

  orderedActivityKeys.forEach(function(activityNumber) {
    const activityKey = String(activityNumber);
    const registry = clueRegistry[activityKey];

    if (!registry || !Array.isArray(registry.pool) || !registry.pool.length) {
      return;
    }

    registry.pool.forEach(function(clue) {
      const isFound = registry.found[clue] === true;

      html += `
        <div class="clue-tracker-item ${isFound ? "clue-tracker-item--found" : "clue-tracker-item--hidden"}">
          ${isFound ? clue : "&nbsp;"}
        </div>
      `;
    });
  });

  clueTrackerListEl.innerHTML = html || `<p class="clue-tracker-empty">Start searching for hidden clues...</p>`;
}

function resetClueTracker(activityKey, activityCluePool) {
  currentActivityKey = String(activityKey);
  currentActivityCluePool = Array.isArray(activityCluePool) ? activityCluePool.slice() : [];
  currentActivityTotalClues = currentActivityCluePool.length;

  ensureActivityRegistry(currentActivityKey, currentActivityCluePool);

  currentActivityCluesFound = currentActivityCluePool.filter(function(clue) {
    return clueRegistry[currentActivityKey].found[clue] === true;
  });

  drawClueTracker();
}

function addClueToTracker(clueText) {
  if (!clueText || typeof clueText !== "string") return;
  if (!currentActivityKey) return;

  const cleanedClue = clueText.trim();
  if (!cleanedClue) return;

  ensureActivityRegistry(currentActivityKey, currentActivityCluePool);

  if (clueRegistry[currentActivityKey].pool.includes(cleanedClue)) {
    clueRegistry[currentActivityKey].found[cleanedClue] = true;
  }

  currentActivityCluesFound = currentActivityCluePool.filter(function(clue) {
    return clueRegistry[currentActivityKey].found[clue] === true;
  });

  drawClueTracker();
}

document.addEventListener("click", function (event) {
  if (!isMagnifierUnlocked()) return;

  const textClueEl = event.target.closest(".mg-font-target, .tool-target");
  if (textClueEl) {
    addClueToTracker(textClueEl.textContent);
    return;
  }

  const imageClueEl = event.target.closest(".image-clue-target");
  if (imageClueEl && imageClueEl.dataset.clue) {
    addClueToTracker(imageClueEl.dataset.clue);
  }
});

/////////
// footer
/////////

function createFooter() {
  footer.classList.add("footer--hidden");
  footerElementTimeLabel.textContent = resource.info.timerLabel;

  setTimeout(bringInFooter, 200);

  function bringInFooter() {
    setTimeout(toggleClass, 500, footer, "footer--hidden", "footer--visible");
    startTimer();
  }

  setTimeout(moveFooter, 1300);

  function moveFooter() {
    footer.classList.add("footer--right");
  }
}

////////
// timer
////////

let gameTimer;

function startTimer() {
  if (settings.timeLimit === "No limit") {
    let time = 0;
    let minutes = 0;
    let seconds = 0;

    gameTimer = setInterval(function () {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      footerElementTimeRemaining.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
  } else {
    time = parseInt(settings.timeLimit.slice(0, -4) * 60);
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    footerElementTimeRemaining.innerHTML = `${minutes}:${String(seconds).padStart(2, "0")}`;

    gameTimer = setInterval(function () {
      time--;

      if (time < 0) {
        splash.style.zIndex = 998;
        activityModal.style.zIndex = -1;
        activityBlackout.style.zIndex = -2;
        footer.style.zIndex = -3;
        activity.style.zIndex = -4;
        activityNodeContainer.style.zIndex = -5;
        clearInterval(gameTimer);
        clearSplashContainer();
        toggleClass(splash, "state-display-none", "state-display-block");
        setTimeout(toggleClass, 10, splash, "splash--hidden", "splash--visible");
        setTimeout(addCutscene, 10, cutsceneFailIndex, "fail");
        debriefStats.outcome = "fail";
      } else {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        footerElementTimeRemaining.innerHTML = `${minutes}:${String(seconds).padStart(2, "0")}`;
      }
    }, 1000);
  }
}

//////////////////
// element scaling
//////////////////

function updateAbsoluteElements() {
  const elements = [
    [".style-font--size__tiny", 0.014, "fontSize"],
    [".style-font--size__small", 0.017, "fontSize"],
    [".style-font--size__mediumSmall", 0.02, "fontSize"],
    [".style-font--size__medium", 0.025, "fontSize"],
    [".style-font--size__large", 0.03, "fontSize"],
    [".style-cell-dimension-size--default", 0.013, "widthHeight"],
    [".style-cell-dimension-size--large", 0.02, "widthHeight"],
    [".style-material--metal", 0.002, "borderWidth"],
    [".style-material--paper", 0.002, "borderWidth"],
    [".style-border--thin", 0.001, "borderWidth"],
    [".style-border-width--thin", 0.001, "borderWidth"],
    [".style-border--dynamic", 0.00125, "borderWidth"],
    [".style-border--default", 0.002, "borderWidth"],
    [".style-border-width--default", 0.002, "borderWidth"],
    [".style-text--background--gray-light", 0.002, "borderWidth"],
    [".style-text--background--blue-light", 0.002, "borderWidth"],
    [".style-text--background--white-light", 0.002, "borderWidth"],
    [".activity-content__number-line__arrow", 0.013, "widthHeight"],
    [".activity-content__number-line__line", 0, "height"],
    [".activity-content__number-line__tick", 0, "width"],
    [".activity-content__number-line", 0.04, "height"],
    [".activity-content__number-line__dot", 0.0125, "widthHeight"],
    [".activity-content__coordinate-plane__dot", 0.0125, "widthHeight"],
    [".style-tag--default", 0.004, "marginTop"],
    [".style-tag--default", -0.018, "marginLeft"],
    [".style-tag--default", 0.015, "marginBottom"],
    [".style-tag--double", 0.004, "marginTop"],
    [".style-tag--double", -0.045, "marginLeft"],
    [".style-tag--double", 0.03, "marginBottom"],
    [".style-tag--default--no-bottom", 0.006, "marginTop"],
    [".style-tag--default--no-bottom", -0.018, "marginLeft"],
    [".style-tag--default--no-bottom", 0, "marginBottom"],
    [".style-tag--default--no-bottom--small-container", 0.006, "marginTop"],
    [".style-tag--default--no-bottom--small-container", 0.01, "marginLeft"],
    [".style-tag--default--no-bottom--small-container", 0, "marginBottom"],
    [".style-tag--default--small-container", 0.006, "marginTop"],
    [".style-tag--default--small-container", -0.008, "marginLeft"],
    [".style-tag--default--small-container", 0.015, "marginBottom"],
    [".activity-content__fraction__container", 0.01, "marginRight"],
    [".activity-content__fraction__line", 0, "height"],
    [".activity-content__cryptogram__table-cell", 0.01, "fontSize"],
    [".activity-content__key__item__image", 0.03, "widthHeight"],
    [".activity-content__plane", 0.2, "widthHeight"],
    [".style-text--symbol--candy", 0.002, "borderWidth"],
    [".style-text--symbol--candy", 0.03, "widthHeight"],
    [".img-medal", 0.35, "widthHeight"],
    [".modal__popup", 0.5, "width"],
    [".modal__title", 0.022, "fontSize"],
    [".modal__paragraph", 0.015, "fontSize"],
    [".modal__button", 0.02, "fontSize"],
    [".modal__x", 0.02, "fontSize"],
    [".modal__x", 0.022, "widthHeight"]
  ];

  elements.forEach(([selector, scale, type]) => {
    scaleAbsolutely(selector, scale, type);
  });
}

function updateElementHeight() {
  const elements = [
    [".passage-image", 0.18],
    [".machine-radio-button", 0.066],
    [".machine-radio-button--2col", 0.13],
    [".activity-scene-dialogue-trail", 0.15],
    [".activity-scene-dialogue-trail-player", 0.14],
    [".code-input-line", 0.065],
    [".code-node-input-line", 0.16],
    ["#footer-element-timer", 1.083],
    [".activity-node-complete-banner", 1],
    [".activity-node-image", 1],
    [".code-box-button", 0.18],
    [".code-input-flash", 1.05],
    [".promo-container", 0.19],
    [".promo-container__resource", 0.3],
    [".promo-container__single-image", 0.65]
  ];

  elements.forEach(([selector, height]) => {
    heightElements(selector, height);
  });

  function heightElements(elementSelector, heightFactor) {
    document.querySelectorAll(elementSelector).forEach(element => {
      const parentWidth = element.parentNode.offsetWidth;
      element.style.height = `${parentWidth * heightFactor}px`;
    });
  }
}

function updateLineThickness() {
  const elements = [
    [".activity-node-title", 0.009],
    [".tab-button", 0.004],
    [".access-input", 0.003],
    [".character-select-button-text", 0.013],
    [".cutscene-text-box", 0.003],
    [".cutscene-text-box--default", 0.003],
    [".cutscene-character-name", 0.004],
    [".activity-modal", 0.01],
    [".activity-scene-button-start", 0.0025],
    [".passage", 0.0035],
    [".poem", 0.005],
    [".div-machine-item", 0.005],
    [".machine-radio-button", 0.0065],
    [".machine-radio-button--2col", 0.013],
    [".code-input", 0.035],
    [".code-node-input", 0.012],
    [".machine-crossword-input", 0.045],
    [".machine-puzzle-piece", 0.04],
    [".story", 0.0028],
    [".cryptogram-passage", 0.003],
    [".cryptogram", 0.0032],
    [".activity-scene-dialogue-wrapper", 0.0025],
    [".activity-scene-button", 0.0025]
  ];

  elements.forEach(([selector, thickness]) => {
    lineElements(selector, thickness);
  });

  function lineElements(elementSelector, thickFactor) {
    document.querySelectorAll(elementSelector).forEach(element => {
      const parentWidth = element.parentNode.offsetWidth;
      element.style.borderWidth = `${parentWidth * thickFactor}px`;
    });
  }
}

function updateElementSize() {
  const elements = [
    [".activity-node-title", 0.09],
    [".code-node-input-line-number", 0.07],
    [".code-input-label", 0.3],
    [".code-input-line-number", 0.06],
    [".code-input", 0.6],
    [".code-box-input", 0.093],
    [".code-box-button", 0.03],
    [".passage-title", 0.034],
    [".passage-paragraph", 0.034],
    [".machine-title", 0.049],
    [".machine-paragraph", 0.049],
    [".machine-paragraph--2col", 0.1],
    [".poem-title", 0.05],
    [".poem-author", 0.04],
    [".poem-paragraph", 0.05],
    [".machine-crossword-label-visible", 0.3],
    [".machine-crossword-label-hidden", 0.3],
    [".machine-crossword-input", 0.5],
    [".activity-puzzle-piece-text", 0.08],
    [".story-title", 0.03],
    [".story-author", 0.021],
    [".story-paragraph", 0.021],
    [".cryptogram-table-cell", 0.04],
    [".cryptogram-passage-text", 0.06],
    [".machine-item-cryptograph-decoder-letter", 0.7],
    [".machine-item-cryptogram-input", 0.7],
    [".splash-p", 0.015],
    [".splash-button", 0.033],
    [".tab-button", 0.05],
    [".splash-title", 0.035],
    [".splash-subtitle", 0.019],
    [".splash-nav", 0.025],
    [".splash-version", 0.018],
    [".cutscene-character-name", 0.035],
    [".cutscene-skip-text", 0.02],
    [".activity-scene-dialogue", 0.045],
    [".activity-scene-player-text", 0.06],
    [".activity-scene-topic", 0.03],
    [".activity-scene-character-name", 0.035],
    [".activity-scene-player-name", 0.05],
    [".activity-scene-button-start", 0.03],
    [".crossword-order", 0.3],
    [".crossword-text", 0.05],
    [".crossword-multipleChoice", 0.04],
    [".activity-scene-button", 0.04],
    [".activity-button-done", 0.04],
    [".activity-button-hint", 0.03],
    [".footer-element", 0.2],
    [".menu-button", 0.15],
    [".character-select-button", 0.03],
    [".activity-button-start", 0.05],
    [".footer-element-time-label", 0.17],
    [".footer-element-time-remaining", 0.25],
    [".tab-text", 0.03],
    [".activity-modal-hint-text", 0.055],
    [".activity-modal-hint-button", 0.055],
    [".cutscene-text", 0.047],
    [".keyboard-button", 0.03],
    [".keyboard-button--splash", 0.125],
    [".activity-button-done", 0.03],
    [".code-node-input", 0.11],
    [".access-input", 0.045],
    [".promo-container__title", 0.06],
    [".promo-container__banner", 0.06],
    [".promo-container__resource-overlay__text", 0.25],
    [".activity-block__paragraph", 0.034],
    [".span-difficulty", 0.12]
  ];

  elements.forEach(([selector, scale]) => {
    scaleElements(selector, scale);
  });

  splashContainerWrapper.style.height = `${splashContainerWrapper.parentNode.offsetWidth * 0.503}px`;
  activityNodeContainer.style.height = `${activityNodeContainer.parentNode.offsetWidth * 0.503}px`;
  activityModal.style.height = `${activityModal.parentNode.offsetWidth * 0.53}px`;
  keyboard.style.height = `${keyboard.parentNode.offsetWidth * 0.0975}px`;
}

/////////////////////
// reusable functions
/////////////////////

function setIpadActiveState(button) {
  button.setAttribute("ontouchstart", "");
}

function countCheckedRadiosByClass() {
  let count = 0;
  let machineRadioButton = document.querySelectorAll(".machine-radio-button");
  let machineItemMultipleChoice = document.querySelectorAll(".machine-item-multiple-choice");

  machineRadioButton.forEach((radioInput) => {
    if (radioInput.checked) {
      count++;
    }
  });

  if (machineItemMultipleChoice.length == count) {
    setTimeout(bringInInputs, 100);
  }
}

function bringInInputs() {
  let codeInputLine = document.querySelector(".code-input-line");
  toggleClass(codeInputLine, "code-input-line--hidden", "code-input-line--visible");
}

function toggleClass(element, classToRemove, classToAdd) {
  if (element) {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
  }
}

function makeRed(element, text) {
  element.innerHTML = text.replace(/(\{([^}]+)\})|(\[(.*?)\])/g, function (match, g1, g2, g3, g4) {
    if (g2 !== undefined) {
      return '<span class="machine-text-red">' + g2.toUpperCase() + "</span>";
    } else if (g4 !== undefined) {
      return '<span class="style-font--symbols">' + g4 + "</span>";
    }
  });
}

function scaleElements(elementSelector, scaleFactor) {
  document.querySelectorAll(elementSelector).forEach(element => {
    const parentWidth = element.parentNode.offsetWidth;
    element.style.fontSize = `${parentWidth * scaleFactor}px`;
  });
}

function scaleAbsolutely(elementSelector, scaleFactor, type) {
  const siteContainer = document.querySelector(".site-container");

  if (siteContainer) {
    if (type === "fontSize") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.fontSize = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "widthHeight") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.width = `${siteContainerWidth * scaleFactor}px`;
        element.style.height = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "borderWidth") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.borderWidth = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "height") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.height = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "width") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.width = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "marginTop") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.marginTop = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "marginLeft") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.marginLeft = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "marginRight") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.marginRight = `${siteContainerWidth * scaleFactor}px`;
      });
    }

    if (type === "marginBottom") {
      const siteContainerWidth = siteContainer.offsetWidth;
      document.querySelectorAll(elementSelector).forEach(element => {
        element.style.marginBottom = `${siteContainerWidth * scaleFactor}px`;
      });
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

function transformElement(element, transformX, transformY, rotate) {
  element.style.transform = `translate(${transformX}, ${transformY}) rotate(${rotate})`;
}
// --------------------------------------
// --------------------------------------
// ----- set keyboard functionality -----
// --------------------------------------
// --------------------------------------

function setHardwareKeyboardFunctionality(inputElement, inputClass, parentClass, activityIndex, i, j) {
  if (isTouchDevice) {
    inputElement.setAttribute("inputmode", "none");
  } else {
    inputElement.removeAttribute("inputmode");
  }

  inputElement.addEventListener("keydown", (event) => {
    if (!allowedKeys.includes(event.key) && !allowedLetters.test(event.key)) {
      event.preventDefault();
      inputElement.blur();
      return false;
    }

    if (event.key === "Delete" || event.key === "Backspace") {
      updateInputElementValue(inputElement, "");

      if (inputClass == "code-input") {
        syncUpdates(inputElement, "change");
        blurInput(inputElement);
        activeInput__codeInput = null;
        return false;
      }

      if (inputClass == "machine-item-cryptogram-input") {
        userInput["decoder" + activityIndex]["word" + i][j] = "";
        blurInput(inputElement);
        activeInput__codeInput = null;
        return false;
      }

      if (inputClass == "machine-crossword-input") {
        userInput["crossword" + activityIndex]["row" + i][j] = "";
        blurInput(inputElement);
        activeInput__codeInput = null;
        return false;
      }

      if (inputClass == "access-input") {
        blurInput(inputElement);
        activeInput__codeInput = null;
        checkIfAccessInputIsFilled();
        return false;
      }
    } else {
      updateInputElementValue(inputElement, event.key.toUpperCase());

      if (inputClass == "code-input") {
        activeInput__codeInput = inputElement;
        syncUpdates(inputElement, "change");
      }

      if (inputClass == "machine-item-cryptogram-input") {
        activeInput__codeInput = inputElement;
        userInput["decoder" + activityIndex]["word" + i][j] = event.key.toUpperCase();
        checkIfDecoderIsFilled();
      }

      if (inputClass == "machine-crossword-input") {
        activeInput__codeInput = inputElement;
        userInput["crossword" + activityIndex]["row" + i][j] = event.key.toUpperCase();
        checkIfCrosswordIsFilled();
      }

      if (inputClass == "access-input") {
        activeInput__codeInput = inputElement;
        checkIfAccessInputIsFilled();
      }
    }
  });

  inputElement.addEventListener("keyup", (event) => {
    if (!allowedKeys.includes(event.key) && !allowedLetters.test(event.key)) {
      event.preventDefault();
      inputElement.blur();
      return false;
    } else {
      blurInput(inputElement);

      if (inputClass !== "machine-crossword-input") {
        const parentElement = findParentWithClass(inputElement, parentClass);

        if (!parentElement) {
          return;
        } else {
          focusNextInput(event, inputClass, inputElement, parentElement, "hardwareKeyboard");
        }
      }
    }
  });
}

function setSoftwareKeyboardFunctionality(inputClass, parentClass, activityIndex) {
  const inputElements = document.querySelectorAll("." + inputClass);
  inputElements.forEach(inputElement => {
    inputElement.addEventListener("click", handleInputElementClick);
  });

  function handleInputElementClick(event) {
    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("code-input")) {
      activeInput__codeInput = event.target;
    }

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("machine-item-cryptogram-input")) {
      activeInput__codeInput = event.target;
    }

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("machine-crossword-input")) {
      activeInput__codeInput = event.target;
    }

    if (!event.target.classList.contains("keyboard-button") && event.target.classList.contains("access-input")) {
      activeInput__codeInput = event.target;
    }
  }

  keyboardButtons.forEach(function (button) {
    button.addEventListener("mousedown", handleKeyboardMousedown);

    function handleKeyboardMousedown(event) {
      if (inputClass === "code-input") {
        updateInputElementValue(activeInput__codeInput, event.target.innerText);

        if (activeInput__codeInput && activeInput__codeInput.classList.contains("code-input")) {
          syncUpdates(activeInput__codeInput, "change");
        }
      }

      if (inputClass == "machine-item-cryptogram-input") {
        updateInputElementValue(activeInput__codeInput, event.target.innerText);

        if (activeInput__codeInput && activeInput__codeInput.classList.contains("machine-item-cryptogram-input")) {
          checkIfDecoderIsFilled();

          const parentMachineItem = activeInput__codeInput.closest(".machine-item");
          const cryptogramInputs = parentMachineItem.querySelectorAll(".machine-item-cryptogram-input");
          const cryptogramInputsArray = Array.from(cryptogramInputs);
          const j = cryptogramInputsArray.indexOf(activeInput__codeInput);

          const parentMachineContainer = parentMachineItem.closest(".machine-container");
          const machineItems = parentMachineContainer.querySelectorAll(".machine-item");
          const machineItemsArray = Array.from(machineItems);
          let i = machineItemsArray.indexOf(parentMachineItem);

          if (i == 1) {
            userInput["decoder" + activityIndex]["word" + 2][j] = event.target.innerText;
          }

          if (i == 2) {
            userInput["decoder" + activityIndex]["word" + 1][j] = event.target.innerText;
          }

          if (i == 0 || i == 3) {
            userInput["decoder" + activityIndex]["word" + i][j] = event.target.innerText;
          }
        }
      }

      if (inputClass == "machine-crossword-input") {
        updateInputElementValue(activeInput__codeInput, event.target.innerText);

        if (activeInput__codeInput && activeInput__codeInput.classList.contains("machine-crossword-input")) {
          checkIfCrosswordIsFilled();

          const parentCrosswordCell = activeInput__codeInput.closest(".machine-crossword-cell");
          const crosswordCells = parentCrosswordCell.parentElement.querySelectorAll(".machine-crossword-cell");
          const crosswordCellsArray = Array.from(crosswordCells);
          const j = crosswordCellsArray.indexOf(parentCrosswordCell);

          const parentCrosswordRow = parentCrosswordCell.parentElement;
          const parentCrosswordContainer = parentCrosswordRow.parentElement;
          const crosswordRows = parentCrosswordContainer.querySelectorAll(".machine-crossword-row");
          const crosswordRowsArray = Array.from(crosswordRows);
          const i = crosswordRowsArray.indexOf(parentCrosswordRow);

          userInput["crossword" + activityIndex]["row" + i][j] = event.target.innerText;
        }
      }

      if (inputClass == "access-input" && isAccess == true) {
        updateInputElementValue(activeInput__codeInput, event.target.innerText);

        if (activeInput__codeInput && activeInput__codeInput.classList.contains("access-input")) {
          checkIfAccessInputIsFilled();
        }
      }
    }

    button.addEventListener("mouseup", handleKeyboardMouseup);

    function handleKeyboardMouseup(event) {
      if (inputClass == "code-input") {
        blurInput(activeInput__codeInput);
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        if (!parentElement) return;
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, "softwareKeyboard");
      }

      if (inputClass == "machine-item-cryptogram-input") {
        blurInput(activeInput__codeInput);
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        if (!parentElement) return;
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, "softwareKeyboard");
      }

      if (inputClass == "machine-crossword-input") {
        blurInput(activeInput__codeInput);
        if (activeInput__codeInput.classList.contains("machine-crossword-input")) {
          activeInput__codeInput = null;
        }
      }

      if (inputClass == "access-input") {
        blurInput(activeInput__codeInput);
        const parentElement = findParentWithClass(activeInput__codeInput, parentClass);
        if (!parentElement) return;
        debouncedFocusNextInput(event, inputClass, activeInput__codeInput, parentElement, "softwareKeyboard");
      }
    }
  });
}

function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedFocusNextInput = debounce(focusNextInput, 10);

function focusNextInput(event, inputClass, inputElement, parentElement, keyboardType) {
  let inputElements = parentElement.querySelectorAll(`.${inputClass}`);
  let currentIndex = Array.from(inputElements).findIndex((el) => el === inputElement);
  let nextIndex;

  if (
    (keyboardType === "hardwareKeyboard" && (event.key !== "Delete" && event.key !== "Backspace")) ||
    keyboardType === "softwareKeyboard"
  ) {
    nextIndex = currentIndex + 1;

    if (nextIndex >= inputElements.length) {
      inputElements.forEach(input => input.blur());
      activeInput__codeInput = null;
      return;
    }

    while (nextIndex < inputElements.length) {
      const nextInputElement = inputElements[nextIndex];
      if (nextInputElement.value === "") {
        nextInputElement.focus();
        activeInput__codeInput = nextInputElement;
        return;
      }
      nextIndex++;
    }
  }
}

function blurInput(inputElement) {
  if (inputElement) {
    inputElement.blur();
  }
}

function updateInputElementValue(inputElement, inputElementValue) {
  if (inputElement) {
    inputElement.value = inputElementValue;
  }
}

function findParentWithClass(element, className) {
  if (element) {
    if (element.classList.contains(className)) {
      return element;
    } else if (element.parentElement) {
      return findParentWithClass(element.parentElement, className);
    } else {
      return null;
    }
  }
}

function scrollToTop(element) {
  element.scrollTop = 0;
}

//////////////////
// event listeners
//////////////////

document.addEventListener("DOMContentLoaded", updateElementSize);
window.addEventListener("resize", updateElementSize);
window.addEventListener("click", updateElementSize);

document.addEventListener("DOMContentLoaded", updateElementHeight);
window.addEventListener("resize", updateElementHeight);
window.addEventListener("click", updateElementHeight);

document.addEventListener("DOMContentLoaded", updateLineThickness);
window.addEventListener("resize", updateLineThickness);
window.addEventListener("click", updateLineThickness);

document.addEventListener("DOMContentLoaded", setContainerSize);
window.addEventListener("resize", setContainerSize);
window.addEventListener("click", setContainerSize);

document.addEventListener("DOMContentLoaded", updateAbsoluteElements);
window.addEventListener("resize", updateAbsoluteElements);
window.addEventListener("click", updateAbsoluteElements);

const characterArray = [
  {
    name: "Wisdom",
    asset: "Wisdom.png",
    selected: false,
    dialogue: {
      start: ["I'll try.", "Sure thing.", "I can do it.", "Um, okay."],
      okay: ["Um, okay.", "Um, alright.", "Got it.", "Fine, I suppose."]
    }
  },
  {
    name: "Strength",
    asset: "Strength.png",
    selected: false,
    dialogue: {
      start: ["I can handle it.", "Leave it to me.", "Absolutely.", "Just watch me."],
      okay: ["Alright!", "Sounds good.", "Okay then.", "Of course."]
    }
  },
  {
    name: "Steadfast",
    asset: "Steadfast.png",
    selected: false,
    dialogue: {
      start: ["Let's go!", "Let's do this!", "Absolutely!", "I can do it!"],
      okay: ["Okay!", "Gotcha!", "Sure!", "Alright!"]
    }
  },
  {
    name: "Respect",
    asset: "Respect.png",
    selected: false,
    dialogue: {
      start: ["Easy! I got this.", "Piece of cake!", "No sweat!", "Hah! Easy."],
      okay: ["Pfft, whatever.", "Whatevs.", "I don't care.", "Yeah, yeah."]
    }
  },
  {
    name: "Heart",
    asset: "Heart.png",
    selected: false,
    dialogue: {
      start: ["I will do my best.", "I shall succeed.", "Consider it done.", "At your service."],
      okay: ["Affirmative.", "Got it.", "I understand.", "Understood."]
    }
  },
  {
    name: "Perseverance",
    asset: "Perserverance.png",
    selected: false,
    dialogue: {
      start: ["Whatever, dude.", "Ugh, fine...", "Do I have to?", "Eh... I'll try."],
      okay: ["Yeah, sure.", "I don't care.", "Alright, buddy.", "Whatever."]
    }
  },
  {
    name: "Friendship",
    asset: "Friendship.png",
    selected: false,
    dialogue: {
      start: ["I gotcha, bro.", "You bet!", "I'm on it!", "For sure, bud."],
      okay: ["For sure.", "Got it!", "Alright, friend.", "Gotcha!"]
    }
  },
  {
    name: "Loyalty",
    asset: "Loyalty.png",
    selected: false,
    dialogue: {
      start: ["Woof woof!", "Awooooo!", "Arf arf!", "Yip yip!"],
      okay: ["Woof woof!", "Awooooo!", "Arf arf!", "Yip yip!"]
    }
  }
];

const globalAssets = [
  [
    "assets/interface/button/next/default.png",
    "assets/interface/button/next/hover.png",
    "assets/interface/button/next/active.png",
    "assets/player/Strength.png",
    "assets/player/Respect.png",
    "assets/player/Wisdom.png",
    "assets/player/Heart.png",
    "assets/player/Steadfast.png",
    "assets/player/Perserverance.png",
    "assets/interface/scene/dialogue/text-box.png",
    "assets/interface/scene/dialogue/text-box-2.png",
    "assets/cutscene/Quester-0.png",
    "assets/cutscene/Quester-1.png",
    "assets/cutscene/Quester-2.png",
    "assets/cutscene/Quester-3.png",
    "assets/cutscene/Quester-closeup.png",
    "assets/cutscene/Quester-alert.png",
    "assets/interface/scene/overlay/static.gif"
  ],
  [
    "assets/interface/machine/node/code.png",
    "assets/interface/machine/sidebar/menu.png",
    "assets/interface/machine/sidebar/Time_Keeper.png",
    "assets/interface/scene/background/accent-player.png",
    "assets/interface/scene/dialogue/dialogue-trail-player.png",
    "assets/interface/scene/dialogue/dialogue-trail.png",
    "assets/cutscene/ship.png"
  ],
  [
    "assets/interface/button/close/active.png",
    "assets/interface/button/close/hover.png",
    "assets/interface/button/done/active.png",
    "assets/interface/button/done/hover.png",
    "assets/interface/button/finish/active.png",
    "assets/interface/button/finish/hover.png",
    "assets/interface/button/hint/active.png",
    "assets/interface/button/hint/hover.png",
    "assets/interface/button/keyboard/active.png",
    "assets/interface/button/keyboard/hover.png",
    "assets/interface/button/scroll/active.png",
    "assets/interface/button/scroll/hover.png",
    "assets/interface/button/scroll-up/active.png",
    "assets/interface/button/scroll-up/hover.png",
    "assets/interface/machine/node/complete.png",
    "assets/debrief/outcome/fail.png",
    "assets/debrief/outcome/victory.png"
  ]
];

let vh;

function setContainerSize() {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function styleText(input) {
  input = input.replace(/×/g, "&#215;").replace(/÷/g, "&#247;");

  const replacePattern = (text, marker, classNames, customFormat) => {
    const regex = new RegExp(`\\[<${marker}>(.*?)\\]`, "g");
    return text.replace(regex, (match, content) => {
      if (customFormat) {
        return customFormat(content);
      } else {
        const classes = Array.isArray(classNames) ? classNames.join(" ") : classNames;
        return `<span class="${classes}">${content}</span>`;
      }
    });
  };

  const styles = {
    u: "style-text--underline",
    i: "style-text--italic",
    s: "style-text--symbol",
    p: "style-text--patterns",
    g: "style-text--gold",
    sal: "style-text--salmon",
    blu: "style-text--blue",
    fsms: "style-font--size__mediumSmall",
    fss: "style-font--size__small",
    tal: ["style-text--align--center"],
    taj: ["style-text--align--justify"],
    bgl: ["style-text--background--gray-light"],
    bn: ["style-text--background--none"],
    bbl: ["style-text--background--blue-light"],
    bwl: ["style-text--background--white-light"],
    bwb: ["style-text--block", "style-text--block--white-black"],
    scs: ["style-text--symbol--candy", "style-text--symbol--candy--salmon"],
    scg: ["style-text--symbol--candy", "style-text--symbol--candy--gold"],
    sct: ["style-text--symbol--candy", "style-text--symbol--candy--teal"],
    scb: ["style-text--symbol--candy", "style-text--symbol--candy--blue"],
    scp: ["style-text--symbol--candy", "style-text--symbol--candy--purple"],
    f: {
      customFormat: (content) => {
        const [numerator, denominator] = content.split("/");
        return `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`;
      }
    },
    e: {
      customFormat: (content) => `<sup>${content}</sup>`
    },
    o0: "style-text--opacity--0"
  };

  Object.keys(styles).forEach(marker => {
    const style = styles[marker];
    if (typeof style === "string" || Array.isArray(style)) {
      input = replacePattern(input, marker, style, null);
    } else if (style.customFormat) {
      input = replacePattern(input, marker, null, style.customFormat);
    }
  });

  return input;
}

function createModal(title, paragraph, button) {
  modalTitle.innerHTML = title;
  modalParagraph.innerHTML = paragraph;
  modalButton.innerHTML = button;
  toggleModalVisibility();
}

modalBlackout.addEventListener("click", function () {
  toggleModalVisibility();
});

modalButton.addEventListener("click", function () {
  toggleModalVisibility();
});

modalX.addEventListener("click", function () {
  toggleModalVisibility();
});

function toggleModalVisibility() {
  if (isModalVisible === false) {
    toggleClass(modal, "modal--hidden", "modal--visible");
    toggleClass(modalPopup, "modal__popup--hidden", "modal__popup--visible");
    toggleClass(modalBlackout, "modal__blackout--hidden", "modal__blackout--visible");
    isModalVisible = true;
    return false;
  } else {
    toggleClass(modalPopup, "modal__popup--visible", "modal__popup--hidden");
    toggleClass(modalBlackout, "modal__blackout--visible", "modal__blackout--hidden");
    setTimeout(hideModal, 200);

    function hideModal() {
      toggleClass(modal, "modal--visible", "modal--hidden");
    }

    isModalVisible = false;
    return false;
  }
}

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gesturechange", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gestureend", function (e) {
  e.preventDefault();
}, { passive: false });

document.ondblclick = function (e) {
  e.preventDefault();
};

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

function addUnloadEventListener() {
  window.addEventListener("beforeunload", function (e) {
    if (canRefresh === false) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
}

let globalAssetArrays = {
  priority: {
    high: {
      game: ["assets/branding/logo/logo-main.png"],
      debrief: ["assets/debrief/outcome/fail.png", "assets/debrief/outcome/victory.png"]
    },
    low: {
      onPinInput: {
        asset: [
          "assets/cutscene/Quester-0.png",
          "assets/cutscene/Quester-1.png",
          "assets/cutscene/Quester-2.png",
          "assets/cutscene/Quester-3.png",
          "assets/player/Strength.png",
          "assets/player/Respect.png",
          "assets/player/Wisdom.png",
          "assets/player/Heart.png",
          "assets/player/Steadfast.png",
          "assets/player/Perserverance.png",
          "assets/player/Friendship.png",
          "assets/player/Loyalty.png"
        ],
        delay: 200
      },
      onSettings: {
        asset: [
          "assets/cutscene/Quester-alert.png",
          "assets/cutscene/Quester-closeup.png",
          "assets/interface/button/next/default.png",
          "assets/interface/button/next/hover.png",
          "assets/interface/button/next/active.png"
        ],
        delay: 200
      },
      onCharacterSelect: {
        asset: [
          "assets/interface/scene/overlay/static.gif",
          "assets/interface/scene/dialogue/text-box.png",
          "assets/interface/scene/dialogue/text-box-2.png"
        ],
        delay: 200
      },
      onCutsceneStart: {
        asset: [],
        delay: 200
      },
      onGameStart: {
        asset: [
          "assets/interface/machine/node/code.png",
          "assets/interface/machine/sidebar/menu.png",
          "assets/interface/machine/sidebar/Time_Keeper.png",
          "assets/interface/scene/background/accent-player.png",
          "assets/interface/scene/dialogue/dialogue-trail-player.png",
          "assets/interface/scene/dialogue/dialogue-trail.png",
          "assets/interface/button/close/active.png",
          "assets/interface/button/close/hover.png",
          "assets/interface/button/done/active.png",
          "assets/interface/button/done/hover.png",
          "assets/interface/button/finish/active.png",
          "assets/interface/button/finish/hover.png",
          "assets/interface/button/hint/active.png",
          "assets/interface/button/hint/hover.png",
          "assets/interface/button/keyboard/active.png",
          "assets/interface/button/keyboard/hover.png",
          "assets/interface/button/scroll/active.png",
          "assets/interface/button/scroll/hover.png",
          "assets/interface/button/scroll-up/active.png",
          "assets/interface/button/scroll-up/hover.png",
          "assets/interface/machine/node/complete.png"
        ],
        delay: 200
      },
      onActivity: {
        asset: [],
        delay: 200
      },
      onGameFinish: {
        asset: [
          "assets/cutscene/Quester-0.png",
          "assets/cutscene/Quester-1.png",
          "assets/cutscene/Quester-2.png",
          "assets/cutscene/Quester-3.png",
          "assets/cutscene/ship.png"
        ],
        delay: 200
      }
    }
  }
};

var loadedImages = [];

function preloadImages(imagePathsArray, priority) {
  imagePathsArray.forEach(path => {
    if (priority === "high") {
      var link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = path;
      document.head.appendChild(link);
    } else {
      var img = new Image();
      if (path === "preview-logo") {
        path = resource.info.logo;
      }
      img.src = path;
      img.onload = () => {
        loadedImages.push(img);
      };
      img.onerror = () => {
        console.error(`Error loading ${path}`);
      };
    }
  });
}

function handlePreloading(eventName) {
  function preloadAssetsWithDelay(eventAssets, priorityLevel) {
    if (eventAssets) {
      if (eventAssets.delay > 0) {
        setTimeout(() => {
          preloadImages(eventAssets.asset, priorityLevel);
        }, eventAssets.delay);
      } else {
        preloadImages(eventAssets.asset, priorityLevel);
      }
    } else {
      console.error("No assets defined for this event: " + eventName);
    }
  }

  if (globalAssetArrays.priority.low[eventName]) {
    preloadAssetsWithDelay(globalAssetArrays.priority.low[eventName], "low");
  }

  if (localAssetArrays && localAssetArrays.priority.low[eventName]) {
    preloadAssetsWithDelay(localAssetArrays.priority.low[eventName], "low");
  }
}

function loadHighPriorityGameAssets(state) {
  const assets = globalAssetArrays.priority.high[state];
  preloadImages(assets, "high");
}

loadHighPriorityGameAssets("game");