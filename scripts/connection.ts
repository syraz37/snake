import CONST = require("./constants");

import io = require("socket.io-client");

export default class Connection {

    private socket;

    constructor() {
        this.socket = io.connect();
    }
    
    public onJoin(callback: Function) {
        this.socket.on('join', function(data) {
            callback(data);
        });
    }  
    
    public onStart(callback: Function) {
        this.socket.on('start', function(data) {
            callback(data);
        });
    }  
    
    public onChangeDirection(callback: Function) {
        this.socket.on('changeDirection', function(data) {
            callback(data);
        });
    }  

    public changeDirection(direction: string) {
        this.socket.emit('changeDirection', {direction: direction});
    }
      
}