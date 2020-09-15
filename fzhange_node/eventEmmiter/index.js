let EventEmitter = require('events').EventEmitter;

class MusicePlayer extends EventEmitter{
    constructor(){
    }
}
let e =  MusicePlayer.events = {
    play:"play",
    pause:"pause",
}  
let music = new Music();
music.on(e.play,function(){

})

/**
 * 有几种eventEmmiter的替代方案 
 * 发布订阅 AMQP 和 js-signals 
 */