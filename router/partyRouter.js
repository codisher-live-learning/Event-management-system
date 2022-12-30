const bodyParser = require("body-parser");
const express= require("express");
const partyRouter= express();
partyRouter.set('view engine', 'ejs');
partyRouter.set('views','./views/parties')
const partycontroller = require("../controller/partycontroller");
 const bodyparser= require('body-parser');
 partyRouter.use(bodyParser.json());
 partyRouter.use(bodyParser.urlencoded({extended:true}));
//////////////////////////////////////////////////////////////////////////////////

partyRouter.get("/options",partycontroller.loadoptions)
partyRouter.get("/addparty",partycontroller.addparty)
partyRouter.get("/partylogin",partycontroller.partylogin)
partyRouter.post("/addparty",partycontroller.insertparty)
partyRouter.post("/partylogin",partycontroller.loadparty)
partyRouter.get("/contributors",partycontroller.loadContributors);
partyRouter.get("/add_participant",partycontroller.loadaddparticpants)
partyRouter.post("/add_participant",partycontroller.add_participants)
partyRouter.get ("/showparticipants",partycontroller.showparticipants)
partyRouter.get("/getpaisevala",partycontroller.getpaisevala)
partyRouter.post("/getpaisevala",partycontroller.updateStatus);
module.exports=partyRouter;