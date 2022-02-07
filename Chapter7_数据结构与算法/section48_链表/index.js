/**
 * 1 链表的创建 
 * 2 环形链表的判断  
 *   2.1 快慢指针法； 
 *   2.2 标志法  
 *   2.3 hashmap法
 *     如果我们用一个 Set 保存已经访问过的节点，我们可以遍历整个列表并返回第一个出现重复的节点。
 * 3 寻找环形指针的入口节点
 *   法一：标志法  
 *   法二：通过快慢指针,先找到 相遇节点。 找到的相遇点，
 *      首先我们初始化额外的两个指针： ptr1 ，指向链表的头， ptr2 指向相遇点。
 *      然后，我们每次将它们往前移动一步，直到它们相遇，它们相遇的点就是环的入口，返回这个节点。
 *   法三：hashmap 法
 *      如果我们用一个 Set 保存已经访问过的节点，我们可以遍历整个列表并返回第一个出现重复的节点。
 */

function creatLink(arr, cycle = false) {
  function Link(val) {
    this.val = val;
    this.next = null;
    this.pre = null;
  }
  let headObj = preObj = {   //表头 
    next: ""
  }
  arr.forEach((item, idx) => {
    let obj = new Link(item);
    if (cycle) {
      if (idx + 1 == arr.length) {  //形成环
        obj.next = headObj.next.next;
      }
    }
    obj.pre = preObj;
    preObj.next = obj;
    preObj = preObj.next;
  })
  return headObj; 
}


function isCycle() {
  let arr = [1, 2, 3, 4, 5] //1>2>3>4>5>null
  // let headObj = creatLink(arr,false); //无环
  let headObj = creatLink(arr, true); //有环
  console.log(headObj);

  // 标志法 O(n)   判断链表有没有环   真的是个好办法   可以利用此办法寻找环的入口节点
  // while(headObj.next){
  //   let nowNode =  headObj.next;
  //   if(nowNode.flag) return -1; //表明有环 
  //   else{
  //     nowNode.flag = true;
  //     console.log(nowNode.val);
  //     headObj = headObj.next;
  //   }
  // }

  //快慢指针法  快指针一次走两次 慢指针一次走一次  终止条件Null 或者 快慢指针指向的节点相同  龟兔赛跑的故事
  let fastPointer = headObj;
  let slowPointer = headObj;
  while (fastPointer && slowPointer) {
    fastPointer = fastPointer?.next?.next;
    slowPointer = slowPointer?.next;
    if (!fastPointer || !slowPointer) return false;
    if (fastPointer.val == slowPointer.val) return true;
  }
  return false; //无环
}
console.log('isCycle(): ', isCycle());



function deleteNode(idx = 2) { //idx 从1开始
  let arr = [1, 2, 3, 4, 5, 6] //1>2>3>4>5>6>null  
  let headObj = pointer = creatLink(arr, false);
  let count = 0;
  while (pointer.next) {
    if (count + 1 == idx) {
      pointer.next = pointer.next.next;
      break;
    }
    pointer = pointer.next;
    count++
  }
  return headObj;
}
console.log('deleteNode(): ', deleteNode());



