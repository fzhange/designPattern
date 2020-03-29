/**
 * 将一个类的接口转换为另一个类的接口
 * window.A = A = JQuery;
 */

function userInfo(obj){
    let _adapterObj = {
        name:"zf",
        lover:"cp"
    }
    for(var key in _adapterObj){
        _adapterObj[key] = obj[key] ? obj[key] :  _adapterObj[key];
    }
    //do things
}