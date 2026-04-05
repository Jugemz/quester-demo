let cutscene = {
       
    intro: [
        {
            text: 'Hello! Hello! Welcome to our adventurous Quest',
            textDelay: 500,
            textStyle: 'alert',
            characterSprite: {
                name: "EMERGENCY ALERT",
            },
            backgroundImage1: {
                path: 'Quester-alert.png',
                scope: 'global',
                animation: {
                    start: 'transform-scale_0__opacity_0',
                    end: 'transform-scale_1__opacity_1',
                    duration: 'transition-transform-200ms__opacity-200ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'I am looking for a friend to join me',
            textStyle: 'alert',
            characterSprite: {
                name: "EMERGENCY ALERT",
            },
            backgroundImage1: {
                path: 'Quester-alert.png',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Questers! Will you be my honered speacial guest?',
            textDelay: 500,
            characterSprite: {
                name: "Quester",
                path: 'Quester-closeup.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-300ms',
                },
                
            },
            backgroundImage1: {
                path: 'Quester-alert.png',
                animation: {
                    start: 'opacity-1',
                    end: 'opacity-0',
                    duration: 'transition-opacity-1000ms',
                },
            },
            backgroundColor: 'background-color-black'
        },    
        {
            text: 'The tide is coming in here on Identity Island & we will be trapped.',
            characterSprite: {
                name: "Quester",
                path: 'Quester-closeup.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_0',
                    end: 'transform-translate_0_100',
                    duration: 'transition-transform-500ms',
                },

            },
            backgroundImage1: {
                path: 'main.png',
                scope: 'local',
                animation: {
                    start: 'transform-scale_1_1__opacity_0',
                    end: 'transform-scale_1__opacity_1',
                    duration: 'transition-transform-500ms__opacity-500ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Each one of my crew has a task to complete before the tide comes in.',
            characterSprite: {
                name: "Quester",
                path: 'Quester-1.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_-100_0',
                    end: 'transform-translate_-25_0',
                    duration: 'transition-transform-500ms',
                },
            },
            backgroundImage1: {
                path: 'main.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Use your code-breaking skills to help, but beware!',
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png',
                scope: 'global',
            },
            backgroundImage1: {
                path: 'main.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'If time runs out, the tide will come in and we will be stuck here for good.',
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_-25_0',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-1000ms',
                },
            },
            backgroundImage1: {
                path: 'main.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Anyone still on the Island will be enared here...unable to continue the Quest!',
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_0',
                    end: 'transform-translate_0_100',
                    duration: 'transition-transform-2000ms',
                },
            },
            backgroundImage1: {
                path: 'main.png',
                scope: 'local',
                animation: {
                    start: 'opacity-1',
                    end: 'opacity-0',
                    duration: 'transition-opacity-1000ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'That\'s right, Questers...',
            textDelay: 400,
            textStyle: 'badguy',
            characterSprite: {
                name: "THE ENEMY",
            },
            backgroundImage1: {
                path: 'badguy.png',
                scope: 'local',
                animation: {
                    start: 'transform-translate_0_100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-300ms',
                },
            },
            backgroundColor: 'background-color-salmon'
        },
        {
            text: 'We\'re coming for you!',
            textStyle: 'badguy',
            characterSprite: {
                name: "THE ENEMY",
            },
            backgroundImage1: {
                path: 'badguy.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-salmon'
        },
        {
            text: 'Hurry, Questers! You must crack the codes before the HIGH TIDE arrives.',
            textDelay: 500,
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-300ms',
                }, 
            },
            backgroundImage1: {
                path: 'badguy.png',
                scope: 'local',
                animation: {
                    start: 'transform-translate_0_0',
                    end: 'transform-translate_0_100',
                    duration: 'transition-transform-300ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'The clock is ticking...',
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_0',
                    end: 'transform-translate_0_100',
                    duration: 'transition-transform-2000ms',
                },
            },
            backgroundImage1: {
                path: 'main.png',
                scope: 'local',
                animation: {
                    start: 'opacity-0',
                    end: 'opacity-1',
                    duration: 'transition-opacity-1000ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
    ], 

    outro: [
        {
            text: 'Well done, Questers! Well done!',
            textDelay: 3000,
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png', // Holding pose 3
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-500ms',
                    delay: 500
                },
            },
            backgroundImage2: {
                path: 'main.png', // Staying on main
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
            text: 'Remember, every single question you ask is a Quest that you are on! Keep searching for the truth.',
            textDelay: 3000,
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png', // Still holding pose 3
                scope: 'global',
            },
            backgroundImage2: { path: 'main.png', scope: 'local' },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'Jesus said, "I am the light of the world. Whoever follows Me will never walk in darkness, but will have the light of life."',
            textDelay: 4000, // Slightly longer for the scripture
            characterSprite: {
                name: "Quester",
                path: 'Quester-3.png', // Still holding pose 3
                scope: 'global',
            },
            backgroundImage2: { path: 'main.png', scope: 'local' },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'The tide is almost up. Let\'s get you out of there.',
            textDelay: 3000,
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png', // SWITCHING to pose 2 now
                scope: 'global',
            },  
            backgroundImage2: {
                path: 'main.png', // Still on main
                scope: 'local',
            }, 
            backgroundColor: 'background-color-black'                 
        },
        {
            text: 'Come aboard! This mission is complete.',
            textDelay: 3000,
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png',
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_0',
                    end: 'transform-translate_0_100',
                    duration: 'transition-transform-1000ms',
                    delay: 2000
                },
            },
            backgroundImage1: {
                path: 'ship.png', // SHIP ARRIVES HERE
                scope: 'global',
                animation: {
                    start: 'transform-translate_0_-100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-1000ms',
                },
            },    
            backgroundImage2: {
                path: 'main.png', 
                scope: 'local',
                animation: {
                    start: 'opacity-1',
                    end: 'opacity-0', // MAIN FADES OUT
                    duration: 'transition-opacity-1000ms',
                },
            }, 
            backgroundColor: 'background-color-black'
        },
        {
            text: 'We are so glad you are a part of our Quester Community. Because you can\'t spell community without "U" and "I"!',
            textDelay: 4000,
            characterSprite: {
                name: "Quester",
                path: 'Quester-2.png',
                scope: 'global',
            },
            backgroundImage1: { path: 'ship.png', scope: 'global' },
            backgroundColor: 'background-color-black'
        },
    ],

    fail: [
        {
            text: 'Well, well, well... Time\'s up, Questers.',
            textStyle: 'badguy',
            textDelay: 550,
            characterSprite: {
                name: "THE ENEMY",
                path: 'badguy.png',
                scope: 'local',
                animation: {
                    start: 'transform-translate_0_100',
                    end: 'transform-translate_0_0',
                    duration: 'transition-transform-300ms',
                },
            },
            backgroundColor: 'background-color-black'
        },
        {
            text: 'You\'re coming with us!',
            textStyle: 'badguy',
            characterSprite: {
                name: "THE ENEMY",
                path: 'badguy.png',
                scope: 'local',
            },
            backgroundColor: 'background-color-black'
        },
    ],
    
}

let localAssetArrays = {
    priority: {
      low: {
        onPinInput: {
            asset: [
                'preview-logo', 
            ],
            delay: 0,
          },
        onCharacterSelect: {
          asset: [
              'resource/escape-the-midnight-mall/assets/cutscene/main.png',  
              'resource/escape-the-midnight-mall/assets/cutscene/badguy.png', 
          ],
          delay: 1200,
        },
        onCutsceneStart: {
          asset: [
              'resource/escape-the-midnight-mall/assets/activity/node/Mirror_Pond.png',
              'resource/escape-the-midnight-mall/assets/activity/node/Sandy.png',
              'resource/escape-the-midnight-mall/assets/activity/node/Cave.png',
              'resource/escape-the-midnight-mall/assets/activity/node/Truthful_Treasure.png',
              'resource/escape-the-midnight-mall/assets/activity/node/Palm_Grove.png',
              'resource/escape-the-midnight-mall/assets/activity/character/Crab.png',
              'resource/escape-the-midnight-mall/assets/activity/character/Stick.png',
              'resource/escape-the-midnight-mall/assets/activity/character/Paraclete.png',
              'resource/escape-the-midnight-mall/assets/activity/character/Fish.png',
              'resource/escape-the-midnight-mall/assets/activity/character/Lizard.png',
          ],
          delay: 1000,
        },
        onGameFinish: {
          asset: [
          ],
          delay: 200,
        },
      }
    }
  }
  


  