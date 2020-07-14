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
    var obj = _inheritObj(superClass.prototype);
    obj.constructor = subClass;
    subClass.prototype = obj;
}
function superClass(){}
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






/**
 * ES6 继承
 */
class SuperClass{
    constructor(superClassName='defaultName'){
        this.superClassName = superClassName;
        this.names = ['zf','cp'];
    }
    static getName(){
        console.log(this.names);
    }
    getSuperClassName(){
        return this.superClassName;
    }
}

class SubClass_1 extends SuperClass{
    constructor(superClassName){
       super(superClassName);
    }
}
class SubClass_2 extends SuperClass{}


const sub_1_ins = new SubClass_1('SuperClass_SubClass_1');
const sub_2_ins = new SubClass_2();

console.log('sub_1_ins.names.push', sub_1_ins.names.push('babyGirl'),sub_1_ins.getSuperClassName()); 
console.log('sub_1_ins.names',sub_1_ins.names); //['zf','cp','babyGirl'];
console.log('sub_2_ins.names',sub_2_ins.names); //['zf','cp'];
/**
 * 注意点
 *   1：super关键字当做function使用(这时候代表父类的构造函数)的时候必须放在constructor中；而且必须在constructor中执行一次；否则子类this对象 reference error;
 *   2：super对象当做obj使用的时候，在普通的方法中指向父类的prototype对象，但是此时父类方法内部this实例是指向子类的；在静态方法中，指向父类；
 */

 /**
  * 构造函数不需要显示的返回值。使用new来创建对象(调用构造函数)时，如果return的是非对象(数字、字符串、布尔类型等)会忽而略返回值;如果return的是对象，
  * 则返回该对象(注：若return null也会忽略返回值）。
  */
function Person(name) {
    this.name = name
    return {}
}
let p = new Person('Tom'); // {}

function Person(name) {
    this.name = name
    return name;
}
let p = new Person('Tom');  //{name: 'Tom'}






