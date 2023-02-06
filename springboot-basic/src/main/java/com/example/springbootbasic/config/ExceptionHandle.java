package com.example.springbootbasic.config;

import com.example.springbootbasic.controller.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionHandle {
  private Logger logger = LoggerFactory.getLogger(UserController.class);


  @ExceptionHandler(value =Exception.class)
  @ResponseBody
  public String exceptionHandler(Exception e){
    logger.error("全局异常捕获>>>:"+e);
    return "全局异常捕获,错误原因>>>"+e.getMessage();
  }

}
