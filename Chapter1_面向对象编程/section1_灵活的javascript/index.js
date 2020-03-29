/**
 * 创建函数的两种方式 
 * 1. function fun(){}
 * 2. var fun = function(){}
 * 用对象来进行变量的收编 避免数据污染 对象的两种方式
 * 1. var obj = {
 *      fun:function(){} 
 *    }
 * 2. var funObj = function(){}; 函数可以理解为一个对象
 *    funObj.fun = function(){};
 * 以上创建的对象只有一个;
 * 1. function checkObj(){
 *      return {
 *          checkName:function(){}
 *      }
 *    }
 * 2. 类也可以
 *    function checkObj(){
 *      this.checkName = function(){}
 *    }
 */


 /**
  * demo1 实现为每个对象添加方法
  * 从祖先原型中抽象出一个统一添加method的方法。
  */
 Function.prototype.addmethod = function(name,fn){
    this[name] = fn;
    return this; //实现链式调用
 }
var obj = new Function();
obj.addmethod('fun',function(){
    console.log('fun');
});
obj.fun();


