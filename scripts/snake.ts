import CONST = require("./constants");
import Canvas = require("./canvas");

export = Snake;

class Snake {
    
    private head: ISnake.Grid = null;
    private tail: ISnake.Grid = null;
    private direction: string;
    private nextDirection: Array<string> = [];

    public create(boardGrid: Array<Array<ISnake.Grid>>): void {
        // snake.head = boardGrid[1][1];
        // snake.tail = boardGrid[2][1];
        // snake.head.next = snake.tail;
        // snake.tail.prev = snake.head;
        
        for(let i: number = 0; i < CONST.SNAKE_SIZE; i++) {
            const grid = boardGrid[i][0];
            grid.prev = boardGrid[i+1][0];
            grid.direction = CONST.DIRETION.RIGHT;
            if(i) {
                grid.next = boardGrid[i - 1][0];
            }
        }
        this.head = boardGrid[CONST.SNAKE_SIZE - 1][0];
        this.head.prev = null;
        this.tail = boardGrid[0][0];
    };

    public changeDirection(keyCode: string): void {
        if(this.nextDirection.length === 1 || (!this.nextDirection.length && (
            (keyCode === CONST.DIRETION.UP && this.direction != CONST.DIRETION.DOWN) ||
            (keyCode === CONST.DIRETION.DOWN && this.direction != CONST.DIRETION.UP) ||
            (keyCode === CONST.DIRETION.LEFT && this.direction != CONST.DIRETION.RIGHT) ||
            (keyCode === CONST.DIRETION.RIGHT && this.direction != CONST.DIRETION.LEFT)
        ))) {
            this.nextDirection.push(keyCode);
        }
    }
    
    public draw(canvas: Canvas): void{
        let snakeParts = this.head;
        while (snakeParts) {
            canvas.drawSquare(snakeParts.x * canvas.gridWidth, snakeParts.y * canvas.gridWidth, canvas.gridWidth, CONST.SNAKE_COLOR);
            snakeParts = snakeParts.next;
        }
    }
    
    public move(canvas: Canvas, boardGrid: Array<Array<ISnake.Grid>>): boolean {
        let newHead: ISnake.Grid,
            neck: ISnake.Grid = this.head;
        if(this.nextDirection.length) {
            this.direction = this.nextDirection.shift();
        }
        switch (this.direction) {
            case CONST.DIRETION.UP:
                newHead = boardGrid[this.head.x][this.head.y + 1];
                this.head.direction = CONST.DIRETION.UP;
                break;
            case CONST.DIRETION.DOWN:
                newHead = boardGrid[this.head.x][this.head.y - 1];
                this.head.direction = CONST.DIRETION.DOWN;
                break;
            case CONST.DIRETION.LEFT:
                newHead = boardGrid[this.head.x - 1] ? boardGrid[this.head.x - 1][this.head.y] : undefined;
                this.head.direction = CONST.DIRETION.LEFT;
                break;
            case CONST.DIRETION.RIGHT:
                newHead = boardGrid[this.head.x + 1] ? boardGrid[this.head.x + 1][this.head.y] : undefined;
                this.head.direction = CONST.DIRETION.RIGHT;
                break;
        }
        if(newHead && !this.biteItself(newHead)) {
            newHead.direction = this.head.direction;
            this.head = newHead
            this.head.next = neck;
            neck.prev = this.head;
        } else {
            return false;
        }

        this.animateMove(canvas);

        this.tail = this.tail.prev;
        this.tail.next.prev = null;
        this.tail.next = null;

        return true;
    }

    public animateMove(canvas: Canvas): void {
        const length = canvas.gridWidth,
            headMoveData = this.generateMoveData(this.head, length),
            tailMoveData = this.generateMoveData(this.tail, length);

        for(let i: number = 0, j: number = 0; i < CONST.FPM; i++) {
            setTimeout(function(){
                canvas.drawRectangle(headMoveData[j].x, headMoveData[j].y, headMoveData[j].length, headMoveData[j].height, CONST.SNAKE_COLOR);
                canvas.drawRectangle(tailMoveData[j].x, tailMoveData[j].y, tailMoveData[j].length, tailMoveData[j].height, CONST.BOARD_COLOR);
                j++;
            }, i * CONST.UPDATE_TIME / CONST.FPM);
        }

    }

    public generateMoveData(grid: ISnake.Grid, length: number): Array<any> {
        var moveData: Array<any> = [];

        switch (grid.direction) {
            case CONST.DIRETION.UP:
                for(let i: number = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: grid.x * length,
                        y: grid.y * length,
                        length: length,
                        height: i * length / CONST.FPM
                    });
                }
                break;
            case CONST.DIRETION.DOWN:
                for(let i: number = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: grid.x * length,
                        y: ((grid.y + 1) * length) - (i * length / CONST.FPM),
                        length: length,
                        height: i * length / CONST.FPM
                    });
                }
                break;
            case CONST.DIRETION.LEFT:
                for(let i: number = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: ((grid.x + 1) * length) - (i  * length / CONST.FPM),
                        y: grid.y * length,
                        length: i * length / CONST.FPM,
                        height: length
                    });
                }
                break;
            case CONST.DIRETION.RIGHT:
                for(let i: number = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: grid.x * length,
                        y: grid.y * length,
                        length: i * length / CONST.FPM,
                        height: length
                    });
                }
                break;
        }
        return moveData;
    };

    public biteItself(newHead: ISnake.Grid): boolean {
        let snakeParts: ISnake.Grid = this.head;
        while (snakeParts) {
            if(newHead === snakeParts) {
                return true;
            }
            snakeParts = snakeParts.next;
        }
        return false;
    }
}