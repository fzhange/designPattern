const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { SSL_OP_CRYPTOPRO_TLSEXT_BUG } = require('constants');
const { rejects } = require('assert');
zlib.deflate("this is my message",function(err, deflateBuf){
    console.log('deflateBuf: ', deflateBuf);

})
/**
 * png > base64
 */
// fs.readFile(path.join(__dirname,"./img.png"),function(err, data){
//     let encoding = "base64";
//     let mime = 'image/png';
//     let base_64_data = data.toString(encoding);
//     let dataUrl = `data:${mime};${encoding},${base_64_data}`;
//     fs.writeFile(path.join(__dirname,"./dataUrl.txt"),dataUrl,function(error){
//         if (error) throw error;
//         console.log('The file has been saved!');
//     })
//     // console.log('dataUrl: ', dataUrl);
// })

/**
 * base64 > png
 */
// fs.readFile(path.join(__dirname,"./dataUrl.txt"),function(err,data){
//     let base64_data = data.toString().split(',')[1];
//     let buf = Buffer.alloc(base64_data.length,base64_data,"base64");
//     fs.writeFile(path.join(__dirname,"./base64.png"),buf,function(error){
//         if (error) console.error('error',error);
//         console.log('The file has been saved!');
//     })
// })


// let buf = zlib.deflateSync('123456789');
// console.log('zlib.deflateSync( ', zlib.deflateSync('123456789'));

/**
 * database_proto 数据库协议
 */
// const database = [[], [], [], [], [], [], [], []];
// const bitmasks = [1, 2, 4, 8, 16, 32, 64, 128];

// function store(message){
//     return new Promise((resolve,reject)=>{
//         const db = message.readUInt8(0);
//         const key = message.readUInt8(1);
//         const deflate_right_identify = message.readUInt8(2);
//         if(deflate_right_identify == 0x78){
//             zlib.inflate(message.slice(2),function(error,inflatedBuf){
//                 if (error) {
//                     console.error(error);
//                     reject(error);
//                 }else{
//                     let data = inflatedBuf.toString();
//                     bitmasks.forEach((bitmask,idx)=>{
//                         if((db & bitmask) === bitmask){
//                             database[idx][key] = data;
//                             resolve({ code: 0, status: "success"});
//                         }
//                     })
//                 }
//             })
//         }else{
//             rejects();
//         }
//     })
// }

// /***************数据库协议测试***************/
// const header = Buffer.alloc(2);

// header[0] = 8; // 存放在第4个数据库(00001000)
// header[1] = 0; // 存放在0键值

// zlib.deflate("my message", async function(err, deflateBuf) {
//   // 压缩'my message'
//   if (err) return console.error(err);
//   // 把头部信息和数据打包在一起
//   let message = Buffer.concat([header, deflateBuf]);
//   try {
//     const result = await store(message);
//     if (result && result.status === "success") {
//       console.dir(database);
//     }
//   } catch (error) {
//     console.log("Save failed!");
//   }
// });


// let readStream = fs.createReadStream(path.join(__dirname,"./img.png"));
// const bufferList = [];
// readStream.on('open',function(fd){
//     console.log('fd: ', fd);
// })
// readStream.on('data',function(data){
//     console.log('data: ', data);
//     bufferList.push(data);
// })
// readStream.on('close',function(){
//     let buf = Buffer.concat(bufferList);
//     // let buf = Buffer.from(bufferList);
//     let base64_data = buf.toString('base64');
//     let dataurl = `data:image/png;base64,${base64_data}`;
//     fs.writeFile(path.join(__dirname,"./base64.txt"),dataurl,function(err,data){
//         if(err) console.error(err);
//         console.log('文件已被保存');
//     })
//     console.log('--------close---------');
// })