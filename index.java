/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class ListNode{
  int val;
  ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
public class Solution {
  public ListNode detectCycle(ListNode head) {
    ListNode fast = head;
    ListNode slow = head;
    while(fast != null && fast.next !=null && slow !=null){
      fast = fast.next.next;
      slow = slow.next;
      if(slow == fast) { 
        slow = head;
        while(slow != fast){
          slow = slow.next;
          fast = fast.next;
        }
        return slow;
      }
    }
    return null;
  }
}