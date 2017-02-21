import CONST = require("./constants");

export = new Snake();

function Snake() {
    var snake = this;
    snake.head = null;
    snake.tail = null;
    snake.direction = null;
    snake.nextDirection = [];

    snake.create = function(boardGrid) {
        // snake.head = boardGrid[1][1];
        // snake.tail = boardGrid[2][1];
        // snake.head.next = snake.tail;
        // snake.tail.prev = snake.head;
        
        for(var i = 0; i < CONST.SNAKE_SIZE; i++) {
            var grid = boardGrid[i][0];
            grid.prev = boardGrid[i+1][0];
            grid.direction = CONST.DIRETION.RIGHT;
            if(i) {
                grid.next = boardGrid[i - 1][0];
            }
        }
        snake.head = boardGrid[CONST.SNAKE_SIZE - 1][0];
        snake.head.prev = null;
        snake.tail = boardGrid[0][0];
    };

    snake.changeDirection = function(keyCode) {
        if(snake.nextDirection.length === 1 || (!snake.nextDirection.length && (
            (keyCode === CONST.KEY.UP && snake.direction != CONST.KEY.DOWN) ||
            (keyCode === CONST.KEY.DOWN && snake.direction != CONST.KEY.UP) ||
            (keyCode === CONST.KEY.LEFT && snake.direction != CONST.KEY.RIGHT) ||
            (keyCode === CONST.KEY.RIGHT && snake.direction != CONST.KEY.LEFT)
        ))) {
            snake.nextDirection.push(keyCode);
        }
    }
    
    snake.draw = function(canvas){
        var snakeParts = snake.head;
        while (snakeParts) {
            canvas.drawSquare(snakeParts.x * canvas.gridWidth, snakeParts.y * canvas.gridWidth, canvas.gridWidth, CONST.SNAKE_COLOR);
            snakeParts = snakeParts.next;
        }
    }
    
    snake.move = function(canvas, boardGrid) {
        var newHead,
            neck = snake.head;
        if(snake.nextDirection.length) {
            snake.direction = snake.nextDirection.shift();
        }
        switch (snake.direction) {
            case CONST.KEY.UP:
                newHead = boardGrid[snake.head.x][snake.head.y + 1];
                snake.head.direction = CONST.DIRETION.UP;
                break;
            case CONST.KEY.DOWN:
                newHead = boardGrid[snake.head.x][snake.head.y - 1];
                snake.head.direction = CONST.DIRETION.DOWN;
                break;
            case CONST.KEY.LEFT:
                newHead = boardGrid[snake.head.x - 1] ? boardGrid[snake.head.x - 1][snake.head.y] : undefined;
                snake.head.direction = CONST.DIRETION.LEFT;
                break;
            case CONST.KEY.RIGHT:
                newHead = boardGrid[snake.head.x + 1] ? boardGrid[snake.head.x + 1][snake.head.y] : undefined;
                snake.head.direction = CONST.DIRETION.RIGHT;
                break;
        }
        if(newHead && !snake.biteItself(newHead)) {
            newHead.direction = snake.head.direction;
            snake.head = newHead
            snake.head.next = neck;
            neck.prev = snake.head;
        } else {
            return false;
        }

        snake.animateMove(canvas);

        snake.tail = snake.tail.prev;
        snake.tail.next.prev = null;
        snake.tail.next = null;

        return true;
    }

    snake.animateMove = function(canvas) {
        var length = canvas.gridWidth,
            headMoveData = snake.generateMoveData(snake.head, length),
            tailMoveData = snake.generateMoveData(snake.tail, length);

        for(var i = 0, j = 0; i < CONST.FPM; i++) {
            setTimeout(function(){
                canvas.drawRectangle(headMoveData[j].x, headMoveData[j].y, headMoveData[j].length, headMoveData[j].height, CONST.SNAKE_COLOR);
                canvas.drawRectangle(tailMoveData[j].x, tailMoveData[j].y, tailMoveData[j].length, tailMoveData[j].height, CONST.BOARD_COLOR);
                j++;
            }, i * CONST.UPDATE_TIME / CONST.FPM);
        }

    }

    snake.generateMoveData = function(grid, length) {
        var moveData = [];

        switch (grid.direction) {
            case CONST.DIRETION.UP:
                for(var i = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: grid.x * length,
                        y: grid.y * length,
                        length: length,
                        height: i * length / CONST.FPM
                    });
                }
                break;
            case CONST.DIRETION.DOWN:
                for(var i = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: grid.x * length,
                        y: ((grid.y + 1) * length) - (i * length / CONST.FPM),
                        length: length,
                        height: i * length / CONST.FPM
                    });
                }
                break;
            case CONST.DIRETION.LEFT:
                for(var i = 1; i <= CONST.FPM; i++) {
                    moveData.push({
                        x: ((grid.x + 1) * length) - (i  * length / CONST.FPM),
                        y: grid.y * length,
                        length: i * length / CONST.FPM,
                        height: length
                    });
                }
                break;
            case CONST.DIRETION.RIGHT:
                for(var i = 1; i <= CONST.FPM; i++) {
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

    snake.biteItself = function(newHead) {
        var snakeParts = snake.head;
        while (snakeParts) {
            if(newHead === snakeParts) {
                return true;
            }
            snakeParts = snakeParts.next;
        }
        return false;
    }
}