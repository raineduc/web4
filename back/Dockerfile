# syntax=docker/dockerfile:1

FROM maven:3.8.2-jdk-11 AS builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package

FROM jboss/wildfly:24.0.0.Final
COPY ./wildfly/standalone-custom.xml /opt/jboss/wildfly/standalone/configuration/
COPY ./wildfly/module.xml /opt/jboss/wildfly/modules/org/postgresql/main/
COPY ./wildfly/postgresql-42.2.24.jar /opt/jboss/wildfly/modules/org/postgresql/main/
COPY --from=builder /app/target/web4-1.0.war /opt/jboss/wildfly/standalone/deployments/
CMD /opt/jboss/wildfly/bin/standalone.sh -c standalone-custom.xml -b 0.0.0.0 -bmanagement 0.0.0.0
