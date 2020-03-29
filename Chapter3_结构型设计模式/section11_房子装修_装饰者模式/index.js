/**
 * 在不改变原有对象的基础上，对其进行包装拓展（添加属性、方法）是原有对象能够满足用户更复杂的需求
 */
/**
 * demo1
 */
    function decorator(inputId,fn){
        var input = document.getElementById(inputId);
        var oldfn = null;
        if(typeof input.onclick == 'function') oldfn = input.onclick;
        input.onclick = function(){
            oldfn();
            fn();
        }
    }