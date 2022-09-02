package fzhangeAlgorithmNote.basicAlgorithm;

import java.util.ArrayList;

public class Sort {

    // public static void main(String[] args) {
    //     ArrayList<Integer> list = new ArrayList<Integer>();
    //     list.add(3);
    //     list.add(2);
    //     list.add(1);
    //     list.add(4);
    //     // ArrayList<Integer> newList = Sort.selectSort(list);
    //     // ArrayList<Integer> newList = Sort.bubbleSort(list);
    //     ArrayList<Integer> newList = Sort.quickSort(list);
    //     for (Integer object : newList) {
    //         System.out.println(object);
    //     }
    // }

    public static ArrayList<Integer> selectSort(ArrayList<Integer> list) {
        for (int i = 0; i <= list.size() - 2; i++) {
            for (int j = i + 1; j <= list.size() - 1; j++) {
                int currentNum = list.get(i);
                int iterationNum = list.get(j);
                if (currentNum > iterationNum) {
                    list.set(i, iterationNum);
                    list.set(j, currentNum);
                }
            }
        }
        return list;
    }

    public static ArrayList<Integer> bubbleSort(ArrayList<Integer> list) {
        for (int i = list.size() -1; i>0; i--) {
            for (int j = 0; j < i; j++) {
                int currentNum = list.get(j);
                int nextNum = list.get(j+1);
                if(currentNum > nextNum){
                    list.set(j+1, currentNum);
                    list.set(j,nextNum);
                }
            }
        }
        return list;
    }

    public static ArrayList<Integer> quickSort(ArrayList<Integer> list) {
        if(list.size() <= 1) return list;
        ArrayList<Integer> leftList = new ArrayList<Integer>();
        ArrayList<Integer> rightList = new ArrayList<Integer>();
        int middle = (int)Math.ceil(list.size()/2);
        for (int i = 0; i < list.size(); i++) {
            if(i == middle) continue;
            if(list.get(i) <= list.get(middle)) leftList.add(list.get(i));
            else rightList.add(list.get(i));
        }
        ArrayList<Integer> newList = new ArrayList<Integer>();
        newList.addAll(quickSort(leftList));
        newList.add(list.get(middle));
        newList.addAll(quickSort(rightList));
        return newList;
    }
}
