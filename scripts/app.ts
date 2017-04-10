import Canvas = require("./canvas");
import Board = require("./board");
import Snake = require("./snake");
import Game = require("./game");
import CONST = require("./constants");
import swipe = require("./swipe");

(function() {

    var game = new Game();
    var canvas = new Canvas();
    var board = new Board();
    var snake = new Snake();
    
    document.body.addEventListener( "touchstart", function (event) {
        event.preventDefault();
    });

    swipe(canvas.getElement(), function(event, direction){
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

    function processInput(keyCode: number) {
        if(keyCode === CONST.KEY.PAUSE_RESUME) {
            game.pauseResume();
        } else if([CONST.KEY.UP, CONST.KEY.DOWN, CONST.KEY.LEFT, CONST.KEY.RIGHT].indexOf(keyCode) !== -1) {
            var direction;
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
            if(game.isNotStarted()) {
                snake.changeDirection(direction);
                game.start(updateGameArea);
            } else if(game.isStarted()) {
                snake.changeDirection(direction);
            }
        }
    };

    function updateGameArea() {
        if(!snake.move(canvas, board.getGrid())) {
            game.end();
        }
    }

})();