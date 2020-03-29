/**
 * 单例模式：是只允许实例化一次的对象类。
 * 例如我们使用的jquery，单例模式就为其提供了一个命名空间JQuery.
 */
/**
 * demo1 
 * 利用单例模式创建静态变量（只能读取，不能修改）
 * 静态变量一般采用大写的方式
 */
var NUM = (function(){
    var conf = {
        MAX:100,
        MEDIU:50,
        MIN:0,
    }
    return {
        get:function(key){
            return conf[key] ? conf[key] : null;
        }
    }
})()