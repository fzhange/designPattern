import './App.css';
// import LogicFlowSample from './components/logic-flow-sample/index';

import React,{ useState, useEffect, useRef }  from 'react'
import styled, { css } from 'styled-components';



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    let stop = ()=>{
      clearInterval(id)
    }
   
    if(delay==null){
      stop()
    }
    if (delay !== null) {
      return stop;
    }
  }, [delay]);
}



const MyComponent = styled.div(
  ({ theme }) => css`
    color: 'red';
    background-color: 'blue';
    text-decoration: underline;
    mos-padding: '20px';
  `,
  {
    supportedCSSProperties: [
      'mos-padding',
      'color',
      'background-color',
      'border',
      'border-color',
      'border-radius',
      'border-style',
      'border-width',
    ],
  },
);

export default function Inbox() {
  let obj = { name: null };
  let { name = 'ff' } = obj;
  let [isDelay,setisDelay]  = useState(false);

  useInterval(()=>{
  console.log("----------------"); 
  },isDelay?null:1000);

  return (
    <div
      className="invalid_class"
      style={{ aaa: 'fff', mosPadding: '20px', background: 'green', invalidStyle: 'invalidStyle' }}
    >
      {
        undefined && <div onClick={()=>{
          setisDelay(!isDelay)
        }}>{isDelay}delay</div>
      }
      <MyComponent>12321</MyComponent>
      {/* <Texct Com={<H1 test={"this is h1"}></H1>}>
      </Texct> */}
    </div>
  );
}


