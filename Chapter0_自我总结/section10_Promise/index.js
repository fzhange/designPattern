class Promise {
  static resolve(val) {
    this.resolveCallBack.forEach(callback => {
      callback(val);
    });
    return this;
  }
  static reject(val) {
    return this;
  }
  constructor(callback) {
    this.resolveCallBack = [];
    this.rejectCallBack = [];
    callback(Promise.resolve, Promise.reject);
  }
  then(callback) {
    this.resolveCallBack.push(callback);
    return this;
  }
  catch(callback) {
    this.rejectCallBack.push(callback);
    return this;
  }
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
}).then(res => {
  console.log("res: ", res);
});

/**
 *
 */
const p1 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});
const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});
p2.then(result => console.log(result)).catch(error => console.log(error));
// Error: fail

/**
 * 建议 retrurn resolve(1);
 */
new Promise((resolve, reject) => {
  resolve(1);  
  console.log(2);
}).then(r => {
  console.log(r);
});


/**
 * 如果then方法有返回的话 返回的是一个新的promise实例
 */

 /**
  *  promise会吞掉错误
  * 下面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，
  * 会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。
  */
 const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123