const teamSize = document.querySelector(".debrief-stat-teamSize");
const hintsUsed = document.querySelector(".debrief-stat-hintsUsed");
const activitiesCompleted = document.querySelector(".debrief-stat-activitiesCompleted");
const timeRemaining = document.querySelector(".debrief-stat-timeRemaining");
const finalScore = document.querySelector(".debrief-stat-finalScore");

const teamSizeModifier = document.querySelector(".debrief-stat-teamSize-modifier");
const hintsUsedModifier = document.querySelector(".debrief-stat-hintsUsed-modifier");
const activitiesCompletedModifier = document.querySelector(".debrief-stat-activitiesCompleted-modifier");
const timeRemainingModifier = document.querySelector(".debrief-stat-timeRemaining-modifier");

const scoreMeter = document.querySelector(".score-meter");
const footerContainer = document.querySelector(".footer-container");
const scoreContainer = document.querySelector(".score-container");
const medalContainer = document.querySelector(".medal-container");
const pageWrapper = document.querySelector(".page-wrapper");
const imageOutcome = document.querySelector(".image-outcome");

const statTeam = document.querySelector(".stat-team");
const statActivities = document.querySelector(".stat-activities");
const statTime = document.querySelector(".stat-time");
const statHints = document.querySelector(".stat-hints");
const statScore = document.querySelector(".stat-score");

const buttonExit = document.querySelector(".button__exit");

const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalParagraph = document.querySelector(".modal__paragraph");
const modalButton = document.querySelector(".modal__button");
const modalPopup = document.querySelector(".modal__popup");
const modalBlackout = document.querySelector(".modal__blackout");
const modalX = document.querySelector(".modal__x");
const iconDebrief = document.getElementById("icon-clickable--debrief");

const rankArray = ["TOT", "PAL", "CREW", "DOOD", "QUAVERING QUAZARS"];
const statElements = [statTeam, statActivities, statHints, statTime, statScore];

let isModalVisible = false;
let calculatedFinalScore = 0;
let retrievedDebriefStats = parseQueryParams();

function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);

    return {
        teamSize: getNumber(params.get("teamSize"), 1),
        hintsUsed: getNumber(params.get("hintsUsed"), 0),
        activitiesCompleted: getNumber(params.get("activitiesCompleted"), 0),
        timeRemaining: params.get("timeRemaining"),
        timeStarting: params.get("timeStarting"),
        outcome: params.get("outcome") || "victory",
        runId: params.get("runId") || generateRunId(),
        continueUrl: params.get("continueUrl") || "index.html"
    };
}

function getNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function isValidNumber(value) {
    return value !== null && value !== "" && !isNaN(Number(value));
}

function toggleClass(element, classToRemove, classToAdd) {
    if (!element) return;
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
}

function generateRunId() {
    return `run-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function sanitizeContinueUrl(url) {
    if (!url || typeof url !== "string") return "index.html";

    const trimmed = url.trim();

    if (
        trimmed.startsWith("http:") ||
        trimmed.startsWith("https:") ||
        trimmed.startsWith("//") ||
        trimmed.startsWith("javascript:")
    ) {
        return "index.html";
    }

    return trimmed;
}

function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
    const formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : String(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
}

function getMeterScaleFromScore(score) {
    const cappedScore = Math.max(0, Math.min(score, 1000));
    return cappedScore / 1000;
}

function getMedalCount(score) {
    if (score < 350) return 1;
    if (score < 700) return 2;
    if (score < 800) return 3;
    if (score < 900) return 4;
    return 5;
}

function preloadImages(imageUrls) {
    imageUrls.forEach(function (url) {
        const img = new Image();
        img.src = url;
    });
}

function goToClubhouse() {
   /* const character = new URLSearchParams(window.location.search).get("character") || "";*/

    const params = new URLSearchParams({
        finalScore: String(calculatedFinalScore),
        runId: retrievedDebriefStats.runId,
        outcome: retrievedDebriefStats.outcome,
        continueUrl: sanitizeContinueUrl(retrievedDebriefStats.continueUrl),
        /* character: character */
    });

    window.location.href = `clubhouse.html?${params.toString()}`;
}

function updateDebrief() {
    preloadImages([
        "assets/debrief/medal/medal-1.png",
        "assets/debrief/medal/medal-2.png",
        "assets/debrief/medal/medal-3.png",
        "assets/debrief/medal/medal-4.png",
        "assets/debrief/medal/medal-5.png"
    ]);

    if (imageOutcome) {
        if (retrievedDebriefStats.outcome === "fail") {
            imageOutcome.style.backgroundImage = "url(assets/debrief/outcome/fail.png)";
        } else if (retrievedDebriefStats.outcome === "victory") {
            imageOutcome.style.backgroundImage = "url(assets/debrief/outcome/victory.png)";
        }
    }

    if (timeRemainingModifier) {
        if (isValidNumber(retrievedDebriefStats.timeRemaining) && isValidNumber(retrievedDebriefStats.timeStarting)) {
            const totalSecondsSpent =
                Number(retrievedDebriefStats.timeStarting) - Number(retrievedDebriefStats.timeRemaining);
            timeRemainingModifier.textContent = convertSecondsToMinutes(totalSecondsSpent) + " spent";
        } else {
            timeRemainingModifier.textContent = "no limit";
        }
    }

    if (teamSizeModifier) {
        teamSizeModifier.textContent =
            retrievedDebriefStats.teamSize === 1
                ? retrievedDebriefStats.teamSize + " person"
                : retrievedDebriefStats.teamSize + " people";
    }

    if (hintsUsedModifier) {
        hintsUsedModifier.textContent = retrievedDebriefStats.hintsUsed + " used";
    }

    if (activitiesCompletedModifier) {
        activitiesCompletedModifier.textContent = retrievedDebriefStats.activitiesCompleted + " completed";
    }

    let teamScore = 250;
    const teamModifier = teamScore - retrievedDebriefStats.teamSize * 42 + 42;
    teamScore += teamModifier;

    let activityScore = 0;
    const activityModifier = Math.min(
        Math.max(activityScore + retrievedDebriefStats.activitiesCompleted * 63, 0),
        250
    );
    activityScore += activityModifier;

    let hintScore = 200;
    const hintModifier = Math.max(0, hintScore - retrievedDebriefStats.hintsUsed * 50 + 50);
    hintScore += hintModifier;

    let timeScore = 0;
    let timeModifier = 0;

    if (isValidNumber(retrievedDebriefStats.timeRemaining) && isValidNumber(retrievedDebriefStats.timeStarting)) {
        const timeRatio = 350 / Number(retrievedDebriefStats.timeStarting);
        timeScore += Math.round(timeRatio * Number(retrievedDebriefStats.timeRemaining));
        timeModifier = Math.min(timeScore, 250);
    }

    calculatedFinalScore = Math.round(teamModifier + activityModifier + hintModifier + timeModifier);

    if (teamSize) teamSize.innerHTML = "+" + teamModifier;
    if (activitiesCompleted) activitiesCompleted.innerHTML = "+" + activityModifier;
    if (hintsUsed) hintsUsed.innerHTML = "+" + hintModifier;
    if (timeRemaining) timeRemaining.innerHTML = "+" + timeModifier;
    if (finalScore) finalScore.innerHTML = "= " + calculatedFinalScore;

    updateScoreMeter(calculatedFinalScore);
    updateMedals(calculatedFinalScore);

    setTimeout(bringInImage, 500);
    setTimeout(bringInPageWrapper, 2300);
    setTimeout(bringInStats, 3200);
    setTimeout(bringInScoreMeter, statElements.length * 300 + 100 + 3200);
    setTimeout(bringInExit, statElements.length * 300 + 2500 + 3200);
}

function bringInStats() {
    for (let i = 0; i < statElements.length; i++) {
        setTimeout(() => {
            toggleClass(statElements[i], "stat--hidden", "stat--visible");
        }, i * 300);
    }
}

function bringInScoreMeter() {
    updateElementHeight();
    toggleClass(scoreContainer, "score-container--hidden", "score-container--visible");
    setTimeout(() => {
        toggleClass(medalContainer, "medal-container--hidden", "medal-container--visible");
    }, 200);
}

function bringInFooter() {
    toggleClass(footerContainer, "footer-container--hidden", "footer-container--visible");
}

function bringInExit() {
    toggleClass(buttonExit, "button__exit--hidden", "button__exit--visible");
}

function bringInImage() {
    updateElementHeight();
    toggleClass(imageOutcome, "image-outcome--out", "image-outcome--in");
}

function bringInPageWrapper() {
    toggleClass(pageWrapper, "page-wrapper--visible", "page-wrapper--hidden");
}

function updateScoreMeter(score) {
    if (!scoreMeter) return;
    scoreMeter.style.transform = `scaleX(${getMeterScaleFromScore(score)})`;
}

function updateMedals(score) {
    const medalCount = getMedalCount(score);

    for (let i = 1; i <= 5; i++) {
        const imgMedal = document.getElementById("img-medal-" + i);
        const rank = document.querySelector(".debrief-stat-rank-" + i);
        const divMedalContainer = document.getElementById("div-medal-container-" + i);

        if (!imgMedal || !rank || !divMedalContainer) continue;

        rank.textContent = rankArray[i - 1];
        divMedalContainer.classList.remove("div-medal-container--emphasis");

        if (i <= medalCount) {
            imgMedal.src = "assets/debrief/medal/medal-" + i + ".png";
            toggleClass(imgMedal, "img-medal--hidden", "img-medal--visible");
            toggleClass(rank, "debrief-stat-rank--light-brown", "debrief-stat-rank--black");

            if (i === medalCount) {
                setTimeout(() => {
                    divMedalContainer.classList.add("div-medal-container--hidden");
                    toggleClass(divMedalContainer, "div-medal-container--hidden", "div-medal-container--visible");
                    toggleClass(divMedalContainer, "div-medal-container--visible", "div-medal-container--emphasis");
                }, 300 + i * 120);
            }
        } else {
            imgMedal.src = "assets/debrief/medal/medal-" + i + "-hidden.png";
            imgMedal.classList.remove("img-medal--visible");
            imgMedal.classList.add("img-medal--hidden");
            rank.classList.remove("debrief-stat-rank--black");
            rank.classList.add("debrief-stat-rank--light-brown");
        }
    }
}

function createModal(title, paragraph, buttonText) {
    if (!modalTitle || !modalParagraph || !modalButton) return;
    modalTitle.innerHTML = title;
    modalParagraph.innerHTML = paragraph;
    modalButton.innerHTML = buttonText;
    toggleModalVisibility();
}

function toggleModalVisibility() {
    if (!modal || !modalPopup || !modalBlackout) return;

    if (isModalVisible === false) {
        toggleClass(modal, "modal--hidden", "modal--visible");
        toggleClass(modalPopup, "modal__popup--hidden", "modal__popup--visible");
        toggleClass(modalBlackout, "modal__blackout--hidden", "modal__blackout--visible");
        isModalVisible = true;
        return false;
    } else {
        toggleClass(modalPopup, "modal__popup--visible", "modal__popup--hidden");
        toggleClass(modalBlackout, "modal__blackout--visible", "modal__blackout--hidden");
        setTimeout(() => {
            toggleClass(modal, "modal--visible", "modal--hidden");
        }, 200);
        isModalVisible = false;
        return false;
    }
}

if (modalBlackout) {
    modalBlackout.addEventListener("click", function () {
        toggleModalVisibility();
    });
}

if (modalButton) {
    modalButton.addEventListener("click", function () {
        toggleModalVisibility();
    });
}

if (modalX) {
    modalX.addEventListener("click", function () {
        toggleModalVisibility();
    });
}

if (iconDebrief) {
    iconDebrief.addEventListener("click", function () {
        createModal(
            "How is your score calculated?",
            "Your score is determined by <span class='p--highlight'>the sum of 4 stats:</span> players, challenges, hints, and time. Each is worth up to 250 points. For a higher score, you must complete every available challenge, all while minimizing the number of players on your team, the number of hints used, and the time spent.",
            "Got it!"
        );
    });
}

if (buttonExit) {
    buttonExit.addEventListener("click", function () {
        goToClubhouse();
    });
}

let vh;
function setContainerSize() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function updateFontSize() {
    const elements = [
        [".p-title", 0.035],
        [".p-debrief-title", 0.15],
        [".p-debrief-subtitle", 0.15],
        [".p-debrief-stat", 0.3],
        [".debrief-stat-rank", 0.12],
        [".a-footer", 0.025]
    ];

    elements.forEach(([selector, scale]) => {
        document.querySelectorAll(selector).forEach(element => {
            const parentWidth = element.parentNode.offsetWidth;
            element.style.fontSize = `${parentWidth * scale}px`;
        });
    });
}

function updateElementHeight() {
    const elements = [
        [".debrief-container", 0.5],
        [".footer-container", 0.06],
        [".img-medal", 1.5],
        [".img-footer", 0.05]
    ];

    elements.forEach(([selector, height]) => {
        document.querySelectorAll(selector).forEach(element => {
            const parentWidth = element.parentNode.offsetWidth;
            element.style.height = `${parentWidth * height}px`;
        });
    });
}

function updateAbsoluteElements() {
    const elements = [
        [".image-outcome", 0.8, "widthHeight"],
        [".icon-clickable--debrief", 0.04, "fontSize"],
        [".style-border--default", 0.0025, "borderWidth"],
        [".style-border--debrief", 0.004, "borderWidth"],
        [".modal__popup", 0.67, "width"],
        [".modal__title", 0.029, "fontSize"],
        [".button__exit", 0.022, "fontSize"],
        [".modal__paragraph", 0.02, "fontSize"],
        [".modal__button", 0.026, "fontSize"],
        [".modal__x", 0.027, "fontSize"],
        [".modal__x", 0.029, "widthHeight"]
    ];

    elements.forEach(([selector, scale, type]) => {
        scaleAbsolutely(selector, scale, type);
    });

    function scaleAbsolutely(elementSelector, scaleFactor, type) {
        const siteContainer = document.querySelector(".debrief-container");
        if (!siteContainer) return;

        const siteContainerWidth = siteContainer.offsetWidth;

        document.querySelectorAll(elementSelector).forEach(element => {
            if (type === "fontSize") {
                element.style.fontSize = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "widthHeight") {
                element.style.width = `${siteContainerWidth * scaleFactor}px`;
                element.style.height = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "borderWidth") {
                element.style.borderWidth = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "height") {
                element.style.height = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "width") {
                element.style.width = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "marginTop") {
                element.style.marginTop = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "marginLeft") {
                element.style.marginLeft = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "marginRight") {
                element.style.marginRight = `${siteContainerWidth * scaleFactor}px`;
            }
            if (type === "marginBottom") {
                element.style.marginBottom = `${siteContainerWidth * scaleFactor}px`;
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setContainerSize();
    updateFontSize();
    updateElementHeight();
    updateAbsoluteElements();
    updateDebrief();
});

window.addEventListener("resize", function () {
    setContainerSize();
    updateFontSize();
    updateElementHeight();
    updateAbsoluteElements();
});

window.addEventListener("click", function () {
    updateFontSize();
    updateElementHeight();
    updateAbsoluteElements();
});