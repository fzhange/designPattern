package com.example.springbootbasic.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
  private Integer id;
  private String name;
  private String passwd;

  public void setId(Integer id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setPasswd(String passwd) {
    this.passwd = passwd;
  }

  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getPasswd() {
    return passwd;
  }
}
