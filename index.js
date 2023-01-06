const express = require("express");
const app = express();
const port = 5008;
const mongoose = require('mongoose');
//decalre routers 
const participantRouter=require("./router/participantRouter");
const partyRouter=require("./router/partyRouter");
///////////////database connection////////////
mongoose.connect("mongodb://localhost:27017/party-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(" Database connected"));

/////////////////////////view engine and body parsers//////
app.set('view engine', 'ejs');
app.set('views','./views')
app.use(express.static('public'))

app.get("/", function (req,res) {
    res.render("index");
  });

// here we use our routers 
app.use("/",participantRouter)  ;
app.use("/",partyRouter);
 
//////////////////////////////////////
app.listen(port, () => {
    console.log(`Event app listening at http://localhost:${port}`);
  });