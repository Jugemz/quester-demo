const resource =  {

    info: {
        title: "Island of Identity",
        path: "escape-the-midnight-mall",
        logo: "resource/escape-the-midnight-mall/assets/branding/preview-3rd-grade.png",
        timerLabel: "TIME UNTIL HIGH TIDE:",
    },

    activityArray: [
        /* The Mirror Shop */
        {
            title: "The Perception Pond",
            characterName: "FISH",
            topic: "Main Idea",
            assets: {
                nodeBackground: "Mirror_Pond.png",
                characterShopkeeper: "Fish.png",
                activityBackground: "Mirror_Pond.png"
            },
            code: "LIFE",
            userCode: ["","","",""],
            state: "incomplete",
            hint: "Read each note carefully. What is the main truth in each one? The glowing letters reveal your code.",
            isHintUsed: false,
            dialogue : {
                incomplete: "Welcome, Quester... The water reflects what you see... but reflections can be deceiving. If you want to know who you truly are, you must look beyond yourself. Read these notes and discover the truth.",
                complete: "You are beginning to see clearly... Identity is not found in reflection, but in the Light that reveals all things."
            },
            content: {
                passage: {
                    style: {
                        material: "style-material--metal",
                        text: {
                            title: "style-text--metal-bold",
                            paragraph: "style-text--metal-normal",
                        }
                    },
                    item: [
                        {
                            image:      "1.png",
                            title:      "WHO AM I?",
                            paragraph:  "Yet to all who did receive him, \n\
                                        to those who believed in his name, he gave the right  \n\
                                        to become children of God. - John 1:12",
                            transform: {
                                translateX: "-10%",
                                translateY: "-3%",
                                rotate: "-1deg",
                            }
                        },
                        {
                            image:      "2.png",
                            title:      "People Please!",
                            paragraph:  "Am I now trying to win the approval of human beings, or of God?\n\
                                        Or am I trying to please people? If I were still trying to please people,\n\
                                        I would not be a servant of Christ. \n\
                                        - Galatians 1:10.",
                            transform: {
                                translateX: "10%",
                                translateY: "-20%",
                                rotate: "3deg",
                            }
                        },
                        {
                            image:      "3.png",
                            title:      "Light is Life",
                            paragraph:  "When Jesus spoke again to the people, he said, \n\
                                        'I am the light of the world. Whoever follows me will never walk in darkness,\n\
                                        but will have the light of life.'\n\
                                        - John 8:12",
                            transform: {
                                translateX: "0%",
                                translateY: "-42%",
                                rotate: "-2deg",
                            }
                        },
                    ],  
                },
                multipleChoice: [
                    {
                        title: "{1.} What is the main idea of the John 1:12?",
                        correctIndex: 2,
                        paragraph: [
                            "It's [u]p to me to find out who I am",
                            "You have to be a [g]ood person to get to heaven",
                            "I am a chi[l]d of God",
                        ],
                    },
                    {
                        title: "{2.} What is the main idea of the Galatians 1:10?",
                        correctIndex: 1,
                        paragraph: [
                            "People will li[k]e me if I do good things",
                            "[I] should try to please God, not people",
                            "If everyone likes me, I mus[t] be doing the right thing",
                        ]
                    },
                    {
                        title: "{3.} What is the main idea of the John 8:12?",
                        correctIndex: 0,
                        paragraph: [
                            "By following Jesus, I can have the light of li[f]e",
                            "Going my ow[n] way will lead to better things",
                            "Jesus [d]oesn't really know who I am",  
                        ]
                    },
                    {
                        title: "{4.} All three of these passages are:",
                        correctIndex: 1,
                        paragraph: [
                            "How to be a [g]ood person",
                            "How Jesus reveals who I am, in my lif[e] and in the world",
                            "How we j[u]st have to try our best to be good",  
                        ]
                    },
                ],
                
            }                     
        },
        /* the candy cave */
        {
            title: "The Cave of Confusion",
            characterName: "CRAB",
            topic: "Poetry",
            assets: {
                nodeBackground: "Cave.png",
                characterShopkeeper: "Crab.png",
                activityBackground: "Cave.png",
            },
            code: "LIGHT",
            userCode: ["","","","",""],
            state: "incomplete",
            hint: "In the darkness, your own thoughts tangle into knots. Look for the message that leads out of the cave. The yellow letters reveal the way.",
            isHintUsed: false,
            dialogue : {
                incomplete: "I think... therefore I am? No, I think I'm just lost. The more I look inside this dark cave for answers, the more confused I get. I need a light from someone else...",
                complete: "Starting to see? 'Whoever wants to see must first admit they are blind.' You've found the Light of Life."
            }, 
            content: {
                poem: {
                    style: {
                        material: "style-material--paper",
                        text: {
                            title: "style-text--handwritten",
                            author: "style-text--handwritten",
                            paragraph: "style-text--handwritten",
                        }
                    },
                    item: {
                        title:     "The Tangle of Thoughts",
                        author:    "By Quester",
                        paragraph: [
                            [
                                'I search within to find my name',
                                'But every path looks just the same.',
                                'A cyclone swirls inside my head,',
                                'With tangled knots of doubt and dread.',
                            ],
                            [
                                'The darkness here is deep and wide,',
                                'With nowhere left for me to hide.',
                                'I need a friend to take my hand,',
                                'And lead me to a brighter land."'
                            ]
                            ,
                            [
                                'But now a Light shines in the dim,',
                                'To wake my soul to give to Him.',
                                'For Jesus came to rule my heart,',
                                'And we shall never be apart."'
                            ]
                        ],                
                        transform: {
                            translateX: "0%",
                            translateY: "5%",
                            rotate: "-2deg",
                        }
                    }
                },
                crossword: {
                    title: "Answer the questions to untangle your thoughts.",
                    paragraph: [
                    'ACROSS',
                        'B. What did the light come to wake? ',
                        'C. What looks the same? ______ Path', 
                        'D. ______ is deep and wide.',
                        'E. The Title of the Poem is __________ of Thoughts?',
                        'DOWN',
                        'A. A question is a _____ I am on.',
                        'F. What did the Light come to do to the soul?',
                        'G. Jesus came to rule my ______.',
                        'H. With nowhere left for me to _______',
                    ],
                    puzzle: [
    ["0","0","(G)4H","0","0","0","(A)Q","0","0","0","0","0"], 
    ["(H)H","0","E","0","(B)S","O","U","1L","0","0","0","(F)W"], 
    ["2I","0","A","0","(C)E","V","E","R","Y","0","0","A"], 
    ["(D)D","A","R","K","N","E","S","S","0","0","0","K"], 
    ["E","0","5T","0","0","0","(E)T","A","N","3G","L","E"], 
    ["0","0","0","0","0","0","0","0","0","0","0","0"] // Added to match 12 count
]
                }
            },
        },
        /* Palm_Grove */
        {
            title: "PALM GROVE POETRY",
            characterName: "LIZARD",
            topic: "Poetic Devices",
            assets: {
                nodeBackground: "Palm_Grove.png",
                characterShopkeeper: "Lizard.png",
                activityBackground: "Palm_Grove.png",
            },
            code: "HOPE",
            userCode: ["","","",""],
            state: "incomplete",
            hint: "To decode the Shepherd\’s song, remember: Personification gives human life to non-human objects. Metaphors say one thing is another, while Similes use 'like' or \'as\' to compare. Watch for Hyperbole where the truth is stretched into a giant exaggeration!",
            isHintUsed: false,
            dialogue : {
                incomplete: "Welcome to the Grove, Quester. The Shepherd's song is like a map for the soul, but you must learn to discern the rhythm. Can you identify the poetic devices hidden in these verses?",
                complete: "You have a keen ear for the truth! When you realize the Shepherd is with you, fear turns into Hope. You are ready to move toward the Treasure."
            }, 
            content: {
                puzzle: {
                    style: {
                        material: "style-material--pcb",
                        text: {
                            puzzle: "style-text--pcb",
                        }
                    },
                    piece: [
                        { text: "The Lord is my Shepherd; I shall not want.", image: "1.png" },  
                        { text: "He makes me lie down in green pastures.", image: "2.png" },          
                        { text: "He leads me beside still waters.", image: "3.png" },               
                        { text: "He restores my soul and leads me home.", image: "4.png" },
                        { text: "Shadows of death loom like giants in the valley.", image: "5.png" },
                        { text: "Your rod and your staff, they comfort me.", image: "6.png" }, 
                        { text: "You prepare a table in the presence of my enemies.", image: "7.png" },                                     
                        { text: "My cup overflows with your many blessings.", image: "8.png" },
                        { text: "Surely goodness and mercy shall follow me.", image: "9.png" },          
                    ],
                },
                multipleChoice: [
                    {
                        title: "{1.} The puzzle piece in the bottom center is an example of:",
                        correctIndex: 1,
                        paragraph: [
                            "S[i]mile",
                            "Metap[h]or",
                            "Hy[b]erbole",
                        ],
                    },
                    {
                        title: "{2.} The two yellow puzzle pieces are:",
                        correctIndex: 1,
                        paragraph: [
                            "Si[m]iles",
                            "Aliter[a]tion",
                            "N[o]ne of the above",
                        ],
                    },
                    {
                        title: "{3.} The three puzzle pieces on the top are:",
                        correctIndex: 1,
                        paragraph: [
                            "[P]ersonification",
                            "Meta[p]hors",
                            "Simil[e]s",
                        ],
                    },
                    {
                        title: "{4.} The two purple puzzle pieces are:",
                        correctIndex: 0,
                        paragraph: [
                            "[S]imiles",
                            "P[e]rsonification",
                            "Hyber[b]ole",
                        ],
                    },
                ],
            }
        },
        /* Sandy */
        {
            type: "cryptogram",
            title: "SANDY SYMBOLISM",
            topic: "Context Clues",
            characterName: "STICK",
            assets: {
                nodeBackground: "Sandy.png",
                characterShopkeeper: "Stick.png",
                activityBackground: "Sandy.png",
            },
            code: "PEACE",
            userCode: ["","","","",""],
            state: "incomplete",
            content: {
                cryptogram: {
                    style: {
                        material: "style-material--gold",
                        text: "style-text--gold-bold"
                    },
                    transform: {
                        translateX: "0%",
                        translateY: "18%",
                        rotate: "-1deg",
                    },
                    passage: [
                        {
                            text: {
                                paragraph: "1. I felt [disoriented] and lost in the dark cave."
                            },
                            style: {
                                material: "style-material--paper",
                                paragraph: "style-text--handwritten",
                            },
                            transform: {
                                translateX: "-8%",
                                translateY: "25%",
                                rotate: "1deg",
                            },
                        },
                        {
                            text: {
                                paragraph: "2. The map was [restored] and made new by a miracle.."
                            },
                            style: {
                                material: "style-material--paper",
                                paragraph: "style-text--handwritten",
                            },
                            transform: {
                                translateX: "1%",
                                translateY: "15%",
                                rotate: "0deg",
                            },
                        },
                        {
                            text: {
                                paragraph: "3. The Shepherd is [authentic]; His words are truly true."
                            },
                            style: {
                                material: "style-material--paper",
                                paragraph: "style-text--handwritten",
                            },
                            transform: {
                                translateX: "-4%",
                                translateY: "11%",
                                rotate: "-1deg",
                            },
                        },
                        {
                            text: {
                                paragraph: "4. I will [dwell] and live in His house forever."
                            },
                            style: {
                                material: "style-material--paper",
                                paragraph: "style-text--handwritten",
                            },
                            transform: {
                                translateX: "7%",
                                translateY: "25%",
                                rotate: "1deg",
                            },
                        }
                    ]
                },
                decoder: [
                    {
                        title: "{1.} Using context clues, 'disoriented' means:",
                word: "[P]UZZLED",
                    },
                    {
                        title: "{2.} Using context clues, 'restored' means:",
                word: "REPAIR[E]D",
                    },
                    {
                        title: "{3.} Using context clues, 'authentic' means:",
                word: "RE[A]L",
                    },
                    {
                        title: "{4.} Using context clues, 'dwell' means:",
                word: "[C]OM[E]LIVE",
                    },
                ]
            },
            isHintUsed: false,
            hint: "Read the notes in the sand. Look for words that mean the same thing as the bracketed words. The yellow letters spell PEACE.",
            dialogue : {
                incomplete: "I used to think I was a big, grown-up accident. But look! The map has been restored. If I can decode these clues in the sand, I think I'll find the path to the treasure.",
                complete: "I'm not a mistake. I'm a Quester, and I've found my place on the map! The storm in my head is over... I have peace."
            }, 
            symbol: ["AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM","NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ"]
        },
        /* underworld athletics */
        {
            title: "TRUTHFUL TREASURE",
            characterName: "Paraclete",
            topic: "Elements of a Story",
            assets: {
                nodeBackground: "Truthful_Treasure.png",
                characterShopkeeper: "Paraclete.png",
                activityBackground: "Truthful_Treasure.png",
            },
            code: "TRUTH",
            userCode: ["","","","",""],
            state: "incomplete",
            hint: "Read the short story, then answer the multiple choice questions. The yellow letters, in order, are the answer.",
            isHintUsed: false,
            dialogue : {
                incomplete: "The Cave of Confusion is deep, but the light of truth is deeper. Do you have the eyes to see the elements that make a story whole? I dare you to seek the Truthful Treasure...if you are brave enough to follow the light.",
                complete: "Well done. You are not as weak as I thought! I may need your skills in the future."
            }, 
            content: {
                story: {
                    style: {
                        material: "style-material--metal",
                        text: {
                            title: "style-text--printingPress-bold",
                            author: "style-text--printingPress-normal",
                            paragraph: "style-text--printingPress-normal",
                        }
                    },
                    item: {
                        title:     "A Truthful Tale",
                        author:    "By Paraclete",
                        paragraph: [
    'Once, there was a man known only as The Quester. \n\
    He lived in a world where his mind felt like a "swirling cyclone" of questions, \n\
    a tangled ball of stringy thoughts that he could never quite untie. \n\
    He decided that every question he asked was actually a Quest...a journey to find the truth.',

    'One day, he discovered a mysterious device called an Explorador. \n\
    It came with a warning: "Through it you will discover what is real and what is true, \n\
    but this Quest will not be easy." Though he was afraid, his Conscience urged him forward. \n\
    With a leap of faith, he ventured through the device and found himself in the pitch-black Cave of Confusion.',

    'In the darkness, The Quester felt more lost than ever. \n\
    He tried to "think" his way out, but his thoughts only led him in circles. \n\
    Suddenly, a small bird appeared. His name was Paraclete, which means "Helper." \n\
    Paraclete explained a great mystery: the harder a person looks inside themselves for their identity, \n\
    the darker and more confusing it becomes. To truly see, one must first admit they are blind.',

    'A second voice emerged from the shadows...a smooth-talking Snake. \n\
    The Snake told The Quester that there was no right or wrong, and that he should simply \n\
    "follow his heart" and be whoever he wanted to be. \n\
    But The Quester realized that following his own desires was exactly what had led him \n\
    into the Cave of Confusion in the first place.',

    'He chose to reject the Snake\'s lies and follow Paraclete toward the light. \n\
    Emerging from the cave, The Quester found himself on Identity Island. \n\
    He discovered a map that revealed his world was divided into five regions, \n\
    each connected to a Big Question:'
],
                        transform: {
                            translateX: "0%",
                            translateY: "7.5%",
                            rotate: "1deg",
                        }
                    }
                },
              multipleChoice: [
    {
        title: "{1.} What is the main theme of the Quester's story?",
        correctIndex: 1,
        paragraph: [
            "Learning to [s]kate",
            "The [t]ruth about your value", // T
            "How to find a s[t]ick"
        ],
    }, 
    {
        title: "{2.} From whose point of view is this story told?",
        correctIndex: 2,
        paragraph: [
            "The Sn[a]ke",
            "The Qu[e]rster", 
            "A Third Pe[r]son"// R
        ],
    }, 
    {
        title: "{3.} Paraclete says: 'Whoever wants to find himself must first lose himself.' Quester should look for his identity by:",
        correctIndex: 2,
        paragraph: [
            "Thinking h[a]rd about who he is",
            "staying in t[h]e Cave of Confusion",
            "seeking God\'s tr[u]th" // U
        ],
    },                                           
    {
        title: "{4.} Besides a map what did Quester find by the end of the story?",
        correctIndex: 0,
        paragraph: [
            "[T]he Quester found [h]imself", // T & H
            "He found a magic [s]word",
            "Quester found a pizza [p]lace ",
        ],
    },
    
        ],
    }
},

/* code box */
{
            type: "code-box",
            title: "Code Box",
            state: "incomplete",
            assets: {
                nodeBackground: "node-background-codeBox.png",
                activityBackground: "activity-background-codeBox.png"
            },
            content: {
                codeBox: null
            }
        }
    ],
    
};
  