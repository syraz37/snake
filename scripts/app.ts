import Canvas = require("./canvas");
import Board = require("./board");
import Snake = require("./snake");
import Game = require("./game");
import CONST = require("./constants");

import swipe = require("./swipe");

import $ = require("jquery");
import io = require("socket.io-client");

require("../styles/style.scss");

(function() {

    var canvas = new Canvas();
    var game = new Game();
    var board: Board;
    var snake: Snake;
    var snake2: Snake;

    $('#play').on('click', function() {
        var socket: SocketIOClient.Socket = io.connect();
    });
    $('#restart').on('click', startGame);

    function startGame() {
        game.end();
        board = new Board();
        snake = new Snake();
        snake2 = new Snake();
        snake.create(board.getGrid(), 1);
        snake2.create(board.getGrid(), 2);
        drawCanvas();
    }

    
    document.body.addEventListener( "touchstart", function (event: Event) {
        event.preventDefault();
    });

    swipe(canvas.getElement(), function(event: TouchEvent, direction: string){
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

    function drawCanvas(): void {
        canvas.init();
        board.draw(canvas);
        snake.draw(canvas);
        snake2.draw(canvas);
    }

    window.addEventListener('resize', drawCanvas, false);

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
            if(game.isNotStarted() || game.isEnd()) {
                snake.changeDirection(direction);
                snake2.changeDirection(oppositeDirection(direction));
                game.start(updateGameArea);
            } else if(game.isStarted()) {
                snake.changeDirection(direction);
                snake2.changeDirection(oppositeDirection(direction));
            }
        }
    };

    function updateGameArea(): void {
        if(!snake.move(canvas, board.getGrid()) || !snake2.move(canvas, board.getGrid())) {
            game.end();
        }
    }

    function oppositeDirection(direction: string): string {
        switch (direction) {
            case CONST.DIRETION.UP:
                return CONST.DIRETION.DOWN;
            case CONST.DIRETION.DOWN:
                return CONST.DIRETION.UP;
            case CONST.DIRETION.LEFT:
                return CONST.DIRETION.RIGHT;
            case CONST.DIRETION.RIGHT:
                return CONST.DIRETION.LEFT;
            default:
                return direction;
        }
    }

})();