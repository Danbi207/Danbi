FROM openjdk:11-jdk


ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","-Djasypt.password=danbi20230720","-Duser.timezone=Asia/Seoul","app.jar"]
