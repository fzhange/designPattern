/**
 * 对多个异步进程进行监听，来触发未来发生的动作
 */
var Waiter = function(){
    var dfd = []; //等待对象容器
    var doneArr = []; //成功回调方法容器
    var failArr = [];
    var slice = Array.prototype.slice;
    var that = this;
    var Primise = function(){
        this.resolved = false;
        this.rejected = false;
    }
    Primise.prototype = {
        resolve:function(){ 
            this.resolved = true;
            if(!dfd.length) return;
            for(var i=dfd.length-1;i>=0;i--){
                if(dfd[i] && !dfd[i].resolved || dfd[i].rejected)  return;
                dfd.splice(i,1); //清除监控对象
            }
            _exec(doneArr);
        },
        reject:function(){
            this.rejected = true;
            if(!dfd.length) return;
            dfd.splice(0);
            _exec(failArr);
        }
    }
    that.Deferred = function(){
        return new Primise();
    }
    function _exec(arr){
        for(var i=0;i<arr.length;i++){
            try{
                arr[i] && arr[i]();
            }catch(e){
                console.error(e);
            }
        }
    };
    that.when = function(){
        dfd = slice.call(arguments);
        var i = dfd.length;
        for(--i;i>=0;i--){
            if(!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise){
                dfd.splice(i,1);
            }
        }
        return that;
    }
    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    }
    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments));
        return that;
    }
}

var waiter = new Waiter();
var first = function(){
    var dtd = waiter.Deferred();
    setTimeout(function(){
       console.log('first');
       dtd.resolve(); 
    },3000)
    return dtd;
}();
var second = function(){
    var dtd = waiter.Deferred();
    setTimeout(function(){
        console.log('second');
        dtd.resolve();
    },6000)
    return dtd;
}();
waiter.when(first,second).done(function(){
    console.log('done');
}).fail(function(){
    console.log('fail');
})
