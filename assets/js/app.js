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

    strike() {
        // return true or false
    }

    strikeBonus() {
        // if strike, there should be a bonus from next two rolls
        // get the two next rolls as bonus from allRolls by the next frame index
    }

    spare() {
        // return true or false
    }

    spareBonus() {
        // if spare, there should be a bonus from next roll
        // get the next roll as bonus from allRolls by the next frame index
    }

    isLastFrame() {
        // if this is the last frame there should be different logic
    }

    score() {
        // keep track of scores by frame index and allRolls
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

$(document).ready(function() {
    // Vars
    var generate = new GenerateNumber();
    var remainder = 0;
    var firstRoll = true;
    var bowl = new Bowling();

    // Roll
    $('#roll-btn').click(function() {

        /* 
         * check if first roll in frame and get random number from 0-10 
         * change the remainder of skittles for a correct random generated number the second roll
         */
        if (firstRoll == true) {
            let skittles = generate.randomize(remainder);
            bowl.currentRoll(skittles); // store first roll

            remainder = 10 - skittles;
            firstRoll = false;
            console.log(' the first roll you downed ' + skittles + ' skittles and has ' + remainder + ' skittles left');
        } else {
            let skittles = generate.randomize(remainder);
            bowl.currentRoll(skittles); // store second roll

            firstRoll = true;
            console.log(' the second roll you downed ' + skittles + ' skittles of the remaining ' + remainder + ' skittles. ' + (remainder - skittles) + ' still stands');
            remainder = 0;
        }

        // unfinished check if the game is over and it is time to calculate scores
        if (bowl.allRolls[20]) {
            $(this).hide();
            console.log('game over');

            // call some function to calculate scores here...
        }

        console.log(bowl.allRolls);
    });
});