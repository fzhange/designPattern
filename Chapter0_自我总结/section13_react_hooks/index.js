/**
 * React Hooks 原理  
 * https://github.com/brickspert/blog/issues/26
 */

let __memoryArr = [];
let __indicator = 0;

function useState(initialStsate){
  __memoryArr[__indicator] = __memoryArr[__indicator] || initialStsate;
  let idx = __indicator;
  let setState = function(val){
    __memoryArr[idx] = val;
    render();
  }
  return [__memoryArr[__indicator++],setState]
}

function useEffct(callback,depArr){
  let noDepArr = !depArr;
  let isDepChange = !depArr ? true : depArr.some((item,idx) => item!=depArr[idx] );
  if(noDepArr || isDepChange){
    callback();
    __memoryArr[__indicator] = depArr;
  }
  __indicator++;
}





function render(){
  __indicator = 0;
}