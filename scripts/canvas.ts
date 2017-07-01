import CONST = require("./constants");

export default class Canvas {

    private element: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    public width: number;
    public gridWidth: number;

    constructor() {
        this.element = <HTMLCanvasElement> document.getElementById("canvas");
        this.context = this.element.getContext('2d');
    }

    public init():void {
        let windowWidth: number = window.innerWidth - 10,
            windowHeight: number = window.innerHeight - 10;
            
        this.width = Math.min(windowHeight, windowWidth);
        this.width = this.width - (this.width % CONST.GRID_SIZE);
        this.gridWidth = this.width / CONST.GRID_SIZE;
        
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.width;
        // translate canvas.context to bottom of canvas
        this.context.translate(0, this.width);
        // flip canvas.context horizontally
        this.context.scale(1, -1);
    };

    public getElement(): HTMLCanvasElement {
        return this.element;
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.width, this.width);
    }

    public drawRectangle(x: number, y: number, width: number, height: number, fillColor: string): void {
        if(fillColor) {
            this.context.fillStyle = fillColor;
            this.context.fillRect(x, y, width, height);
        } else {
            this.context.rect(x, y, width, height);
            this.context.stroke();
        }
    }

    public drawSquare(x: number, y: number, length: number, fillColor: string): void {
        this.drawRectangle(x, y, length, length, fillColor);
    }
}