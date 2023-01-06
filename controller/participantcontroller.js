const partyModel= require("../models/partyModel");
const participantModel= require("../models/participantModel");
const loginModel= require("../models/userLoginModel");

const participantlogin= async(req,res)=>
{
    try{
          res.render('participantlogin')
    }
    catch(error)
    {
       console.log(error.message)
    }
}
const loadaddparticpantsparty = async(req,res)=>
{
    const partycode1=req.body.partycode1;
    try{
         const partywithcode= await partyModel.findOne({partycode:partycode1});
         if(partywithcode)     
         {
             const pc= partywithcode.partycode;
            if (partycode1==pc)  
             {
                 res.render('yourparty',{one:partywithcode});  
             }
             else{
                 res.render('participantlogin',{message:"Invalid Party-Code"});
             }
         }
  else{
     res.render('participantlogin',{message:"Invalid Party-Code"})
  }     

    }
    catch(error)
    {
        console.log(error.message);
    }
}
const loadcontributors = async(req,res)=>
{
    const partycode3=req.query.id
    try{
        const party12= await partyModel.find({_id:partycode3})
        res.render('contribute',{pc:party12});
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
       email:req.body.email     
  })
  try {
      const newparticipant = await singleparticipant.save();
      res.render('thanks');
    }
     catch (error){
      res.send(error.messege)
  }
}
const loadparticipantauth= async (req,res)=>
{
    try{
          res.render('participantauth');
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const participantsignup= async (req,res)=>
{
    const nayamurga= new loginModel({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.mail,
        password:req.body.password
    })
    try
    {
        const murga= await nayamurga.save();
        res.render('participantauth');
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const getmurgalogin = async (req,res)=>
{
    try{
          res.render('murgalogin')
    }
    catch(error)
    {
      console.log(error.message);
    }
}
const murgalogin = async (req,res)=>
{
    const username= req.body.semail
    const password= req.body.spassword
    try{
        const murga= await loginModel.findOne({email:username})
        
        if(murga)
        {
            const pass= murga.password
            if(pass==password)
            {

                req.session.user_id= murga._id
               res.redirect('/participantlogin')
               
            }
            else{
                res.render('murgalogin',{message:"Invalid Credentials"})
            }
        }
        else{
            res.render('murgalogin',{message:"Invalid Credentials"})
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
}


module.exports=
{
    participantlogin,
    loadaddparticpantsparty,
    insertContributors,
    loadcontributors,
    loadparticipantauth,
    participantsignup,
    murgalogin,
    getmurgalogin
}
