import CONST = require("./constants");
import Canvas = require("./canvas");
import Board = require("./board");
import Snake = require("./snake");

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
    private state: GameState;
    private iterate: Function;
    private interval: number;
    private board: Board;
    private snake: Snake;
    private snake2: Snake;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.state = GameState.NOT_STARTED;
    }

    public init(): void {
        if(this.interval) {
            this.end();
        }
        this.board = new Board();
        this.snake = new Snake();
        this.snake2 = new Snake();
        this.snake.create(this.board.getGrid(), 1);
        this.snake2.create(this.board.getGrid(), 2);
    }

    public drawCanvas = (): void => {
        this.canvas.init();
        this.board.draw(this.canvas);
        this.snake.draw(this.canvas);
        this.snake2.draw(this.canvas);
    }

    public start(iterate: Function): void {
        this.state = GameState.STARTED;
        this.iterate = iterate;
        this.interval = setInterval(iterate, CONST.UPDATE_TIME);
    };

    public pause(): void {
        this.state = GameState.PAUSED;
        clearInterval(this.interval);
    };

    public resume(): void {
        this.state = GameState.STARTED;
        this.interval = setInterval(this.iterate, CONST.UPDATE_TIME);
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
        clearInterval(this.interval);
    };

    public isNotStarted(): boolean {
        return this.state === GameState.NOT_STARTED;
    };

    public isStarted(): boolean {
        return this.state == GameState.STARTED;
    };

    public isEnd(): boolean {
        return this.state == GameState.OVER;
    };

    public processInput(direction: string) {
        if(this.isNotStarted() || this.isEnd()) {
            this.snake.changeDirection(direction);
            this.snake2.changeDirection(this.oppositeDirection(direction));
            this.start(this.updateGameArea);
        } else if(this.isStarted()) {
            this.snake.changeDirection(direction);
            this.snake2.changeDirection(this.oppositeDirection(direction));
        }
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