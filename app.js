const inq = require("inquirer");
const Word = require("./Word.js");

const globalWordList = ["actionscript", "adenine", "assembly", "c", "draco", "erlang", "ecmascript",
    "fortress", "george", "haggis", "haskell", "hopscotch", "java", "javascript", "jython",
    "kaleidoscope", "krypton", "legoscript", "lua", "milk", "newlisp", "pascal", "perl", "powershell",
    "python", "quakec", "ruby", "sql"];

const validInput = function (str) {
    if (str.length !== 1) {
        console.log("\n\nYou entered more than one character. Please try again!\n\n");
        return false;
    }

    str = str.toUpperCase();
    code = str.charCodeAt(0);
    if (!(code > 64 && code < 91)) { // upper alpha (A-Z)
        console.log("\n\nAll guesses must be letters of the alphabet. Please try again!\n\n");
        return false;
    }

    if (game.guesses.indexOf(str) !== -1) {
        console.log("\n\nYou've already guessed " + str + ". Please try again!\n\n");
        return false;
    }

    return true;
}

var game = {
    localWordList: null,
    currentWord: null,
    guesses: null,
    numGuesses: null,
    wins: 0,

    init: function () {
        console.log("\n####################");
        console.log("\nWelcome to the word guessing game!\n\nThe theme is:\nPROGRAMMING LANGUAGES");
        console.log("\nYou will be able to guess one letter per turn.");
        console.log("\nGuess the word before you've made 9 incorrect guesses to win!");
        this.localWordList = [];
        globalWordList.forEach(function (item) {
            game.localWordList.push(item);
        });

        this.pickNewWord();
    },

    pickNewWord: function () {
        // Pick word
        // Set current word to a new word object with the picked word
        let index = Math.floor(Math.random() * this.localWordList.length);
        let word = this.localWordList.splice(index, 1)[0];
        this.currentWord = new Word(word);
        this.playRound();
    },

    playRound: function () {
        // Set default number of guesses: 9
        this.numGuesses = 9;
        this.guesses = [];
        this.playTurn();
    },

    playTurn: function () {
        // Update display
        // Take input prompt
        // If guesses remaining, recursive call
        this.display();

        inq.prompt([{
            type: "input",
            message: "Which letter would you like to guess next?",
            name: "guess",
            validate: validInput
        }]).then((ans) => {
            let newGuess = ans.guess.toUpperCase();
            this.guesses.push(newGuess);
            let correct = this.currentWord.guess(newGuess);

            if (correct) {
                console.log("\nYou guessed correctly!\n");
            } else {
                console.log("\nWhoops - wrong!\n");
                this.numGuesses--;
            }

            this.checkRound();
        });
    },

    checkRound: function () {
        if (this.numGuesses === 0) {
            console.log("\nYou've run out of guesses! The word was " + this.currentWord.word + ".");
            console.log("You've solved " + this.wins + " word(s) so far.\n");
            this.promptNextRound();
        } else if (this.currentWord.toString().indexOf("_") === -1) {
            this.wins++;
            console.log("\nYou've solved it! The word was " + this.currentWord.word + ".");
            console.log("You've solved " + this.wins + " word(s) so far.\n");
            this.promptNextRound();
        } else {
            this.playTurn();
        }
    },

    promptNextRound: function () {
        console.log("");
        inq.prompt([
            {
                type: "confirm",
                message: "Play next round? (new word will be picked!) ",
                name: "confirm"
            }
        ]).then((ans) => {
            if (ans.confirm) {
                console.log("\nNext round!\n");
                this.pickNewWord();
            } else {
                console.log("\nYou solved " + this.wins + " word(s) this time.\n");
                console.log("Thanks for playing!\n");
                return;
            }
        });
    },

    display: function () {
        console.log("\n####################\n");
        console.log("Your word:\n");
        console.log(this.currentWord.toString());
        console.log("\n\nYour guesses:\n");
        console.log(this.guesses.join(" "));
        console.log("\n\nGuesses remaining: " + this.numGuesses);
        console.log("\n####################\n");
    }
};

game.init();