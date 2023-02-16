package com.example.springbootbasic.filters;


import com.example.springbootbasic.components.CustomHttpServletRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


//@Component + @Order 注解方式配置简单，支持自定义 Filter 顺序。
// 缺点是只能拦截所有URL，不能通过配置去拦截指定的 URL 。
@Component
@Order(1) //数字越小 越先执行
public class MyFilter implements Filter {

//  @Autowired
//  private CustomHttpServletRequestWrapper customHttpServletRequestWrapper;

  private Logger logger = LoggerFactory.getLogger(MyFilter.class);


  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
  }

  @Override
  public void doFilter(ServletRequest servletRequest,
                       ServletResponse servletResponse,
                       FilterChain filterChain) throws IOException, ServletException {
    logger.info("MyFilter");
    ServletRequest requestWrapper = null;
    if (servletRequest instanceof HttpServletRequest) {
      requestWrapper = new CustomHttpServletRequestWrapper((HttpServletRequest) servletRequest);
    }

    if (requestWrapper == null) {
      filterChain.doFilter(servletRequest, servletResponse);
    } else {
      filterChain.doFilter(requestWrapper, servletResponse);
    }
  }

  @Override
  public void destroy() {
  }
}

