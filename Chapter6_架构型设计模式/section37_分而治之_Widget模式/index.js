(function(F){
            
})(function(){
    return window.F = {};
}())

F.module('lib/template',function(){
    //处理数据 编译模板入口
    //str 模板容器id 或者 模板字符串
    //data 渲染数据
    var _TplEngine = function(str,data){
        var html = '';
        if(data instanceof Array){
            for(var i=0;i<data.length;i++){
                html += _getTpl(str)(data[i]);
            }
        }else html = _getTpl(str)(data);
        return html;   
    }
    // 获取模板
    var _getTpl = function(str){
        var ele = document.getElementById('str');
        if(ele){
            var html = /^(textarea|input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
            return _compileTpl(html);
        }else{
            return _compileTpl(str);   
        }
    }
    // 处理模板
    var _dealTpl = function(str){
        var _left = '{%',
            _right = '%}';
        return  String(str).replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/[\r\t\n]/g,'')
                .replace(new RegExp(`${_left}(.)`))

    }
    // 编译执行
    var _compileTpl = function(){
        
    }

    return _TplEngine;
})