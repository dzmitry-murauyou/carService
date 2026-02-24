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

## Структура проекта
carService/
├── pom.xml # Конфигурация Maven и зависимости
├── checkstyle.xml # Правила проверки стиля кода
├── README.md # Документация проекта
└── src/
├── main/
│ ├── java/
│ │ └── com/example/carservice/
│ │ ├── CarServiceApplication.java # Точка входа
│ │ ├── controller/
│ │ │ └── ServiceController.java # REST контроллер
│ │ ├── service/
│ │ │ └── ServiceInterface.java # Интерфейс сервиса
│ │ ├── serviceimpl/
│ │ │ └── ServiceImplementation.java # Реализация сервиса
│ │ ├── repository/
│ │ │ └── ServiceRepository.java # Хранилище данных
│ │ ├── model/
│ │ │ └── ServiceEntity.java # Сущность
│ │ ├── dto/
│ │ │ └── ServiceDto.java # DTO
│ │ └── dtomapper/
│ │ └── ServiceMapper.java # Маппер
│ └── resources/
│ └── application.properties # Настройки
└── test/ # Тесты
└── java/
└── com/example/carservice/
└── CarServiceApplicationTests.java

## Технологии

- Java 21
- Spring Boot 4.0.3
- Maven
- Checkstyle (Google Java Style without JavaDoc)
- SonarCloud
- Lombok
  
  [![SonarCloud](https://img.shields.io/badge/SonarCloud-Анализ%20кода-FD3A5C?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://sonarcloud.io/project/overview?id=dzmitry-murauyou_carService)

