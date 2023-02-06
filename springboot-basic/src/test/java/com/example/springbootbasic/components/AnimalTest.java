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
    int x = 10;
    dog.speak();
    cat.speak();
  }

  @Test
  void TestInit(){
     Animal an = new Animal();
     Animal an2 = new Animal();
  }



}
