/**
 * shell 编程是构建工具类脚本和命令行程序最常见的方式。
 * 类似的脚本语言有bash python
 * 你可以通过execFile spawn 执行一个子命令
 * 但是exec更方便  good let us loook
 */
/**
 * 如果要在命令解析器里执行命令，你可以选择exec.
 * unix下  exec 实际上也是调用 /bin/sh  
 * 如果你是unix用户 node始终使用的是 /bin/sh做脚本解析。  具体提示请看  《Node.js硬实战 115个核心技巧》- AiBooKs.Cc   8子进程部分 这块没咋看懂
 * window下 cdm.exe
 * 
 * 前提是你必须有权限 呵呵
 * 
 * exec 需要关注安全性问题   很可怕
 */


let exec = require('child_process').exec;

exec('cat ./spawn.test.text | sort | uniq',function(err,stdout,stderr){
    process.stdout.write(stdout);
})

