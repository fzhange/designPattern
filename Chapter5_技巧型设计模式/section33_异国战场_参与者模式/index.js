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
   

   /**
    * bind 方法实现
    */
   if(Function.prototype.bind == undefined){
      Function.prototype.bind = function(context,...args){    
       // var args = Array.prototype.slice.call(arguments,1);
          var originFun = this;

          var fun = function(...innerArgs){
            // bind后的函数不丢失this
             if(this instanceof fun) originFun.apply(this,[...args,...innerArgs])
             else originFun.apply(context,[...args,...innerArgs])
          }
          fun.prototype = Object.create(originFun.prototype);
          return fun;
      }
  }
   // function fun(){};
   // let obj = {name:"Zf"}
   // let _fun = fun.bind(obj);
   // let c = new _fun();

   /**
   * call 方法实现
   * fun.call(obj,...arg)
   */
   Function.prototype.call = function(ctx){
      let arg = Array.from(arguments).slice(1);
      ctx[this.name] = this;
      const value = ctx[this.name](...arg);
      delete ctx[this.name];
      return value;
   }
   let obj = {name:"Zf"}

   function say(age){
      console.log('---',this.name,age);
   }

   say.call(obj,18)

   /** 
    * apply 
    * fn.apply(ctx,[arg]) 
    */
   Function.prototype.apply = function(ctx,arg){
      const symbol_pro = Symbol('symbol_pro');
      ctx[symbol_pro] = this;
      const value  = ctx[symbol_pro](...arg);
      delete ctx[symbol_pro];
      return value;
   }
   function say(age){
      console.log('---',this.name,age);
   }

   say.apply(obj,[18])
