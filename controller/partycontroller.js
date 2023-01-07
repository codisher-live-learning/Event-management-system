const participantModel = require("../models/participantModel");
const partyModel= require("../models/partyModel");
const loginModel = require("../models/userLoginModel")
const adminLoginModel= require("../models/adminLoginModel");
const { find, findById } = require("../models/partyModel");
const nodemailer=require("nodemailer");
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
         const partywithcode= await partyModel.findOne({partycode:partycode1});
         if(partywithcode)
             
                {
                    const pc= partywithcode.partycode;
                   if (partycode1==pc)  
                    {
                        res.render('organizedparties',{element:partywithcode});  
                    }
                    else{
                        res.render('partylogin',{message:"Invalid Party-Code"});
                    }
                }
         else{
            res.render('partylogin',{message:"Invalid Party-Code"})
         }         

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
    var mail=req.body.participant_mail;
    const student1=[
        {
               name:req.body.participant_name,
               email:req.body.participant_mail // its email
        }
    ]
     const user = await partyModel.findByIdAndUpdate({_id:id},{$push:{student:student1}});
     const student2 = user.student;
     // mail send
     //send mail
     var paname=user.name
     var smail=user.smail
     var spass=user.spass
     var emailto = mail
     var partycode1=user.partycode;
     var subjectto = "Invitation Email"
     var message = "You are inivited in the party :=> "+paname+" <=: and you can explore your party with party code::=>  "+partycode1+"  <=:   Dont Share this partycode with anyone other wise strictly action will be taken on you . Link :-https://gdscvbspu-gccp-project-fdcmizzc6a-el.a.run.app/partylogin"
     console.log(subjectto + ' ' + message + ' ' + emailto)
     let transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
             user: smail, // generated ethereal user
             pass: spass // generated ethereal password
         }
     }); //Sending mail to provided emailid
     let info = transporter.sendMail({
             from: smail, // sender address
             to: emailto, // list of receivers
             subject: subjectto, // Subject line
             html: "<h1 style='background-color: rgb(117, 175, 167);padding:50px;width:600px;border-radius: 10px;'>" + message +  "</h1>"
         },
         function(error) {
             if (error)
                 console.log(error)
             else
                 res.render('mailsend',{email:mail});
         })
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
             var contribution=0;
             var previous=0;
            contributors.forEach(item=>{
                contribution= previous+item.contribution;
                previous=contribution;
   
             })
             res.render('contributors',{person:contributors,expenses:previous})
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
    const id=req.body.paisa_id;
    const partycode54=req.body.paisa_code;
    const mail = req.body.paisa_email;
    try{
           const gotmoney= await participantModel.findByIdAndUpdate({_id:id},{$set:{status:"Done"}})
           const user =  await partyModel.findOne({partycode:partycode54})

           //mail send......../.........
      var paname=user.name
      var smail=user.smail
      var spass=user.spass
      var emailto = mail
      var partycode1=user.partycode;
      var subjectto = "Confirmation  Email"
      var message = "You have contributed in party..."+paname+"..Thanks for your contribution."
      console.log(subjectto + ' ' + message + ' ' + emailto)
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: smail, // generated ethereal user
              pass: spass // generated ethereal password
          }
      }); 
      //Sending mail to provided emailid
      let info = transporter.sendMail({
              from: smail, // sender address
              to: emailto, // list of receivers
              subject: subjectto, // Subject line
              html: "<h1 style='background-color: rgb(117, 175, 167);padding:50px;width:600px;border-radius: 10px;'>" + message +  "</h1>"
          },
          function(error) {
              if (error)
                  console.log(error)
              else
                  res.render('paisamilgyamail',{persons:gotmoney});
          })
           
    }
    catch(error){
        console.log(error.message);
    }
}
const deletecontributor = async (req,res)=>
{
    const id = req.query.id;
    try
    {
             const deleteobj = await participantModel.findByIdAndDelete({_id:id})
             const partycode1 = deleteobj.partycode;
             const contributors= await participantModel.find({partycode:partycode1})
             var contribution=0;
             var previous=0;
            contributors.forEach(item=>{
                contribution= previous+item.contribution;
                previous=contribution;
   
             })
             res.render('contributors',{person:contributors,expenses:previous})
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const organizerauth = async (req,res)=>
{
    try{
             res.render('organizerauth')
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const insertorganizer = async (req,res)=>
{
    const nayamurga= new adminLoginModel({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.mail,
        password:req.body.password,
        is_admin:1
    })
    try
    {
        const murga= await nayamurga.save();
        res.redirect('organizerlogin');
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const organizerlogin = async (req,res)=>
{
    const username= req.body.semail
    const password= req.body.spassword
    try{
        const murga= await adminLoginModel.findOne({email:username})
        
         if(murga)
         {
            const mpassword= murga.password;
                 if(password==mpassword) 
                  {
                    req.session.admin_id= murga._id
                     res.render('options')

                   }
                   else{
                    res.render('organizerlogin',{message:"Invalid Password"})
                   }
         }
         else{
            res.render('organizerlogin',{message:"Invalid Credentials"})
         }
    }
    catch(error)
    {
          console.log(error.message)
    }
}
const getorganizerlogin= async (req,res)=>
{
    try{
         res.render('organizerlogin')
    }
    catch(error)
    {
        console.log(error.message)
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
    updateStatus,
    organizerauth,
    insertorganizer,
    organizerlogin,
    getorganizerlogin,
    deletecontributor
}