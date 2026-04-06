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

    Object result = joinPoint.proceed();

    long executionTime = System.currentTimeMillis() - start;

    log.info("Method {} executed in {} ms",
        joinPoint.getSignature().toShortString(),
        executionTime);

    return result;
  }
}