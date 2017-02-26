import CONST = require("./constants");

export = new Game();

function Game() {

    const NOT_STARTED = 0, 
        STARTED = 1, 
        PAUSED = 2, 
        OVER = 3;

    var game = this;

    game.state = NOT_STARTED;

    game.start = function(iterate) {
        game.state = STARTED;
        game.iterate = iterate;
        game.interval = setInterval(iterate, CONST.UPDATE_TIME);
    };

    game.pause = function() {
        game.state = PAUSED;
        clearInterval(game.interval);
    };

    game.resume = function() {
        game.state = STARTED;
        game.interval = setInterval(game.iterate, CONST.UPDATE_TIME);
    };

    game.pauseResume = function() {
        if(game.state === PAUSED) {
            game.resume();
        } else {
            game.pause();
        }
    };

    game.end = function(iterate) {
        game.state = OVER;
        clearInterval(game.interval);
    };

    game.isNotStarted = function() {
        return game.state === NOT_STARTED;
    };

    game.isStarted = function() {
        return game.state == STARTED;
    };
}