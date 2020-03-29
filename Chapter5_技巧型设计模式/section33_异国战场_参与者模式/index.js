/**
 * 在特定作用域中执行给定函数，并将参数原封不动传递。
 */
    // var bind = function(fn,obj){
    //     return function(){
    //         fn.apply(obj,arguments);
    //     }
    // }
    //升级版 可以携带参数    
    // var bind = function(fn,obj){
    //     var fnParam = [].slice.call(arguments,2);
    //     return function(){
    //         var finalArgs = [].slice.call(arguments).concat(fnParam);
    //         fn.apply(obj,finalArgs);
    //     }
    // }

    // // var demoObj = {
    // //     demo:"demo"
    // // }
    // // var demoFn = function(){
    // //     console.log(this.demo);
    // // }
    // // var bindFn = bind(demoFn,demoObj);
    // // bindFn();

    // //------------------------------------------
    // var $ = {
    //     g:function(id){
    //         return document.getElementById(id);
    //     }
    // }

    // function divFn(){
    //     console.log(arguments,this);
    // }
    // var bindDiv = bind(divFn,$.g('div'),{
    //     demo:"demo"
    // });
    // div.addEventListener('click',bindDiv);

    // //原生bind用法
    // // var bindDiv = divFn.bind(div)

    // //函数柯里化 start
   // function curry(fn,...arg){
   //    console.log(fn.length , arg.length);
   //    if(fn.length <= arg.length){
   //       fn(...arg);
   //    }
   //    return function(...arg1){
   //       return curry(fn,...arg,...arg1);
   //    }
   // }
   // function add(a,b,c){
   //    console.log('a+b+c: ', a+b+c);
   // }
   // add(1,2,3) //6
   // let curryAdd = curry(add);
   // curryAdd(1)(2)(3); //6

   // function curry(originFun){
   //    let arg = Array.from(arguments).slice(1);
   //    function fun(){
   //      let _arg = Array.from(arguments);
   //      arg = arg.concat(_arg);
   //      if(originFun.length <= arg.length){
   //        originFun.apply(null,arg);
   //      }else{
   //        return fun;
   //      }
   //    }
   //    return fun;
   //  }
   
    // //函数柯里化 end


    // // 原型添加 超级赞
   //  if(Function.prototype.bind == undefined){
   //      Function.prototype.bind = function(context){    
   //          var args = Array.prototype.slice.call(arguments,1);
   //          var that = this;

   //          var fun = function(){
   //             if(this instanceof fun) this.apply(context,Array.prototype.slice.call(arguments))
   //             else that.apply(context,Array.prototype.slice.call(arguments).concat(args))
   //          }
   //          fun.prototype = Object.create(that.prototype);
   //          return fun;
   //      }
   //  }

    // var $ = {
    //     g: function (id) {
    //         return document.getElementById(id);
    //     }
    // }
    // function divFn() {
    //     console.log(arguments, this);
    // }
    // var x = divFn.bind($.g('div'), {
    //     demo2: "demo2"
    // })
    // $.g('div').addEventListener('click', x);
   