package com.example.springbootbasic.components;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.Servlet;

//定义 切面
//切点用于准确定位应该在什么地方应用切面的通知
//通知和切点是切面的最基本元素。

@Aspect
@Component
public class Audience {
  /**
   * 可复用的切点
   */
  @Pointcut("execution(* com.example.springbootbasic.components.SleepNoMore.perform(..))")
  public void perform() {

  }
// execution(modifiers-pattern?  修饰符匹配
// ret-type-pattern  返回值匹配
// declaring-type-pattern?   类路径匹配
// name-pattern(param-pattern)throws-pattern?)  方法名匹配(参数匹配)异常类型匹配  其中？代表可选项

  /**
   * 切面的通知
   *
   * 前置通知：在方法执行前执行的代码
   * @param joinPoint
   */
  @Before("perform()")
  public void takeSeats(JoinPoint joinPoint) {
    System.out.println("Taking seats");
  }

  /**
   * 表演之前,将手机调至静音
   */
  @Before("perform()")
  public void silenceCellPhones(JoinPoint joinPoint) {
    System.out.println("Silencing cell phones");
  }

  /**
   * 后置通知：在方法执行后执行的代码(无论该方法是否发生异常),注意后置通知拿不到执行的结果
   * @param joinPoint
   */
  @After("perform()")
  public void finish(JoinPoint joinPoint) {
    System.out.println("perform finish");
  }

  /**
   * 后置返回通知：在方法正常执行后执行的代码,可以获取到方法的返回值
   * @param joinPoint
   */
  @AfterReturning(value="perform()",returning="result")
  public void applause(JoinPoint joinPoint, Object result) {
    System.out.printf("returning==== "  + result +"\n");
    System.out.println("CLAP CLAP CLAP!!!");
  }

  /**
   * 后置异常通知：在方法抛出异常之后执行,可以访问到异常信息,且可以指定出现特定异常信息时执行代码
   * @param joinPoint
   */
  @AfterThrowing(value = "perform()",
    throwing="exception")
  public void demandRefund(JoinPoint joinPoint, Exception exception) {
    System.out.println("Demanding a refund");
  }


  /**
   * 环绕通知, 围绕着方法执行
   */
//  @Around("perform()")
//  public void watchPerform(ProceedingJoinPoint joinPoint) {
//    try {
//      System.out.println("Taking seats");
//      System.out.println("Silencing cell phones");
//
//      joinPoint.proceed();  //注意
//
//      System.out.println("CLAP CLAP CLAP!!!");
//    } catch (Throwable throwable) {
//      System.out.println("Demanding a refund");
//    } finally {
//      System.out.println("perform finish");
//    }
//  }


}
