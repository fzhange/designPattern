/**
 * React Hooks 原理  
 * https://github.com/brickspert/blog/issues/26
 */
let stateMemorize = [];
let indicator = 0;

function useState(initialState){
  stateMemorize[indicator] = stateMemorize[indicator] || initialState;
  
  let nowIndicator = indicator;
  function setState(newState){
    stateMemorize[nowIndicator] = newState;
    //render
  }

  return [stateMemorize[indicator++],setState]
}


function useEffect(callbak,depArray){
  let deps = stateMemorize[indicator];
  let changed = false
  let changed = !!deps ? !deps.every((item,idx)=>depArray[i] = item) : true;

  if(!depArray || changed){
    callbak();
    stateMemorize[indicator] = depArray;
  }
  indicator++;
}




function Hello(){
  let [count,setCount] = useState(0);
  let [name,setName] = useState('zf');
}