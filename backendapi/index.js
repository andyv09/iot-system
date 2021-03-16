import Express from "express";;
import bodyParser from "body-parser";
import {loginRouter} from "./routes/login.js";
import {statsRouter} from "./routes/stats.js";
import cors from 'cors';


const app = Express();
const port = 4000;
//CORS
app.use(cors());
app.options('*', cors());
//Routes
app.use("/login", loginRouter);
app.use("/stats", statsRouter);

//Default
app.get("/", (req, res) =>{
    res.send("API Module Online");
})


app.listen(port, ()=> console.log("listening on port: " + port));
