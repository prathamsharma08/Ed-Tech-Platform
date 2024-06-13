const jwt=require("jsonwebtoken");
require("dotenv"),config();
const User=require("../models/User");
// auth
exports.auth=async(req,res,next)=>{
    // auth
    try{
    // extract token
    const token=req.cookies.token || req.body.token ||req.header("Authorization").replace("Bearer","");
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token mising"
        })
    }
    // verify token
    try{
        const decode=await jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user=decode;
    }
catch(error){
    // verification issue
    return res.status(401).json({
        success:false,
        message:"token is invalid",
    })
}
next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong"
        })
    }
   
   


}
 // isstudent
exports.isStudent=async(req,res,next)=>{
    // 
    try{
        if(req.user.accountType!="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again"
        })
    }
}

    // isinstructor
exports.isInstructor=async(req,res,next)=>{
    // 
    try{
        if(req.user.accountType!="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again"
        })
    }
}

   // isadmin
    exports.isAdmin=async(req,res,next)=>{
    // 
    try{
        if(req.user.accountType!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again"
        })
    }
}
  