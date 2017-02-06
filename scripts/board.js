const CONST = require("./constants.js");

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