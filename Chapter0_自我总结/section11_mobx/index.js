import {observable,action,computed} from "mobx";

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

function observable(){

}



