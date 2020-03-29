/**
 * 组合模式又称 部分-整体模式，将对象组合成树形结构以表示“部分整体”的层次结构
 */

 function inherit(subClass,superClass){
    function _inherit(obj){
        var F = function(){};
        F.prototype = obj;
        return new F();
    }
    var obj;
    obj = _inherit(superClass.prototype);
    obj.constructor = subClass;
    subClass.prototype = obj;
 }

 /**
  * 抽象类实现
  */

class News{
    constructor(){
        this.element = null;
        this.children = [];
    }
    init(){
        throw new Error('请重写该方法');
    }
    add(){
        throw new Error('请重写该方法');
    }
    getEle(){
        throw new Error('请重写该方法');
    }
}
/**
 * 容器类实现
 */
class Container extends News{
    constructor(parentConId="app"){
        super();
        this.parentConId = parentConId;
        this.init();
    }
    init(){
        this.element = document.createElement('ul');
    }
    add(ele){
        this.element.appendChild(ele);
        this.children.push(ele);
        return this;
    }
    getEle(){
        return this.element;
    }
    show(){
        document.getElementById(this.parentConId).appendChild(this.element);
    }
}

/**
 * 简单新闻类
 */
class EasyNew extends News{
    constructor(text){
        super();
        this.text = text;
        this.init();
    }
    init(){
        this.element = document.createElement('li');
        this.element.innerHTML = this.text;
    }
    add(){}
    getEle(){
        return this.element;
    }
}
/**
 * 
 */

 var con = new Container();
con.add(
    new EasyNew('1').getEle()
).add(
    new EasyNew('2').getEle()
).show();

