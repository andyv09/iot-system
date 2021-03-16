import Express from "express";
import bodyParser from "body-parser"

let router = Express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false})
router.use(jsonParser);
router.use(urlencodedParser);


router.post("/", (req, res) =>{
    console.log(req.body.username, req.body.password)
    if(req.body.username === "uname" && req.body.password === "pword"){
        res.send("Success");
    }
    else{
        console.log("Sending failed");
        res.send("Failed");
    }
})

export const loginRouter = router;