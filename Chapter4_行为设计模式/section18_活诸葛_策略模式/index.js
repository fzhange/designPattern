/**
 * 策略模式：将一组算法封装起来，使其可以相互替换，封装的算法具有一定的独立性，不会随客户端变化而变化。
 */

 /**
  * 全局单例 
  * 只有一个诸葛亮
  */
 var InputStrategy = function(){
    var strategy = {
        notNull:function(str){
            return /\s+/.test(str);
        },
        number:function(str){
            return /^[0-9]+(\.[0-9]+)?$/.test(str);
        },
        phone:function(){
            // \d == [0-9]
            return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(inputVal);
        }
    }
    return {
        checkFun:function(type,str){
            strategy[type](str);
        },
        addStrategy:function(type,fn){
            if(!strategy[type]) strategy[type] = fn;
        }
    }
 }()
