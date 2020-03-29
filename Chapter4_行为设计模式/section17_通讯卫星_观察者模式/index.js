var Observer = (function(){ //初始化观察者全局单例对象
    var __message = {};
    return {
        register:function(type,fn){
            if(!!__message[type]){
                __message[type].push(fn);
            }else{
                __message[type] = [fn];
            }
        },
        fire:function(type){
            var args = Array.prototype.slice.call(arguments,1);
            if(!!__message[type]){
                for(var i=0;i<__message[type].length;i++){
                    __message[type][i].apply(this,args);
                }
            }
        },
        remove:function(type,fn){
            if(!!__message[type]){
                for(var i=0;i<__message[type].length;i++){
                    if(__message[type][i] == fn){
                        __message[type].splice(i,1);
                        return;
                    }
                }
            }
        }
    }
})();

/**
 * 简单测试
 */

 Observer.register('whatColor',function(name,color){
    console.log('who answer question',name);
    console.log('answer is ',color);
 })
 Observer.fire('whatColor','zf','red');