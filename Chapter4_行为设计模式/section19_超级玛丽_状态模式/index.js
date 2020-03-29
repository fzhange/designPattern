/**
 * 当一个对象的内部状态发生变化时，会导致其行为的改变。
 */
var Marry = function(){
    var nowState = [];
    var state = {
        jump:function(){
            console.log('jump');
        },
        shoot:function(){
            console.log('shoot');
        },
        speed:function(){
            console.log('speed');
        },
        squat:function(){
            console.log('squat');
        }
    }
    return {
        changeState:function(){
            var args = Array.prototype.slice.call(arguments);
            nowState = args
            return this;
        },
        goes:function(){
            nowState.forEach(function(item){
                state[item] && state[item]();
            })
            return this;
        }
    }
}

Marry().
    changeState('jump')
    .goes()
    .changeState('shoot','squat')
    .goes();
    