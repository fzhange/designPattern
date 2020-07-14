import {BrowserRouter,HashRouter,Route,Switch} from "react-router-dom";
import React, { Component } from "react";


/**
 * 使用方法
 */
class Index extends React.Component {};
class Detail extends React.Component {};
export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path="/" component={Index}></Route>
                    <Route path="/detail" component={Detail}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
/**
 * 实现原理
 * 只实现了hashRouter
 */
const {Provider,Consumer} = React.createContext();

/**
 * 监听url改变  将url以context的形式传递给子组件
 */
class BrowserRouter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            urlValue: window.location.hash.slice(1)
        }
    }
    componentDidMount(){
        // ---------------------------h5 history 路由变动监听------------------
        function _wc(type){
            const originFunction = history[type];
            return function(){
                const event = new Event(type);
                event.arguments = arguments;
                window.dispatchEvent(event);
                originFunction.apply(this,arguments);
            }
        }
        function _addEvent(dom,type,fn){
            if(dom.addEventListener){
                dom.addEventListener(type,fn,true);
            }else if(dom.attachEvent){
                dom.attachEvent(type,fn,true);
            }else{
                dom[`on${type}`] = fn;
            }
        }

        window.history.pushState = _wc('pushState');
        window.history.replaceState = _wc('replaceState');

        _addEvent(window,'pushState',(event)=>{
            this.setState({
                urlValue:window.location.href
            })
        })
        _addEvent(window,'replaceState',(event)=>{
            this.setState({
                urlValue:window.location.href
            })
        })

        // ---------------------------hash 路由变动监听------------------
        window.onhashchange = function(){
            this.setState({
                urlValue:window.location.hash.slice(1)
            })
        }
    }
    componentWillUnmount(){
    }
    render(){
        let {urlValue} = this.state;
        return(
            <Provider value={urlValue}> 
                {this.props.children}
            </Provider>
        )
    }
};


/**
 * 进行简单路由匹配
 * **/
class Route extends React.component{
    constructor(props){
        super(props);
    }
    render(){
        const {path,Component} = this.props;
        return (
            <Consumer>
                {(urlValue)=>{
                    if(path == urlValue) return <Component></Component>
                    else return null;
                }}
            </Consumer>
        )
    }
}

/**
 * Switch组件的作用就是只匹配第一个匹配到的组件：
 */
class Switch extends React.component{
    constructor(props){
        super(props);
    }
    render(){
        <Consumer>
            {
                (urlValue)=>{
                    const children =  this.props.children;
                    for(let i=0;i < children.length ;i++){
                        const child = children[i];
                        if( child.props.path == urlValue) return child;
                    }
                    return null;
                }
            }
        </Consumer>
    }
}





