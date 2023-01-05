package com.example.springbootbasic.components;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class AnimalTest {

  @Autowired
  Dog dog;

  @Autowired
  Cat cat;

  @Test
  void Animal(){
    dog.speak();
    cat.speak();
  }
}
