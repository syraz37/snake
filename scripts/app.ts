import canvas = require("./canvas");
import board = require("./board");
import snake = require("./snake");
import game = require("./game");
import CONST = require("./constants");
import swipe = require("./swipe");

(function() {
    
    document.body.addEventListener( "touchstart", function (event) {
        event.preventDefault();
    });

    swipe(canvas.element, function(event, direction){
        var keyCode;
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
    })

    // var e = 0
    // setInterval(function() {
    //     if(e%2 == 0) {
    //         processInput(CONST.KEY.UP);
    //         processInput(CONST.KEY.LEFT);
    //     } else {
    //         processInput(CONST.KEY.UP);
    //         processInput(CONST.KEY.RIGHT);
    //     }
    //     e++;
    // }, 4000);


    snake.create(board.getGrid());

    function drawCanvas() {
        canvas.init();
        board.draw(canvas);
        snake.draw(canvas);
    }

    drawCanvas();

    window.addEventListener('resize', drawCanvas, false);

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        processInput(event.keyCode);
    });

    function processInput(keyCode) {
        if(keyCode === CONST.KEY.PAUSE_RESUME) {
            game.pauseResume();
        } else if([CONST.KEY.UP, CONST.KEY.DOWN, CONST.KEY.LEFT, CONST.KEY.RIGHT].indexOf(keyCode) !== -1) {
            if(game.isStart()) {
                snake.changeDirection(keyCode);
                game.start(updateGameArea);
            } else if(game.isPlayed()) {
                snake.changeDirection(keyCode);
            }
        }
    };

    function updateGameArea() {
        if(!snake.move(canvas, board.getGrid())) {
            game.end();
        }
    }

})();