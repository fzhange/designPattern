const http = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');
const zlib = require('zlib');
const stream = require('stream');
/**
 * close  当流或其底层资源（比如文件描述符）被关闭时触发 'close' 事件。 该事件表明不会再触发其他事件，也不会再发生操作。
 * end 当流中没有数据可供消费时触发。
 * error  可能随时由 Readable 实现触发 如果底层的流由于底层内部的故障而无法生成数据，或者流的实现尝试推送无效的数据块，则可能会发生这种情况。
 * data 当流将数据块传送给消费者后触发。 当调用 readable.pipe()， readable.resume() 或绑定监听器到 'data' 事件时，流会转换到流动模式。
 *         当调用 readable.read() 且有数据块返回时，也会触发 'data' 事件。
 * pause  当调用 stream.pause() 并且 readsFlowing 不为 false 时，就会触发 'pause' 事件。
 * 
 * readable  当有数据可从流中读取时，就会触发 'readable' 事件 。当到达流数据的尽头时， 'readable' 事件也会触发，但是在 'end' 事件之前触发。
 *          readable事件表明流有新的动态：要么有新的数据，要么到达流的尽头。
 *         对于前者，stream.read() 会返回可用的数据。 对于后者，stream.read() 会返回 null
 * 
 * 如果同时使用 'readable' 事件和 'data' 事件，则 'readable' 事件会优先控制流，也就是说，当调用 stream.read() 时才会触发 'data' 事件。
 *  readableFlowing 属性会变成 false。 当移除 'readable' 事件时，如果存在 'data' 事件监听器，则流会开始流动，
 * 也就是说，无需调用 .resume() 也会触发 'data' 事件。
 * 
 * resume    当调用 stream.resume() 并且 readsFlowing 不为 true 时，将会触发 'resume' 事件。
 * 
 */

/** stream.Writeable
 * close 当调用 stream.resume() 并且 readsFlowing 不为 true 时，将会触发 'resume' 事件。
 * drain  如果调用 stream.write(chunk) 返回 false，则当可以继续写入数据到流时会触发 'drain' 事件。
 * error
 * finish 调用 stream.end() 且缓冲数据都已传给底层系统之后触发。
 * pipe  当在可读流上调用 stream.pipe() 方法时会发出 'pipe' 事件，并将此可写流添加到其目标集。
 * unpipe 在可读流上调用 stream.unpipe() 方法时会发出 'unpipe'事件，从其目标集中移除此可写流。
 */

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







