let React = {
    Component:{},
    createContext(){}
}

const mapStateToProps = (status) => {
    return {
        counter:status.counter,
    }
}

const mapDispatchToProps = (dispath,ownProps) => {
    return {
        increment:(count)=>dispath({ type:INCREMENT,count}),
        decrement:(count)=>dispath({ type:DECREMENT,count}),
    }
}

let connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent)=>{
    return class Connect extends React.Component {
        //通过context上下文 来获取 store 
        constructor(props){
            this.store = StoreContext;
            super(props);
            this.state = mapStateToProps(this.store.getState()),
            this.dispatch = mapDispatchToProps(this.store.dispatch)
        }
        componentDidMount() {
            this.unSubscrible = this.store.subscrible(()=>{
                this.state({
                    ...mapStateToProps(this.store.getState())
                })
            })   
        }
        render () {
            return (
                <WrappedComponent {...this.props} {...this.state} {...this.dispatch}>
                </WrappedComponent>
            )
        }
    }
}


let StoreContext = React.createContext();
class Provider extends React.Component{
    constructor(props){
        super(props);
    }
    static childContextTypes = {
        store: PropTypes.shape({
            subscribe: PropTypes.func.isRequired,
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired
        }).isRequired
    }
    constructor(props) {
        super(props);
        this.store = props.store;
    }

    render(){
        return (
            <StoreContext.Provider value={this.props.store}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
    
}

export default {
    connect,
    Provider
}