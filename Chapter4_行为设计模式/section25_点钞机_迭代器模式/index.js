/**
 * 在不暴露对象内部结构的同时，**可以顺序地访问聚合对象内部的元素**
 */

function objGetValIterator(obj,iteratorStr){
    var iteratorArray =  iteratorStr.split('.');
    for(var i=0;i<iteratorArray.length;i++){
        obj = obj[iteratorArray[i]]
    }
    return obj;
}
function objSetValIterator(obj,iteratorStr,val){
    var iteratorArray =  iteratorStr.split('.');
    for(var i=0;i<iteratorArray.length;i++){
        if(!obj[iteratorArray[i]])  obj[iteratorArray[i]] = {};
        if(!obj[iteratorArray[i]] instanceof Object) {
            throw new Error(`${iteratorArray.splice(0,i+1).join('.')} is not object`)
        }
        obj = obj[iteratorArray[i]];
    }
    return true;
}


var nameObj = {
    'who' : {
        zf:"zf",
        cp:"cp"
    }
} 
console.log(objGetValIterator(nameObj,'who.zf'));
console.log(objGetValIterator(nameObj,'who.ynn'));
console.log(objSetValIterator(nameObj,'who.ynn.zf','ynn'));
console.log(objSetValIterator(nameObj,'who.zf','ynn'));
console.log(nameObj);
