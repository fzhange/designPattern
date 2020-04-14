import {observable,action,computed} from "mobx";
//依赖收集
class store {
  @observable 
  name = "zf";
  @observable
  todos = [];
  @computed
  get completedTodosCount(){
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }
  @action
  async changeName(name){
    this.name = name;
  }
}
function observable(){}



