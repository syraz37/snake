import CONST = require("./constants");

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

    private state: GameState;
    private iterate: Function;
    private interval: number;

    constructor() {
        this.state = GameState.NOT_STARTED;
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
}