/**
 * 基类的构造函数中如果存在较为复杂的逻辑，当每次子类继承都创建一次父类的时候。这样对性能的消耗是比较大的。
 * 所以为了提供性能，我们采用共享模式，将复杂的逻辑放在基类的原型中。
 * 这是原型模式的雏形。
 * 
 * 原型模式就是将可复用的、共享的、耗时大的方法从基类的构造函数中提取出来、放在其原型中。
 * 然后子类通过类继承、组合式继承、寄生组合式继承。基类原型、然后对与需要重写的方法进行重写。
 */

 /**
  * 原型模式更多的是用来创造对象
  * 对于一个创建实例对象构造函数比较复杂，我们可以通过对这些对象属性或者方法来进行复制来实现创建。
  * 如果涉及多个对象，我们也可以通过原型模式来实现新对象的创建。
  */

  /**
   * demo1
   * 对于一个创建实例对象构造函数比较复杂，我们可以通过对这些对象属性或者方法来进行复制来实现创建。
   */

    function superClass() {
        //构造函数超级复杂
    }
    superClass.prototype.say = function(){
        console.log('i m say');
    }
    var subObj = superClass.prototype;
    console.log(subObj);

    /**
     * demo2 
     * 如果涉及多个对象，我们也可以通过原型模式来实现新对象的创建。
     */

    function prototypeExtend(){
        var args = Array.prototype.slice.call(arguments);
        var F =  function(){};
        for(var i=0;i<args.length;i++){
            var obj = args[i];
            for(var key in obj){
                F.prototype[key] = obj[key];
            }
        }
        return new F();
    }

    var cat = prototypeExtend({
        say:"miao miao miao",
    },{
        apperance:"grey"
    },{
        love:"meta"
    })
    console.log(cat);

