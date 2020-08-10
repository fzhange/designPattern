/**
 * 访问者模式是一种将算法与对象结构分离的设计模式，
 * 通俗点讲就是：访问者模式让我们能够在不改变一个对象结构的前提下能够给该对象增加新的逻辑，
 * 新增的逻辑保存在一个独立的访问者对象中。
 * 访问者模式常用于拓展一些第三方的库和工具。
 */
/**
 * 访问者模式的实现有以下几个要素：
 * 1. Visitor Object：访问者对象，拥有一个 visit() 方法
 * 2. Receiving Object：接收对象，拥有一个 accept() 方法
 * 3. visit(receivingObj)：用于Visitor接收一个Receiving Object
 * 4. accept(visitor)：用于Receving Object接收一个Visitor，并通过调用Visitor的 visit() 为其提供获取Receiving Object数据的能力
 */

// Receiving Object：
function Employee(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  
  Employee.prototype = {
    getSalary: function () {
      return this.salary;
    },
    setSalary: function (salary) {
      this.salary = salary;
    },
    accept: function (visitor) {
      visitor.visit(this);
    }
}

// Visitor Object：
function Visitor() { }

Visitor.prototype = {
  visit: function (employee) {
    employee.setSalary(employee.getSalary() * 2);
  }
}

// 验证一下：
const employee = new Employee('bruce', 1000);
const visitor = new Visitor();
employee.accept(visitor);

console.log(employee.getSalary());  
// 2000

