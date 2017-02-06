const CONST = require("./constants.js");

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