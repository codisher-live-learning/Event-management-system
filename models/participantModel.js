const mongoose = require("mongoose")
const { Schema } = mongoose;

const participantSchema = new Schema({
  name:String,
  partycode:String,
  mobile:Number,
  time:String,
  contribution:Number,
  email:String,
  status:{
    type:String,
    default:"Pending"
  }
});
module.exports = mongoose.model("participantModel", participantSchema)