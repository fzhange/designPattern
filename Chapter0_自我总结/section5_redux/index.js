/**
 * @param {*} reducer 
 * @param {*} initialState 
 * @param {*} enhancer 增强dispatch函数 
 */
function createStore(reducer,initialState={},enhancer){
    if(enhancer && typeof enhancer == 'function'){
      return enhancer(createStore)(reducer,initialState);
    }

    let state = initialState;
    let observers = [];
    let isDispatched = false;
    function getState(){
      return state;
    }
    function subscrible(observer){
      observers.push(observer);
      return function unsubscrible(){
        observers = observers.filter((_o)=>{
          return _o != observer;
        })
      }
    }
    function dispatch(action){
      if(isDispatched) return action; //加入锁的逻辑 避免多个action同时发送造成store混乱;
      isDispatched = true;
      state = reducer(state,action);
      isDispatched = false;
      observers.forEach((observer)=>{
        observer();
      })
      return action;
    }

    return {
      getState,
      subscrible,
      dispatch,
    }
  }
  
  function combineReducer(reducerObj){
    return function(action,state){
      let newState = {};
      Object.keys(reducerObj).forEach((key)=>{
        newState[key] = reducerObj[key](action,state[key]);
      });
      return newState;
    }
  }

  /**
   * enhancer 中间件增强dispatch的原理
   */
  const logger = ()=>{
    return (createStore)=>(reducer,initialState)=>{
      /**
       * 重写dispatch  有点秀
       */
      let store = createStore(reducer,initialState);
      function dispatch(action){
        console.log(`before dispatch state=${store.getState()}`);
        //TODO ANY_THING
        store.dispatch(action);
        console.log(`after dispatch state=${store.getState()}`);
      }
      return {
        dispatch,
        ...store,
      }
    }
  }
  
  
  let store = createStore(
    combineReducer({
      color(state, action){
        switch(action.type) {
            case 'CHANGE_COLOR':
                return {
                    ...state,
                    color: action.color
                }
            default:
                return state;
        }
      }
    })
  )


  // function exceptionMiddleWare(store){
  //   return function(action){
  //     try{
  //       loggerMiddleWare(store)(action);
  //     }catch(e){
  //       console.log('e: ', e);
  //     }
  //   }
  // }

  /** ===========================手动添加中间件=========================================== */

  function exceptionMiddleWare(store){
    return function(next){
      return function(action){
        try{
          console.log('exceptionMiddleWare:');
          next(action);
        }catch(e){
          console.log('e: ', e);
        }
      }
    }
  }

  function loggerMiddleWare(store){
    return function(next){
      return function(action){
        console.log('loggerMiddleWare');
        next(action);
      }
    }
  }

  store.dispatch =  exceptionMiddleWare(store)(loggerMiddleWare(store)(store.dispatch))
  store.dispatch({  //利用monkey patch 实现中间新增exceptionMiddleware loggerMiddleware
    type:"CHANGE_COLOR"
  })  //exceptionMiddleWare loggerMiddleWare

  /** ====================================================================== */

  /** ===========================applyMiddleware添加中间件=========================================== */
    // function applyMiddleware(){
      
    // }
  /** ====================================================================== */













  