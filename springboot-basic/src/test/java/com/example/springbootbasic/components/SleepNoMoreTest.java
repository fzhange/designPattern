package com.example.springbootbasic.components;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SleepNoMoreTest {
  @Autowired
  private SleepNoMore sleepNoMore;

  @Test
  void performTest(){
    String endString = sleepNoMore.perform();
    System.out.printf("endString"+endString);
  }

}
