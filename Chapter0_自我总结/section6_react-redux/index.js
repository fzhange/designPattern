let React = {
  Component: {},
  createContext() {}
};

const mapStateToProps = status => {
  return {
    counter: status.counter
  };
};

const mapDispatchToProps = (dispath, ownProps) => {
  return {
    increment: count => dispath({ type: INCREMENT, count }),
    decrement: count => dispath({ type: DECREMENT, count })
  };
};

let connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  return class Connect extends React.Component {
    //通过context上下文 来获取 store
    constructor(props) {
      this.store = StoreContext;
      super(props);
      (this.state = mapStateToProps(this.store.getState())),
        (this.dispatch = mapDispatchToProps(this.store.dispatch));
    }
    componentDidMount() {
      this.unSubscrible = this.store.subscrible(() => {
        this.state({
          ...mapStateToProps(this.store.getState())
        });
      });
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          {...this.dispatch}
        ></WrappedComponent>
      );
    }
  };
};

let StoreContext = React.createContext();
class Provider extends React.Component {
  constructor(props) {
    super(props);
  }
  static childContextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }).isRequired
  };
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
      <StoreContext.Provider value={this.props.store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default {
  connect,
  Provider
};

/**
 * 在实际应用中，一个组件可能被多个 HOC增强，我们使用的是被所有的 HOC增强后的组件
 * 高阶组件实际上就是装饰器模式
 * 假设现在我们有 logger， visible， style等多个 HOC，现在要同时增强一个 Input组件：
 * logger(visible(style(Input)))
 * 所以我们封装一个组合函数 以装饰器模式来增强组件 即套娃模式
 * 
 * 
 * 后续es7新增装饰器模式 可方便实现套娃 示例如下
 * @logger
 * @visible
 * @style
 * class Input extends Component{}
 */
function compose(){
    let arr = Array.prototype.slice.call(arguments);  //Array.from(arguments)
    /**
     *  let q = ()=> fun_0(fun_1(fun_2(fun_3(...args))))
    * */
    let q = arr.reduce((pre,curr,idx,arr)=>{
        return function(...args){
            pre(curr(...args))
        }
    })
    //q其实就是最终的装饰器 装饰的是传递进来的东西
    return q;
}

function fun_0(some){
    console.log(`${some}_0`);
    return `${some}_0`
}
function fun_1(some){
    console.log(`${some}_1`);
    return `${some}_1`
}
function fun_2(some){
    console.log(`${some}_2`);
    return `${some}_2`
}
function fun_3(some){
    console.log(`${some}_3`);
    return `${some}_3`
}
let fun  = compose(fun_0,fun_1,fun_2,fun_3)
fun('zf') //zf_3 zf_3_2 zf_3_2_1 zf_3_2_1_0
// 等价于  @fun 'zf'

