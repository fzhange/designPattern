/**
 * 为一组复杂的子系统提供一个更高级的统一的外层接口。
 */

 function addEvent(dom,type,fn){
    if(dom.addEventListener){
        dom.addEventListener(type,fn); //默认是true 即捕获事件
    }else if(dom.attachEvent){
        dom.attachEvent(type,fn);
    }else{
        dom['on'+type] = fn;
    }
 }

 //绑定参数
 function g(id){
     return document.getElementById(id);
 }

 function click(name){
     console.log(name);
 }
 g('app').addEventListener('click',click.bind(g('app'),'zf'))
//  g('app').addEventListener('click',click);


// Function.prototype._bind=function(obj){
//     var that = this;
//     var _args = Array.prototype.slice(arguments,1);
//     return function(){
//         var args = Array.prototype.slice(arguments);
//         that.apply(obj,_args.concat(args));
//     }
// }
