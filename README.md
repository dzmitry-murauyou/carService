![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.3-brightgreen)
![Checkstyle](https://img.shields.io/badge/Checkstyle-Google%20Style-blue)
 # Car Service API

REST API для автосервиса. Учебный проект по Spring Boot.

## Функциональность

- Просмотр списка всех услуг автосервиса
- Получение информации о конкретной услуге по ID

## Технологии

- Java 21
- Spring Boot 4.0.3
- Maven
- Checkstyle (Google Java Style without JavaDoc)

## Структура проекта

```
src/main/java/com/example/carservice/
├── controller/      # REST контроллеры
├── service/         # Интерфейсы сервисов
├── serviceimpl/     # Реализации сервисов
├── repository/      # Репозитории (хранилища)
├── model/           # Сущности (Entity)
├── dto/             # DTO для ответов API
└── dtomapper/       # Mapper для преобразования

```mapper для преобразования Entity -> DTO

