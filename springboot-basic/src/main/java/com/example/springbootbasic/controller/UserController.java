package com.example.springbootbasic.controller;

import com.example.springbootbasic.entity.User;
import com.example.springbootbasic.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

//@PathVariable是路径传参
//类似url/{version}{id}这样的

//RequestParam和QueryParam以及@PathParam都是采用键值对的方式取值
///getInfos?pageNum=1&pageSize=10&var2=111

@RestController
@RequestMapping("/user")
public class UserController {
  private Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  private UserService userService;

  @RequestMapping("/get/{id}")
  public User GetUser(@PathVariable int id) {
    return userService.QueryById(id);
  }

  @RequestMapping(value = "/addUser", method = RequestMethod.POST)
  public int addUser(@RequestBody User user) {
    return userService.addUser(user);
  }

  @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
  public int deleteUser(@PathVariable int id) {
    return userService.deleteUser(id);
  }

  @PostMapping("/update")
  // @RequestMapping(value = "/update/${id}", method = RequestMethod.POST)
  public int updateUser(@RequestBody User user) {
    return userService.updateUser(user);
  }

  @GetMapping("/errorTest")
  public int errorTest(@PathParam(value = "num") int num) {
    logger.info("" + num);
    return 100 / num;
  }
}
