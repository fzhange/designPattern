const mkdirp = require('mkdirp');
const Q = require('q');
const fs = require('fs');
const path = require('path');
const mvdir = require('mvdir');



// let splitStr = '/';
// /win\d+/.test(os.platform()) ? (splitStr = '\\') : (splitStr = '/')
// console.info('isWindow ', /win\d+/.test(os.platform()));

(async function(){
    try{
        if(fs.existsSync(path.join(__dirname,"/outCDN/dist"))) {
            console.log('dist目录已存在');
            return;
        }
        await mvdir(path.join(__dirname, '/outCDN'),path.join(__dirname,'/tmpDir/dist'));
        await mvdir(path.join(__dirname, '/tmpDir'),path.join(__dirname,'/outCDN'));
        console.log('移动操作已完成');
    }catch(error){
        console.error('doMove_error',error);
    }
})()


let result = [];
function findFileEndOFDotJS(filePath){
    if(fs.statSync(filePath).isDirectory()){
       let dirs = fs.readdirSync(filePath);
       dirs.forEach(dir => findFileEndOFDotJS(path.normalize(`${filePath}/${dir}`)));
    }else{
        var reg = new RegExp(".js$","g");
        if(reg.test(filePath)) result.push(filePath);
    }
}
findFileEndOFDotJS(path.join(__dirname, '/outCDN'));
console.log(result);



