/**
 * 业务应用程序依赖于外部程序的输出。
 * 当外部数据可用时，可以选用流的方式立刻将数据输出到客户端。
 */

let spawn = require("child_process").spawn;
const path = require('path');

// let echo = spawn('echo',['hello','world']);
// echo.on('error',function(error){
//     console.log('on_error: ', error);
// })
// echo.stdout.on('data',function(data){
//     console.log('stdout_data: ', data.toString('utf8'));
// })
// echo.stderr.on('data',function(data){
//     console.log('stderr_data: ', data);
// })
// echo.on('close',function(code){
//     console.log(`子进程退出，退出码 ${code}`);
// })
/** a error demo */
/**
 * echo 包含stdin stdout stderr 
 * stdin 是一个可写流   stdout stderr  可读流
 */
// let echo = spawn('ls',['no exist dir']);  
// echo.stdout.pipe(process.stdout);
// echo.stderr.pipe(process.stderr);

/**
 * 实现类似功能
 * cat spawn.test.text | sort  | uniq
 */
let cat = spawn('cat',[path.join(__dirname,"./spawn.test.text")]);  
let sort = spawn('sort');
let uniq = spawn('uniq');

/** good job */
cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);


/**
 * cat 的替代方案 使用readStream进行文件读取 然后做pipe
 */


/**
 * 背景知识：正常情况下，父进程终结的时候，所有的子进程都会终结。子进程是被认为附加到父进程上的。
 * 但spawn方法会做到分离一个子进程。使得子进程拥有和父进程一样的级别。即成为一个进程组的头。这种情况下即是父进程终结，子进程还是可以跑。
 */

 
