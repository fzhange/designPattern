/**
 *在中介者模式中，中介者（Mediator）包装了一系列对象相互作用的方式，使得这些对象不必直接相互作用，
 *而是由中介者协调它们之间的交互，从而使它们可以松散偶合。当某些对象之间的作用发生改变时，不会立即影响其他的一些对象之间的作用，
 *保证这些作用可以彼此独立的变化。
 *
 * 中介者模式和观察者模式有一定的相似性，都是一对多的关系，也都是集中式通信，
 * 不同的是中介者模式是处理同级对象之间的交互，而观察者模式是处理Observer和Subject之间的交互。
 * 中介者模式有些像婚恋中介，相亲对象刚开始并不能直接交流，而是要通过中介去筛选匹配再决定谁和谁见面。
 */

 /**
 * 中介者模式比较常见的应用比如聊天室，聊天室里面的人之间并不能直接对话，而是通过聊天室这一媒介进行转发。
 * 一个简易的聊天室模型可以实现如下
 */

/**聊天室成员类：*/
 function Member(name) {
    this.name = name;
    this.chatroom = null;
  }
  
  Member.prototype = {
    // 发送消息
    send: function (message, toMember) {
      this.chatroom.send(message, this, toMember);
    },
    // 接收消息
    receive: function (message, fromMember) {
      console.log(`${fromMember.name} to ${this.name}: ${message}`);
    }
  }

//   聊天室类：
  function Chatroom() {
    this.members = {};
  }
  
  Chatroom.prototype = {
    // 增加成员
    addMember: function (member) {
      this.members[member.name] = member;
      member.chatroom = this;
    },
    // 发送消息
    send: function (message, fromMember, toMember) {
      toMember.receive(message, fromMember);
    }
  }

// 测试一下：
const chatroom = new Chatroom();
const bruce = new Member('bruce');
const frank = new Member('frank');

chatroom.addMember(bruce);
chatroom.addMember(frank);

bruce.send('Hey frank', frank);

// 输出：
// bruce to frank: hello frank
// 这只是一个最简单的聊天室模型，真正的聊天室还可以加入更多的功能，比如敏感信息拦截、
// 一对多聊天、广播等。得益于中介者模式，Member不需要处理和聊天相关的复杂逻辑，而是全部交给Chatroom，有效的实现了关注分离。

