# Simulation of scalable IoT System

### DESCRIPTION

Scalable and highly available system. Can be scaled both vertically and horizontally.

Components:
  - Mosquitto Broker Cluster
  - MQTT-Kafka Bridge
  - Kafka Cluster
  - Kafka Streams
  - InfluxDB
  - Telegraf
  - Express Proxy
  - React Dashboard

### RUN

#### Windows

https://docs.docker.com/docker-for-windows/install/

#### MacOS
```
# In Project folder
brew install --cask docker
docker-compose up
```

### CREDITS

MQTT to Kafka Bridge by nodefluent (https://github.com/nodefluent/mqtt-to-kafka-bridge)
