/**
 * ? 数据类型
 *   1. string number boolean  
 *   2. let list:number[];   let list:Array<number>; 泛型数组
 *   3. 元组表示一个已知元素数量和类型的数组
 *   4. 枚举
 *   5. any void undefined null never object
 *   6. 自定义类型 
 *   type GreetingLike = string | (() => string) | MyGreeter; 
 *   function greet(g: GreetingLike): void;
 * ? 断言
 *   let strLength:number = (<string>someValue).length;
 *   let strLength:number = (someValue as string).length;
 */



//!接口
//?对象接口
interface name {
    readonly x: number;
    [propName: string]: any;
}
//?函数接口
interface SearchFunc {
    // (id:number|string):void
    (source: string, subString: string): boolean;
    // functionName(id:boolean):void
}
let mySearch_1: SearchFunc = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
}
let mySearch: SearchFunc = function (source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
}
//? 类接口
interface ClockInterface {
    constructor(name: string, age: number)
    constructor(id: number)

    // 实例属性和实例方法
    name: string
    age: number
    getName(): string
    getAge(): number
}

// class Clock implements ClockInterface {

// }

// ?接口继承


//! 泛型
//? 泛型函数
//?方式1
// function identity<T>(arg: T[]): T {
//     let name:T;
//     return name;
// }
// ?方式2
// const identity: <T>(arg:T[])=>T = <T>(arg:T[]):T=>{
//     let name:T;
//     return name;
// }
// ?方式3
const identity: { <T>(arg: T[]): T } = <T>(arg: T[]): T => {
    let name: T;
    return name;
}
// ?方式4
// interface GenericalIdentityFn<T> {
//     (arg: T[]): T;
// }
// const identity: GenericalIdentityFn<string> = <T>(arg: T[]): T => {
//     let name: T;
//     return name;
// }

let output = identity(["a", "b"]);
// let output = identity("myString");

//? 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

//? 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

