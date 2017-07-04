import Game from "./game";
import CONST = require("./constants");

import swipe = require( "./swipe");

import $ = require("jquery");

require("../styles/style.scss");

(function() {

    var game: Game;

    $('#play').on('click', function() {
        game = new Game();
    });

    // $('#restart').on('click', startGame);
    
    document.body.addEventListener( "touchstart", function (event: Event) {
        event.preventDefault();
    });

    swipe(<HTMLCanvasElement> document.getElementById("canvas"), function(event: TouchEvent, direction: string){
        let keyCode: number;
        switch(direction) {
            case CONST.DIRETION.UP:
                keyCode = CONST.KEY.UP;
                break;
            case CONST.DIRETION.DOWN:
                keyCode = CONST.KEY.DOWN;
                break;
            case CONST.DIRETION.LEFT:
                keyCode = CONST.KEY.LEFT;
                break;
            case CONST.DIRETION.RIGHT:
                keyCode = CONST.KEY.RIGHT;
                break;
        }
        if(keyCode) {
            processInput(keyCode);
        }
    });

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        processInput(event.keyCode);
    });

    function processInput(keyCode: number): void {
        if(keyCode === CONST.KEY.PAUSE_RESUME) {
            game.pauseResume();
        } else if([CONST.KEY.UP, CONST.KEY.DOWN, CONST.KEY.LEFT, CONST.KEY.RIGHT].indexOf(keyCode) !== -1) {
            let direction: string;
            switch(keyCode) {
                case CONST.KEY.UP:
                    direction = CONST.DIRETION.UP;
                    break;
                case CONST.KEY.DOWN:
                    direction = CONST.DIRETION.DOWN;
                    break;
                case CONST.KEY.LEFT:
                    direction = CONST.DIRETION.LEFT;
                    break;
                case CONST.KEY.RIGHT:
                    direction = CONST.DIRETION.RIGHT;
                    break;
            }
            game.processInput(direction);
        }
    };

})();