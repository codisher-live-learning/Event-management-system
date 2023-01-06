const userisLogin = async (req,res,next)=>
{
    try{
         if(req.session.admin_id){}
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
         if(req.session.admin_id){
            res.redirect("/options")
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