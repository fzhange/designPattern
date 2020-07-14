
class myPromise{
  constructor(callbcak){
    this.resolveCallbackQueue = [];
    const resolve = (val)=>{
      let resolveCallback = this.resolveCallbackQueue.shift();
      if(!resolveCallback || typeof resolveCallback != "function") return;
      let value = resolveCallback(val);
      if(value instanceof myPromise){
        value.then((val)=>{
          resolve(val);
        })
      }else{
        resolve(value);
      }
    }

    setTimeout(()=>{
      callbcak(resolve);
    })
  }
  
  then(resolveCallback){
    this.resolveCallbackQueue.push(resolveCallback);
    return this;
  }

  static async all(promiseList){
    let resolveValList = [];

    return new Promise((resolve,reject)=>{
      for(const [idx,promise] of Object.entries(promiseList)){
        promise.then((val)=>{
          resolveValList[idx] = val;
          if(Object.entries(resolveValList).length == promiseList.length) {
            /** 重点是这个if判断逻辑 **/
            resolve(resolveValList)
          }
        }).catch((err)=>{
          reject(err);
        })
      }
    })
  }


  static async race(...promiseList){
    return new Promise((resolve,reject)=>{
      for(let promise of promiseList){
        promise.then((value)=>{
          resolve(value);
        })
      }
    })
  }
}

let x = new myPromise((resolve,reject)=>{
  resolve(1111);
}).then((val)=>{
  console.log('---------------val: ', val);
  return new myPromise((resolve,reject)=>{
      setTimeout(()=>{
          resolve(1);
      },1000)
  })
}).then((val)=>{
  console.log('val: ', val);
})









 /**
  *  promise会吞掉错误
  * 下面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，
  * 会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。
  */
//  const someAsyncThing = function() {
//   return new Promise(function(resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2);
//   });
// };

// someAsyncThing().then(function() {
//   console.log('everything is great');
// });

// setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123