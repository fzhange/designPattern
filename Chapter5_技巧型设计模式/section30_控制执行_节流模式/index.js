/**
 * debounce 防抖函数 
 * N秒内只会触发一次 如果N秒内被再次触发 则重新计时
 */
var debounce = function(fn){
    var id = null;
    return function(){
        id && clearTimeout(id);
        id = setTimeout(function(){
            fn.apply(null,arguments);
        },300)
    }
}
function say(){
    console.log(arguments);
}
window.onscroll = debounce(say);

/**
 * throttle 节流函数
 * 举例说明：小思最近在减肥，但是她非常贪吃。为此，与其男朋友约定好，如果10天不吃零食，
 * 就可以购买一个包(不要问为什么是包，因为包治百病)。但是如果中间吃了一次零食，那么就要重新计算时间，
 * 直到小思坚持10天没有吃零食，才能购买一个包。所以，管不住嘴的小思，没有机会买包(悲伤的故事)...这就是防抖。
 * 不管吃没吃零食，每10天买一个包，中间想买包，忍着，等到第十天的时候再买，这种情况是节流。
 * 如何控制女朋友的消费，各位攻城狮们，get到了吗？防抖可比节流有效多了！
 */
 function throttle(fn,gapTime){
    let _lastTime = null;
    return function(){
        let _nowTime = new Date().getTime();
        if(!_lastTime || _nowTime - _lastTime > gapTime){
            fn();
            _lastTime = _nowTime;
        }
    }
 }

var BackFn = throttle(function(){
    console.log('BackFn');  //一秒之内这个函数只能执行一次
},1000); 

setInterval(BackFn,10); 




