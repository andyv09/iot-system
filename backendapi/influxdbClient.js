import {InfluxDB} from '@influxdata/influxdb-client';
import {Point} from '@influxdata/influxdb-client';

export const token = 'WN7PYw6_RoC57mZj4RKM06OEmdvyDV9vKNKo9540INP34gsszq1voNHf_1WLSzmy4lNSkxJmKSYASDnCO87eyA==';
export const org = 'iot';
export const bucket = 'iot';

const iotClient = new InfluxDB({url: 'http://influxdb:8086', token: token});

export const influxdbClient = iotClient;
export const influxdbPoint = Point;

//QUERIES
export const runningContainersQuery = "from(bucket: \"iot\") \
    |> range(start: -1h) \
    |> filter(fn: (r) => r[\"_measurement\"] == \"docker\") \
    |> filter(fn: (r) => r[\"_field\"] == \"n_containers_running\") \
    |> group(columns: [\"_measurement\"]) \
    |> last() ";


export const getLocation = (i) => {
    console.log("DIOD", i);
    return `from(bucket: "iot")
    |> range(start: -5m)
    |> filter(fn: (r) => r["_measurement"] == "testSensorData2")
    |> filter(fn: (r) => r["_field"] == "longitude" or r["_field"] == "latitude")
    |> filter(fn: (r) => r["deviceid"] == "`+ i.toString() +`")
    |> group(columns: ["_field"])
    |> last()`;
}

export const getDeviceEngineTemperatureQuery = (i, j, time) => {
    let metric;
    switch(j){
        case "engine_temperature":
            metric = "engineTemperature";
            break;
        case "oil_temperature":
            metric = "oilTemperature";
            break;
        case "intakeAirTemperature":
            metric = j;
            break;
        case "intakeAirFlowSpeed":
            metric = j;
            break;
        case "batteryPercentage":
            metric = j;
            break;
        case "accelometerValue":
            metric = j;
            break;
        case "totalDistance":
            metric = j;
            break;
    }
    console.log(metric);
    return `from(bucket: "iot")
    |> range(start: -`+ time +`)
    |> filter(fn: (r) => r["_measurement"] == "testSensorData2")
    |> filter(fn: (r) => r["_field"] == "` + metric +`")
    |> filter(fn: (r) => r["deviceid"] == "`+ i.toString() +`")
    |> group(columns: ["deviceid"])
    |> yield(name: "mean")`
}

export const getMqtt1Devices =  `from(bucket: "iot")
    |> range(start: -12h)
    |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
    |> filter(fn: (r) => r["_field"] == "value")
    |> filter(fn: (r) => r["mqtt"] == "$SYS/broker/clients/connected")
    |> last()`;

export const getMqtt2Devices =  `from(bucket: "iot")
    |> range(start: -12h)
    |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
    |> filter(fn: (r) => r["_field"] == "value")
    |> filter(fn: (r) => r["mqtt2"] == "$SYS/broker/clients/connected")
    |> last()`;

export const getCurrentWriteSpeed = `from(bucket: "iot")
  |> range(start: -1m)
  |> filter(fn: (r) => r["_measurement"] == "internal_write")
  |> filter(fn: (r) => r["_field"] == "metrics_written")`;

export const getOnlineContainers = `from(bucket: "iot")
|> range(start: -30s)
|> filter(fn: (r) => r["_measurement"] == "docker_container_status")
|> filter(fn: (r) => r["com.docker.compose.service"] == "kafka2" or r["com.docker.compose.service"] == "kafka3" or r["com.docker.compose.service"] == "kafka1" or r["com.docker.compose.service"] == "mqtt2" or r["com.docker.compose.service"] == "mqtt" or r["com.docker.compose.service"] == "influxdb" or r["com.docker.compose.service"] == "kafka-streams")
|> filter(fn: (r) => r["_field"] == "finished_at")
|> group(columns: ["com.docker.compose.service"])
|> last()`;
