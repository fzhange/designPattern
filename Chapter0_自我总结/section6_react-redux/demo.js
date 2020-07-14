// http://127.0.0.1:5389/index.ios.bundle?CRNModuleName=rn_destination_home&CRNType=1&initialPage=ReduxDemo

'use strict';
import React, { Component } from 'react';
import {  View,ScrollView,StatusBar,Text,StyleSheet,Platform,TouchableOpacity,Image,Dimensions,FlatList,Alert} from 'react-native';
import { Page,fetch,ViewPort,Device,Log,URL,Loading} from '@ctrip/crn';
import { connect } from 'react-redux';
import DestHighPopuStrategy from  "../../destination/views/templates/DestHighPopuStrategy";  
import MyCollection from "../../destination/views/MyCollection";

const reducer =  (state = initialState, action) => {
    switch(action.type){
        case "ADD": 
            return Object.assign({}, state, { 
                count: state.count + action.num 
            }); 
        case "REDUCE": 
            return Object.assign({}, state, { 
                count: state.count - action.num 
            }); 
        default: 
            return state;
    }
}



let reduxDemoAction = {
    increment(counter){
        return (dispatch, getState) => {
            let {reduxDemo} =  getState();
            setTimeout(()=>{
                dispatch({
                    type:'INCREMENT',
                    counter:reduxDemo.counter + counter
                })
            },0)
        }
    },
    decrement(counter=0){
        return (dispatch, getState) => {
            let {reduxDemo} =  getState();
            setTimeout(()=>{
                dispatch({
                    type:'DECREMENT',
                    counter:reduxDemo.counter - counter
                })
            },0)
        }
    }
}





class Child extends Component {
    constructor(props){
        super(props);
    }
    increment(){
        this.props.increment(2);
    }
    decrement(){
        this.props.decrement(2);
    }

    render() {
        return (
            <View>
                <Text style={{fontSize:46,color:"blue"}}>this is the child Component</Text>
                <Text onPress={this.increment.bind(this)} style={{fontSize:24}}>add 2</Text>
                <Text onPress={this.decrement.bind(this)} style={{fontSize:24}}>sub 2</Text>
                <Text style={{fontSize:24}}>this is now count num {this.props.counter}</Text>
            </View>
        )
    }
}

const mapStateToPropschild = (status) => {
    return {
        counter:status.reduxDemo.counter,
    }
}

const mapDispatchToPropschild  = (dispath,ownProps) => {
    return {
        increment:(counter)=>dispath(reduxDemoAction.increment(counter)),
        decrement:(counter)=>dispath(reduxDemoAction.decrement(counter))
    }
}
let ConnectChildComponent =  connect(mapStateToPropschild,mapDispatchToPropschild)(Child);


/** ========分割线========== ========分割线========== ========分割线========== ========分割线========== ========分割线========== */


class ReduxDemo extends Page {
	constructor(props){
        super(props);
    }
    increment(num,e){
        console.log(num,e);
        this.props.increment(1);
    }
    decrement(num,e){
        console.log(num,e);
        this.props.decrement(1);
    }
    
	render() {
		return (
            <ViewPort>
                {/* <Text style={{fontSize:46,color:"red"}}>this is the Father Component</Text>
                <Text onPress={this.increment.bind(this,"123")} style={{fontSize:24}}>add 1</Text>
                <Text onPress={(e)=>this.decrement("123",e)} style={{fontSize:24}}>sub 1</Text>
                <Text style={{fontSize:24}}>this is now count num {this.props.counter}</Text> 
                <ConnectChildComponent /> */}
                <MyCollection templateModel={{
                    template9:{
                        title:"我的收藏",
                        more:{
                            text:"更多",
                            url:"https://fanyi.baidu.com/",
                        },
                        itemList:[{
                            name:"带到你算UI付",
                            imageTag:"景点",
                            imageUrl:"http://f.hiphotos.baidu.com/image/h%3D300/sign=467c9876fb36afc3110c39658318eb85/908fa0ec08fa513d63a4b968316d55fbb2fbd97e.jpg",
                            jumpUrl:"https://fanyi.baidu.com/",
                            rate:"10",
                            commentCount:"10",
                            tagList:["历史古迹","历史古迹","历史古迹"]
                        }]
                    }
                }}></MyCollection>  
                <DestHighPopuStrategy templateModel={{
                    template15:{ 
                        title:"高人气攻略",  
                        more:{
                            text:"更多",
                            icon:"http://a.hiphotos.baidu.com/image/pic/item/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg",
                            url:"https://fanyi.baidu.com/#zh/en/%E6%94%BB%E7%95%A5",
                        },
                        itemList:[{
                            itemId:"12312", 
                            rank:'No.1',
                            favoriteCount:'1231人收藏',
                            image:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2451028041,3135096468&fm=26&gp=0.jpg",
                            jumpUrl:"https://fanyi.baidu.com/#zh/en/%E6%94%BB%E7%95%A5",
                            title:"曼谷最美赏秋胜地大公开，十一月小众旅行目的地全攻略曼谷最美赏秋胜地大公开，十一月小众旅行目的地全攻略",
                            user:{
                                portrait:"http://a.hiphotos.baidu.com/image/pic/item/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg",
                                name:"松鼠本松松鼠本松松鼠本松松鼠本松松鼠本松",
                                tagList:['瑞士旅游专家']
                            }
                        }]
                    }
                }}></DestHighPopuStrategy>

            </ViewPort>
		);
	}
}

const mapStateToProps = (status) => {  
    console.log('status: ', status);
    return {
        counter:status.reduxDemo.counter,
    }
}

const mapDispatchToProps = (dispath,ownProps) => {
    return {
        increment:(counter)=>dispath(reduxDemoAction.increment(counter)),
        decrement:(counter)=>dispath(reduxDemoAction.decrement(counter))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ReduxDemo)








