const http = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');
const zlib = require('zlib');
const {Duplex,Readable,Writable} = require('stream');

class MyDuplex extends Duplex {
    constructor(options) {
      super(options);
      this.waiting = false;
    }
    _write(chunk, encoding, callback) {
      this.waiting = false;
      this.push(chunk);
      callback();
    }
  
    _read(size) {
      if(!this.waiting){
        this.push("Feed me data >");
        this.waiting = true;
      }
    }
  }
  
  const dp = new MyDuplex()
  process.stdin.pipe(dp).pipe(process.stdout);
  




