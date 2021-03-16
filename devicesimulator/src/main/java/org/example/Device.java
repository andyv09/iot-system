package org.example;

import org.eclipse.paho.client.mqttv3.*;

import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

public class Device implements Callable<Void> {

    private final String topic;
    private Random rnd = new Random();
    private IMqttClient client;
    private double temperature;
    private int id;
    private int range;
    private String USERNAME = "admin";
    private String PASSWORD = "admin";
    //Client variables
    private boolean disconnectClient = false;

    private static MqttConnectOptions setUpConnectionOptions(String username, String password) {
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setCleanSession(true);
        connOpts.setUserName(username);
        connOpts.setPassword(password.toCharArray());
        return connOpts;
    }

    public Device(IMqttClient client, String topic, int id, int range ){
        this.client = client;
        this.topic = topic;
        this.id = id*range;
        this.range = range;
        this.temperature = 20 + rnd.nextDouble() * 50;
    }

    public MqttMessage generateTemperature(){
        this.temperature += (rnd.nextDouble() * 2) - 1;
        byte[] payload = String.format("%04.2f", this.temperature).getBytes();
        MqttMessage msg = new MqttMessage(payload);
        return msg;
    }

    private void loop() throws Exception {
        if (!client.isConnected()) {
            MqttConnectOptions connOpts = setUpConnectionOptions(USERNAME, PASSWORD);
            client.connect(connOpts);
        }
        if(client.isConnected()) {
            for(int i = 0; i < range; i++){
                MqttMessage msg = generateTemperature();
                msg.setQos(0);
                msg.setRetained(true);
                client.publish(topic + Integer.toString(id + i), msg);
                System.out.println("Topic sent: " + topic + Integer.toString(id + i) + ": " + msg.toString());
            }

            TimeUnit.SECONDS.sleep(10);
            //client.disconnect();
            loop();
        }
        else{
            System.out.println("Failed to connect");
        }
    }


    @Override
    public Void call() throws Exception {

        client.setCallback(new MqttCallback() {
            @Override
            public void connectionLost(Throwable throwable) {

            }

            @Override
            public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {
                System.out.println(s + ": " + mqttMessage.toString());
                disconnectClient = true;
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
            }
        });

        //client.connect();
        //client.subscribe("test/modify/" + client.getClientId());
        loop();

        return null;
    }
}
