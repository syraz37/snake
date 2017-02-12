import CONST = require("./constants");

export = new Game();

function Game() {
    const START = 0, PLAY = 1, PAUSE = 2, END = 3;
    var game = this;
    game.state = START;

    game.isStart = function() {
        return game.state === START;
    };

    game.start = function(iterate) {
        game.state = PLAY;
        game.iterate = iterate;
        game.interval = setInterval(iterate, CONST.UPDATE_TIME);
    };

    game.pause = function() {
        game.state = PAUSE;
        clearInterval(game.interval);
    };

    game.isPlayed = function() {
        return game.state == PLAY;
    };

    game.resume = function() {
        game.state = PLAY;
        game.interval = setInterval(game.iterate, CONST.UPDATE_TIME);
    };

    game.pauseResume = function() {
        if(game.state === PAUSE) {
            game.resume();
        } else {
            game.pause();
        }
    };

    game.end = function(iterate) {
        game.state = END;
        clearInterval(game.interval);
    };
}