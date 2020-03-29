/**
 * function Books(id){
 *  var num = 1; 私有属性
 *  var checkId = (){} 私有方法
 *  this.getNum(){  特权方法
 *      return num; 
 *  }
 *  this.id = id; 对象共有属性
 *  this.copy = function(){} 对象共有方法
 * }
 * Books.isChinese = true; 静态公有
 */
/**
 * demo1 闭包:你们看不见我
 */
var Book = (function(){
    var bookNum = 0; //静态私有
    function checkBook(name){}; //静态私有
    return function(newId,newName,newPrice){
        var name='zf',price; //私有属性
        function checkId(){}  //私有方法
        function getName(){ //特权方法
            return name;
        }
        this.id = newId; //公有属性
        this.copy = function(){} //公有方法   
    }
})()
/**
 * demo2 检查长  创建对象的安全模式
 */
function Person(name,sex){  
    if(this instanceof Person){
        this.name = name;
        this.sex = sex;
    }else{
        return new Person(name,sex);
    }
}
console.log('demo2 检查长',Person('zf','man').name); 
/**
 * demo3 类继承
 * 弊端1 父类的数据共享
 * 弊端2 无法向父类传参
 * 基于原型的继承、是对原型数据的共享,而不是复制。
 */
function Super_1(){
    this.superVal = 'superVal';
}
Super_1.prototype.getSuperVal = function(){
    return this.superVal;
}
function Sub_1(){
    this.subVal = 'subVal';
}
Sub_1.prototype = new Super_1();
Sub_1.prototype.getSubVal = function(){
    return this.subVal;
}
console.log('demo3 类继承 getSuperVal',new Sub_1().getSuperVal());
console.log('demo3 类继承 getSubVal',new Sub_1().getSubVal());

/**
 * demo4 构造函数继承
 * 创建实例时可以传递参数。但是不能继承父类原型方法属性
 */
function Super_2(name){
    this.superVal = 'superVal';
    this.name = name;
}
Super_2.prototype.getSuperVal = function(){
    return this.superVal;
}
function Sub_2(name){
    this.subVal = 'subVal';
    Super_2.call(this,name);
}
/**
 * demo5 组合集成
 * 弊端构造函数被执行两次
 */
function Super_3(name){
    this.superVal = 'superVal';
    this.name = name;
}
Super_3.prototype.getSuperVal = function(){
    return this.superVal;
}
function Sub_3(name){
    this.subVal = 'subVal';
    Super_3.call(this,name);
}
Sub_3.prototype = new Super_3();
/**
 * demo6 原型式继承
 */
function inheritObj(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
}
var book = {
    name:"java 设计模式"
}
var bookObj = inheritObj(book);

/**
 * demo7 寄生式继承
 */
var movie = {
    type:"love",
    name:"她说",
}
function createMovie(obj){
    var o = inheritObj(obj);
    o.getType = function(){
        return this.type;
    }
    return o;
}
console.log(createMovie(movie));
/**
 * demo8 寄生组合式继承
 */
function inherit(subClass,superClass){
    function _inheritObj(obj){
        var F = function(){};
        F.prototype = obj;
        return new F();
    }
    var obj = null;
    obj = _inheritObj(superClass.prototype);
    obj.constructor = subClass;
    subClass.prototype = obj;
}
function superClass(){

}
function subClass(){
    superClass.call(this);
}
inherit(subClass,superClass);
new subClass();

/**
 * demo9 多继承
 */
function clone(){
    var args = Array.prototype.slice.call(arguments);
    for(var i=0;i<args.length;i++){
        var obj = args[i]
        for(var key in obj){
            if(typeof obj[key] == 'object'){
                this[key] = {}
                clone.call(this[key],obj[key]);
            }else{
                this[key] = obj[key];
            }
        }
    }
}
var soruce = {
    soruce:"soruce",
}
var target_1 = {
    target_1:'target_1'
}
var target_2 = {
    target_2:'target_2',
    obj:{
        name:"zf",
        obj:{
            name:"cp"
        }
    }
}
clone.apply(soruce,[target_1,target_2]);
console.log('demo9 多继承',soruce);












