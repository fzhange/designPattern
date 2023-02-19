package com.example.springbootbasic.components;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 看下@Configuration  @Bean的实践
 */
@Configuration
public class Animal {

  public void init() {
    System.out.println("this is a init method");
  }


  static {
    System.out.println("this is static block");
  }

  class Dog {
    public void speak() {
      System.out.println("wang wang");
    }
  }

  class Cat {
    public void speak() {
      System.out.println("miao miao");
    }
  }

  @Bean
  public Dog getDog() {
    return new Dog();
  }

  @Bean
  public Cat getCat() {
    return new Cat();
  }
}







