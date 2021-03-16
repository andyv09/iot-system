import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import styled from 'styled-components';


import Login from './components/Login/Login';
import Header from './components/Header';
import Home from './Pages/Home';
import Devices from './Pages/Devices';
import Stats from './Pages/Stats';
import {Layout} from './components/Layout';

function App() {
  const [userLogged, setUserLogged] = useState(false)
  
  function tryLogin(username, password) {
    username = "uname";
    password = "pword";
    var formBody = [];
    var details = {
      'username': username,
      'password': password
    };
    for(var property in details){
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue)
    };
    formBody = formBody.join("&");

    fetch('http://localhost:4000/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody
    }).then(response => response.text()).then(data => {
      if(data === "Success"){
        console.log("Logged in");
        setUserLogged(true);
      }
      else{
        console.log("Wrong password!");
      }
    });
  }

  function logout() {
    setUserLogged(!userLogged);
  }
  if(userLogged === true){
    return(
      <div className="App">
        <Login tryLogin={tryLogin} />
      </div>
    );
  }
  else{
    return(
        <div className="App">
          <Header logoutFunc={logout}/>
          <Layout>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/devices" component={Devices} />
                <Route path="/stats" component={Stats} />
                <Route component={Home} />
              </Switch>
            </Router>
          </Layout>
        </div>
    );
  }
  
  /*
  const [tableData, setTableData] = useState(null);
  
  function getNewData(){
    const link = 'http://localhost:4000/stats/enginetemperature/1';
    console.log('inside get new data....');

    const requestOptions = {
      method: 'GET'
    };

    fetch(link, requestOptions).then(res => res.text()).then(result => 
      {
        console.log(result);
        setTableData(result);
      },
      (error) => {
        console.log("got error :(", error);
    });
  }

  const graphStyle = {
    width: "calc(70vw - 20px)",
    height: "calc(70vh - 20px)",
    margin: "40px auto",
  };

  const findStringColumns = (table) =>  table.columnKeys.filter(k => table.getColumnType(k) === 'string');

  const lineLayer = {
    type: "line",
    x: "_time",
    y: "_value",
    shadeBelow: true,
    shadeBelowOpacity: 0.2,
    };

  let table = null;
  if (tableData){
    const config = {
            
      fluxResponse: tableData,
      layers: [lineLayer],
      tickFontColor: "#00ffff",

    };
    console.log(config)
    table  = <div style={graphStyle} ><Plot config={config}/></div>;
  }
  
  return (
    <div className="App">
	    <header className="App-header">
        <button style={buttonStyle} onClick={getNewData}> fetch data </button>
	    </header>
	    {table}
	  </div>
  );*/
}

export default App;
