   //模块管理器 单体对象
   var F = F || {};
   /**
   * str  模块路由
   * fn   模块方法
   */
   F.define = function(str,fn){
       var parts = str.split('.');
       var old = parent = this;  //old 当前模块的祖父模块 parent 当前模块的父模块;
       var i = len = 0; //i 模块层级 len 模块层级长度
       if(parts[0] == 'F'){ //如果第一个模式是模块管理器单体对象，则移除
           parts = parts.slice(1);
       }
       if(parts[0] == 'define' || parts[0] == 'module')  return //屏蔽对define和module模块方法重写
       for(len = parts.length; i<len; i++){
           if(typeof parent[parts[i]] == undefined){
               parent[parts[i]] = {};
           }
           old = parent;
           parent = parent[parts[i]];
       }
       if(fn){
           old[parts[--i]] = fn();
       }
       return this;
   }
   //模块创建
   F.define('string',function(){
       return {
           trim:function(str){
               return str.replace(/^\s+|\s+$/g,"");
           }
       }
   })
   F.string.trim(" 234");


   F.module = function(){
       var args = Array.prototype.slice.call(arguments);
       var fn = args.pop();
       var parts = args[0] && args[0] instanceof Array ? args[0] : args;
       var modules = [];
       var modIds = '';
       var i = 0; 
       var ilen = parts.length;
       var parent,j,jlen;
       while(i<ilen){
           if(typeof parts[i] == 'string'){
               parent = this;
               modIds = parts[i].replace(/^F\./,"").split('.');
               for(var j=0;j<modIds.length;j++){
                   parent = parent[modIds[j]] || false;
               }
               modules.push(parent);
           }else{
               modules.push(parts[i]);
           }
           i++;
       }
       fn.apply(null,modules);
   }
   //模块调用
   F.module("string.trim",function(trim){
       console.log('trim trim trim',trim(' ok '));
   })