// process.stdin.resume();
// process.stdin.setEncoding('utf-8');
// process.stdin.on('data',function(text){
//     process.stdout.write(text.toUpperCase());
// })


// 在“旧”的流模式下，默认情况下 stdin 流是暂停的，因此必须调用 process.stdin.resume() 从中读取
// 用 process.stdin.resume() 本身会将流切换为“旧”模式。
// process.stdin.resume();
// process.stdin.pipe(process.stdout);
