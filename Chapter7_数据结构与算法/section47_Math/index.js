/**
 * 巨大数字符串相加问题
 * a = '12345678'
 * b =   '456789'
 */
function largeNumAdd(str1,str2){
  function addZero(str,len){
    for(let i=0;i<len;i++) str = `0${str}`;
    return str;
  }

  let str1_len = str1.length;
  let str2_len = str2.length;
  if(str1_len - str2_len > 0){
    str2 = addZero(str2,Math.abs(str1_len - str2_len));  //str2短 需要补0   ==>   00456789
  }else if(str2_len - str1_len > 0){
    str1 = addZero(str1,Math.abs(str1_len - str2_len)); //str1短 需要针对str1补0 
  }
  //12345678
  //00456789  
  let arr = [];
  let arr1 = str1.split('').reverse().map(item=>parseInt(item));
  let arr2 = str2.split('').reverse().map(item=>parseInt(item));
  //87654321
  //98765400
  arr1.reduce((jinwei,num1,innerIdx)=>{
    let num2 = arr2[innerIdx];
    let totalNum = num1 + num2 + jinwei;
    if(totalNum >= 10) {
      arr.push(totalNum-10);
      return 1;
    }else{
      arr.push(totalNum);
      return 0; 
    }
  },0)
  return arr.reverse().join('')
}


console.log('largeNumAdd ', largeNumAdd('12345678','456789'));

/**
 * JavaScript 浮点数运算的精度问题
 * https://www.html.cn/archives/7340
 */

