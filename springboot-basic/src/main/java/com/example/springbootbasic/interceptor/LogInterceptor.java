package com.example.springbootbasic.interceptor;

import com.example.springbootbasic.components.CustomHttpServletRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

//System  类学习
public class LogInterceptor implements HandlerInterceptor {

  private Logger logger = LoggerFactory.getLogger(LogInterceptor.class);


  private StringBuffer getRequestBody(HttpServletRequest request) {
    StringBuffer data = new StringBuffer();

    BufferedReader reader = null;
    String line = null;

    try {
      reader = request.getReader();
      while (null != (line = reader.readLine()))
        data.append(line);
    } catch (IOException e) {
    } finally {
    }
    return data;
  }


  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    logger.info("-------- LogInterception.preHandle --- ");

    StringBuffer url = new StringBuffer(request.getRequestURL());
    String queryStr = request.getQueryString();
    if (queryStr != null && !queryStr.equals("")) url.append("?" + queryStr);

    CustomHttpServletRequestWrapper wrapper = (CustomHttpServletRequestWrapper) request;
    String body = new String(wrapper.getBody());

    logger.info(
      "\n Request URL: " + url
        + "\n Request Method: " + request.getMethod()
        + "\n Request Body: " + body
    );
    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    logger.info("\n-------- LogInterception.postHandle --- ");
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    logger.info("\n-------- LogInterception.afterCompletion --- ");
  }
}
