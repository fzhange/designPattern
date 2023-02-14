package com.example.springbootbasic.components;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class AnimalTest {



  @Test
  void Animal(){

  }

  @Test
  void TestInit(){
     Animal an = new Animal();
     Animal an2 = new Animal();
  }



}
