package com.example.springbootbasic.components;

import net.minidev.json.JSONObject;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

//System  类学习

public class LoginInterceptor implements HandlerInterceptor {

//  private StringBuffer getRequestBody(HttpServletRequest request){
//    StringBuffer data = new StringBuffer();
//    BufferedReader reader = null;
//    String line = null;
//    try {
//      reader = request.getReader();
//      while (null != (line = reader.readLine()))
//        data.append(line);
//    } catch (IOException e) {
//    } finally {
//    }
//    return data;
//  }


  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    long startTime = System.currentTimeMillis();

    System.out.println("\n-------- LogInterception.preHandle --- ");
    System.out.println(""
        + "Request URL: " + request.getRequestURL()
        + "Request Method: " + request.getMethod()
//        + "Request Body: " + getRequestBody(request)
    );

    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    System.out.println("\n-------- LogInterception.postHandle --- ");
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    System.out.println("\n-------- LogInterception.afterCompletion --- ");
    long endTime = System.currentTimeMillis();
    System.out.println("End Time: " + endTime);
  }
}
