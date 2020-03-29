class EventEmitter{
    constructor(){
      this.eventBus = [];
      this.onceEventBus = [];
    }

    /**
     * 注册事件
     */
    on(type,fun){
      if(this.eventBus[type]) this.eventBus[type].push(fun);
      else this.eventBus[type] = [fun];
    }
    /**
     * 注册事件只能被执行一次
     */
    once(type,fun){
      if (this.onceEventBus[type])this.onceEventBus[type] = this.onceEventBus[type].push(fun);
      else this.onceEventBus[type] = [fun];
    }

    fire(type){
      let arg = Array.prototype.slice.call(arguments,1);
      if(this.eventBus[type]) {
        this.eventBus[type].forEach(fun => {
          fun(...arg);
        });
      }

      if(this.onceEventBus[type]){
        this.onceEventBus[type].forEach(fun => {
          fun(...arg);
        });
        this.onceEventBus[type] = []
      }

    }
    /**
     * 删除注册事件
     */
    off(type,fun){
      if(this.eventBus[type]){
        this.eventBus[type] = this.eventBus[type].filter((el)=>{
          return el != fun;
        })
      } 
    }
  }


  let evt = new EventEmitter();

  evt.on('sayHi',(sayHi)=>{
    console.log('sayHi: ', sayHi);
  })
  evt.on('sayHi',(sayHi)=>{
    console.log('sayHi: ', sayHi);
  })
  evt.on('sayHello',(sayHello)=>{
    console.log('sayHello: ', sayHello);
  })
  evt.once('sayOnce',(sayOnce)=>{
    console.log('sayOnce: ', sayOnce);
  })


  evt.fire('sayHi','sayHi');
  evt.fire('sayOnce','sayOnce');

  evt.fire('sayHi','sayHi');
  evt.fire('sayOnce','sayOnce');