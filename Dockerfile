FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:21-jre
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY --from=build /app/target/carService-0.0.1-SNAPSHOT.jar app.jar

COPY frontend/dist /app/static

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]