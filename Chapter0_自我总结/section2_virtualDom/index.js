
function Element(tagName,props,children){
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}
Element.prototype.render = function(){
    let tagEle = document.createElement(this.tagName);
    for(var key in this.props){
        tagEle.setAttribute(key,this.props[key]);
    }
    this.children.forEach(child => {
       let childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
       tagEle.appendChild(childEl);
    });
    return tagEle;
}

function createElement(tagName,props,children){
    return new Element(tagName,props,children);
}

var ul = createElement('ul',{
    id:"list",
},[
    createElement('li',{class:"item"},["item 1"]),
    createElement('li',{class:"item"},["item 2"]),
    createElement('li',{class:"item"},["item 3"])
])

function g(id){
    return document.getElementById(id);
}

var root = ul.render();
g('app').appendChild(root);



