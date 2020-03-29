/**
 * 最简单的webpack模块引导程序
 * webpack将所有的模块打包到一个文件里面，然后处理。
 * 浏览器与node加载本地模块的不同，是在于浏览器必须通过网络请求。
 */

(function(modules){
    var installedModules=[];
    function __webpack__require__(moduleId){
        if(installedModules[moduleId] && installedModules[moduleId].l){ //缓存优化
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            l:false,
            exports:{},
            i:moduleId
        }
        modules[moduleId].call(module.exports,module,module.exports,__webpack__require__);
        module.l = true;
        return module.exports;
    }
    return __webpack__require__(0);
})([
    //0
    (function(module,exports,__webpack__require__){
        var show = __webpack__require__(1);
        show('hello webpack');
    }),
    //1 
    (function(module,exports,__webpack__require__){
        var show = function(content){
            var app = document.getElementById('app');
            app.innerText = content;
        }
        module.exports = show;
    })
])