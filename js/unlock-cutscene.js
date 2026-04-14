const unlockCutsceneData = {
    magnifier: {
        intro: [
            {
                speaker: "The Quester" ,
                text: "Well done, Quester... you have uncovered enough truthful treasure to earn a new tool.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: ""
            },
            {
                speaker: "The Quester" ,
                text: "Let me introduce you to the Magnifying Glass.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/magnifying-glass.png"
            }
        ],
        body: [
            {
                speaker: "The Quester" ,
                text: "The Magnifying Glass helps you inspect clues more closely and notice details that might otherwise be missed.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/magnifying-glass.png"
            },
            {
                speaker: "The Quester" ,
                text: "When this tool is available in a mission, click its icon to activate it and examine the tagged clue or puzzle element it is linked to.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/magnifying-glass.png"
            }
        ],
        outro: [
            {
                speaker: "The Quester" ,
                text: "The Magnifying Glass is now yours. Use it wisely... and keep searching for what others overlook.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/magnifying-glass.png"
            },
            {
                speaker: "The Quester" ,
                text: "Off you go, Quester. Your new tool has been added to the Clubhouse.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: ""
            }
        ]
    },

    decoder: {
        intro: [
            {
                speaker: "The Quester" ,
                text: "Excellent work, Quester... you have uncovered enough truthful treasure to reveal another secret.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: ""
            },
            {
                speaker: "the Quester",
                text: "This is the Decoder. It is not used during the mission itself... it helps you understand the clues you already found.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/decoder.png"
            }
        ],
        body: [
            {
                speaker: "The Quester" ,
                text: "When you discover a clue with the Magnifying Glass, the Decoder helps you read it using the Book name and a 3-part coordinate system.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/decoder.png"
            },
            {
                speaker: "The Quester" ,
                text: "Each clue includes the Book name, then Chapter, Verse, and Word Count.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/decoder.png"
            },
            {
                speaker: "The Quester" ,
                text: "When counting words, ignore all punctuation and count the words in order from the beginning of the verse.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/decoder.png"
            },
            {
                speaker: "The Quester" ,
                text: "For example... the phrase 'one six to seven nine' can be decoded as Deuteronomy 6:4 word 11... Exodus 20:9 word 1... Philippians 1:21 word 2... Proverbs 24:16 word 5... and Luke 17:17 word 11.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/decoder.png"
            }
        ],
        outro: [
            {
                speaker: "The Quester" ,
                text: "The Decoder has now been revealed. Use it outside the mission to turn clue coordinates into words.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: "assets/website/clubhouse/decoder.png"
            },
            {
                speaker: "The Quester" ,
                text: "Keep searching, Quester... hidden truth often waits for patient eyes.",
                background: "assets/website/clubhouse/club-background.png",
                character: "assets/cutscene/Quester-closeup.png",
                toolImage: ""
            }
        ]
    }
};

function flattenUnlockCutscene(toolKey) {
    const toolScene = unlockCutsceneData[toolKey];

    if (!toolScene) {
        return [];
    }

    return [
        ...(Array.isArray(toolScene.intro) ? toolScene.intro : []),
        ...(Array.isArray(toolScene.body) ? toolScene.body : []),
        ...(Array.isArray(toolScene.outro) ? toolScene.outro : [])
    ];
}

function createUnlockCutscenePlayer() {
    const root = document.getElementById("clubhouse-cutscene");
    const backgroundEl = document.getElementById("clubhouse-cutscene-background");
    const characterEl = document.getElementById("clubhouse-cutscene-character");
    const nameEl = document.getElementById("clubhouse-cutscene-name");
    const textEl = document.getElementById("clubhouse-cutscene-text");
    const toolEl = document.getElementById("clubhouse-cutscene-tool");

    let activeSteps = [];
    let activeIndex = 0;
    let activeCompleteCallback = null;
    let playing = false;

    function renderStep(step) {
        if (!step) return;

        if (nameEl) {
            nameEl.textContent = step.speaker || "";
        }

        if (textEl) {
            textEl.textContent = step.text || "";
        }

        if (backgroundEl) {
            if (step.background) {
                backgroundEl.src = step.background;
            } else {
                backgroundEl.removeAttribute("src");
            }
        }

        if (characterEl) {
            if (step.character) {
                characterEl.src = step.character;
                characterEl.classList.remove("clubhouse-cutscene__character--hidden");
            } else {
                characterEl.removeAttribute("src");
                characterEl.classList.add("clubhouse-cutscene__character--hidden");
            }
        }

        if (toolEl) {
            if (step.toolImage) {
                toolEl.src = step.toolImage;
                toolEl.classList.remove("clubhouse-cutscene__tool--hidden");
            } else {
                toolEl.removeAttribute("src");
                toolEl.classList.add("clubhouse-cutscene__tool--hidden");
            }
        }
    }

    function closeCutscene() {
        playing = false;

        if (root) {
            root.classList.add("clubhouse-cutscene--hidden");
        }

        const callback = activeCompleteCallback;
        activeCompleteCallback = null;

        if (typeof callback === "function") {
            callback();
        }
    }

    function advanceCutscene() {
        if (!playing) return;

        activeIndex += 1;

        if (activeIndex >= activeSteps.length) {
            closeCutscene();
            return;
        }

        renderStep(activeSteps[activeIndex]);
    }

    function startCutscene(steps, onComplete) {
        if (!root) {
            if (typeof onComplete === "function") {
                onComplete();
            }
            return;
        }

        activeSteps = Array.isArray(steps) ? steps : [];
        activeIndex = 0;
        activeCompleteCallback = onComplete;
        playing = true;

        if (activeSteps.length === 0) {
            closeCutscene();
            return;
        }

        root.classList.remove("clubhouse-cutscene--hidden");
        renderStep(activeSteps[0]);
    }

    if (root) {
        root.addEventListener("click", advanceCutscene);
    }

    return {
        start(steps, onComplete) {
            startCutscene(steps, onComplete);
        },
        isPlaying() {
            return playing;
        }
    };
}

const unlockCutscenePlayer = createUnlockCutscenePlayer();

function playUnlockCutscene(toolKey, onComplete) {
    const steps = flattenUnlockCutscene(toolKey);

    if (!steps.length) {
        if (typeof onComplete === "function") {
            onComplete();
        }
        return;
    }

    unlockCutscenePlayer.start(steps, onComplete);
}