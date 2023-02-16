package com.example.springbootbasic.components;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;
import java.nio.charset.StandardCharsets;

//ServletRequest、 HttpServletRequest、Request的联系与区别
//https://www.cnblogs.com/hun2014/articles/3850085.html

public class CustomHttpServletRequestWrapper extends HttpServletRequestWrapper {
  private byte[] body;

  public CustomHttpServletRequestWrapper(HttpServletRequest request) throws IOException {
    super(request);

    BufferedReader reader = request.getReader();

    try (StringWriter writer = new StringWriter()) {
      int read;
      char[] buf = new char[1024 * 8];
      while ((read = reader.read(buf)) != -1) {
        writer.write(buf, 0, read);
      }
      this.body = writer.getBuffer().toString().getBytes();
    }
  }

  public String getBody() {
    return new String(body, StandardCharsets.UTF_8);
  }

  @Override
  public ServletInputStream getInputStream() {
    final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body);
    return new ServletInputStream() {
      @Override
      public boolean isFinished() {
        return false;
      }

      @Override
      public boolean isReady() {
        return false;
      }

      @Override
      public void setReadListener(ReadListener readListener) {
      }

      @Override
      public int read() {
        return byteArrayInputStream.read();
      }
    };
  }

  @Override
  public BufferedReader getReader() {
    return new BufferedReader(new InputStreamReader(this.getInputStream()));
  }
}
