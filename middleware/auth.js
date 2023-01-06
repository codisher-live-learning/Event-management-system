const userisLogin = async (req,res,next)=>
{
    try{
         if(req.session.user_id){}
         else{
            res.redirect("/")
         }
         next();
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const userisLogout = async (req,res,next)=>
{
    try{
         if(req.session.user_id)
         {
            res.redirect("/participantlogin")
         }
        next();
    }
    catch(error)
    {
        console.log(error.message)
    }
}
module.exports= {
    userisLogin,
    userisLogout
}