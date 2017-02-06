/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
    GRID_SIZE: 48,
    SNAKE_SIZE: 30,
    SNAKE_COLOR: "#FF0000",
    BOARD_COLOR: "#0099FF",
    UPDATE_TIME: 60,
    KEY: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        PAUSE_RESUME: 80
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const CONST = __webpack_require__(0);

module.exports = new Board();

function Board() {
    var board = this;

    board.grid = [];
    board.plain = [];
    for(var i = 0; i < CONST.GRID_SIZE; i++) {
        board.grid.push([]);
        for(var j = 0; j < CONST.GRID_SIZE; j++) {
            var grid = {x: i, y: j};
            board.grid[i].push(grid);
            board.plain.push(grid);
        }
    }

    board.getGrid = function() {
        return board.grid;
    };

    board.getPlain = function() {
        return board.plain;
    }

    board.draw = function(canvas){
        canvas.context.clearRect(0, 0, canvas.width, canvas.width);
        board.plain.forEach(function(grid){
            canvas.drawSquare(grid.x * canvas.gridWidth, grid.y * canvas.gridWidth, canvas.gridWidth, CONST.BOARD_COLOR);
        });
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const CONST = __webpack_require__(0);

module.exports = new Canvas();

function Canvas() {
    var canvas = this;

    canvas.context = document.getElementById('canvas').getContext('2d');

    canvas.init = function(draw) {
        var windowWidth = window.innerWidth - 20,
            windowHeight = window.innerHeight - 20;
            
        canvas.width = Math.min(windowHeight, windowWidth);
        canvas.gridWidth = canvas.width / CONST.GRID_SIZE;
        
        canvas.context.canvas.width = canvas.width;
        canvas.context.canvas.height = canvas.width;
        // translate canvas.context to bottom of canvas
        canvas.context.translate(0, canvas.width);
        // flip canvas.context horizontally
        canvas.context.scale(1, -1);
    };

    canvas.drawRectangle = function(x, y, width, height, fillColor) {
        if(fillColor) {
            canvas.context.fillStyle = fillColor;
            canvas.context.fillRect(x, y, width, height);
        } else {
            canvas.context.rect(x, y, width, height);
            canvas.context.stroke();
        }
    }

    canvas.drawSquare = function(x, y, length, fillColor) {
        canvas.drawRectangle(x, y, length, length, fillColor);
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const CONST = __webpack_require__(0);

module.exports = new Game();

function Game() {
    const START = 0, PLAY = 1, PAUSE = 2, END = 3;
    var game = this;
    game.state = START;

    game.isStart = function() {
        return game.state === START;
    };

    game.start = function(iterate) {
        game.state = PLAY;
        game.iterate = iterate;
        game.interval = setInterval(iterate, CONST.UPDATE_TIME);
    };

    game.pause = function() {
        game.state = PAUSE;
        clearInterval(game.interval);
    };

    game.isPlayed = function() {
        return game.state == PLAY;
    };

    game.resume = function() {
        game.state = PLAY;
        game.interval = setInterval(game.iterate, CONST.UPDATE_TIME);
    };

    game.pauseResume = function() {
        if(game.state === PAUSE) {
            game.resume();
        } else {
            game.pause();
        }
    };

    game.end = function(iterate) {
        game.state = END;
        clearInterval(game.interval);
    };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const CONST = __webpack_require__(0);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
    var canvas = __webpack_require__(2),
        board = __webpack_require__(1),
        snake = __webpack_require__(4),
        game = __webpack_require__(3);
        
    const CONST = __webpack_require__(0);

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

/***/ })
/******/ ]);