let inquisitiveGardenCutscene = {
    intro: [
        {
            text: '...a new path has opened...',
            textDelay: 700,
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Not every Question leads to an answer.',
            textDelay: 700,
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Some Questions become gardens.',
            textDelay: 900,
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-500ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'You have discovered the Inquisitive Garden.',
            textDelay: 1100,
            backgroundImage1: {
                path: 'garden-reveal.png',
                scope: 'local',
                animation: {
                    start: 'opacity-0',
                    end: 'opacity-1',
                    duration: 'transition-opacity-1000ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Here, ideas take root...',
            textDelay: 900,
            backgroundImage1: {
                path: 'garden-reveal.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Curiosity becomes cultivation...',
            textDelay: 900,
            backgroundImage1: {
                path: 'garden-reveal.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'And every experiment may bloom into discovery.',
            textDelay: 1200,
            characterSprite: {
                name: "Quester",
                path: 'Quester-1.png',
                scope: 'global',
            },
            backgroundImage1: {
                path: 'garden-reveal.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Tend it well, Quester...',
            textDelay: 900,
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png',
                scope: 'global',
            },
            backgroundImage1: {
                path: 'garden-reveal.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'The Garden is now yours.',
            textDelay: 1200,
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_0',
                    end: 'transform-translate_0_100',
                    duration: 'transition-transform-1000ms',
                },
            },
            backgroundImage1: {
                path: 'garden-reveal.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        }
    ]
};