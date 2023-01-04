package com.example.springbootbasic.components;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class TomTest {
  @Resource
  Tom tom;

  @Autowired
  Dog dog;

  @Autowired
  Cat cat;

  @Test
  void catchMouse(){
    tom.catchMouse();
  }

  @Test
  void Animal(){
    dog.speak();
    cat.speak();
  }
}
