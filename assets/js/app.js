/* 
 * the games score object
 * stores each roll and calculates the score
 * handles logic for calculating regular rolls, strikes, spares and their bonuses
 */
class Bowling {
    constructor() {
        this.allRolls = [];
        this.rollIndex = 0;
    }

    currentRoll(skittles) {
        this.skittles = skittles;
        this.allRolls[this.rollIndex] = this.skittles;
        this.rollIndex++;
    }

    strike(index) {
        if (this.allRolls[index] == 10) {
            return this.allRolls[index]
        }
        return false
    }

    strikeBonus(index) {
        return this.allRolls[index + 1] + this.allRolls[index + 2];
    }

    spare(index) {
        if (this.allRolls[index] + this.allRolls[index + 1] == 10) {
            return this.allRolls[index] + this.allRolls[index + 1]
        }
        return false
    }

    spareBonus(index) {
        return this.allRolls[index + 2];
    }

    regularScore(index) {
        return this.allRolls[index] + this.allRolls[index + 1];
    }

    score() {
        var allRolls = this.allRolls;
        var totalScore = 0;
        var index = 0;

        for (var frame = 0; frame < 10; frame++) {

            if (this.strike(index)) {
                totalScore += this.strike(index) + this.strikeBonus(index);
                index++;
            } else if (this.spare(index)) {
                totalScore += this.spare(index) + this.spareBonus(index);
                index += 2;
            } else {
                totalScore += this.regularScore(index);
                index += 2;
            }
            console.log(totalScore);
        }

        return totalScore;
    }
}
/*
 *  Generates a random number
 *  takes the remainder from first roll for a correct generated number the second roll
 */
class GenerateNumber {

    randomize(remainder) {
        this.remainder = remainder;

        if (this.remainder > 0) {
            this.number = Math.floor(Math.random() * Math.floor(this.remainder + 1)); // second roll
        } else {
            this.number = Math.floor(Math.random() * 11); // first roll
        }
        return this.number;
    }
}

/* 
 * simple controller object for rolls logic and game control
 */
class RollsController {
    constructor() {
        this.bowl = new Bowling();
        this.generate = new GenerateNumber();
        this.remainder = 0;
        this.firstRoll = true;
    }

    roll() {
        console.log(this.bowl.allRolls)

        /* 
         * check if last 2 rolls doesnt get spare or strike, game over if not
         * if spare or strike, continue and then game over
         */
        if (this.bowl.allRolls.length >= 18 && (this.bowl.allRolls[18] + this.bowl.allRolls[19] < 10)) {

            $('#roll-btn').hide();
            console.log('game over');
            console.log('Your total score is ' + this.bowl.score())

        } else if (this.bowl.allRolls.length > 20) {

            $('#roll-btn').hide();
            console.log('game over');
            console.log('Your total score is ' + this.bowl.score())
        }

        /* 
         * check if first roll in frame and get random number from 0-10 
         * change the remainder of skittles for a correct random generated number the second roll
         * if roll is strike it resets so next roll also counts as first roll
         */
        if (this.firstRoll) {
            let skittles = this.generate.randomize(this.remainder);
            console.log('remainder is => ' + this.remainder + ' skittles => ' + skittles);
            this.bowl.currentRoll(skittles); // store first roll
            this.remainder = 10 - skittles;
            console.log('remainder is now => ' + this.remainder);
            console.log()

            // if strike, make sure to reset the roll
            if (skittles !== 10) {
                this.firstRoll = false;
            }

            console.log(' the first roll you downed ' + skittles + ' skittles and has ' + this.remainder + ' skittles left');

        } else {
            let skittles = this.generate.randomize(this.remainder);
            console.log('remainder is => ' + this.remainder + ' skittles => ' + skittles);
            this.bowl.currentRoll(skittles); // store second roll
            this.firstRoll = true; // lets start over next roll
            console.log(' the second roll you downed ' + skittles + ' skittles of the remaining ' + this.remainder + ' skittles. ' + (this.remainder - skittles) + ' still stands');
            this.remainder = 0;
            console.log('remainder is now => ' + this.remainder);
        }
    }
}

$(document).ready(function() {

    // ready?
    var rollControll = new RollsController();

    // lets roll
    $('#roll-btn').click(function() {

        rollControll.roll();

    });
});