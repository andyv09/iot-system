package org.example;

import org.eclipse.paho.client.mqttv3.*;

import java.util.Random;
import java.util.UUID;

public class BasicDevice {
    public static final String TOPIC = "test/topic";
    public static final String URI = "tcp://10.0.3.147:1883";
    public static void main(String[] args) {
        String publisherId = UUID.randomUUID().toString();
        System.out.println(publisherId);
        try {
            IMqttClient device = new MqttClient(URI,publisherId);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);
            options.setConnectionTimeout(10);
            device.connect();

            try {
                createCall(device);
            } catch (Exception e) {
                e.printStackTrace();
            }
            device.disconnect();

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public static Void createCall(IMqttClient client) throws Exception {
        if ( !client.isConnected()) {
            return null;
        }
        MqttMessage msg = readEngineTemp();
        msg.setQos(0);
        msg.setRetained(true);
        client.publish(TOPIC, msg);
        return null;
    }

    public static MqttMessage readEngineTemp() {
        Random rnd = new Random();
        double temp =  80 + rnd.nextDouble() * 20.0;
        byte[] payload = String.format("T:%04.2f",temp)
                .getBytes();
        return new MqttMessage(payload);
    }
}
