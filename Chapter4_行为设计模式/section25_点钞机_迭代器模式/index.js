/**
 * ES6中的迭代器 Iterator 相信大家都不陌生，迭代器用于遍历容器（集合）并访问容器中的元素，
 * 而且无论容器的数据结构是什么（Array、Set、Map等），迭代器的接口都应该是一样的，都需要遵循 迭代器协议。
 */
/**
 * 迭代器模式解决了以下问题：
 * 1.提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构
 * 2.提供遍历容器（集合）的能力而无需改变容器的接口
 *
 * 一个迭代器通常需要实现以下接口：
 * hasNext()：判断迭代是否结束，返回Boolean
 * next()：查找并返回下一个元素
 */

class Iterator{
    constructor(){
        this.item = item;
        this.index = 0;
    }
    hasNext(){
        return  this.index <= this.item.length-1;
    }
    next(){
        return this.item[this.index++];
    }
}


/** 验证一下迭代器是否工作：*/
const item = [1, 'red', false, 3.14];
const iterator = new Iterator(item);

while(iterator.hasNext()){
  console.log(iterator.next());
}

console.log('-------------------------------------------------');

/**
 * ES6提供了更简单的迭代循环语法 for...of，使用该语法的前提是操作对象需要实现 可迭代协议（The iterable protocol），
 * 简单说就是该对象有个Key为 Symbol.iterator 的方法，该方法返回一个iterator对象。
 */

// 比如我们实现一个 Range 类用于在某个数字区间进行迭代：

function Range(start,end){  
    return {
        [Symbol.iterator] : function(){
            return {
                next(){
                    if(start < end){
                        return {
                            value:start++,
                            done:false,
                        }
                    }
                    return {
                        done:true,
                        value:end,
                    }
                }
            }
        }
    }
} 
for (num of Range(1, 5)) {
    console.log(num);
}



