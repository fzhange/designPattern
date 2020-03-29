/**
 * 责任链模式：
 * 解决一个请求的发送者和接受者之间的耦合；
 * 通过责任链上的多个对象，分解请求流程，实现请求在多个对象之间传递。
 */

 /**
  * 第一站--请求模块
  */
 var sendData = function(dealType,dom){

    var xhr =  new XMLHttpRequest();
    xhr.open('get','url',true);
    xhr.send(null);
    xhr.onload = function(event){
        if(xhr.status >=200 && xhr.status<300 || xhr.status == 304){
            dealData(xhr.responseText,dealType,dom);
        }else{
            console.error('error');
        }
    }
 }
 /**
  * 下一站--数据适配
  */
 var dealData = function(data,dealType,dom){
    // var dataType = String.prototype.toString.call(data);
    switch(dealType){
        case "sug" :
            createSug(data,dom);
        break;
        case "validate":
            createValidate(data,dom);
    }
 }
 /**
  * 终点站
  */
var createSug = function(){
    //do something
}
var createValidate = function(){
    //do something
}