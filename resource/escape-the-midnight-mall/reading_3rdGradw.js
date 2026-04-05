const resource =  {

    info: {
        title: "Identity Island",
        path: "escape-the-midnight-mall",
        logo: "resource/escape-the-midnight-mall/assets/branding/preview-3rd-grade.png",
        timerLabel: "TIME TO MIDNIGHT"
    },

    activityArray: [
        /* Mirror_Pond */
        {
            title: "Mirror_Pond",
            characterName: "Terrible Fish",
            topic: "Main Idea",
            assets: {
                nodeBackground: "Mirror_Pond.png",
                characterShopkeeper: "Fish.png",
                activityBackground: "Mirror_Pond.png"
            },
            code: "GEAR",
            userCode: ["","","",""],
            state: "incomplete",
            hint: "Read the three notes, then answer the multiple choice questions. The yellow letters, in order, are the answer.",
            isHintUsed: false,
            dialogue : {
                incomplete: "Hee hee! I'm Fish, and I sell robot pets. Every pet comes with a note, but I'm so bad at writing! Can you read each note and tell me its main idea?",
                complete: "Hee hee! Did you know I was kicked out of my hometown? I'm not allowed to talk about it!"
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
                            title:      "Mirror",
                            paragraph:  "Hi! You are now the proud owner of a real Mirror_Pond Mirror. \n\
                                        Just make sure to keep it away from magnets, or it might start spinning and never stop!  \n\
                                        Trust me, you don't want that. So, always remember: small magnets, medium magnets, big magnets... all very, very bad!",
                            transform: {
                                translateX: "-10%",
                                translateY: "-3%",
                                rotate: "-1deg",
                            }
                        },
                        {
                            image:      "2.png",
                            title:      "Squix-1000",
                            paragraph:  "Your new Squix-1000 requires a little more care than a real squid.\n\
                                        First off, it must live in a special tank, but not any old fish tank will do.\n\
                                        No, no, NO! Normal fish tanks are no good. Your Squix-1000 must live in tank filled with oil \n\
                                        to prevent its tiny metal parts from rusting.",
                            transform: {
                                translateX: "10%",
                                translateY: "-20%",
                                rotate: "3deg",
                            }
                        },
                        {
                            image:      "3.png",
                            title:      "Bananatron",
                            paragraph:  "You really bought a Bananatron? Nobody buys a Bananatron! \n\
                                        That might be because this robot fruit is a bit... clumsy.\n\
                                        It will slip on itself every few seconds, so keep it away from stairs and other high places.\n\
                                        It just falls all the time. I can't seem to figure out why! Oh, my poor Bananatron.",
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
                        title: "{1.} What is the main idea of the Mirror?",
                        correctIndex: 2,
                        paragraph: [
                            "Buying an [O]wl-O-Matic will make you proud",
                            "A spinning Mirror is hard to fi[x]",
                            "Ma[g]nets are bad for the Mirror",
                        ],
                    },
                    {
                        title: "{2.} What is the main idea of the Squix-1000?",
                        correctIndex: 1,
                        paragraph: [
                            "The Squi[x]-1000 is not a real squid",
                            "The Squix-1000 can't liv[e] in a normal fish tank",
                            "The Squ[i]x-1000 has tiny metal parts",
                        ]
                    },
                    {
                        title: "{3.} What is the main idea of the Bananatron?",
                        correctIndex: 0,
                        paragraph: [
                            "The Banan[a]tron is clumsy",
                            "The Bananatron i[s] a very popular pet",
                            "Stairs are one example of a hi[g]h place",  
                        ]
                    },
                    {
                        title: "{4.} All three of these passages are:",
                        correctIndex: 1,
                        paragraph: [
                            "How to build robot pet[s]",
                            "How to care for [r]obot pets",
                            "Reaso[n]s to buy robot pets",  
                        ]
                    },
                ],
                
            }                     
        },
        /* the candy cave */
        {
            title: "The Candy Cave",
            characterName: "Martin Shortnose",
            topic: "Poetry",
            assets: {
                nodeBackground: "Cave.png",
                characterShopkeeper: "Crab.png",
                activityBackground: "Cave.png",
            },
            code: "CANE",
            userCode: ["","","",""],
            state: "incomplete",
            hint: "Read the poem, then answer each question to fill in the crossword puzzle. The yellow letters inside the crossword puzzle, in order, are the answer.",
            isHintUsed: false,
            dialogue : {
                incomplete: "I want to sell more candy, but my shop is too small! You know, when I feel like this, I like to write poetry. Can you read one of my poems and tell me what you think?",
                complete: "I heard Zeeb whisper something about a secret tunnel deep inside this cave..."
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
                        title:     "The Candy and the Cave",
                        author:    "By Martin Shortnose",
                        paragraph: [
                            [
                                'The candymaker said, "What should I make?',
                                'My cave is too small. I need more space!',
                                'I\'m at my limit. I\'m about to break.',
                                'Such little candy in such a small place!',
                            ],
                            [
                                'If my shop could grow, I would make something new.',
                                'So many treats, for me and for you!',
                                'But this cave is too deep and too dark, you see.',
                                'Darkness means danger, and that scares me."'
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
                    title: "Answer the questions to fill in the crossword puzzle.",
                    paragraph: [
                        'A. What is the author\'s first name?',
                        'B. What is the last word in the poem\'s title?',
                        'C. How many lines are in this poem?',     
                        'D. Do lines 3 and 4 rhyme? (YES/NO)',
                        
                    ],
                    puzzle: [
                        ["0","0","0","0","(A)M","0","0"],
                        ["0","0","0","(B)1C","2A","V","E"],
                        ["0","0","0","0","R","0","0"],
                        ["(C)4E","I","G","H","T","0","0"],
                        ["0","0","0","0","I","0","0"],
                        ["0","0","0","0","(D)3N","O","0"],
                    ]
                }
            },
        },
        /* Palm_Grove */
        {
            title: "Palm_Grove",
            characterName: "Zeeb",
            topic: "Similes and Metaphors",
            assets: {
                nodeBackground: "Palm_Grove.png",
                characterShopkeeper: "Lizard.png",
                activityBackground: "Palm_Grove.png",
            },
            code: "AMPS",
            userCode: ["","","",""],
            state: "incomplete",
            hint: "Put together the puzzle pieces, then answer the multiple choice questions. The yellow letters, in order, are the answer.",
            isHintUsed: false,
            dialogue : {
                incomplete: "I spent all week trying to make a new circuit board for one of my games, but I can't seem to fit the pieces together. Ugh... I don't think you can solve this puzzle, but you can try.",
                complete: "Why are you still here? Go away, I'm too busy to talk!"
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
                        { text: "Computer screens are windows to other worlds.", image: "1.png" },  
                        { text: "The internet is a treasure chest of information.", image: "2.png" },          
                        { text: "Computers are smart friends that help you learn.", image: "3.png" },               
                        { text: "The arcade was as busy as a beehive.", image: "4.png" },
                        { text: "Video games are stories that you can play.", image: "5.png" },
                        { text: "Her typing skills are as fast as a cheetah.", image: "6.png" }, 
                        { text: "A password is like a secret key.", image: "7.png" },                                      
                        { text: "The computer virus spread like a fire.", image: "8.png" },
                        { text: "Headphones are like cozy caves for your ears.", image: "9.png" },          
                    ],
                },
                multipleChoice: [
                    {
                        title: "{1.} The puzzle piece in the middle is a:",
                        correctIndex: 1,
                        paragraph: [
                            "S[i]mile",
                            "Met[a]phor",
                            "None of t[h]e above",
                        ],
                    },
                    {
                        title: "{2.} The two yellow puzzle pieces are:",
                        correctIndex: 0,
                        paragraph: [
                            "Si[m]iles",
                            "Metaph[o]rs",
                            "No[n]e of the above",
                        ],
                    },
                    {
                        title: "{3.} The three puzzle pieces on the top are:",
                        correctIndex: 1,
                        paragraph: [
                            "Simil[e]s",
                            "Meta[p]hors",
                            "N[o]ne of the above",
                        ],
                    },
                    {
                        title: "{4.} The two purple puzzle pieces are:",
                        correctIndex: 0,
                        paragraph: [
                            "[S]imiles",
                            "Meta[p]hors",
                            "None of the abov[e]",
                        ],
                    },
                ],
            }
        },
        /* Sandy */
        {
            type: "cryptogram",
            title: "Sticktica",
            topic: "Context Clues",
            characterName: "Stick",
            assets: {
                nodeBackground: "Sandy.png",
                characterShopkeeper: "Stick.png",
                activityBackground: "Sandy.png",
            },
            code: "GLAM",
            userCode: ["","","",""],
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
                                paragraph: "1. These shoes are so [massive], only large feet will fit."
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
                                paragraph: "2. This wedding dress is made from a soft, white [textile]."
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
                                paragraph: "3. A diamond this big is so [scarce], you will never see one again."
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
                                paragraph: "4. This jacket has many colors, but the [primary] color is blue."
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
                        title: "{1.} Using context clues, 'massive' means:",
                        word: "BI[G]",
                    },
                    {
                        title: "{2.} Using context clues, 'textile' means:",
                        word: "C[L]OTH",
                    },
                    {
                        title: "{3.} Using context clues, 'scarce' means:",
                        word: "R[A]RE",
                    },
                    {
                        title: "{4.} Using context clues, 'primary' means:",
                        word: "[M]AIN",
                    },
                ]
            },
            isHintUsed: false,
            hint: "Read the notes, then find the meaning of each word by looking for context clues. Use the secret code if you get stuck. The yellow letters, in order, are the answer.",
            dialogue : {
                incomplete: "I wrote some notes for a fashion show, but I think some of the words are too hard. Perhaps you can use context clues to find out what they mean...",
                complete: "So, Quester sent you? I have not heard that name in a long time..."
            }, 
            symbol: ["AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM","NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ"]
        },
        /* underworld athletics */
        {
            title: "Helio Athletics",
            characterName: "Robustus the Great",
            topic: "Elements of a Story",
            assets: {
                nodeBackground: "Truthful_Treasure.png",
                characterShopkeeper: "Paraclete.png",
                activityBackground: "Truthful_Treasure.png",
            },
            code: "HERO",
            userCode: ["","","",""],
            state: "incomplete",
            hint: "Read the short story, then answer the multiple choice questions. The yellow letters, in order, are the answer.",
            isHintUsed: false,
            dialogue : {
                incomplete: "I do not fear the Mallcrawlers. If you don't believe me, see for yourself! I dare you to read a story of my most daring adventure.",
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
                        title:     "The Smelly Troll",
                        author:    "By Robustus the Great",
                        paragraph: [
                            
                                'I warn you, this is a scary story. You should leave now, run away, and never look back! \n\
                                Only the brave (or the foolish) should read on.',
                                  
                                'It all started one sunny day in the field just outside Lady Fresno\'s castle. \n\
                                I was picking flowers for the Lady\'s birthday party, when I smelled something really bad. \n\
                                I looked up, and standing there was a troll. \n\
                                He was twice as tall as me, and twice as sweaty. \n\
                                He was picking flowers too, but I did not fear him. \n\
                                Instead, I dared the stinky beast to pick more flowers than me! \n\
                                The troll smiled and accepted.', 

                                'We began picking, but I was very careful with the flowers I chose. \n\
                                I only picked pretty ones that smelled good. \n\
                                However, the troll started grabbing every flower he saw. \n\
                                He did not care how pretty they were, or how good they smelled! \n\
                                So, when every flower in the field had been picked, it was clear I had lost. But then, something weird happened.', 
                                
                                'The troll looked at me and said, "Well done, warrior! Even though you lost, you are still a great flower-picker. Do you want to be my friend?"',                
                   
                                'From that day on, the troll and I picked flowers together every spring.\n\
                                He showed me how to pick them quickly, and I showed him which ones smelled sweet. \n\
                                We found, that by working together, we could collect the most amazing flowers the kingdom had ever seen.',                           
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
                        title: "{1.} What is the theme of this story?",
                        correctIndex: 2,
                        paragraph: [
                            "Smelly trolls are go[o]d at picking flowers",
                            "Robustus [t]he Great lost the dare",
                            "Great things [h]appen by working together",
                        ],
                    }, 
                    {
                        title: "{2.} What detail best describes the troll?",
                        correctIndex: 0,
                        paragraph: [
                            "Sm[e]lly",
                            "Sh[y]",
                            "F[e]arful",
                        ],
                    }, 
                    {
                        title: "{3.} From whose point of view is the story told?",
                        correctIndex: 1,
                        paragraph: [
                            "The O[g]re",
                            "Robustus the G[r]eat",
                            "L[a]dy Fresno",
                        ],
                    },                                       
                    {
                        title: "{4.} What is the setting of this story?",
                        correctIndex: 2,
                        paragraph: [
                            "A lone[l]y village",
                            "A castl[e]",
                            "A field [o]f flowers",
                        ],
                    },                      
                ],
            },
            
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
  