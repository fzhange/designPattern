package com.example.springbootbasic.components;

import org.springframework.stereotype.Component;

//定义目标对象

@Component
public class SleepNoMore {

  //连接点
  public String perform() {
    System.out.println("戏剧《不眠之夜Sleep No More》");
    return "thanks everyone. i have finished my perform";
  }
}
