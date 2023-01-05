package com.example.springbootbasic.components;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

/**
 * 了解切面
 */

@Aspect
@Component
public class Audience {
  /**
   * 可复用的切点
   */
  @Pointcut("execution(* com.example.springbootbasic.components.SleepNoMore.perform(..))")
  public void perform() {
  }

  /**
   * 表演之前,观众就座
   */
  @Before("perform()")
  public void takeSeats() {
    System.out.println("Taking seats");
  }

  /**
   * 表演之前,将手机调至静音
   */
  @Before("perform()")
  public void silenceCellPhones() {
    System.out.println("Silencing cell phones");
  }

  /**
   * 表演结束,不管表演成功或者失败
   */
  @After("perform()")
  public void finish() {
    System.out.println("perform finish");
  }

  /**
   * 表演之后,鼓掌
   */
  @AfterReturning("perform()")
  public void applause() {
    System.out.println("CLAP CLAP CLAP!!!");
  }

  /**
   * 表演失败之后,观众要求退款
   */
  @AfterThrowing("perform()")
  public void demandRefund() {
    System.out.println("Demanding a refund");
  }

  @Around("perform()")
  public void watchPerform(ProceedingJoinPoint joinPoint) {
    try {
      System.out.println("Taking seats");
      System.out.println("Silencing cell phones");

      joinPoint.proceed();

      System.out.println("CLAP CLAP CLAP!!!");
    } catch (Throwable throwable) {
      System.out.println("Demanding a refund");
    } finally {
      System.out.println("perform finish");
    }
  }
}
