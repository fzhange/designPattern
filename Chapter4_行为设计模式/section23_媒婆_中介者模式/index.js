/**
 * 通过中介者对象封装一系列对象之间的交互，使对象之间不再相互引用，降低他们之间的耦合。
 * 
 * 观察者模式中 订阅者既可以是模块的订阅者也可以是模块的发布者;
 * 但是中介者模式中订阅者只能是订阅者，不会是发布者。（找对象的人自己不能给自己发布对象）
 */
var Mediator = function(){
    var __message = {};
    return {
        register:function(type,fn){
            if(!__message[type]) __message[type] = [fn];
            else{
                __message[type].push(fn);
            }
        },
        send(type){
            var args = Array.prototype.slice.call(arguments,1);
            if(!!__message[type]){
                for(var i=0;i<__message[type].length;i++){
                    console.log(args);
                    __message[type][i].apply(this,args);
                }
            }   
        }

    }
}()

Mediator.register('call',function(whoSource,whotarget){
    console.log(whoSource);
    console.log(whotarget);
})
Mediator.send('call','zf','cp');
