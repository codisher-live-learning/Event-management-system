const partyModel= require("../models/partyModel");
const participantModel= require("../models/participantModel");

const participantlogin= async(req,res)=>
{
    try{
          res.render("participantlogin")
    }
    catch(error)
    {

    }
}
const loadaddparticpantsparty = async(req,res)=>
{
    const partycode1=req.body.partycode1;
    try{
         const partywithcode= await partyModel.find({partycode:partycode1});
         res.render('yourparty',{one:partywithcode});     
         console.log(partywithcode)

    }
    catch(error)
    {
        console.log(error.message);
    }
}
const loadcontributors = async(req,res)=>
{
    try{
          res.render('contribute');
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const insertContributors = async(req,res)=>
{
    const singleparticipant = new participantModel
    ({
       name:req.body.name,
       partycode:req.body.partycode,
       mobile:req.body.mobile,
       time:req.body.time,
       contribution:req.body.contribution, 
       mail:req.body.mail     
  })
  try {
      const newparticipant = await singleparticipant.save();
      res.render('thanks');
    }
     catch (error){
      res.send(error.messege)
  }
}

module.exports=
{
    participantlogin,
    loadaddparticpantsparty,
    insertContributors,
    loadcontributors
}