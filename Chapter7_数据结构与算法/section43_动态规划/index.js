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
