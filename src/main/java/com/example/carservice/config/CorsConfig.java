package com.example.carservice.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.io.IOException;

@Configuration
@Order(1)
public class CorsFilter implements Filter {

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, jakarta.servlet.ServletException {

    HttpServletResponse response = (HttpServletResponse) res;
    HttpServletRequest request = (HttpServletRequest) req;

    // Разрешаем запросы с любого источника
    response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    response.setHeader("Access-Control-Max-Age", "3600");

    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
      response.setStatus(HttpServletResponse.SC_OK);
      return;
    }

    chain.doFilter(req, res);
  }
}