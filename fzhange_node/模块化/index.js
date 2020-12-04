/**
 * webpack 模块化原理
 * https://juejin.im/post/6844904114183208968 干货:import和require如何在项目中混用
 * https://juejin.im/post/6844903520865386510 import、require、export、module.exports 混合使用详解
 * http://www.ruanyifeng.com/blog/2016/01/babel.html    [Babel 入门教程]
 * 
 * http://www.ruanyifeng.com/blog/2012/10/javascript_module.html  Javascript模块化编程（一）：模块的写法
 * http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html Javascript模块化编程（二）：AMD规范
 * http://www.ruanyifeng.com/blog/2012/11/require_js.html Javascript模块化编程（三）：require.js的用法
 */
/**
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
 * CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
 * CJS 同步加载  
 */

 /**
  * 模块化演进
  * 1、函数化  
  * 2、对象化  全局化对象中的数据容易被篡改
  * 3、IIFE  立即执行函数 
  * 4、commonjs
  * 5、amd
  * 6、cmd
  * 7、umd
  */

let module1 = (function(window,$){
  var data = 'data'; //利用闭包 是data变量私有化
  function getDate(){
    return data;
  }
  function setData(val){
    data = val;
  }
  return {
    getDate,setData
  }
})(window,JQuery)



(function(modules) {
    function __webpack_require__(moduleId) {
      var module =  {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      return module.exports;
    }
    return __webpack_require__(0);
  })([
    (function (module, __webpack_exports__, __webpack_require__) {
      // 引用 模块 1
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__c__ = __webpack_require__(1);
  
        /* harmony default export */ __webpack_exports__["default"] = ('a.js');
        console.log(__WEBPACK_IMPORTED_MODULE_0__c__["a" /* default */]);
    }),
    (function (module, __webpack_exports__, __webpack_require__) {
  
      // 输出本模块的数据
      "use strict";
      /* harmony default export */ __webpack_exports__["a"] = (333);
    })
  ]);




/**
 * node 模块化原理
 */

function Module(id){
    this.id = id;
    this.module = {}
}

Module._cache = {
    "/Users/zhangfan/fzhange_pro/designPattrn_1/fzhange_node/模块化/index.js":(function(module,exports,__filename,__dirname){
        exports.name = "fzhange";
    })
}