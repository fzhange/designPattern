package com.example.springbootbasic.Service;

import com.example.springbootbasic.entity.User;
import com.example.springbootbasic.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  UserMapper userMapper;

  public User QueryById(int id){
    return userMapper.QueryById(id);
  }
}
