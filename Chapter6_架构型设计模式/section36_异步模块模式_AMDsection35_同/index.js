(function(F){
    var moduleCache = {};
    F.moudle = function(url,modDeps,modCallback){
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop();
        var deps = (args.length && args[args.length-1] instanceof Array) ? args.pop() : [];
        var url = args.length ? args.pop() : null;
        

        if(deps.length){
            var params = [];
            var depsCount = 0;
            var i = 0;
            while(i<deps.length){
                (function(i){
                    depsCount++;
                    loadModule(deps[i],function(mod){
                        params[i] = mod;
                        depsCount--;
                        if(depsCount === 0){
                            setModule(url,params,callback);
                        }
                    })
                })(i);
                i++;
            }
        }else{ //不存在模块依赖
            setModule(url,[],callback); 
        }
    }
    function loadModule(moduleName,callback){
        var _module; //依赖模块
        if(moduleCache[moduleName]){
            _module = moduleCache[moduleName];
            if(_module.status === 'loaded'){
                setTimeout(callback(_module.exports),0);  //模块加载完成 执行模块加载完成函数
            }else{
                _module.onload.push(callback); //缓存该模块所处文件加载完成回调函数
            }
        }else{ //模块第一次被依赖引用
            moduleCache[moduleName] = {
                moduleName:moduleName, //模块ID
                status:'loading',
                exports:null, //模块接口
                onload:[callback]  //模块对应文件加载完成回调函数缓冲器
            }
            loadScript(getUrl(moduleName));
        }
    }
    function setModule(moduleName,params,callback){
        var _module,fn;
        if(moduleCache[moduleName]){
            _module = moduleCache[moduleName];
            _module.status = 'loaded';
            _module.exports = callback ? callback.apply(_module,params) : null;
            while(fn = _module.onload.shift()){
                fn(_module.exports);
            }
        }else{ //模块不存在 直接执行构造函数
            callback && callback.apply(null,params);
        }
    }
        
    function getUrl(moduleName){
        return String(moduleName).replace(/\.js$/g,"")+".js";
    };
    function loadScript(src){
        var script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(script);
    };

})(function(){
    return window.F = {};
}())




F.moudle('lib/dom',function(){
    return {
        g:function(id){
            return document.getElementById(id);
        },
        html:function(id,html){
            if(html) this.g(id).innerHTML = html;
            else return this.g(id).innerHTML;
        }
    }
})
F.moudle('lib/event',['lib/dom'],function(dom){
    return {
        on:function(id,type,fn){
            dom.g(id)['on'+type] = fn;
        }
    }
})
//页面中直接引用 lib/dom lib/event模块
F.moudle(['lib/dom','lib/event'],function(dom,event){
    event.on('app','click',function(){
        dom.html('app','html');
    })
})
