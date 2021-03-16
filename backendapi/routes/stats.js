import Express from "express";
import bodyParser from "body-parser"
import {influxdbClient, org, runningContainersQuery, getDeviceEngineTemperatureQuery, getMqtt1Devices, getMqtt2Devices, getCurrentWriteSpeed, getOnlineContainers, getLocation} from "../influxdbClient.js"

let router = Express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false})
router.use(jsonParser);
router.use(urlencodedParser);

const queryApi = influxdbClient.getQueryApi(org);


router.get("/runningContainers", (req, res) =>{
    let querryResult;
    queryApi.queryRows(runningContainersQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row)
          querryResult = o._value;
        },
        error(error) {
          console.error(error)
          res.send("error");
        },
        complete() {
          res.send(querryResult.toString());
        },
      });
});

router.get("/:metric/:i/:interval", (req, res) => {
  var i = req.params.i;
  var metric = req.params.metric;
  var interval = req.params.interval;
  let querryResult = "";
      queryApi.queryLines(getDeviceEngineTemperatureQuery(i, metric, interval), {
        error(error){
          console.log(error);
        },
        next(line){
          querryResult += line + "\n";
        },
        complete(){
          res.send(querryResult);
        }
      });
})

router.get("/onlineContainers", (req, res) =>{
  let querryResult = [];
  queryApi.queryRows(getOnlineContainers, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        querryResult.push(o.container_name);
      },
      error(error) {
        console.error(error)
        res.send("error");
      },
      complete() {
        res.send(querryResult.toString());
      },
    });
});

router.get("/connectedDevices", (req, res) =>{
  let querryResult;
  queryApi.queryRows(getMqtt1Devices, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        querryResult = o._value;
      },
      error(error) {
        console.error(error)
        res.send("error");
      },
      complete() {
        queryApi.queryRows(getMqtt2Devices, {
          next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            querryResult += o._value;
          },
          error(error) {
            console.error(error)
            res.send("error");
          },
          complete() {
            res.send((querryResult -4).toString())
          },
        });
      },
    });
});

router.get("/location/:i", (req, res) =>{
  var i = req.params.i;
  let querryResult = [];
  queryApi.queryRows(getLocation(i), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      console.log(o._value)
      querryResult.push(o._value);
    },
    error(error) {
      console.error(error)
      res.send("error");
    },
    complete() {
      res.send(querryResult.toString());
    },
  });
});

router.get("/writesPerSec", (req, res) =>{
  let querryResult = [];
  queryApi.queryRows(getCurrentWriteSpeed, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        querryResult.push({time: o._time, value: o._value});
      },
      error(error) {
        console.error(error)
        res.send("error");
      },
      complete() {
        res.send(((querryResult[querryResult.length - 1].value - querryResult[querryResult.length - 2].value)/10).toString());
      },
    });
});

export const statsRouter = router;