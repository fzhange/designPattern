package com.example.springbootbasic.config;

import com.example.springbootbasic.filters.BodyWrapperFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

  @Bean
  public FilterRegistrationBean registerBodyWrapperFilter() {
    FilterRegistrationBean<BodyWrapperFilter> bean = new FilterRegistrationBean<>();

    bean.setOrder(1);
    bean.setFilter(new BodyWrapperFilter());
    bean.addUrlPatterns("/*");

    return bean;
  }

}
