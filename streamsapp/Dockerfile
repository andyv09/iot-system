FROM maven:3-openjdk-8-slim AS BUILD
COPY pom.xml /tmp/
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn package
RUN cd /tmp/target
RUN ls

FROM openjdk:8-alpine AS RUNTIME
RUN apk update && apk add --no-cache libc6-compat
RUN ln -s /lib64/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2
WORKDIR /app/
COPY --from=BUILD /tmp/target/*-jar-with-dependencies.jar .
ENTRYPOINT ["java", "-cp", "*", "streams.app.MainApp"]