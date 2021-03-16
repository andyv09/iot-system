import React, {useState, Component} from 'react'
import {fromFlux, Plot} from '@influxdata/giraffe';
import GoogleMapReact from 'google-map-react';


function DeviceChart(props) {

  const graphStyle = {
    width: "calc(70vw - 20px)",
    height: "calc(80vh - 20px)",
    margin: "40px auto",
  };

  const lineLayer = {
    type: "line",
    x: "_time",
    y: "_value",
    shadeBelow: true,
    shadeBelowOpacity: 0.2,
    };
  const gaugeLayer = {
      type: "gauge",
      gaugeSize: 5,
      gaugeColors: [{
          id: 'red',
          type: 'min',
          hex: '#FF0000',
          name: 'Red',
          value: 1
      }, {
          id: 'green',
          type: 'max',
          hex: '#00FF00',
          name: 'Green',
          value: 100
      }]
  }


  let table;
  if (props.tableData){
    let config;
    if(props.metric == "batteryPercentage"){
      config = {
        fluxResponse: props.tableData,
        layers: [gaugeLayer],
      }
    }
    else{
      config = {     
        fluxResponse: props.tableData,
        layers: [lineLayer],
        tickFontColor: "#61dafb",
        tickFont: "20px sans-serif",
        gridColor: "whitesmoke",
        axisColor: "whitesmoke",
        gridOpacity: 0.3,
        xAxisLabel: "Time",
        yAxisLabel: "Value",   
        legendFont: "20px sans-serif",
        legendFontColor: "whitesmoke",
        legendBackgroundColor: "#343a40",
        legendBorder: "solid whitesmoke",
        legendCrosshairColor: "whitesmoke",
      }

    };
    //console.log(config)
    table  = <div style={graphStyle} ><Plot config={config}/></div>;
  }
  
  
  if(props.metric != "location"){
    return (
      <div>
        {table}
      </div>
    );
  }
  else{
     
  const Marker = ({ text }) => <div className="locationMarker"><b>{text}</b></div>;
  const defaultProps = {
    center: {
      lat: parseFloat(props.currentLocation.latitude),
      lng: parseFloat(props.currentLocation.longitude),
    },
    zoom: 11
  };
  console.log("Current location: ", props.currentLocation)
    return(
      <div style={graphStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBHcrjI4Da3DRDtjsdMJxjCA9B989gsg5E" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker
            lat={parseFloat(props.currentLocation.latitude)}
            lng={parseFloat(props.currentLocation.longitude)}
            text="&#9650;LOCATION"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default DeviceChart
