(function(modules){
   
    //存储chunk加载状态 0代表成功。启动程序的chunkId默认为1
    var installedChunks = {
        1:0, 
    };
    /**
     * 资源请求成功后会执行webpackJsonp回调函数
     * @chunkIds 异步加载文件中 存放的 需要安装模块 对应的chunkId
     */
    
    window["webpackJsonp"] = function webpackJsonpCallback(chunkIds,moreModules,executeModules){
        var resolves = [];
        var moduleId;
        //遍历chunks 存储chunk对应的加载状态
        for(var i =0;i<chunkIds.length;i++){
            chunkId = chunkIds[i];
			if(installedChunks[chunkId]) { //installedChunks[chunkId] == [resolve,reject]  加载中状态
				resolves.push(installedChunks[chunkId][0]);
            }
            installedChunks[chunkId] = 0; //标志该chunkId对应的资源已经加载过了
        }
        for(moduleId in moreModules){
			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				modules[moduleId] = moreModules[moduleId];
			}
        }
        while(resolves.length){
            console.log('resolves.length '+resolves.length);
            resolves.shift()(); //promise resolve;
        }

    }

    var installedModules = [];  //缓存module
    function __wepack__require__(moduleId){
        if(installedModules[moduleId] && installedModules[moduleId].l){
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            l:false,
            i:moduleId,
            exports:{},
        }
        modules[moduleId].call(module.exports,module,module.exports,__wepack__require__);
        module.l = true;
        return module.exports;
    }
    
    //webpack output 配置中 publicPath。一般为CDN域名
    __wepack__require__.p = "http://118.89.154.82:666/";

    //__wepack__require__的私有方法，进行异步chunk加载。  联想e==异 哈哈
    __wepack__require__.e = function(chunkId){
        //获取chunk加载状态
        var installedChunkData = installedChunks[chunkId];
        if(installedChunkData == 0){ //已经加载完成
            return new Promise(function(resolve,reject){
                resolve();
            })
        }
        if(installedChunkData){  //网络加载中 [reolve,reject,promise]
            //返回放在installedChunkData数组中的promise对象
            return installedChunkData[2];
        }
        //尚未加载，进行网络请求，做加载处理
        var promise = new Promise(function(resolve,reject){
            installedChunkData = installedChunks[chunkId] = [resolve,reject]; //加载中状态
        })
        installedChunkData[2] = promise; //应对加载中场景
        //installedChunkData.length == 3 
        
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.async = true;
        script.charset = "utf-8";
        script.timeout = 120000; //120s
        script.src = __wepack__require__.p + chunkId + ".bundle.js";
        script.onload = script.onerror = onScriptComplete;
        var timeout = setTimeout(onScriptComplete,120000);
        head.appendChild(script); //进行资源请求

        function onScriptComplete(){
            //防止内存泄漏
            script.onerror = script.onload = null;
            clearTimeout(timeout);

            var chunk = installedChunks[chunkId];
            if(chunk !=0){ //加载失败了 说明是onerror 或者 setTimeout调用的
                if(chunk){ //[resolve,reject]
                    chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));  
                }
                installedChunks[chunkId] = undefined;
            }
        }



        return promise;
    }

    //执行入口模块
    return __wepack__require__(0);
})([
    (function(module,exports,__wepack__require__){
        // __wepack__require__.e(0).then(
        //     __wepack__require__.bind(null,0)
        // ).then((show)=>{
        //     show('hello webpack');
        // })
        __wepack__require__.e(0).then(function(){
            console.log('--------');
        })
    }),
])