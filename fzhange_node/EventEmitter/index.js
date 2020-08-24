const util = require('util');
const event = require('events');

class Music extends event.EventEmitter{

}
let mu = new Music();

mu.on('newListener',function(name,listener){
    console.log('name,listener: ', name,listener);
})
mu.on('play',function(){
    console.log('mmmmmmmmm');
})
mu.on('error',function(error){
    console.log('mmmmmmmmm',error);
})


console.log('mu.listeners(play): ', mu.getMaxListeners());
mu.emit('error','xxx');