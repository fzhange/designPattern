import './App.css';
// import LogicFlowSample from './components/logic-flow-sample/index';

import React from 'react'
import { Trans } from '@lingui/macro'
import styled from "styled-components"
import { func } from 'prop-types';



function H1({
  test
}){
  return <h1>{test}</h1>
}

function Text({
  Com
}){
  return (
    <div>
      {Com}
    </div>
  )
}


export default function Inbox() {
  let obj = {name:null};
  let {name = "ff"} = obj
  console.log("🚀 ~ file: App.js:31 ~ Inbox ~ name:", name);
  return (
    <div>
      <Text Com={<H1 test={"this is h1"}></H1>}>
      </Text>
    </div>
  )
}


