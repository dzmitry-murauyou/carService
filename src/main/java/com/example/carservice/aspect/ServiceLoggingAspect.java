package com.example.carservice.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class ServiceLoggingAspect {

  @Around("execution(* com.example.carservice.service.impl.*.*(..))")
  public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
    long start = System.currentTimeMillis();
    String methodName = joinPoint.getSignature().toShortString();

    try {
      Object result = joinPoint.proceed();
      long executionTime = System.currentTimeMillis() - start;
      log.info("Method {} executed successfully in {} ms", methodName, executionTime);
      return result;
    } catch (Throwable throwable) {
      long executionTime = System.currentTimeMillis() - start;
      log.error("Method {} failed after {} ms with exception: {}",
          methodName, executionTime, throwable.getMessage(), throwable);
      throw throwable;
    }
  }
}