/* 
 * the games score object
 * stores each roll and calculates the score
 * handles logic for calculating regular rolls, strikes, spares and their bonuses
 */
class Bowling {
    constructor() {
        this.allRolls = [];
        this.rollIndex = 0;
        this.viewIndex = 0; // the view <td> index
        this.frameScores = [];
    }

    currentRoll(skittles) {
        this.skittles = skittles;
        this.allRolls[this.rollIndex] = this.skittles;
        this.output(this.rollIndex); // output roll the correct way
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
        var index = 0;;

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

            // add scores to array if correct number
            if (!isNaN(totalScore)) {
                this.frameScores[frame] = totalScore;
            }
        }

        this.outputScore();
        return totalScore;
    }

    /*
     *  Below is logic for how to output roll and scores to the view
     *  Uses viewIndex instead of rollIndex since they may differ
     *  may need some refactoring and should be in a new/other class
     */
    output(index) {
        if (this.isOutputStrike(index)) {
            this.outputStrike();
            if (this.viewIndex > 17) {
                this.viewIndex++;
            } else {
                this.viewIndex += 2;
            }
        } else if (this.isOutputSpare(index)) {
            this.outputSpare();
            this.viewIndex++;
        } else {
            this.outputRegular(index);
            this.viewIndex++;
        }
    }

    isOutputStrike(index) {
        let viewIndex = this.viewIndex;
        if (isEven(viewIndex) && this.allRolls[index] == 10) {
            return true
        }

        function isEven(viewIndex) {
            return viewIndex % 2 == 0;
        }
    }

    outputStrike() {
        if (this.viewIndex < 18) {
            $('.rolls').eq(this.viewIndex).html('X');
            this.outputNone(this.viewIndex + 1); // skip past next view index
        } else {
            $('.rolls').eq(this.viewIndex).html('X'); // dont skip next view index if last frame
        }
    }

    isOutputSpare(index) {
        if (!isEven(this.viewIndex) && (this.allRolls[index] + this.allRolls[index - 1] == 10)) {
            return true
        }

        // check if first or second roll in view by the <td> index (viewindex)
        function isEven(viewIndex) {
            return viewIndex % 2 == 0;
        }
    }

    outputSpare() {
        $('.rolls').eq(this.viewIndex).text('/');
    }

    outputRegular(index) {
        $('.rolls').eq(this.viewIndex).html(this.allRolls[index]);

    }

    outputNone(index) {
        let viewIndex = index;
        $('.rolls').eq(viewIndex).html('-');
    }

    outputScore() {
        for (var i = 0, len = this.frameScores.length; i < len; i++) {
            $('.score').eq(i).html(this.frameScores[i]);
        }
    }

    getViewIndex() {
        return this.viewIndex;
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

    /* 
     * check if first roll in frame and get random number from 0-10 
     * change the remainder of skittles for a correct random generated number the second roll
     * if roll is strike it resets so next roll also counts as first roll
     */
    roll() {

        if (this.firstRoll) {
            let skittles = this.generate.randomize(this.remainder);
            this.bowl.currentRoll(skittles);
            this.remainder = 10 - skittles;

            // if strike, make sure to reset the roll
            if (skittles !== 10) {
                this.firstRoll = false;
            }

        } else {
            let skittles = this.generate.randomize(this.remainder);
            this.bowl.currentRoll(skittles);
            this.firstRoll = true; // lets start over next roll
            this.remainder = 0;
        }

        // Output the scores for each frame to view
        this.bowl.score();

        /* 
         * check if last 2 rolls in last frame doesnt get spare or strike, game over if not
         * if spare or strike, continue one more roll and then game over
         */
        if (this.bowl.getViewIndex() == 20) {
            // check sum of the two previous rolls
            if (this.bowl.allRolls[this.bowl.rollIndex - 2] + this.bowl.allRolls[this.bowl.rollIndex - 1] < 10) {
                $('#roll-btn').hide();
                this.bowl.outputNone(this.bowl.getViewIndex())
                console.log('Game Over');
                this.gameOver();
            }
        } else if (this.bowl.getViewIndex() > 20) {
            $('#roll-btn').hide();
            console.log('Game Over');
            this.gameOver();
        }
    }

    // output when game is over
    gameOver() {
        console.log('Total score was => ' + this.bowl.score());
        $('#total-score').html('Total score: <h3>' + this.bowl.score() + '</h3>');
        $('#play-btn').html("<input type='button' class='btn btn-success' value='Play again' onClick='window.location.reload()'>");
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