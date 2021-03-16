import React, {useState, useEffect} from 'react';
import StatsTable from '../components/Stats/StatsTable';
import { Container, Row, Button, Col, Dropdown, Form } from 'react-bootstrap';

function Stats() {
    const [totalConn, setTotalConn] = useState(0);
    const [writeSpeed, setWriteSpeed] = useState(0);
    const [onlineContainers, setOnlineContainers] = useState({influxdb: false, kafkastreamsapp: false, mqtt: false, mqtt2: false, kafka1: false, kafka2: false, kafka3: false});
    
    function getNumOfDevices(){
        const link = 'http://localhost:4000/stats/connecteddevices';
        console.log("Updating number of connected devices...");
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => {if(result == "error") setTotalConn(-1); setTotalConn(parseInt(result))}, (error) => {setTotalConn(-1)})
    }

    function getWriteSpeed(){
        const link = 'http://localhost:4000/stats/writespersec';
        console.log("Updating write speed...");
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => {if(result == "error") setWriteSpeed(-1); setWriteSpeed(parseFloat(result))}, (error) => {setWriteSpeed(-1)})
    }

    function parseOnlineContainers(result){

        console.log("Res: ", result);
        const resList = result.split(',');
        console.log(resList);

        return {influxdb: resList.includes("influxdb"), kafkastreamsapp: resList.includes("kafkastreamsapp"), mqtt1: resList.includes("mqtt"), mqtt2: resList.includes("mqtt2"), kafka1: resList.includes("kafka1"), kafka2: resList.includes("kafka2"), kafka3: resList.includes("kafka3")};
    }

    function getOnlineContainers(){
        const link = 'http://localhost:4000/stats/onlinecontainers';
        console.log("Updating write speed...");
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => 
            {
                if(result == "error") {
                    setOnlineContainers({influxdb: false, kafkastreamsapp: false, mqtt: false, mqtt2: false, kafka1: false, kafka2: false, kafka3: false});
                }
                else{
                    setOnlineContainers(parseOnlineContainers(result))
                }
            }, (error) => {setOnlineContainers({influxdb: false, kafkastreamsapp: false, mqtt: false, mqtt2: false, kafka1: false, kafka2: false, kafka3: false})})
    }

    function getStats() {
        getNumOfDevices();
        getWriteSpeed();
        getOnlineContainers();
    }
    
    useEffect(() => {
        getStats();
        //getNewData();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md={1}>
                </Col>
                <Col md={10}><StatsTable writeSpeed={writeSpeed} totalConn={totalConn} onlineContainers={onlineContainers} /></Col>
                <Col md={1}>
                    <Button  onClick={() => getStats()} className="mt-4" variant="outline-primary"><b>Refresh</b></Button>
                </Col>          
            </Row>  
        </Container>
    )
}

export default Stats
