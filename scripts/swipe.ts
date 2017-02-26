import CONST = require("./constants");

export = swipe;

function swipe(el, callback){
 
    var prevDirection,
        direction,
        startX,
        startY,
        distX,
        distY;

    const threshold = 3;
 
    el.addEventListener('touchmove', function(e){
        var touchobj = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
    }, false);

    el.addEventListener('touchmove', function(e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        if(Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
            direction = distX < 0 ? CONST.DIRETION.LEFT : CONST.DIRETION.RIGHT;
        } else if(Math.abs(distY) > Math.abs(distX) && Math.abs(distY) > threshold) {
            direction = distX < 0 ? CONST.DIRETION.UP : CONST.DIRETION.DOWN;
        }
        if(prevDirection != direction) {
            prevDirection = direction;
            callback(e, direction);
        }
        startX = touchobj.pageX;
        startY = touchobj.pageY;
    }, false);
};