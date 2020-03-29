/**
 * 命令模式：实现请求与实现的解耦并封装为独立对象
 */
var ViewCommand = (function(){
    function formatString(str,data){
        str = str.replace(/\{\{(\s*\w+\s*)\}\}/g,function(match,key){
            return !!data[key] && data[key];
        })
        return str;
    }
    var html = '';
    var template = {
        title:[
            `<div class="title">
                <div class="main">
                    <h1>{{title}}</h1>
                    <p>{{tips}}</p>
                </div>
            </div>`   
        ].join(''),
        product:[ 
            `
            <div>
                <img src="{{src}}" style="width: 200px;height:200px"/>
                <p>{{text}}</p>
            </div>
            `
        ].join('')
    }
    var Action = {
        create:function(data,type){
            if(data.length){
                for(var i=0;i<data.length;i++){
                    html += formatString(template[type],data[i]);
                }
            }else{
                html = formatString(template[type],data);
            }
        },
        display:function(containerId,data,type){
            if(data){
                this.create(data,type);
            }
            document.getElementById(containerId).innerHTML = html;
            html = '';
        }
    }
    var execute = function(paramObj){
        Action[paramObj.command] && Action[paramObj.command].apply(Action,paramObj.param);
    }
    return execute;
})()  


ViewCommand({
    command:"display",
    param:['app',{  //containerId,data,type
        title : "夏日里的一片温馨",
        tips : "暖暖的阳光带给人们的感受"
    },'title']
})
ViewCommand({
    command:'create',
    param:[{
        src:"http://cpzf.xyz:666/favicon.png",
        text:"0"
    },'product']
})
ViewCommand({
    command:'display',
    param:['product',[{
        src:"http://cpzf.xyz:666/favicon.png",
        text:"1",
    },{
        src:"http://cpzf.xyz:666/favicon.png",
        text:"2"
    }],'product']
})