import CONST = require("./constants");

export = swipe;

function swipe(el: HTMLCanvasElement, callback: Function): void{
    
    let prevDirection: string,
        direction: string,
        startX: number,
        startY: number,
        distX: number,
        distY: number;

    const threshold = 3;
 
    el.addEventListener('touchstart', function(e: TouchEvent){
        const touchobj: Touch = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
    }, false);

    el.addEventListener('touchmove', function(e: TouchEvent) {
        const touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        if(Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
            direction = distX < 0 ? CONST.DIRETION.LEFT : CONST.DIRETION.RIGHT;
        } else if(Math.abs(distY) > Math.abs(distX) && Math.abs(distY) > threshold) {
            direction = distY < 0 ? CONST.DIRETION.UP : CONST.DIRETION.DOWN;
        }
        if(prevDirection != direction) {
            prevDirection = direction;
            callback(e, direction);
        }
        startX = touchobj.pageX;
        startY = touchobj.pageY;
    }, false);
};