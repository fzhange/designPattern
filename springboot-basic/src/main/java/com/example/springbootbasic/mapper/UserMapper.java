package com.example.springbootbasic.mapper;

import com.example.springbootbasic.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;


@Repository
//@Mapper
public interface UserMapper {
  @Select("select * from user where id = #{id}")
  User QueryById(int id);
}
