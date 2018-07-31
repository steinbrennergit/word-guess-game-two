const Letter = require("./Letter.js");

var Word = function (str) {
    this.word = str.toUpperCase();
    this.letters = [];
    this.display = [];
    this.word.split("").forEach((char) => {
        this.letters.push(new Letter(char));
    });
    this.updateDisplay();
};
Word.prototype.guess = function (ch) {
    let confirm = false;
    this.letters.forEach((letter) => {
        let checked = letter.check(ch);
        if (checked) { confirm = true; }
    });
    this.updateDisplay();
    return confirm;
};
Word.prototype.updateDisplay = function () {
    this.display = [];
    this.letters.forEach((letter) => {
        this.display.push(letter.toString());
    });
};
Word.prototype.toString = function () {
    return this.display.join(" ");
}

module.exports = Word;

/*
var w = new Word("Tucker");
console.log("word: " + w.word);
console.log("letters: " + w.letters);
console.log("display: " + w.display);
console.log("false: " + w.guess('a'));
console.log("display: " + w.display);
console.log("true: " + w.guess('u'));
console.log("display: " + w.display);
console.log(w.toString());
*/