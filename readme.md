# Simulator of scalable IoT System

### Description


As a part of my Bachelor's degree I designed an architecture for a scalable IoT system and developed a working simulation of the system, based on that architecture. Theoretically, in proper environment with proper resources this system could handle at least 200.000 concurrent connections. This can be expanded by adding additional nodes to clusters.

### Architecture

![alt text](https://github.com/andrazvrecko/iot-system/blob/master/system_architecture.png)

### Simulation of the system

This example is using "simulated cars" as a source of data. Simulated smart cars generate the data and send it to the system every 10 seconds. Data is then processed and stored in the DB. User can visualize the data using the web Dashboard.

This system consists of:
- Simulation of 5 smart cars
- A HAProxy Load Balancer
- 2 Mosquitto Brokers
- 3 Kafka Brokers and Zookeeper
- Kafka streams application
- InfluxDB node and Telegraf Node
- Express API
- React Dashboard

### RUN

#### Windows

Run using Docker Desktop Application.
https://docs.docker.com/docker-for-windows/install/

#### MacOS
```
# In Project folder
brew install --cask docker
docker-compose up
#InfluxDB is running on localhost:8086/ username=admin password=passwordpasswordpassword
#Dashboard is running on localhost:3000
```

### CREDITS

MQTT to Kafka Bridge by nodefluent (https://github.com/nodefluent/mqtt-to-kafka-bridge)
