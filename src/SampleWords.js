const sampleWords = [ 
    { 
        word: "HELLO", 
        description: "A common greeting to say hi."
    }, 
    { 
        word: "WORLD", 
        description: "The planet we live on, which is full of land and water."
    }, 
    { 
        word: "JAVASCRIPT", 
        description: "A popular programming language for building interactive websites and provides behaviour to applications."
    }, 
    { 
        word: "REACT", 
        description: "A Javascript library in which we have written this project code"
    }, 
    { 
        word: "PROGRAMMING", 
        description: "The process of developing code to assist computers to perform tasks."
    }, 
    { 
        word: "GEEKSFORGEEKS", 
        description: "An educational website for computer science 'geeks.'"
    } 
];

export function getRandomWord() {
    return sampleWords[Math.floor(Math.random() * sampleWords.length)];
}