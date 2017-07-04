export default class AnimationInterval {

    private start: number;
    private stop: boolean;
    private intervalID: number;
    private callback: Function;
    private interval: number;


    constructor(callback: Function, interval: number) {
        this.callback = callback;
        this.interval = interval;
	    this.intervalID = processAnimation(this);
    }

    public step(timestamp: number) {
        if(this.stop) {
            return;
        } else if (!this.start) {
            this.start = timestamp;
        }
        
        if (timestamp - this.start < this.interval) {
            this.intervalID = processAnimation(this);
        } else {
            this.callback();
            this.start = null;
            this.intervalID = processAnimation(this);
        }
    }
    
    public clearAnimationInterval() {
        window.cancelAnimationFrame(this.intervalID);
        this.stop = true;
    }
}

function processAnimation(animationInterval: AnimationInterval): number {
    return window.requestAnimationFrame(function(timestamp: number) {
        animationInterval.step.call(animationInterval, timestamp);
    });
}