# Backend Dockerfile
FROM openjdk:25-jdk-slim AS build
WORKDIR /home/app
COPY . /home/app
RUN ./gradlew clean bootJar --no-daemon

FROM openjdk:25-jdk-slim
COPY --from=build /home/app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
