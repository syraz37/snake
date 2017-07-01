import CONST = require("./constants");
import Canvas from "./canvas";

export default class Board {

    private grid: Array<Array<ISnake.Grid>>;
    private plain: Array<ISnake.Grid>;


    constructor() {
        this.grid = [];
        this.plain = [];
        for(let i: number = 0; i < CONST.GRID_SIZE; i++) {
            this.grid.push([]);
            for(let j: number = 0; j < CONST.GRID_SIZE; j++) {
                let grid: ISnake.Grid = {x: i, y: j};
                this.grid[i].push(grid);
                this.plain.push(grid);
            }
        }
    }


    public getGrid(): Array<Array<ISnake.Grid>> {
        return this.grid;
    };

    public getPlain(): Array<ISnake.Grid> {
        return this.plain;
    }

    public draw(canvas: Canvas){
        canvas.clear();
        this.plain.forEach(function(grid: ISnake.Grid){
            canvas.drawSquare(grid.x * canvas.gridWidth, grid.y * canvas.gridWidth, canvas.gridWidth, CONST.BOARD_COLOR);
        });
    }
}