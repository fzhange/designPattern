import './App.css';
// import LogicFlowSample from './components/logic-flow-sample/index';

function App() {
  return (
    <div className="App">
      {/* <LogicFlowSample></LogicFlowSample> */}
      <div onClick={()=>{
        console.log(12312);
      }}>
123
      </div>
      <input onChange={()=>{
        console.log(999);
      }} />
    </div>
  );
}

export default App;
