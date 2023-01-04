package com.example.springbootbasic;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.springbootbasic.mapper")
public class SpringbootBasicApplication {

  public static void main(String[] args) {
    SpringApplication.run(SpringbootBasicApplication.class, args);
  }

}
