package fzhangeAlgorithmNote.Concept;

/**
 * 数组和链表是一切数据结构的基石。无论是树、图、队列、堆栈等等。
 * 数组的优点是查找元素快、缺点是内存分配的问题。
 * 链表的有点是内存分配合理、缺点是查找元素麻烦。而且指针会占用额外的空间。
 */

/**
 * 数据结构的基本操作、无非是遍历（线性）、递归（非线性）
 */

//? 基本链表单元
class ListNode{
    int val;
    ListNode next;
}

public class Concept{
    void traverse(int[] arr){
        for(int i=0;i<arr.length;i++){
            // TODO迭代访问数据
        }
    }

    void traverse(ListNode node){
        while(node!=null){
            // TODO迭代访问数据
            node = node.next;
        }
    }
    void recursion(ListNode node){
        if(node == null) return;
        // TODO先序
        recursion(node.next);
        // TODO后续
    }
}