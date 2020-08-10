/**
 * 首先，一切皆可代理，不管是在实现世界还是计算机世界。现实世界中买房有中介、打官司有律师、投资有经纪人，
 * 他们都是代理，由他们帮你处理由于你缺少时间或者专业技能而无法完成的事务。
 * 类比到计算机领域，代理也是一样的作用，当访问一个对象本身的代价太高（比如太占内存、初始化时间太长等）或者需要增加额外的逻辑又不修改对象本身时便可以使用代理
 *  ES6中也增加了 Proxy 的功能。
 */

 /**
  * 归纳一下，代理模式可以解决以下的问题：
  * 增加对一个对象的访问控制
  * 当访问一个对象的过程中需要增加额外的逻辑
  */

  /**
   * 要实现代理模式需要三部分：
   * 1. Real Subject：真实对象
   * 2. Proxy：代理对象
   * 3. Subject接口：Real Subject 和 Proxy都需要实现的接口，这样Proxy才能被当成Real Subject的“替身”使用
   */

// 比如有一个股票价格查询接口，调用这个接口需要比较久的时间（用 setTimeout 模拟2s的调用时间）：
function StockPriceAPI() {
    // Subject Interface实现
    this.getValue = function (stock, callback) {
      console.log('Calling external API ... ');
      setTimeout(() => {
        switch (stock) {
          case 'GOOGL':
            callback('$1265.23');
            break;
          case 'AAPL':
            callback('$287.05');
            break;
          case 'MSFT':
            callback('$173.70');
            break;
          default:
            callback('');
        }
      }, 2000);
    }
  }
  //我们不希望每次都去请求远程接口，而是增加缓存机制，当有缓存的时候就直接从缓存中获取，否则再去请求远程接口。我们可以通过一个proxy来实现：
  function StockPriceAPIProxy() {
    // 缓存对象
    this.cache = {};
    // 真实API对象
    this.realAPI = new StockPriceAPI();
    // Subject Interface实现
    this.getValue = function (stock, callback) {
      const cachedPrice = this.cache[stock];
      if (cachedPrice) {
        console.log('Got price from cache');
        callback(cachedPrice);
      } else {
        this.realAPI.getValue(stock, (price) => {
          this.cache[stock] = price;
          callback(price);
        });
      }
    }
  }

//   注意，Proxy需要和真实对象一样实现 getValue() 方法，getValue()就属于 Subject 接口。
// 测试一下：
const api = new StockPriceAPIProxy();
api.getValue('GOOGL', (price) => { console.log(price) });
api.getValue('AAPL', (price) => { console.log(price) });
api.getValue('MSFT', (price) => { console.log(price) });

setTimeout(() => {
  api.getValue('GOOGL', (price) => { console.log(price) });
  api.getValue('AAPL', (price) => { console.log(price) });
  api.getValue('MSFT', (price) => { console.log(price) });
}, 3000)

//输出：

// Calling external API ...
// Calling external API ...
// Calling external API ...
// $1265.23
// $287.05
// $173.70
// Got price from cache
// $1265.23
// Got price from cache
// $287.05
// Got price from cache
// $173.70