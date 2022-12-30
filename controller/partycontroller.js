const participantModel = require("../models/participantModel");
const partyModel= require("../models/partyModel");
 //// options load karne ka code.............
const loadoptions = async(req,res)=>
{
  try{
     res.render('options');
  }
  catch(error)
  {
    console.log(error.message);
  }
}
///// organizer ke party add akrne ka code.........................
 const addparty = async (req,res)=>
 {
    try{
        res.render('addparty')
    }
    catch(error)
    {
        console.log(error.message);
    }
 }
 //////////////////// organized party ko dekhne ka code...........
 const partylogin= async (req,res)=>
 {
    try{
        res.render('partylogin')
    }
    catch(error)
    {
        console.log(error.message);
    }
 }
 ///////party database me add akrne ka code..............
const insertparty = async(req,res)=>
{
    try{
        const singleparty = new partyModel({
            name : req.body.name,
            venue : req.body.venue,
            date : req.body.date,
            time : req.body.time,
            partycode:req.body.partycode,
            budget:req.body.budget,
            smail:req.body.smail,
            spass:req.body.spass
            });
            const partycode=req.body.partycode;
            const partydata= await singleparty.save();
            if(partydata)
            {
                res.render('partyaddedsuccess',{message:partycode});
            }
            else{
                    res.send("Registration failed");
            }
    }
    catch(error)
    {
        console.log(error.message);
    }
}
////// party code dalne ke baad party dekhne ka code.........///
const loadparty= async(req,res)=>
{
    const partycode1=req.body.partycode1;
    try{
         const partywithcode= await partyModel.find({partycode:partycode1});
         res.render('organizedparties',{student:partywithcode});           

    }
    catch(error)
    {
        console.log(error.message);
    }
}
//////////// party me participant addd karne ka code........
const loadaddparticpants= async(req,res)=>
{
    try{
        const id= req.query.id;
        const user = await partyModel.findById({_id:id})
         res.render('addparticipants', {user : user})
    }
    catch(error)
    {
        console.log(error.message);
    }
}
/////// particpant databse me dalne ka code..........
const add_participants = async(req,res)=>
{
    try{
    const id=req.query.id;
    var mail=req.body.participant_contri;
    const student1=[
        {
               name:req.body.participant_name,
               email:req.body.participant_mail// its email
        }
    ]
     const user = await partyModel.findByIdAndUpdate({_id:id},{$push:{student:student1}});
     const student2 = user.student;
     res.render('showparticipant',{chutiya:student2});
  }
  catch(error)
 {
     console.log(error.message);
  }
}

/////////// party me kisne contribute kiya uska code..............
const loadContributors= async(req,res)=>
{
    try{
             const partycode1=req.query.partycode;
             const contributors= await participantModel.find({partycode:partycode1})
             res.render('contributors',{person:contributors})
    }
    catch(error)
    {
       console.log(message.error)
    }
}
// party me kisko bulaya gya hai uska code
const showparticipants = async (req,res)=>
{   
    const id=req.query.id;
    try{
        const allParticipants=await partyModel.findById({_id:id}) // yaha pe condtion laga ke
        const student1=allParticipants.student;
       res.render("showparticipant",{chutiya:student1}); 
    }
    catch(error)
    {
       console.log(error.message);
    }
}
/// update karne ka code
const getpaisevala= async (req,res)=>
{
    const id= req.query.id;
    try{
        const paisadenevale= await participantModel.findById({_id:id})
        res.render('paisamilgyamail',{persons:paisadenevale});
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const updateStatus= async (req,res)=>

{
    const id=req.query.id;
    try{
           const gotmoney= await participantModel.findByIdAndUpdate({_id:id},{$set:{status:"Done"}})
           res.render('paisamilgyamail',{persons:gotmoney});
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports= {
    loadoptions,
    addparty,
    partylogin,
    insertparty,
    loadparty,
    loadaddparticpants,
    add_participants,
    loadContributors,
    showparticipants,
    getpaisevala,
    updateStatus
}