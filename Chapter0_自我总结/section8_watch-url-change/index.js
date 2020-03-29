/**
 * watch change
 * @param {*} type 
 */
function _wc(type) {
    let originFunction = history[type];
    return function () {
        let evt = new Event(type);
        evt.arguments = arguments;
        window.dispatchEvent(evt);
        return originFunction.apply(this, arguments);
    }
}

window.history.pushState = _wc('pushState');
window.history.replaceState = _wc('replaceState');



window.addEventListener('pushState', function (evt) {
    console.log('pushState: ',evt);
});
window.addEventListener('replaceState', function (evt) {
    console.log('replaceState: ',evt);
});


window.onload = function(){
    document.querySelector("#app").onclcik = function(){
        window.history.pushState({title: '下载' }, '下载', 'download?id=1');
    }
}