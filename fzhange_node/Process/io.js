
// const path = require('path');
// var args = {
//     "-h":displayHelp,
//     "-r":readFile,
// }

// function displayHelp(){
//     console.log('argument processor:', args);
// }

// function readFile(file){
//     console.log('file: ', file);
//     if(file){
//         console.log('reading:', file);
//         console.time('read');
//         const stream = require('fs').createReadStream(path.join(__dirname,file));
//         stream.on('end',function(){
//             console.timeEnd('read');
//         })
//         stream.pipe(process.stdout);
//     }else{
//         console.error('a file must be provided with the -r option');
//         process.exit(1);
//     }
// }

// if(process.argv.length>0){
//     process.argv.forEach((arg,idx)=>{
//         args[arg] && args[arg].apply(this,process.argv.slice(idx+1));
//     })
// }



const path = require('path');
const fs = require('fs');
let readStream = fs.createReadStream(path.join(__dirname,"./text.js"));
const bufferList = [];

console.log('readStream.eventNames(): ', readStream.eventNames());
// readStream.on('open',function(fd){
//     console.log('fd: ', fd);
// })
// readStream.on('data',function(data){
//     console.log('data: ', data);
//     bufferList.push(data);
// })
// readStream.on('close',function(){
//     let buf = Buffer.concat(bufferList);
//     let base64_data = buf.toString('base64')
//     let dataurl = `data:image/png;base64,${base64_data}`;
//     fs.writeFile(path.join(__dirname,"./text.js"),dataurl,function(err,data){
//         console.log('文件已被保存');
//     })
//     console.log('--------close---------');
// })
// fs.readFile(path.join(__dirname,"../base64.png"),{encoding:"base64"},function(err,data){
//     // let base64_data = data.toString('base64')
//     let dataurl = `data:image/png;base64,${data}`;
//     console.log(dataurl);
// })

