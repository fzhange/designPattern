/** 
 * 单例模式中Class的实例个数最多为1 
 * 当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上了用场。
 * 而除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态。
 * 
*/

/**
 * 实现单例模式需要解决以下几个问题：
 * 
 * 如何确定Class只有一个实例？
 * 如何简便的访问Class的唯一实例？
 * Class如何控制实例化的过程？
 * 如何将Class的实例个数限制为1？
 */


const fun = (function(){
  let instance = null;
  function Person(){}
  return {
    getInstance(){
      if(!instance) {
        instance = new Person();
      }
      return instance;
    }
  }
})()
