package org.example;
import org.eclipse.paho.client.mqttv3.*;

import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;


public class MainApp {
    //public static final String URI = "tcp://10.0.3.143:8080";
    public static final String URI = "tcp://haproxy-load-balancer:8080";
    public static final String TOPIC = "test-sensor-data";
    public static final String USERNAME = "admin";
    public static final String PASSWORD = "admin";
    private static final Object lock = new Object();
    private static int counter = 0;

    private static MqttConnectOptions setUpConnectionOptions(String username, String password) {
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setCleanSession(true);
        connOpts.setUserName(username);
        connOpts.setPassword(password.toCharArray());
        return connOpts;
    }

    public static void main(String[] args) throws MqttException, InterruptedException {
        if(false) {
            //Simulator
            //Create the Pool
            int nThreads = 10000;
            ExecutorService service = Executors.newFixedThreadPool(nThreads);

            for (int i = 0; i < nThreads; i++) {
                IMqttClient device = new MqttClient(URI, Integer.toString(i));
                service.submit(new Device(device, TOPIC + "/", i, 1));
            }

        }
        else {

            int nThreads = 10;
            Thread myThreads[] = new Thread[nThreads];
            while(true) {
                for (int i = 0; i < nThreads; i++) {
                    IMqttClient device = new MqttClient(URI, Integer.toString(i));
                    //MqttConnectOptions connOpts = setUpConnectionOptions(USERNAME, PASSWORD);
                    //device.connect(connOpts);
                    myThreads[i] = new DeviceThread(device, TOPIC + "/", i);
                }

                //long startTime = System.nanoTime();
                System.out.println("Starting threads!");
                for (int i = 0; i < nThreads; i++) {
                    myThreads[i].start();
                    TimeUnit.MILLISECONDS.sleep(15);
                }
                Set<Thread> threadSet = Thread.getAllStackTraces().keySet();
                for (int i = 0; i < nThreads; i++) {
                    try {
                        myThreads[i].join();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                /*long endTime = System.nanoTime();
                long duration = (endTime - startTime) / 100000000;  //divide by 1000000 to get milliseconds.
                System.out.println("Time: 0.(?)" + Long.toString(duration) + "s.");
                try {
                    TimeUnit.SECONDS.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }*/
            }
        }
    }
}
