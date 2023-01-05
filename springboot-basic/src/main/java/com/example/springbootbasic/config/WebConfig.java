package com.example.springbootbasic.config;

import com.example.springbootbasic.components.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LoginInterceptor());

//    registry.addInterceptor(new OldLoginInterceptor()).addPathPatterns("/admin/oldLogin");
//    registry.addInterceptor(new AdminInterceptor()).addPathPatterns("/admin/*").excludePathPatterns("/admin/oldLogin");
  }

//  LogInterceptor 拦截器用于拦截所有请求；
//  OldLoginInterceptor 用来拦截链接  “ / admin / oldLogin”，它将重定向到新的 “ / admin / login”。；
//  AdminInterceptor用来拦截链接 “/admin/*”，除了链接  “ / admin / oldLogin”。

}
