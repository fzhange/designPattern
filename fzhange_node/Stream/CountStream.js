const Writable = require("stream").Writable;
const util = require('util');
const http = require('http');
class CountStream extends Writable{
    constructor(matchText,options){
        super(options);
        this.count = 0;
        this.matcher = new RegExp(matchText ,"g");
    }
    _write(chunk,encoding,cb){
        let list = chunk.toString().match(this.matcher);
        if(!!list && list.length){
            this.count += list.length;
        }
        cb();
    }
    end(){
        this.emit('total', this.count);
    }
}

const countStream  = new CountStream('html');


http.get("http://www.trip.com/travel-guide/",function(req){
    req.pipe(countStream);
})

countStream.on('total',function(count){
    console.log('count: ', count);
})


