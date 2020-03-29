function formateString(str,data){
    str = str.replace(/\{\{\s*(\w+)\s*\}\}/g,function(match,key){
        return !!data[key] ? data[key] : ''
    })
    return str;
}
function Nav(data,parentEle){
    this.item = "<a href='{{href}}'>{{name}}</a>";
    this.parentEle = parentEle;
    this.html  = formateString(this.item,data);
}
Nav.prototype.show = function(){
    this.parentEle.innerHTML = this.html;
}

new Nav({
    href:"https://cpzf.xyz/#/",
    name:"zf cp net",
},document.body).show();