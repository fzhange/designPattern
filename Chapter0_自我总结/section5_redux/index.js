function createStore(reducer){
    let state = {};
    let observers = [];
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
      observers.forEach((observer)=>{
        observer();
      })
      state = reducer(state,action);
    }
    /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
    dispatch({ type: Symbol() })
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













  