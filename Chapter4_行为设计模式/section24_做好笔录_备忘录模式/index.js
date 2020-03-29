/**
 * 保证在不破坏对象的封装性前提下，在对象之外捕获并保存改对象内部状态，以便对日后将对象恢复到以前某个状态。
 * 
 * 通过闭包的形式存储数据
 */
var Page = function(){
    var cache = {}; 
    return function(page,fn){ 
        if(cache[pageIndex]){
            return cache[pageIndex];
        }else{
            fetch('xxxxxx').then(res=>{
                cache[pageIndex] = res;
                return cache[pageIndex];
            })
        }
    }
}()