/**
 * 利用node实现一个小型的文件数据库 
 */
const mkdirp = require('mkdirp');
const Q = require('q');
const fs = require('fs');
const path = require('path');
const mvdir = require('mvdir');
const EventEmitter = require('events').EventEmitter;

class Database extends EventEmitter{
    constructor(filename){
        super(...arguments);
        this.filePath = `${path.join(__dirname,filename)}`;
        this._dataRecord = Object.create(null);
        this.ws = fs.createWriteStream(this.filePath,{flags:'a',encoding:"utf-8"});
        this._load();
    }
    _load(){
        const rs = fs.createReadStream(this.filePath,{encoding:'utf-8'});
        let data = '',that = this;
        let dataFromBuffer = '';
        rs.on('readable',function(){
            dataFromBuffer += rs.read();
            let dataArr = dataFromBuffer.split('\n');
            dataArr.pop();
            dataArr.pop();
            dataArr.forEach(element => {
                let obj = JSON.parse(element)
                that._dataRecord[obj.key] = obj.val;
            });
            console.log('this._dataRecord: ', that._dataRecord);
        })
        rs.on('end',function(){
            that.emit('loaded');
        })
    }
    set(key,val,callback){
        let str = `${JSON.stringify({key,val})}\n`;
        if(val == null) { //如果之前存在纪录 做删除操作
            delete this._dataRecord[key];
        }
        // console.log('this._dataRecord: ', this._dataRecord);
        this._dataRecord[key] = str;
        this.ws.write(str);
        !!callback && callback(null);
    }
    get(key){
        return this._dataRecord[key]
    }
    del(key){
        this.set(key,null);
    }
}


const client = new Database('./test.db');
client.on('loaded',function(){
    let bar = client.get('bar');
    console.log('bar: ', bar);
    client.set('bar','my sweet value',function(err){
        if(err) console.error('err',err);
        console.log('write success');
    })
    client.del('baz');
})
client.on('error',function(){
    console.log('client_error: ', error);
})

