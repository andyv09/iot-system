import React from 'react'

function StatsTable(props) {
    return (
        <table className="statsTable">
            <tr>
                <td colSpan="2"><b>WRITE SPEED</b></td>
                <td colSpan="2"><b>TOTAL CONNECTIONS</b></td>
            </tr>
            <tr>
                <td className="statsTableData" colSpan="2">{props.writeSpeed}</td>
                <td className="statsTableData" colSpan="2">{props.totalConn}</td>
            </tr>
            <tr>
                <td><b>MOSQUITTO</b></td>
                <td><b>KAFKA</b></td>
                <td><b>INFLUXDB</b></td>
                <td><b>KAFKA STREAMS</b></td>
            </tr>
            <tr>
                {props.onlineContainers.mqtt1 ? <td className="statsTableOnline"><h1>Online</h1></td> : <td className="statsTableOffline"><h1>Offline</h1></td>}
                {props.onlineContainers.kafka1 ? <td className="statsTableOnline"><h1>Online</h1></td> : <td className="statsTableOffline"><h1>Offline</h1></td>}
                {props.onlineContainers.influxdb ? <td rowSpan="3" className="statsTableOnline"><h1>Online</h1></td> : <td rowspan="3" className="statsTableOffline"><h1>Offline</h1></td>}
                {props.onlineContainers.mqtt1 ? <td rowspan="3" className="statsTableOnline"><h1>Online</h1></td> : <td rowspan="3" className="statsTableOffline"><h1>Offline</h1></td>}
            </tr>
            <tr>
                {props.onlineContainers.mqtt2 ? <td className="statsTableOnline"><h1>Online</h1></td> : <td className="statsTableOffline"><h1>Offline</h1></td>}
                {props.onlineContainers.kafka2 ? <td className="statsTableOnline"><h1>Online</h1></td> : <td className="statsTableOffline"><h1>Offline</h1></td>}
            </tr>
            <tr>
                {props.onlineContainers.mqtt3 ? <td className="statsTableOnline"><h1>Online</h1></td> : <td className="statsTableOffline"><h1>Offline</h1></td>}
                {props.onlineContainers.kafka3 ? <td className="statsTableOnline"><h1>Online</h1></td> : <td className="statsTableOffline"><h1>Offline</h1></td>}
            </tr>
        </table> 
    )
}

export default StatsTable
