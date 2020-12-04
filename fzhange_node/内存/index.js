/**
 * ?V8的内存限制原因
 * V8引擎 64位系统 1.4G 32位系统0.7G。  
 * 1. 客户端不需要大内存
 * 2. 垃圾回收耗时;如果内存过大，垃圾回收时间过长，导致js线程得不到执行。
 * 
 * ?V8的垃圾回收机制
 * 见《深入浅出nodejs》
 * 
 * ?内存
 * 进程中的内存总共有几部分；1.rss 进程常驻内存 2.swap交换区 3.filesystem
 * ? node内存
 * rss = 堆内内存 + 堆外内存【由C++层面直接申请的内存空间】 (eg:Buffer内存)
 * 
 * ? 内存泄漏
 * 
 * 1.将内存当做缓存
 * 通常javascript开发者喜欢将一个对象当做缓存使用;对象一般没有严格的过期策略;
 * >问题的解决:合适的过期策略处理，如LRU算法缓存; last recent used;
 * >进程外缓存工具的使用； 如redis;  进程外缓存可实现多进程资源共享，同时第三方库有这完善的缓存过期淘汰处理策略，以及内存管理策略。
 * 
 * 
 * 2.充当生产者消费者中间产物的全局队列
 * 当消费者的消费速度 << 生产者的生产速度    导致队列堆积
 * 比如日志收集处理，如果用数据库作记录日志;因为数据库写入慢的特性; 海量的数据可能造成写入堆积。也就是队列积压问题。
 * > 普通解决方案：消费者升级，提升消费速度。   缺陷：生产者由于不可控因素生产速度暴增 或者消费者的不可控因素消费能力暴跌。
 * > 深度解决方案：
 *   1.监控队列长度，一旦造成堆积触发监控，通知相关人员。
 *   2.针对任意的异步调用设置超时机制，一旦在限定的时间内未完成响应，通过回调函数传递超时异常。
 * 
 * ?内存泄漏排查
 * 见《深入浅出nodejs》
 * 
 * ?数据库
 * 数据库是建立在文件系统之上；一般数据库的写入效率是低于文件的直接写入的。
 * 
 */

 /**
  * 
    v8垃圾回收算法
    V8的垃圾回收算法：分代式垃圾回收机制
    老生代64位系统32MB 32位系统16MB
    新生代垃圾回收算法 Scavenge。内存一分为二。两个semispace 即from semispace & to semispace。
    老生代垃圾回收算法 mark sweep & mark compact  因为标记清除存在 内存碎片的问题，所以有了标记整理算法。 
    后来由于老生代一次全量的垃圾处理时间太长 有了 incremental mark 增量标记算法。
  */


function showMemroy(){
    var format = function(bytes){
        return `${(bytes/1024/1024).toFixed(2)}MB`;
    }
    var {rss,heapTotal,heapUsed} = process.memoryUsage();
    console.log(`rss: ${format(rss)} -- heapTotal: ${format(heapTotal)} -- heapUsed: ${format(heapUsed)}`);
}

//堆内内存使用
function useHeapMemory(){
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);  
    for(let i=0;i<size;i++){
        arr[i] = 0;
    }
    return arr;
}
function useOutHeapMemory(){
    var size = 20 * 1024 * 1024;
    var buff = Buffer.alloc(size,0);
    for(let i=0;i<size;i++){
        buff[i] = '0';
    }
    return buff;
}

var total = [];
for(j=0;j<15;j++){
    console.log(`------------${j}-------------`);
    showMemroy();
    // total.push(useMemory());
    total.push(useOutHeapMemory());
}