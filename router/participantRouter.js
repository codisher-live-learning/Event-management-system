const express= require("express");
const participantRouter= express();
participantRouter.set('view engine', 'ejs');
participantRouter.set('views','./views/participant')
const bodyParser = require("body-parser");
const participantcontroller = require("../controller/participantcontroller");
const session= require("express-session");
const config= require("../config/config")
participantRouter.use(session({secret:config.sessionsecret}))
const auth =  require("../middleware/auth")

 const bodyparser= require('body-parser');
 participantRouter.use(bodyParser.json());
 participantRouter.use(bodyParser.urlencoded({extended:true}));

 participantRouter.get("/participantlogin",auth.userisLogin,participantcontroller.participantlogin);
 participantRouter.post("/participantlogin",participantcontroller.loadaddparticpantsparty)
 participantRouter.get("/contribute",participantcontroller.loadcontributors)
 participantRouter.post("/contribute",participantcontroller.insertContributors)
 participantRouter.get("/participantauth",auth.userisLogout,participantcontroller.loadparticipantauth)
 participantRouter.post("/participantauth",participantcontroller.participantsignup);
 participantRouter.get("/murgalogin",participantcontroller.getmurgalogin);
 participantRouter.post("/murgalogin",participantcontroller.murgalogin);
 module.exports=participantRouter;