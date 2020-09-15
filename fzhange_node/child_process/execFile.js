/**
 * execFile 只关心外部程序执行是否成功。 
 * 
 * 错误类型：
 * ENOENT 调用外部程序不存在错误。
 * EACCES EPREM 执行应用权限不足。
 */
const {execFile} = require('child_process');

execFile('echo',['hello','world'],function(stdin,stdout,stderr){
    console.log('stderr: ', stderr); //''
    console.log('stdout: ', stdout); //'hello','world'
    console.log('stdin: ', stdin); //''
})

/** 
 * 执行外部程序，返回的退出码不是0的话。外部程序不能运行在当前平台（window/uninx）这是错误信息会放到stdout,stderr中 
 * */
execFile('ls',['no-exist-diretory-to-list'],function(err,stdout,stderr){
    console.log('err.code: ', err.code); //err.code:  1
    console.log('stdout: ', stdout); //stdout:  
    console.log('stderr: ', stderr); //stderr:  ls: no-exist-diretory-to-list: No such file or directory
})