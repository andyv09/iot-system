import React, {useState, useEffect} from 'react';
import { Container, Row, Button, Col, Dropdown, Form } from 'react-bootstrap';
import DeviceChart from '../components/Devices/DeviceChart';
import DevicesDropdown from '../components/Devices/DevicesDropdown';
import MetricsDropdown from '../components/Devices/MetricsDropdown';
import IntervalDropdown from '../components/Devices/IntervalDropdown';


function Devices() {
    const [tableData, setTableData] = useState(null);
    const [numOfDevices, setNumOfDevices] = useState(-1);
    const [currentDevice, setCurrentDevice] = useState(0);
    const [currentMetric, setCurrentMetric] = useState("engine_temperature");
    const [currentInterval, setCurrentInterval] = useState("5m");
    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0})

    function refresh(){
        getNumOfDevices();
        getLocation(currentDevice);
        //getNewData();
    }

    function changeCurrent(i){
        setCurrentDevice(i);
        getNewData(i, currentMetric, currentInterval);
    }

    function changeCurrentMetric(i){
        setCurrentMetric(i);
        getNewData(currentDevice, i, currentInterval);
    }

    function changeCurrentInterval(i){
        setCurrentInterval(i)
        getNewData(currentDevice, currentMetric, i);
    }

    function getLocation(deviceId){
        const link = 'http://localhost:4000/stats/location/' + deviceId.toString();
        console.log("Getting Location...");
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => 
            {
                if(result == "error")
                { 
                    setCurrentLocation({latitude: 0, longitude: 0}); 
                }
                else {                 
                    const curlocation = result.split(",")
                    setCurrentLocation({latitude: curlocation[1], longitude: curlocation[0]})
                }
            }, (error) => {setCurrentLocation({latitude: 0, longitude: 0})})
        }

    function getNewData(deviceId, metric, interval){
        if(metric == "location"){
            getLocation(deviceId);
        }
        else{
            const link = 'http://localhost:4000/stats/'+ metric + '/' + deviceId.toString() + '/' + interval;
            console.log('Getting Data for: ', link, "Other params: ", metric, interval);
        
            const requestOptions = {
            method: 'GET'
            };
        
            fetch(link, requestOptions).then(res => res.text()).then(result => 
            {
                //console.log(result);
                setTableData(result);
            },
            (error) => {
                console.log("got error :(", error);
            });
            getNumOfDevices();
        }
    }

    function changeNumOfDevices(num){
        if (num <= numOfDevices){
            setCurrentDevice(0);
        }
        setNumOfDevices(num);
    }

    function getNumOfDevices(){
        const link = 'http://localhost:4000/stats/connecteddevices';
        console.log("Updating number of connected devices...");
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => {if(result == "error") setNumOfDevices(-1); setNumOfDevices(parseInt(result))}, (error) => {setNumOfDevices(-1)})
    }

    useEffect(() => {
        getNumOfDevices();
        getLocation(currentDevice);
        //getNewData();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md={1}>
                    <DevicesDropdown numOfConnected={numOfDevices} currentChanged={changeCurrent} />
                    <MetricsDropdown currentChanged={changeCurrentMetric} />
                    <IntervalDropdown currentChanged={changeCurrentInterval} />
                </Col>
                <Col md={10}><DeviceChart tableData={tableData} metric={currentMetric} currentLocation={currentLocation} /></Col>
                <Col md={1}>
                    <Button  onClick={() => getNewData(currentDevice, currentMetric, currentInterval)} className="mt-4" variant="outline-primary"><b>Refresh</b></Button>
                </Col>          
            </Row>
            
        </Container>
    )
}

export default Devices
