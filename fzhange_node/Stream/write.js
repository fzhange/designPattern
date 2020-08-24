const http = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');
const zlib = require('zlib');
const stream = require('stream');


class WS extends stream.Writable{
    constructor(options){
        super(options);
        this.chunks = []
    }
    _write(chunk,encoding,callback){
        // process.stdout.write(chunk);

        //[buf1,buf2,buf3]
        this.chunks.push(chunk);
        fs.writeFile(path.join(__dirname,"./write_generate_file.txt"),Buffer.concat(this.chunks),function(err){
            callback(err);
        })
    }
}

const ws = new WS();
process.stdin.pipe(ws);


/**
 * 可以这么运行
 * cat ../module.js | node write.js
 */
