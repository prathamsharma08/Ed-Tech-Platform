
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
// reset password taken
exports.resetPasswordToken=async(req,res)=>{
    // get email from req body
    try{
    const email=req.body.email;
    // 

    // check user for this ElementInternals,email validation
    const user=await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message:"Your Email is not registered with us "
        })
    }
    // generate token
    const token=crypto.randomUUID();

    // update user by adding token and expiration time
    const updatedDetails=await User.findOneAndUpdate({email:email},
        {token:token,
        resetPasswordExpires: Date.now() + 5*60*1000
},{
    new:true
})
  
    // send mail containg url
    await mailSender(email,"Password Reset Link",
        `Password Reset Link : ${url}`
    )
    // return response
    return res.json({
        success:true,
        messsage:"Email send succesfully please reset password"
    })
      // create url
    const url=`http://localhost:3000/update-password/${token}`
    
 
}
catch(error){
console.log(error);
return res.json(500).json({
    success:false,
    message:"Something went wrong"
})
}
}
// resetpassword
exports.resetpassword=async(req,res)=>{
    // data fetch
    try{
    const {password,confirmPassword,token}=req.body;
    
    // validation
    if(password!==confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching",
        })
    }
    // get user details from db using token
    const userDetails=await User.findOne({token:token});

    // if no entry -invalid 
    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is invalid",
        })
    }
    // token time check
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token expired ,please regenerate your token"
        })
    }

    // hash pwd
    const hashedPassword=await bcrypt.hash(password,10);

    // password update
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    )
    // return response
    return res.status(200).json({
        success:true,
        message:"Password reset successfull"
    })
}
catch(error){
    console.log(error);
    res.json(500).json({
       success:false,
        message:'Something went wrong'
    })
    
}
}