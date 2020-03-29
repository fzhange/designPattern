/**
 * 减少每次代码执行时候的重复性判断。
 * 通过对对象的重定义来屏蔽原对象中的分支判断。
 */
 //式1 引用即加载学习
 var addEvent = function(){
    if(document.addEventListener){
        return function(dom,type,fn,data){
            dom.addEventListener(type,function(e){
                fn.call(dom,e,data);                
            })
        }
    }
 }()
 //式2 
 var addEvent = function(dom,type,fn,data){
    if(dom.addEventListener){
        addEvent = function(dom,type,fn,data){
            dom.addEventListener(type,function(e){
                fn.call(dom,e,data);                
            })
        }
    }
    addEvent(dom,type,fn,data);
 }