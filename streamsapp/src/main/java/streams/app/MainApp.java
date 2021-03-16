package streams.app;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Produced;

import java.util.Properties;
import java.util.concurrent.CountDownLatch;

public class MainApp {
    public static void main(String[] args) throws Exception {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-pipe");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka1:19091,kafka2:19092,kafka3:19093");
        //props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9091,localhost:9092,localhost:9093");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        final Serde<String> stringSerde = Serdes.String();
        final Serde<Double> doubleSerde = Serdes.Double();

        final StreamsBuilder builder = new StreamsBuilder();
        KStream<String, String> source = builder.stream("test-streams");

        //KStream<String, Double> transformedKStream = source.mapValues(textLine -> textLine.substring(1,textLine.length() - 1).split(",")[0].split(":")[1]).mapValues((key, value) -> Double.parseDouble(value));
        //transformedKStream.to("notification-output-test", Produced.with(stringSerde, doubleSerde));

        source.mapValues(textLine -> textLine.substring(1,textLine.length() - 1).split(",")[1].split(":")[1]).to("notification-output-test");

        // sensorData,deviceid=key engineTemperature=v1,oilTemperature=v2 timestamp + 6x0
        source.mapValues(textLine -> "testSensorData2,deviceid=" + textLine.substring(1,textLine.length() - 1).split(",")[0].split(":")[1]
                + " engineTemperature=" + textLine.substring(1,textLine.length() - 1).split(",")[1].split(":")[1]
                + ",oilTemperature=" + textLine.substring(1,textLine.length() - 1).split(",")[2].split(":")[1]
                //intakeAirTemperature, intakeAirFlowSpeed, tirePressure11, tirePressure12, tirePressure21, tirePressure22, totalDistance, controlUnitFirmware, accelometerValue, batteryPercentage, longitude, latitude
                + ",intakeAirTemperature=" + textLine.substring(1,textLine.length() - 1).split(",")[3].split(":")[1]
                + ",intakeAirFlowSpeed=" + textLine.substring(1,textLine.length() - 1).split(",")[4].split(":")[1]
                + ",tirePressure11=" + textLine.substring(1,textLine.length() - 1).split(",")[5].split(":")[1]
                + ",tirePressure12=" + textLine.substring(1,textLine.length() - 1).split(",")[6].split(":")[1]
                + ",tirePressure21=" + textLine.substring(1,textLine.length() - 1).split(",")[7].split(":")[1]
                + ",tirePressure22=" + textLine.substring(1,textLine.length() - 1).split(",")[8].split(":")[1]
                + ",totalDistance=" + textLine.substring(1,textLine.length() - 1).split(",")[9].split(":")[1]
                + ",controlUnitFirmware=" + textLine.substring(1,textLine.length() - 1).split(",")[10].split(":")[1]
                + ",accelometerValue=" + textLine.substring(1,textLine.length() - 1).split(",")[11].split(":")[1]
                + ",batteryPercentage=" + textLine.substring(1,textLine.length() - 1).split(",")[12].split(":")[1]
                + ",longitude=" + textLine.substring(1,textLine.length() - 1).split(",")[13].split(":")[1]
                + ",latitude=" + textLine.substring(1,textLine.length() - 1).split(",")[14].split(":")[1]
                + " " + textLine.substring(1,textLine.length() - 1).split(",")[15].split(":")[1]).to("kafka-influx-bridge");

        final Topology topology = builder.build();
        System.out.println(topology.describe());
        final KafkaStreams streams = new KafkaStreams(topology, props);
        final CountDownLatch latch = new CountDownLatch(1);

        try {
            streams.start();
            latch.await();
        } catch (Throwable e) {
            System.exit(1);
        }
        System.exit(0);
    }
}
