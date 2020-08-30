/**
 * nodejs 异常处理
 */
/**
 * 1 callback
 */
/**
 * 2 try catch 
 * try catch 只能捕获同步错误
 * 
 */
try{
    undefine 
}catch(error){
    console.error('error: ', error);
  
}finally{
    process.stdin.on('data',function(data){
        process.stdout.write(`data: ${data.toString()}`)
    })
}

/**
 * uncaughtException 
 * 如果打算使用 'uncaughtException' 事件作为异常处理的最后补救机制，这是非常粗糙的设计方式。
 * 不建议
 */

// process.on('uncaughtException', (err, origin) => {
//     console.log('err: ', err);
//     console.log('origin: ', origin);
//   });
//   process.stdin.on('data',function(data){
//     process.stdout.write(`data: ${data.toString()}`)
// })
// h
// console.log('这里不会运行');

/**
 * event.eventEmitter on error事件
 * EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。
    当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
    我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如：
 */
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.emit('error'); 


/**
 * 利用js中的Error构造函数
 */


/**
 * express中的err处理
 */
