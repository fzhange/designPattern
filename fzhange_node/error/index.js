/**
 * 1 显示异常
 * throw 方法只能用在同步方法中。
 * try catch 只能捕获同步错误
 */
function formatName(name){
    if(!name) throw new Error('name is required'); 
}
try{
    formatName();
}catch(err){
    console.log(err.message,err.stack); //! 记录错误堆栈
}

/**
 * 2. 隐式的异常
 * try catch 只能捕获同步错误
 */
function hidedError(err,data){
    try{
        data = dat;
    }catch(error){
        console.log(error.message,error.stack);
    }
}
hidedError();

/**
 * 3. 错误事件
 * 这种错误很难调试，所以一定要做错误监听。
 * 如果error事件没有对应的处理函数，node则会爆出未处理异常.
 * 如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
 */
let EventEmitter = require('events').EventEmitter;
let ee = new EventEmitter();
ee.emit('error',new Error('no handle to catch me'));

/**
 *  4
 * 错误参数
 * callback(err,data)
 */
function handleError(err){
    console.error(err.message,err.stack);
}

let fs = require('fs');
fs.readFile('../file/index.js',function(err,data){
    if(err) return handleError(err);
    console.log('data: ', data);
})

 /**
  * 5 未捕获的异常
  * 如果一个未捕获异常抛出时，未被处理，node会终止进程的执行。
  * 但是，如果错误被捕获了，你强制让其运行，也许可能造成内存泄漏，使得应用程序及其不稳定。
  */
 process.on('uncaughtException',function(error){
    console.error(error);
    setTimeout(process.exit,1000,1)
 })



 /**
 * 前端错误类型
 * ? 1.同步错误 通过try catch 进行错误捕获  pass
 * ? 2.异步错误        pass
 * ? 3.网络错误        fail   sentry不能主动进行网络错误的捕获 需要通过代码hack的方式进行处理
 * 
 * node 错误类型
 * ? 1. 同步错误  try catch   pass
 * ? 2. 异步错误  callback   eventEmitter error事件监听     pass
 * 
 * 服务端错误捕获
 * ? 1. next 服务端组件渲染错误捕获
 * ? 2. express 错误捕获
 * 
 * 开发手动异常上报
 * ? 开发在业务代码中进行catch捕获 按需进行异常上报
 */