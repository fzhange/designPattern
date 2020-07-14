import React from "react";
import ReactDOM from "react-dom";
import Redux, {createStore} from "redux";

// create actions
const ADD_ACTION = "ADD";
const REDUCE_ACTION = "REDUCE";

const add = num => {
  return {
    type: ADD_ACTION,
    num
  };
};

const reduce = num => {
  return {
    type: REDUCE_ACTION,
    num
  };
};

// initialize a state
const initialState = {
  count: 0
};

// create a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return Object.assign({}, state, {
        count: state.count + action.num
      });

    case "REDUCE":
      return Object.assign({}, state, {
        count: state.count - action.num
      });

    default:
      return state;
  }
};

function getCurrentState() {
  return reduxStore.getState();
}

function addState() {
  reduxStore.dispatch(add(1));
  console.log(getCurrentState());
}

function reduceState() {
  reduxStore.dispatch(reduce(1));
  console.log(getCurrentState());
}

const reduxStore = createStore(reducer);
console.log(reduxStore.getState());

class App extends React.Component {
  constructor(props) {
    super(props);
    //初始化 state
    this.state = getCurrentState();
  }

  render() {
    return (
      <div>
        <h1>A Redux Example, open console to check results.</h1>
        <button onClick={addState}>add</button>
        <button onClick={reduceState}>reduce</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);