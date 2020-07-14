/**
 * 假设选择第8个 那么对应最大价值为 
 *    MaxVal(8) = 4 + MAxVal(5);
 * 不选第8个 则对应最大价值为
 *    MaxVal(8) = MaxVal(7);
 */
let data = [{
   val:0,
   preIdx:null,
},{
   val:5,
   preIdx:null,
},{
   val:1,
   preIdx:null,
},{
   val:8,
   preIdx:null,
},{
   val:4,
   preIdx:1,
},{
   val:6,
   preIdx:null,
},{
   val:3,
   preIdx:2,
},{
   val:2,
   preIdx:3,
},{
   val:4,
   preIdx:5
}]


function countMaxVal(data){
   let arr = [];
   for(let i=1;i<data.length;i++){
      let selectVal;
      let noSelectVal = data[i-1].val
      if(!!data[i].preIdx){
         let _preIdx = data[i].preIdx;
         selectVal = data[i].val +  data[_preIdx].val;
      }else{
         selectVal = data[i].val;
      }

      if(selectVal > noSelectVal){
         arr.push(selectVal);
      }else arr.push(noSelectVal);
   }
   return arr;
}

console.log('countMaxVal(data): ', countMaxVal(data));





/**
 * 货币基数【1,5,11】
 * 为了凑出目标金额使用最少的货币数量
 * 
 * 假设目标金额为 x 则使用最少的货币数量为f(x)
 * f(x) = Math.min(f(x-1),f(x-5),f(x-11)) + 1;
 */

function fun(targetVal){
   const base = [1,5,11];
   if(targetVal<=0) return -1;
   let arr = [0,1];
   for(let i=2;i<=targetVal;i++){
     let count = 0;
     if(i-1>=0) count = Math.min(arr[i-1])
     if(i-5>=0) count = Math.min(count,arr[i-5]) 
     if(i-11>=0) count = Math.min(count,arr[i-11])
     arr[i] = count+1;
   }
   return arr[targetVal];
 }
 
 console.log('fun(14): ', fun(4));


 /**
  * DAG最短路径问题
  * S=>T 花费最少的钱
  */

 function DAG(){
   let myobj = {
     s:{
       from:[],
       a:10,
       b:20,
     },
     a:{
       from:["s"],
       c:30,
       d:10,
     },
     b:{
       from:["s"],
       d:20,
     },
     c:{
       from:['a'],
       d:5,
       t:20,
     },
     d:{
       from:['a','c','b'],
       t:10
     },
     t:{
       from:['c','d']
     }
   }
 
 
   let obj = {}
   Object.entries(myobj).forEach(([key,value])=>{
     if(value.from.length == 0) obj[key] = 0;
     if(value.from.length == 1){
       let fromKey =  value.from[0]
       let num2 = myobj[fromKey][key];
       obj[key] = num2;
     }
     if(value.from.length > 1){
       let miniNum = value.from.reduce((preFrom,currFrom,innerIdx)=>{
         if(innerIdx == 1){
           let num1 = obj[preFrom] + myobj[preFrom][key];
           let num2 =  obj[currFrom] + myobj[currFrom][key];
 
           return Math.min(num1,num2);
         }else{
           let num2 =  obj[currFrom] + myobj[currFrom][key];
           return Math.min(preFrom,num2);
         }
       })
       obj[key] = miniNum;
     }
   })
   console.log('dagObj:' , obj);
 }
 DAG();


 /**
  * let str = "1,5,3,4,6,9,7,8"; 
  * 求最长上升子序列 134678  注意序列的非连续性
  *  f(1) [1]
  *  f(5) f(1)[5]
  *  f(3) f(1)[3]
  *  f(4) f(3)[4]
  */
 function sonRise(){
  let obj = {
    1:[1]
  }
  let str = "1,5,3,4,6,9,7,8";
  str = str.split(',').map(item=>parseInt(item));
  
  for(let i=1;i<str.length;i++){
    for(let j=i-1;j>=0;j--){
      let currKey = str[i];
      let preKey = str[j];
      if(preKey < currKey){
        obj[currKey] = [...obj[preKey]].concat([currKey])
        break;
      }

      if(j == 0){
        obj[currKey] = [currKey];
      }
    }
  }
  console.log('sonRise obj: ', obj);
 }
 sonRise();

/**
 * @param {*} text1 
 * @param {*} text2 
 * 最长公共子序列
 * https://leetcode-cn.com/problems/longest-common-subsequence/solution/chao-xiang-xi-dong-tai-gui-hua-jie-fa-by-shi-wei-h/
 * longestCommonSubsequence({S1,S2,S3,...,Sn}  {T1,T2,T3,...,Tn}) 
 * if Sn == Tn longestCommonSubsequence({S1,S2,S3,...,Sn-1}  {T1,T2,T3,...,Tn-1}) + 1
 * else Max(
 *  longestCommonSubsequence( {S1,S2,S3,...,Sn-1} , {T1,T2,T3,...,Tn} )
 *  longestCommonSubsequence( {S1,S2,S3,...,Sn}, {T1,T2,T3,...,Tn-1} )
 * )
 */

var longestCommonSubsequence = function(text1, text2) {
  let maxNum = 0;
  let arr = new Array(text1.length+1).fill(JSON.stringify(new Array(text2.length+1).fill(0))).map((item)=>JSON.parse(item));
  for(x=1;x<text1.length+1;x++){
    for(y=1;y<text2.length+1;y++){
      if(text1[x-1] == text2[y-1]) arr[x][y] = arr[x-1][y-1] + 1;
      else {
        arr[x][y] = Math.max(arr[x-1][y],arr[x][y-1])
      }
      if(arr[x][y]>maxNum) maxNum = arr[x][y];
    }
  }
  console.log('arr: ', arr);
  return maxNum;
};
console.log('longestCommonSubsequence: ', longestCommonSubsequence("abcde","ace"));


 /**
 * 最长公共子串
 * 子串具有连续性 子序列不存在连续性
 * LCS(S,T)
 * {S1,S2,S3,...,Sn} , {T1,T2,T3,...,Tn}
 * if Sn == Tn LCS(Sn-1,Tn-1)+1
 * else 0
 */
function LCS(str1,str2){
  let finalArr = [];
  let obj = {
    maxNum:0,
    x:0,
    y:0
  }
  let arr = new Array(str1.length).fill(JSON.stringify(new Array(str2.length).fill(0))).map(item=>JSON.parse(item))
  for(let y=0;y<str2.length;y++){
    let charY = str2[y];
    for(let x=0;x<str1.length;x++){
      let charX = str1[x];
      if(charX == charY) {
        if(x==0 || y==0) arr[x][y] = 1;
        else arr[x][y] = arr[x-1][y-1]+1;
        if(obj.maxNum < arr[x][y]){
          obj.maxNum = arr[x][y];
          obj.x = x;
          obj.y = y;
        }
      }
    }
  }

  for(let i=obj.maxNum;i>0;i--){
      let x = obj.x;
      finalArr.push(str1[x])
      obj.x = obj.x - 1;
  }
  return finalArr.reverse().join('');
}

console.log('LCS("abcdefg","xyzabcda"): ', LCS("abcdefg","xyzabcda"));



/**
 * 斐波那契
 * 0 1 1 2 3 5 8 13
 * 0 1 2 3 4 5 6 7
 *  */ 
/**
 * 设idx为每一个元素的下标 则每一个元素的值为f(idx)
 * 
 * 根据题意
 * f(0) = 0;
 * f(1) = 1;
 * f(2) = 1 = f(0)+f(1);
 * f(3) = 2 = f(1)+f(2);
 * f(idx) = f(idx-2) + f(idx-1);
 */

/**
 * 算法一
 * Forward[正向] fibo
 */
function fibo(idx){
  let arr = [0,1];
  if(idx<2) return arr[idx];
  for(i=2;i<=idx;i++){
      arr[i] = arr[i-2] + arr[i-1];
  }
  return arr[idx];
}

console.log(' fibo(6): ',  fibo(6)); //8

/**
* 算法二
* recursion[递归] reverse[反向] fibo 
* 递归的思想一般是一种反向逻辑;
*/

function recursionFibo(idx){
  let value = 0;
  if(idx==0) return 0;
  if(idx==1) return 1;
  value = value + recursionFibo(idx-1) + recursionFibo(idx-2);
  return value
}

console.log('recursionFibo(6): ', recursionFibo(6));




