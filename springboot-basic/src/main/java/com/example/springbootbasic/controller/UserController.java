package com.example.springbootbasic.controller;

import com.example.springbootbasic.Service.UserService;
import com.example.springbootbasic.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
  @Autowired
  private UserService userService;

  @RequestMapping("user/{id}")
  public User GetUser(@PathVariable int id){
    return userService.QueryById(id);
  }
}
