const http = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');
const zlib = require('zlib');
const stream = require('stream');


class JsonLineReader extends stream.Readable {
    constructor(source){
        super(arguments);
        this._source = source;
        this._buffer = '';
        source.on('readable',function(){
            this.read();
        }.bind(this))
    }
    _read(){
        let chunk;
        let lineIndex;
        let str;
        let result;
        if(this._buffer.length == 0){
            chunk = this._source.read();
            this._buffer += chunk;
        }
        lineIndex = this._buffer.indexOf('\n');
        if(lineIndex != -1){
            str = this._buffer.slice(0,lineIndex);
            this.emit('line_data',str);
            this._buffer = this._buffer.slice(lineIndex+1);
            this.push(str);
        }else{
            str = this._buffer.slice(0);
            this.emit('line_data',str);
        }
    }
}

let rs = fs.createReadStream(path.join(__dirname,"./read_depend.txt"),{
    encoding:"utf8",
});
let jlr = new JsonLineReader(rs);
jlr.on('line_data',function(line_data){
    console.log('line_data: ', line_data);
})







