![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.3-brightgreen)
![Checkstyle](https://img.shields.io/badge/Checkstyle-Google%20Style-blue)
 # Car Service API

REST API для автосервиса. Учебный проект по Spring Boot.

## Функциональность

- Получение информации о конкретной услуге по ID
-  **Фильтрация услуг**:
  - По категории (ТО, ремонт, диагностика и т.д.)
  - По доступности (доступные/недоступные услуги)
  - Комбинированная фильтрация по нескольким параметрам

### Основные возможности
- ✅ Полное CRUD управление 6 сущностями:
  - Клиенты (Client)
  - Автомобили (Car)
  - Механики (Mechanic)
  - Услуги (Service)
  - Запчасти (Spare)
  - Заказы (Order)

### Работа с услугами
- Просмотр списка всех услуг автосервиса
- Получение информации о конкретной услуге по ID
- **Фильтрация услуг**:
  - По категории (ТО, ремонт, диагностика и т.д.)
  - По доступности (доступные/недоступные услуги)
  - По имени мастера
  - Комбинированная фильтрация по нескольким параметрам

### Дополнительные возможности
- Поиск заказов по клиенту, автомобилю, механику
- Фильтрация запчастей по производителю и остаткам на складе
- Демонстрация проблемы N+1 и её решение через `@EntityGraph`
- Показ работы транзакций (rollback при ошибке)

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
D:\Java\carService/
│
├── .idea/                          
├── .mvn/                           
├── src/                             
│   ├── main/                         
│   │   ├── java/                       
│   │   │   └── com/example/carservice/
│   │   │       ├── CarServiceApplication.java
│   │   │       │
│   │   │ D:\Java\carService/
│
├── .idea/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/carservice/
│   │   │       ├── CarServiceApplication.java
│   │   │       │
│   │   │       ├── config/
│   │   │       │   └── DataInitializer.java
│   │   │       │
│   │   │       ├── controller/
│   │   │       │   ├── CarController.java
│   │   │       │   ├── ClientController.java
│   │   │       │   ├── MechanicController.java
│   │   │       │   ├── OrderController.java
│   │   │       │   ├── ServiceController.java
│   │   │       │   └── SpareController.java
│   │   │       │
│   │   │       ├── dto/
│   │   │       │   ├── CarDto.java
│   │   │       │   ├── ClientDto.java
│   │   │       │   ├── MechanicDto.java
│   │   │       │   ├── OrderDto.java
│   │   │       │   ├── ServiceDto.java
│   │   │       │   ├── SpareDto.java
│   │   │       │   └── mapper/
│   │   │       │       ├── CarMapper.java
│   │   │       │       ├── ClientMapper.java
│   │   │       │       ├── MechanicMapper.java
│   │   │       │       ├── OrderMapper.java
│   │   │       │       ├── ServiceMapper.java
│   │   │       │       └── SpareMapper.java
│   │   │       │
│   │   │       ├── exception/
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── OrderNotFoundException.java
│   │   │       │   └── ResourceNotFoundException.java
│   │   │       │
│   │   │       ├── model/
│   │   │       │   ├── Car.java
│   │   │       │   ├── Client.java
│   │   │       │   ├── Mechanic.java
│   │   │       │   ├── Order.java
│   │   │       │   ├── ServiceEntity.java
│   │   │       │   └── Spare.java
│   │   │       │
│   │   │       ├── repository/
│   │   │       │   ├── CarRepository.java
│   │   │       │   ├── ClientRepository.java
│   │   │       │   ├── MechanicRepository.java
│   │   │       │   ├── OrderRepository.java
│   │   │       │   ├── ServiceRepository.java
│   │   │       │   └── SpareRepository.java
│   │   │       │
│   │   │       └── service/
│   │   │           ├── CarService.java
│   │   │           ├── ClientService.java
│   │   │           ├── MechanicService.java
│   │   │           ├── OrderService.java
│   │   │           ├── ServiceInterface.java
│   │   │           ├── SpareService.java
│   │   │           └── impl/
│   │   │               ├── CarServiceImpl.java
│   │   │               ├── ClientServiceImpl.java
│   │   │               ├── MechanicServiceImpl.java
│   │   │               ├── OrderServiceImpl.java
│   │   │               ├── ServiceImplementation.java
│   │   │               └── SpareServiceImpl.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       ├── application.properties
│   │       └── application-local.properties
│   │
│   └── test/
│       └── java/
│           └── com/example/carservice/
│               └── CarServiceApplicationTests.java
│
├── target/
├── .gitattributes
├── .gitignore
├── carService.iml
├── checkstyle.xml
├── HELP.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md      ├── controller/
│   │   │       │   └── ServiceController.java
│   │   │       │
│   │   │       ├── dto/
│   │   │       │   ├── ServiceDto.java
│   │   │       │   └── mapper/
│   │   │       │       └── ServiceMapper.java
│   │   │       │
│   │   │       ├── model/
│   │   │       │   └── ServiceEntity.java
│   │   │       │
│   │   │       ├── repository/
│   │   │       │   └── ServiceRepository.java
│   │   │       │
│   │   │       └── service/
│   │   │           ├── ServiceInterface.java
│   │   │           └── impl/
│   │   │               └── ServiceImplementation.java
│   │   │
│   │   └── resources/                   
│   │       └── application.properties     
│   │
│   └── test/                           
│       └── java/
│           └── com/example/carservice/
│               └── CarServiceApplicationTests.java
│
├── target/                      
├── .gitattributes                
├── .gitignore                      
├── checkstyle.xml                    
└── pom.xml                           
 ```




