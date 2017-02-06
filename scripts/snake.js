const CONST = require("./constants.js");

module.exports = new Snake();

function Snake() {
    snake = this;
    snake.head = null;
    snake.tail = null;
    snake.direction = null;
    snake.nextDirection = null;

    snake.create = function(boardGrid) {
        // snake.head = boardGrid[1][1];
        // snake.tail = boardGrid[2][1];
        // snake.head.next = snake.tail;
        // snake.tail.prev = snake.head;
        
        for(var i = 0; i < CONST.SNAKE_SIZE; i++) {
            var grid = boardGrid[i][0];
            grid.prev = boardGrid[i+1][0];
            if(i) {
                grid.next = boardGrid[i - 1][0];
            }
        }
        snake.head = boardGrid[CONST.SNAKE_SIZE - 1][0];
        snake.head.prev = null;
        snake.tail = boardGrid[0][0];
    };

    snake.changeDirection = function(keyCode) {
        if(keyCode === CONST.KEY.UP && snake.direction != CONST.KEY.DOWN) {
            snake.nextDirection = CONST.KEY.UP;
        } else if(keyCode === CONST.KEY.DOWN && snake.direction != CONST.KEY.UP) {
            snake.nextDirection = CONST.KEY.DOWN;
        } else if(keyCode === CONST.KEY.LEFT && snake.direction != CONST.KEY.RIGHT) {
            snake.nextDirection = CONST.KEY.LEFT;
        } else if(keyCode === CONST.KEY.RIGHT && snake.direction != CONST.KEY.LEFT) {
            snake.nextDirection = CONST.KEY.RIGHT;
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
        if(snake.nextDirection) {
            snake.direction = snake.nextDirection;
            snake.nextDirection = null;
        }
        switch (snake.direction) {
            case CONST.KEY.UP:
                newHead = boardGrid[snake.head.x][snake.head.y + 1];
                break;
            case CONST.KEY.DOWN:
                newHead = boardGrid[snake.head.x][snake.head.y - 1];
                break;
            case CONST.KEY.LEFT:
                newHead = boardGrid[snake.head.x - 1] ? boardGrid[snake.head.x - 1][snake.head.y] : undefined;
                break;
            case CONST.KEY.RIGHT:
                newHead = boardGrid[snake.head.x + 1] ? boardGrid[snake.head.x + 1][snake.head.y] : undefined;
                break;
        }
        if(newHead && !snake.biteItself(newHead)) {
            snake.head = newHead
            snake.head.next = neck;
            neck.prev = snake.head;
        } else {
            return; false
        }

        canvas.drawSquare(snake.head.x * canvas.gridWidth, snake.head.y * canvas.gridWidth, canvas.gridWidth, CONST.SNAKE_COLOR);
        canvas.drawSquare(snake.tail.x * canvas.gridWidth, snake.tail.y * canvas.gridWidth, canvas.gridWidth, CONST.BOARD_COLOR);

        snake.tail = snake.tail.prev;
        snake.tail.next.prev = null;
        snake.tail.next = null;

        return true;
    }

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