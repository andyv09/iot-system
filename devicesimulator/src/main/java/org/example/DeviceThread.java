package org.example;

import org.eclipse.paho.client.mqttv3.*;

import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;
import java.util.Date;
import java.sql.Timestamp;

public class DeviceThread extends Thread {

    private final String topic;
    private Random rnd = new Random();
    private IMqttClient client;
    //Metrics
    private double temperature;
    private double intakeTemperature;
    private double intakeSpeed;
    private double tirePressure11;
    private double tirePressure12;
    private double tirePressure21;
    private double tirePressure22;
    private int totalDistanceKm;
    private int controlUnitFirmware;
    private double accelometer_value;
    private double batteryPercentage;
    private double latitude;
    private double longitude;
    //Metrics END
    private int id;
    private String USERNAME = "admin";
    private String PASSWORD = "admin";
    //Client variables
    private boolean disconnectClient = false;

    public DeviceThread(IMqttClient client, String topic, int id){
        this.client = client;
        this.topic = topic;
        this.id = id;
        this.temperature = 20 + rnd.nextDouble() * 50;
        this.intakeTemperature = 1 + rnd.nextDouble() * 30;
        this.intakeSpeed = 10 + rnd.nextDouble() * 200;
        this.tirePressure11 = 25 + rnd.nextDouble() * 15;
        this.tirePressure12 = this.tirePressure11;
        this.tirePressure22 = this.tirePressure11 + 2;
        this.tirePressure21 = this.tirePressure11 + 2;
        this.totalDistanceKm =  rnd.nextInt(99900) + 100;
        this.controlUnitFirmware = 13;
        this.accelometer_value = 0;
        this.batteryPercentage = 1 + rnd.nextDouble() * 90;
        this.longitude = 46.55374393636025;
        this.latitude = 15.653034984080676;
    }

    public MqttMessage generateTemperature(){
        this.temperature += (rnd.nextDouble() * 2) - 1;
        this.intakeTemperature += (rnd.nextDouble() * 2) - 1;
        this.intakeSpeed += (rnd.nextDouble() * 2) - 1;
        this.totalDistanceKm += rnd.nextInt(5) + 1;

        byte[] payload = ("{deviceid:" + this.id
                + ",engine-temperature:"+ this.temperature
                +",oil-temperature:"+ (this.temperature - 5)
                + ",intakeAirTemperature:"+(this.intakeTemperature)
                + ",intakeAirFlowSpeed:"+this.intakeSpeed
                + ",tirePressure11:"+this.tirePressure11
                + ",tirePressure12:"+this.tirePressure12
                + ",tirePressure21:"+this.tirePressure21
                + ",tirePressure22:"+this.tirePressure22
                + ",totalDistance:"+this.totalDistanceKm
                + ",controlUnitFirmware:"+this.controlUnitFirmware
                + ",accelometerValue:"+this.accelometer_value
                + ",batteryPercentage:"+this.batteryPercentage
                + ",longitude:"+this.longitude
                + ",latitude:"+this.latitude
                + ",timestamp:"+ System.currentTimeMillis() + "000000"
                +"}").getBytes();
        //byte[] payload = String.format("%04.2f", this.temperature).getBytes();
        MqttMessage msg = new MqttMessage(payload);
        return msg;
    }

    private static MqttConnectOptions setUpConnectionOptions(String username, String password) {
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setCleanSession(true);
        connOpts.setUserName(username);
        connOpts.setPassword(password.toCharArray());
        connOpts.setKeepAliveInterval(1200);
        return connOpts;
    }

    private void loop() throws Exception{
        if (!client.isConnected()) {
            MqttConnectOptions connOpts = setUpConnectionOptions(USERNAME, PASSWORD);
            client.connect(connOpts);
            if(client.isConnected()){
                System.out.println("Client" + client.getClientId().toString() + " Connected!");
            }
        }
        if(true) {
            if (client.isConnected()) {
                MqttMessage msg = generateTemperature();
                msg.setQos(0);
                msg.setRetained(true);
                client.publish(topic + Integer.toString(id), msg);
                System.out.println("Topic sent: " + topic + Integer.toString(id) + "at: " + new Timestamp(System.currentTimeMillis()));
            } else {
                System.out.println("Failed to connect");
            }
        }
        TimeUnit.SECONDS.sleep(10);
        //client.disconnect();
        loop();
    }


    @Override
    public void run() {

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
        try{
            this.loop();
        } catch (Exception e){
            System.out.println("Error at cleint"+ client.getClientId().toString() + ": " + e.toString());
        }

    }
}
