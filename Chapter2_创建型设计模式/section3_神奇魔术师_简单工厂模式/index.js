/**
 * 如果类太多 状态太多的话 那么提供一个魔术师吧
 */
var sportFactory = (function(name){
    var factoryObj = {
        basketBall: function(){
            //do something
        },
        soccerBall: function(){
            //do something
        },
        tennisBall:function(){
             //do something
        }
    }
    return function(type){
        return new factoryObj[type];
    }
})()

