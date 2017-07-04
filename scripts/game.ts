import CONST = require("./constants");
import Canvas from "./canvas";
import Connection from "./connection";
import Board from "./board";
import Snake from "./snake";
import AnimationInterval from "./animationInterval";

import $ = require("jquery");

enum GameState {
    NOT_STARTED,
    STARTED,
    PAUSED,
    OVER
}

/**
 * Game
 */
export default class Game {

    private canvas: Canvas;
    private connection: Connection;
    private state: GameState;
    private interval: AnimationInterval;
    private board: Board;
    private snake: Snake;
    private snake2: Snake;

    constructor() {
        this.state = GameState.NOT_STARTED;

        this.canvas = new Canvas();
        this.board = new Board();
        this.snake = new Snake();
        this.snake2 = new Snake();

        this.snake.create(this.board.getGrid(), 1);
        this.snake2.create(this.board.getGrid(), 2);
        this.snake.changeDirection(CONST.DIRETION.UP);
        this.snake2.changeDirection(CONST.DIRETION.DOWN);

        this.drawCanvas();
        
        $(this.canvas.getElement()).show();
        window.addEventListener('resize', this.drawCanvas, false);

        this.connection = new Connection();
        var game = this;
        this.connection.onStart(function(data) {
            console.log(data);
            game.start();
        });
        this.connection.onChangeDirection(function(data) {
            console.log(data);
            game.snake2.changeDirection(game.oppositeDirection(data.direction));
        });
    }

    public drawCanvas = (): void => {
        this.canvas.init();
        this.board.draw(this.canvas);
        this.snake.draw(this.canvas);
        this.snake2.draw(this.canvas);
    }

    public start(): void {
        this.state = GameState.STARTED;
        this.interval = new AnimationInterval(this.updateGameArea, CONST.UPDATE_TIME);
    };

    public pause(): void {
        this.state = GameState.PAUSED;
        this.interval.clearAnimationInterval();
    };

    public resume(): void {
        this.state = GameState.STARTED;
        this.interval = new AnimationInterval(this.updateGameArea, CONST.UPDATE_TIME);
    };

    public pauseResume(): void {
        if(this.state === GameState.PAUSED) {
            this.resume();
        } else {
            this.pause();
        }
    };

    public end(): void {
        this.state = GameState.OVER;
        this.interval.clearAnimationInterval();
    };

    public processInput(direction: string) {
        this.connection.changeDirection(direction);
        this.snake.changeDirection(direction);
    }

    private oppositeDirection(direction: string): string {
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

    public updateGameArea: Function = (): void => {
        if(!this.snake.move(this.canvas, this.board.getGrid()) || !this.snake2.move(this.canvas, this.board.getGrid())) {
            this.end();
        }
    }
}