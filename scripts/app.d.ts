declare namespace ISnake {
    export interface Grid {
        x: number;
        y: number;
        prev?: Grid;
        next?: Grid;
        direction?: string;
    }
}