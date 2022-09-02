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

/**
 * 单页面的url变动
 * 1.browserHistory 模式
 * ? > 1.1 针对浏览器的 点击前进后退按钮发生的url变化，我们可以通过popstate事件的监听
 * ? > 1.2 针对pushState replaceState API触发的url变化 我们可以通过 自定义事件的监听处理
 * 
 * 2. hash mode 
 * ? > 监听hashchange事件
 * 
 * 
 * 多页面模式
 * https://mp.weixin.qq.com/s/01SkKuRkBz8BcU-i-dN0UQ
 * 如何捕获用户在该页面停留的时长？
 */



window.addEventListener('popstate',()=>{
    console.log('浏览器前进后退了');
})