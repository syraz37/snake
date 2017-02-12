import CONST = require("./constants");

export = new Canvas();

function Canvas() {
    var canvas = this;

    var canvasElement = <HTMLCanvasElement> document.getElementById("canvas");
    canvas.context = canvasElement.getContext('2d');

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