const resource =  {

    info: {
        title: "Island of Identity",
        path: "island-of-identity",
        logo: "resource/island-of-identity/assets/branding/preview-day-1.png",
        timerLabel: "TIME UNTIL HIGH TIDE:",
    },

    activityArray: [
        /* The Perception Pond */
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
            hint: "Read the three notes, then answer the multiple choice questions. The yellow letters, in order, are the answer.",
            isHintUsed: false,
            dialogue : {
                incomplete: "Welcome to the Perception Pond. Reflections can show you what you look like, but they cannot tell you who you really are. Read these three notes and find the main idea in each one.",
                complete: "Good work. The truth about who we are comes from God, not just from our reflections."
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
                            image: "1.png",
                            title: "WHO AM I?",
                            paragraph: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God. John 1:12",
                            transform: {
                                translateX: "-10%",
                                translateY: "-3%",
                                rotate: "-1deg",
                            }
                        },
                        {
                            image: "2.png",
                            title: "PEOPLE PLEASE?",
                            paragraph: "Am I now trying to win the approval of human beings, or of God? Or am I trying to please people? If I were still trying to please people