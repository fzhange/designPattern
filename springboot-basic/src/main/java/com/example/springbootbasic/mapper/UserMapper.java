package com.example.springbootbasic.mapper;

import com.example.springbootbasic.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


//@Mapper
@Repository
@Transactional(rollbackFor = Throwable.class)
public interface UserMapper {

  @Transactional(readOnly = true)
  @Select("select * from user where id = #{id}")
  User QueryById(int id);

  @Insert("insert into user (name,passwd) values (#{name},#{passwd})")
  int insertUser(User user);

  @Delete("delete from user where id = #{id}")
  int deleteUser(int id);

  @Update("update  user set name=#{name},passwd=#{passwd} where id=#{id}")
  int updateUser(User user);
}
