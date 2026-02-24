![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.3-brightgreen)
![Checkstyle](https://img.shields.io/badge/Checkstyle-Google%20Style-blue)
 # Car Service API

REST API для автосервиса. Учебный проект по Spring Boot.

## Функциональность

- Просмотр списка всех услуг автосервиса
- Получение информации о конкретной услуге по ID
-  **Фильтрация услуг**:
  - По категории (ТО, ремонт, диагностика и т.д.)
  - По доступности (доступные/недоступные услуги)
  - Комбинированная фильтрация по нескольким параметрам

## Технологии

- Java 21
- Spring Boot 4.0.3
- Maven
- Checkstyle (Google Java Style without JavaDoc)
- SonarCloud
- Lombok
  
  [![SonarCloud](https://img.shields.io/badge/SonarCloud-Анализ%20кода-FD3A5C?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://sonarcloud.io/project/overview?id=dzmitry-murauyou_carService)

## Структура проекта
```
src/main/java/com/example/carservice/
├── CarServiceApplication.java
├── controller/
│   └── ServiceController.java
├── service/
│   └── ServiceInterface.java
├── serviceimpl/
│   └── ServiceImplementation.java
├── repository/
│   └── ServiceRepository.java
├── model/
│   └── ServiceEntity.java
├── dto/
│   └── ServiceDto.java
└── dtomapper/
    └── ServiceMapper.java  ```



