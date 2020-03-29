/**
 * 通过在对象方法中返回改对象，实现对同一个对象的多个方法链式调用。
 */
/**
 * 仿效JQuery $('#app').click().
 */
function A(selector,context){
    //返回init方法的实例对象  
    // 1 重写init方法原型对象 
    // 2 使其变成A方法的原型对象 
    // 3 那么就与A除了构造方法外，其余部分完全一致了
    return new A.fn.init(selector,context);
}

window.onload = function(selector,context){
    A.fn = A.prototype = {
        constructor:A,
        length:-1,
        size:function(){
            return this.length;
        },
        init:function(selector,context){
            context = context || document;
            if(selector && selector.indexOf('#') != -1){
                this.length = 1;
                this[0] = document.getElementById(selector.slice(1));
            }else if(selector && selector.indexOf('.') != -1){
                var domArr = context.getElementsByClassName(selector.slice(1));
                this.length = domArr.length;
                for(var i=0;i<domArr.length;i++)  this[i] = domArr[i];
            }else if(!!selector){
                var domArr = context.getElementsByTagName(selector);
                this.length = domArr.length;
                for(var i=0;i<domArr.length;i++) this[i] = domArr[i];
            }
            return this;
        },
    }
    A.extend = A.fn.extend = function(){
        var i = 1,
            len = arguments.length,
            targetObj = arguments[0],
            key;
            if(i == len){
                targetObj = this;
                i--;
            }
            for( ;i<len;i++){
                for(key in arguments[i]){
                    targetObj[key] = arguments[i][key];
                }
            }
            return targetObj;
    }
    A.fn.init.prototype = A.prototype;
    // console.log(A.size);
    // console.log(A().size); 
    // console.log(A('#demo'));  
    // console.log(A('#test'));

    //---------------------
    //对象合并拓展
    var demo = A.extend({
        first:1
    },{
        second:2
    },{
        third:3
    })
    console.log(demo);
    
    //拓展A.fn 式1
    //向 A.fn 添加属性方法 实质上是对A.fn.init的原型对象属性的添加 
    //我们可以通过对其原型对象添加方法 但是要记得返回this对象，这样就可以实现链式调用。
    A.extend(A.fn,{
        version:'1.0'
    })
    console.log(A('#demo').version);
    //拓展A.fn 式2
    A.fn.extend({
        getVersion:function(){
            return this.version;
        }
    })
    console.log(A('#demo').getVersion())

    //拓展A 式1
    A.extend(A,{
        author:"zf"
    })
    console.log(A.author);
    //拓展A 式2 
    A.extend({
        nickname:"zf"
    })
    console.log(A.nickname);
    
}

