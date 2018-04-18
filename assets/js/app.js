class Bowling {
    constructor() {
        this.allRolls = [];
        this.roll = 0;
        this.frame = 0;
    }

    throw (skittles) {
        // logic for each roll/throw, should take number of downed skittles
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

class GenerateNumber {

    randomize(remainder = 0) {
        // should return a random number, 
        // takes the remainder from the first throw so that no more than 10 skittles can be downed each frame
    }
}

window.onload = function() {

    var rollBtn = document.getElementById("roll-btn");
    rollBtn.onclick = function() { console.log('button does work') };

}