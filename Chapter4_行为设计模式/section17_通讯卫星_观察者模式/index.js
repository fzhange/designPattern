/**
 * https://segmentfault.com/a/1190000020169229
 * 发布-订阅者模式
 * 消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）
 * “发布者”将 不同类别的消息 发送到 “事件中心”
 * “订阅者”可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。
 */

 class Event {
    __message = {};
    register(type,fn){
        if(!!this.__message[type]){
            this.__message[type].push(fn);
        }else{
            this.__message[type] = [fn];
        }
    }
    fire(type){
        var args = Array.prototype.slice.call(arguments,1);
        if(!!this.__message[type]){
            for(var i=0;i<this.__message[type].length;i++){
                this.__message[type][i].apply(this,args);
            }
        }
    }
    remove(type,fn){
        if(!!this.__message[type]){
            for(var i=0;i<this.__message[type].length;i++){
                if(this.__message[type][i] == fn){
                    this.__message[type].splice(i,1);
                    return;
                }
            }
        }
    }

 }



/**
 * Event 可以理解为事件中心，提供了订阅和发布功能。
 * 订阅者在订阅事件的时候，只关注事件本身，而不关心谁会发布这个事件；
 * 发布者在发布事件的时候，只关注事件本身，而不关心谁订阅了这个事件
 * 
 * 例子：订阅博客
 * 博主 博客平台 订阅者
 */
const event = new Event()
event.register('whatColor',function(name,color){
    console.log('who answer question',name);
    console.log('answer is ',color);
 })
event.fire('whatColor','zf','red');


/**
 * 观察者模式
 * 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，
 * 当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。
 * 
 * 观察者模式有完成整个流程需要两个角色：
 * 1目标对象
 * 2观察者
 */