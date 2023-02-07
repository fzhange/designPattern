package com.example.springbootbasic.javaGrammar;

import org.junit.jupiter.api.Test;

import java.util.Collection;

class Count{
  String name;

  Count(String name){
      this.name = name;
  }

  void start(){
    new Thread(
      ()->{
        for (int i=4;i>=0;i--){
          try {
            Thread.sleep(1000);
            System.out.println(name+" >>> "+i);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      },"name"
    ).start();
  }
}

class Hello {
  public static void main(String[] args) {
    new Count("a").start();
    new Count("b").start();
  }
  public String toString() { return "Hello Hoolee"; }
}

public class AnonymousClassTest {
  @Test
  public void tt(){

  }
}
