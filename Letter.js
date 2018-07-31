var Letter = function (val) {
    this.char = val.toLowerCase();
    this.guessed = false;
    this.index = i;
};
Letter.prototype.toString = function () {
    if (this.guessed) {
        return this.char.toUpperCase();
    } else {
        return "_";
    }
};
Letter.prototype.check = function (guess) {
    if (this.char === guess.toLowerCase()) {
        this.guessed = true;
        return true;
    } else {
        return false;
    }
};

module.exports = Letter;

/*
var ltr = new Letter('a');
console.log("char: " + ltr.char);
console.log("guessed: " + ltr.guessed);
console.log("toString: " + ltr.toString());
console.log("false: " + ltr.check('c'));
console.log("true: " + ltr.check('a'));
console.log("guessed: " + ltr.guessed);
console.log("toString: " + ltr.toString());
*/