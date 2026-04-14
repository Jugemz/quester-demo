console.log("Clubhouse JS loaded");

const finalScoreEl = document.querySelector(".clubhouse-stat-finalScore");
const previousTotalEl = document.querySelector(".clubhouse-stat-previousTotal");
const newTotalEl = document.querySelector(".clubhouse-stat-newTotal");

const totalSessionsEl = document.querySelector(".clubhouse-stat-totalSessions");
const averageScoreEl = document.querySelector(".clubhouse-stat-averageScore");
const bestScoreEl = document.querySelector(".clubhouse-stat-bestScore");
const winStreakEl = document.querySelector(".clubhouse-stat-winStreak");
const rankEl = document.querySelector(".clubhouse-stat-rank");

const scoreContainer = document.querySelector(".score-container");
const scoreMeter = document.querySelector(".clubhouse-score-meter");
const medalContainer = document.querySelector(".medal-container");
const actionContainer = document.querySelector(".action-container");
const pageWrapper = document.querySelector(".page-wrapper");
const buttonExit = document.querySelector(".button__exit");

const saveButton = document.querySelector(".button-save-score");
const saveExitButton = document.querySelector(".button-save-exit");
const continueButton = document.querySelector(".button-continue");
const resetButton = document.querySelector(".button-reset-history");

const treasureImageEl = document.getElementById("treasure-image");
const progressPercentEl = document.querySelector(".clubhouse-stat-progressPercent");
const pointsToUnlockEl = document.querySelector(".clubhouse-stat-pointsToUnlock");
const unlockStatusEl = document.querySelector(".clubhouse-stat-unlockStatus");

const unlockToolButton = document.querySelector(".button-unlock-tool");
const toolDisplayEl = document.querySelector(".tool-display");
const unlockToolTitleEl = document.querySelector(".clubhouse-tool-title");
const unlockProgressCopyEl = document.querySelector(".clubhouse-progress-copy");
const toolDisplayImageEl = document.querySelector(".tool-image");
const toolDisplayLabelEl = document.querySelector(".tool-display-label");
const decoderBenchItemEl = document.getElementById("decoder-bench-item");

const historyEls = [
    document.querySelector(".clubhouse-history-score-1"),
    document.querySelector(".clubhouse-history-score-2"),
    document.querySelector(".clubhouse-history-score-3"),
    document.querySelector(".clubhouse-history-score-4"),
    document.querySelector(".clubhouse-history-score-5")
];

const statElements = [
    document.querySelector(".stat-sessions"),
    document.querySelector(".stat-average"),
    document.querySelector(".stat-best"),
    document.querySelector(".stat-streak"),
    document.querySelector(".stat-rank")
];

const rankArray = ["TOT", "PAL", "CREW", "DOOD", "QUAVERING QUAZARS"];
const storageKey = "clubhouseData";
const MAGNIFIER_UNLOCK_SCORE = 10000;
const DECODER_UNLOCK_SCORE = 25000;

let hasSavedThisView = false;
let currentRunId = "";
let currentFinalScore = 0;
let previewData = null;
let continueUrl = "index.html";

function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);

    return {
        finalScore: getNumber(params.get("finalScore"), 0),
        runId: params.get("runId") || "",
        outcome: params.get("outcome") || "",
        continueUrl: params.get("continueUrl") || "index.html"
    };
}

function getNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function formatScore(value) {
    return Math.round(value).toString();
}

function toggleClass(element, classToRemove, classToAdd) {
    if (!element) return;
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
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

function getTreasureImageFromProgress(progressTotal, goalTotal) {
    const percentRevealed = Math.max(
        0,
        Math.min(100, Math.floor((progressTotal / goalTotal) * 100))
    );

    if (percentRevealed >= 100) return "assets/website/clubhouse/10.png";
    if (percentRevealed >= 90) return "assets/website/clubhouse/20.png";
    if (percentRevealed >= 80) return "assets/website/clubhouse/30.png";
    if (percentRevealed >= 70) return "assets/website/clubhouse/40.png";
    if (percentRevealed >= 60) return "assets/website/clubhouse/50.png";
    if (percentRevealed >= 50) return "assets/website/clubhouse/60.png";
    if (percentRevealed >= 40) return "assets/website/clubhouse/70.png";
    if (percentRevealed >= 30) return "assets/website/clubhouse/80.png";
    if (percentRevealed >= 20) return "assets/website/clubhouse/90.png";
    if (percentRevealed >= 10) return "assets/website/clubhouse/100.png";

    return "assets/website/clubhouse/101.png";
}

function getCurrentUnlockPhase(unlockedTools = {}) {
    if (!unlockedTools.magnifierRevealed) {
        return "magnifier";
    }

    if (!unlockedTools.decoderRevealed) {
        return "decoder";
    }

    return "complete";
}

function getCurrentProgressInfo(total, unlockedTools = {}) {
    const phase = getCurrentUnlockPhase(unlockedTools);

    if (phase === "magnifier") {
        return {
            phase: "magnifier",
            goal: MAGNIFIER_UNLOCK_SCORE,
            progress: Math.max(0, Math.min(total, MAGNIFIER_UNLOCK_SCORE)),
            pointsRemaining: Math.max(0, MAGNIFIER_UNLOCK_SCORE - total),
            title: "FIRST TOOL",
            subtext: "points needed to unlock the first tool"
        };
    }

    if (phase === "decoder") {
        return {
            phase: "decoder",
            goal: DECODER_UNLOCK_SCORE,
            progress: Math.max(0, Math.min(total, DECODER_UNLOCK_SCORE)),
            pointsRemaining: Math.max(0, DECODER_UNLOCK_SCORE - total),
            title: "DECODER",
            subtext: "points needed to reveal the decoder"
        };
    }

    return {
        phase: "complete",
        goal: DECODER_UNLOCK_SCORE,
        progress: DECODER_UNLOCK_SCORE,
        pointsRemaining: 0,
        title: "DECODER",
        subtext: "decoder revealed"
    };
}

function getUnlockState(
    total,
    unlockedTools = {
        magnifier: false,
        magnifierRevealed: false,
        decoderRevealed: false
    }
) {
    return {
        magnifier: Boolean(unlockedTools.magnifier) || total >= MAGNIFIER_UNLOCK_SCORE,
        magnifierRevealed: Boolean(unlockedTools.magnifierRevealed),
        decoderRevealed: Boolean(unlockedTools.decoderRevealed),
        decoderReady:
            Boolean(unlockedTools.magnifierRevealed) &&
            total >= DECODER_UNLOCK_SCORE &&
            !Boolean(unlockedTools.decoderRevealed)
    };
}

function updateTreasureUI(
    total,
    unlockedTools = {
        magnifier: false,
        magnifierRevealed: false,
        decoderRevealed: false
        
    }
) {
    const unlockState = getUnlockState(total, unlockedTools);
    const progressInfo = getCurrentProgressInfo(total, unlockedTools);
    const percentRevealed = Math.max(
        0,
        Math.min(100, Math.floor((progressInfo.progress / progressInfo.goal) * 100))
    );

    if (treasureImageEl) {
        treasureImageEl.src = getTreasureImageFromProgress(progressInfo.progress, progressInfo.goal);
    }

    if (progressPercentEl) {
        progressPercentEl.textContent = `${percentRevealed}%`;
    }

    if (pointsToUnlockEl) {
        pointsToUnlockEl.textContent = `${progressInfo.pointsRemaining}`;
    }

    if (unlockToolTitleEl) {
        unlockToolTitleEl.textContent = progressInfo.title;
    }

    if (unlockProgressCopyEl) {
        unlockProgressCopyEl.textContent = progressInfo.subtext;
    }

    if (unlockStatusEl) {
        unlockStatusEl.classList.remove(
            "unlock-tool-status--locked",
            "unlock-tool-status--ready",
            "unlock-tool-status--unlocked"
        );

        if (!unlockState.magnifierRevealed) {
            if (!unlockState.magnifier) {
                unlockStatusEl.textContent = "LOCKED";
                unlockStatusEl.classList.add("unlock-tool-status--locked");
            } else {
                unlockStatusEl.textContent = "READY TO UNLOCK";
                unlockStatusEl.classList.add("unlock-tool-status--ready");
            }
        } else if (!unlockState.decoderRevealed) {
            if (!unlockState.decoderReady) {
                unlockStatusEl.textContent = "LOCKED";
                unlockStatusEl.classList.add("unlock-tool-status--locked");
            } else {
                unlockStatusEl.textContent = "READY TO REVEAL";
                unlockStatusEl.classList.add("unlock-tool-status--ready");
            }
        } else {
            unlockStatusEl.textContent = "REVEALED";
            unlockStatusEl.classList.add("unlock-tool-status--unlocked");
        }
    }

    if (unlockToolButton) {
        const showButton =
            (!unlockState.magnifierRevealed && unlockState.magnifier) ||
            (!unlockState.decoderRevealed && unlockState.decoderReady);

        unlockToolButton.style.display = showButton ? "inline-block" : "none";
        unlockToolButton.textContent = !unlockState.magnifierRevealed
            ? "UNLOCK TOOL"
            : "REVEAL DECODER";
    }

    if (toolDisplayEl) {
    toolDisplayEl.style.display = unlockState.magnifierRevealed ? "flex" : "none";
}

if (decoderBenchItemEl) {
    decoderBenchItemEl.style.display = unlockState.decoderRevealed ? "flex" : "none";
}

   
}

function loadClubhouseData() {
    try {
        const raw = localStorage.getItem(storageKey);

        if (!raw) {
            return {
                total: 0,
                sessions: 0,
                best: 0,
                streak: 0,
                history: [],
                savedRunIds: [],
                unlockedTools: {
                    magnifier: false,
                    magnifierRevealed: false,
                    decoderRevealed: false
                }
            };
        }

        const parsed = JSON.parse(raw);

        return {
            total: getNumber(parsed.total, 0),
            sessions: getNumber(parsed.sessions, 0),
            best: getNumber(parsed.best, 0),
            streak: getNumber(parsed.streak, 0),
            history: Array.isArray(parsed.history)
                ? parsed.history.map(item => getNumber(item, 0)).slice(0, 5)
                : [],
            savedRunIds: Array.isArray(parsed.savedRunIds)
                ? parsed.savedRunIds.map(String).slice(-100)
                : [],
            unlockedTools:
                parsed.unlockedTools && typeof parsed.unlockedTools === "object"
                    ? {
                        magnifier: Boolean(parsed.unlockedTools.magnifier),
                        magnifierRevealed: Boolean(parsed.unlockedTools.magnifierRevealed),
                        decoderRevealed: Boolean(parsed.unlockedTools.decoderRevealed)
                    }
                    : {
                        magnifier: false,
                        magnifierRevealed: false,
                        decoderRevealed: false
                    }
        };
    } catch (error) {
        console.error("Could not load clubhouse data:", error);

        return {
            total: 0,
            sessions: 0,
            best: 0,
            streak: 0,
            history: [],
            savedRunIds: [],
            unlockedTools: {
                magnifier: false,
                magnifierRevealed: false,
                decoderRevealed: false
            }
        };
    }
}

function saveClubhouseData(data) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
        console.error("Could not save clubhouse data:", error);
    }
}

function getRankFromScore(score) {
    if (score < 350) return rankArray[0];
    if (score < 700) return rankArray[1];
    if (score < 800) return rankArray[2];
    if (score < 900) return rankArray[3];
    return rankArray[4];
}

function getMeterScale(score) {
    const capped = Math.max(0, Math.min(score, 1000));
    return capped / 1000;
}

function getMedalCount(score) {
    if (score < 350) return 1;
    if (score < 700) return 2;
    if (score < 800) return 3;
    if (score < 900) return 4;
    return 5;
}

function buildPreviewData(finalScore, storedData, outcome = "") {
    const previousTotal = storedData.total;
    const previousSessions = storedData.sessions;
    const previousBest = storedData.best;
    const previousStreak = storedData.streak;
    const previousHistory = Array.isArray(storedData.history) ? storedData.history : [];

    const newTotal = previousTotal + finalScore;
    const newSessions = previousSessions + 1;
    const bestScore = Math.max(previousBest, finalScore);

    const countsAsWin = outcome ? outcome === "victory" : finalScore >= 700;
    const winStreak = countsAsWin ? previousStreak + 1 : 0;
    const averageScore = newSessions > 0 ? Math.round(newTotal / newSessions) : 0;
    const history = [finalScore, ...previousHistory].slice(0, 5);
    const rank = getRankFromScore(finalScore);

    return {
        previousTotal,
        newTotal,
        totalSessions: newSessions,
        averageScore,
        bestScore,
        winStreak,
        history,
        rank
    };
}

function updateHistoryUI(history) {
    for (let i = 0; i < historyEls.length; i++) {
        if (!historyEls[i]) continue;
        historyEls[i].textContent = history[i] !== undefined ? formatScore(history[i]) : "-";
    }
}

function updateMedals(score) {
    const medalCount = getMedalCount(score);

    for (let i = 1; i <= 5; i++) {
        const imgMedal = document.getElementById(`img-medal-${i}`);
        const rankLabel = document.querySelector(`.clubhouse-rank-label-${i}`);
        const medalCard = document.getElementById(`div-medal-container-${i}`);

        if (!imgMedal || !rankLabel || !medalCard) continue;

        rankLabel.textContent = rankArray[i - 1];
        medalCard.classList.remove("div-medal-container--emphasis");

        if (i <= medalCount) {
            imgMedal.src = `assets/debrief/medal/medal-${i}.png`;
            imgMedal.classList.remove("img-medal--hidden");
            imgMedal.classList.add("img-medal--visible");

            rankLabel.classList.remove("debrief-stat-rank--light-brown");
            rankLabel.classList.add("debrief-stat-rank--black");

            if (i === medalCount) {
                medalCard.classList.add("div-medal-container--emphasis");
            }
        } else {
            imgMedal.src = `assets/debrief/medal/medal-${i}-hidden.png`;
            imgMedal.classList.remove("img-medal--visible");
            imgMedal.classList.add("img-medal--hidden");

            rankLabel.classList.remove("debrief-stat-rank--black");
            rankLabel.classList.add("debrief-stat-rank--light-brown");
        }
    }
}

function updateButtonsAfterSave(alreadySaved) {
    if (saveButton) {
        saveButton.textContent = alreadySaved ? "SCORE SAVED" : "SAVE SCORE";
        saveButton.disabled = alreadySaved;
    }

    if (saveExitButton) {
        saveExitButton.textContent = alreadySaved ? "SAVED... EXIT" : "SAVE AND EXIT";
        saveExitButton.disabled = false;
    }
}

function updateUI(finalScore, data, alreadySaved = false) {
    if (finalScoreEl) finalScoreEl.textContent = formatScore(finalScore);

    if (previousTotalEl) {
        previousTotalEl.textContent = formatScore(
            alreadySaved ? Math.max(0, data.newTotal - finalScore) : data.previousTotal
        );
    }

    if (newTotalEl) {
        newTotalEl.textContent = formatScore(data.newTotal);
    }

    if (totalSessionsEl) totalSessionsEl.textContent = formatScore(data.totalSessions);
    if (averageScoreEl) averageScoreEl.textContent = formatScore(data.averageScore);
    if (bestScoreEl) bestScoreEl.textContent = formatScore(data.bestScore);
    if (winStreakEl) winStreakEl.textContent = formatScore(data.winStreak);
    if (rankEl) rankEl.textContent = data.rank;

    updateHistoryUI(data.history);
    updateMedals(finalScore);

    if (scoreMeter) {
        scoreMeter.style.transform = `scaleX(${getMeterScale(finalScore)})`;
    }

    const storedData = loadClubhouseData();
    const unlockTools = alreadySaved
        ? storedData.unlockedTools
        : {
            ...storedData.unlockedTools,
            ...getUnlockState(data.newTotal, storedData.unlockedTools)
        };

    updateTreasureUI(data.newTotal, unlockTools);
    updateButtonsAfterSave(alreadySaved);
}

function animateIn() {
    setTimeout(() => {
        toggleClass(pageWrapper, "page-wrapper--visible", "page-wrapper--hidden");
    }, 250);

    statElements.forEach((element, index) => {
        setTimeout(() => {
            toggleClass(element, "stat--hidden", "stat--visible");
        }, 700 + index * 180);
    });

    setTimeout(() => {
        toggleClass(scoreContainer, "score-container--hidden", "score-container--visible");
    }, 1500);

    setTimeout(() => {
        toggleClass(medalContainer, "medal-container--hidden", "medal-container--visible");
    }, 1750);

    setTimeout(() => {
        toggleClass(actionContainer, "action-container--hidden", "action-container--visible");
        toggleClass(buttonExit, "button__exit--hidden", "button__exit--visible");
    }, 2000);
}

function generateFallbackRunId(finalScore) {
    return `score-${finalScore}-url-${window.location.pathname}-${window.location.search}`;
}

function getAlreadySavedState(storedData, runIdToUse) {
    return storedData.savedRunIds.includes(runIdToUse);
}

function persistPreviewData() {
    if (hasSavedThisView) return true;
    if (!previewData) return false;

    const storedData = loadClubhouseData();
    const runIdToUse = currentRunId || generateFallbackRunId(currentFinalScore);

    if (getAlreadySavedState(storedData, runIdToUse)) {
        hasSavedThisView = true;
        updateButtonsAfterSave(true);
        return true;
    }

    const unlockState = getUnlockState(previewData.newTotal, storedData.unlockedTools);

    const updatedData = {
        total: previewData.newTotal,
        sessions: previewData.totalSessions,
        best: previewData.bestScore,
        streak: previewData.winStreak,
        history: previewData.history,
        savedRunIds: [...storedData.savedRunIds, runIdToUse].slice(-100),
        unlockedTools: {
            magnifier: unlockState.magnifier,
            magnifierRevealed: Boolean(storedData.unlockedTools.magnifierRevealed),
            decoderRevealed: Boolean(storedData.unlockedTools.decoderRevealed)
        }
    };

    saveClubhouseData(updatedData);
    hasSavedThisView = true;
    updateButtonsAfterSave(true);
    updateTreasureUI(updatedData.total, updatedData.unlockedTools);

    return true;
}

function finalizeMagnifierUnlock() {
    const storedData = loadClubhouseData();

    const updatedData = {
        ...storedData,
        unlockedTools: {
            ...storedData.unlockedTools,
            magnifier: true,
            magnifierRevealed: true
        }
    };

    saveClubhouseData(updatedData);
    updateTreasureUI(updatedData.total, updatedData.unlockedTools);
}

function finalizeDecoderReveal() {
    const storedData = loadClubhouseData();

    const updatedData = {
        ...storedData,
        unlockedTools: {
            ...storedData.unlockedTools,
            decoderRevealed: true
        }
    };

    saveClubhouseData(updatedData);
    updateTreasureUI(updatedData.total, updatedData.unlockedTools);
}

function unlockCurrentProgressionReward() {
    const storedData = loadClubhouseData();
    const unlockState = getUnlockState(storedData.total, storedData.unlockedTools);

    if (!unlockState.magnifierRevealed && unlockState.magnifier) {
        if (typeof playUnlockCutscene !== "function") {
            finalizeMagnifierUnlock();
            return;
        }

        playUnlockCutscene("magnifier", function () {
            finalizeMagnifierUnlock();
        });
        return;
    }

    if (!unlockState.decoderRevealed && unlockState.decoderReady) {
        if (typeof playUnlockCutscene !== "function") {
            finalizeDecoderReveal();
            return;
        }

        playUnlockCutscene("decoder", function () {
            finalizeDecoderReveal();
        });
    }
}

function goToContinueUrl() {
    window.location.href = continueUrl;
}

function confirmExitWithOptionalSave() {
    if (hasSavedThisView) {
        goToContinueUrl();
        return;
    }

    const shouldSave = window.confirm("Do you want to save your score before exiting?");

    if (shouldSave) {
        persistPreviewData();
    }

    goToContinueUrl();
}

function wireButtons() {
    if (saveButton) {
        saveButton.addEventListener("click", function () {
            persistPreviewData();
        });
    }

    if (saveExitButton) {
        saveExitButton.addEventListener("click", function () {
            persistPreviewData();
            goToContinueUrl();
        });
    }

    if (continueButton) {
        continueButton.addEventListener("click", function () {
            goToContinueUrl();
        });
    }

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            localStorage.removeItem(storageKey);
            window.location.reload();
        });
    }

    if (buttonExit) {
        buttonExit.addEventListener("click", function () {
            confirmExitWithOptionalSave();
        });
    }

    if (unlockToolButton) {
        unlockToolButton.addEventListener("click", function () {
            unlockCurrentProgressionReward();
        });
    }
}

function setViewportHeightVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function initClubhouse() {
    const params = parseQueryParams();
    currentFinalScore = params.finalScore;
    currentRunId = params.runId || "";
    continueUrl = sanitizeContinueUrl(params.continueUrl);

    const storedData = loadClubhouseData();
    const runIdToUse = currentRunId || generateFallbackRunId(currentFinalScore);
    const alreadySaved = getAlreadySavedState(storedData, runIdToUse);

    if (alreadySaved) {
        hasSavedThisView = true;

        previewData = {
            previousTotal: Math.max(0, storedData.total - currentFinalScore),
            newTotal: storedData.total,
            totalSessions: storedData.sessions,
            averageScore: storedData.sessions > 0
                ? Math.round(storedData.total / storedData.sessions)
                : 0,
            bestScore: storedData.best,
            winStreak: storedData.streak,
            history: storedData.history,
            rank: getRankFromScore(currentFinalScore)
        };
    } else {
        previewData = buildPreviewData(currentFinalScore, storedData, params.outcome);
    }

    updateUI(currentFinalScore, previewData, alreadySaved);
    animateIn();
    wireButtons();
}

setViewportHeightVariable();
window.addEventListener("resize", setViewportHeightVariable);
document.addEventListener("DOMContentLoaded", initClubhouse);