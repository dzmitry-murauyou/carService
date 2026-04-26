package com.example.carservice.concurrency;

import com.example.carservice.concurrency.controller.AsyncTaskController;
import com.example.carservice.concurrency.controller.ConcurrencyController;
import com.example.carservice.concurrency.service.AsyncBusinessOperationService;
import com.example.carservice.concurrency.service.RaceConditionDemoService;
import com.example.carservice.concurrency.service.ThreadSafeCounterService;
import com.example.carservice.config.AsyncConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(
    scanBasePackageClasses = {
        AsyncTaskController.class,
        ConcurrencyController.class,
        AsyncBusinessOperationService.class,
        ThreadSafeCounterService.class,
        RaceConditionDemoService.class
    },
    exclude = {
        DataSourceAutoConfiguration.class,
        HibernateJpaAutoConfiguration.class
    }
)
@EnableAsync
@Import(AsyncConfig.class)
@Profile("concurrency-demo")
public class ConcurrencyDemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(ConcurrencyDemoApplication.class, args);
  }
}
