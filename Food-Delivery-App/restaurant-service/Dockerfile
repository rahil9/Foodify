FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/restaurant-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 9001
ENTRYPOINT ["java", "-jar", "app.jar"]