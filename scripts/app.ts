import Canvas = require("./canvas");
import Game = require("./game");
import CONST = require("./constants");

import swipe = require("./swipe");

import $ = require("jquery");
import io = require("socket.io-client");

require("../styles/style.scss");

(function() {

    var canvas = new Canvas();
    var game= new Game(canvas);
    var socket: SocketIOClient.Socket;

    $(canvas.getElement()).hide();

    $('#play').on('click', function() {
        socket = io.connect('http://45.62.243.184:3000/');
        $(canvas.getElement()).show();
        startGame();
    });

    $('#restart').on('click', startGame);

    function startGame() {
        game.init();
        game.drawCanvas();
    }

    window.addEventListener('resize', game.drawCanvas, false);
    
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
    });

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

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        processInput(event.keyCode);
    });

    function processInput(keyCode: number): void {
        socket.emit('move', keyCode);
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