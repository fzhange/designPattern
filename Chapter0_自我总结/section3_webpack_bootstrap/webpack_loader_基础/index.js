/**
 * webpack是运行在node之上的，一个loader其实就是一个Node.js模块，这个模块需要导出一个函数。
 * 这个导出的函数的工作就是获取处理前的原内容，对原内容执行处理后，返回处理后的内容。
 * 
 * 
 * 由于Loader运行在nodeJs中 所以我们可以调用任意NodeJs自带的API，或者安装第三方模块进行调用。
 * webpack提供了一些额外的API提供给loader进行调用。
 */


const loaderUtils =require('loader-utils');   //获取loader用户配置的option
module.exports = function(source){
	return source;
}