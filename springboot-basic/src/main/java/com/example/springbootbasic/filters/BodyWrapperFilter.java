package com.example.springbootbasic.filters;


import com.example.springbootbasic.components.CustomHttpServletRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


public class BodyWrapperFilter implements Filter {

  private Logger logger = LoggerFactory.getLogger(BodyWrapperFilter.class);


  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
  }

  @Override
  public void doFilter(ServletRequest servletRequest,
                       ServletResponse servletResponse,
                       FilterChain filterChain) throws IOException, ServletException {
    logger.info("-------- this is  BodyWrapperFilter doFilter --- ");
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

