package com.example.springbootbasic.controller;

import com.example.springbootbasic.Service.UserService;
import com.example.springbootbasic.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  private UserService userService;

  @RequestMapping("/get/{id}")
  public User GetUser(@PathVariable int id){
    return userService.QueryById(id);
  }

  @RequestMapping(value = "/addUser",method = RequestMethod.POST)
  public int addUser(@RequestBody User user){
    return userService.addUser(user);
  }

  @RequestMapping(value = "/delete/{id}",method = RequestMethod.GET)
  public int deleteUser(@PathVariable int id){
    return userService.deleteUser(id);
  }

  @PostMapping("/update")
//  @RequestMapping(value = "/update/${id}", method = RequestMethod.POST)
  public int updateUser(@RequestBody User user){
    return userService.updateUser(user);
  }
}
