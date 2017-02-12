import canvas = require("./canvas");
import board = require("./board");
import snake = require("./snake");
import game = require("./game");
import CONST = require("./constants");

(function() {

    snake.create(board.getGrid());

    function drawCanvas() {
        canvas.init();
        board.draw(canvas);
        snake.draw(canvas);
    }

    drawCanvas();

    window.addEventListener('resize', drawCanvas, false);

    window.addEventListener('keydown', function (e) {
        e.preventDefault();
        if(e.keyCode === CONST.KEY.PAUSE_RESUME) {
            game.pauseResume();
        } else if([CONST.KEY.UP, CONST.KEY.DOWN, CONST.KEY.LEFT, CONST.KEY.RIGHT].indexOf(e.keyCode) !== -1) {
            if(game.isStart()) {
                snake.changeDirection(e.keyCode);
                game.start(updateGameArea);
            } else if(game.isPlayed()) {
                snake.changeDirection(e.keyCode);
            }
        }
    });

    function updateGameArea() {
        if(!snake.move(canvas, board.getGrid())) {
            game.end();
        }
    }

})();