/**
 * jsonp
 */
function fn(response){
    alert(response);
}
<script src='jsonp.js'></script>//注意这里：jsonp.js 这个js文件中其实只有一句话 fn('响应内容');
/**
 * jsonp.js
 */
(
    fn('响应内容') 
)