const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer");
// sendotp

exports.sendOTP=async(req,res)=>{
    try{
    // fetch email from request ki body
    const {email}=req.body;
    // check if user already exist
    const checkUserPresent=await User.findOne({email});
    // if user already present then return a response,
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"user already registered",

        })
    }
    // otp generator
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    console.log("OTP generated",otp);
    // check unique otp or not
    const result=await OTP.findOne({otp:otp});
    while(result){
        otp=otpGenerator(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    result=await OTP.findOne({otp:otp})
    }
    const otpPayload={email,otp};
    // create an entry for OTP
    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);
    // return response
    res.status(200).json({
        success:true,
        message:"Otp send "
    })


}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}
}

// signup 

exports.signup=async(req,res)=>{
    try{
    // data fetch
    const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;

    // validate
    if(!firstName || !lastName || !email ||!password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        })

    }
    // 2 password match
    if(password !==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and Confirm password value does not match, please try again"

        })
    }
    // check user already exist
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already registerd"
        })
    }
    // find most recent otp stored for user
    const recentOtp=await OTP.find({OTP}.sort({createdAt:-1}.limit(1)))
    console.log(recentOtp);
    // validate otp
    if(recentOtp.length==0){
        // otp not found
        return res.status(400).json({
            success:false,
            message:"OTP found"
        })
    }
    else if(otp!=recentOtp.otp){
        // invalid otp
        return res.status(400).json({
            success:false,
            message:"Otp Invalid"
        })
    }
    // hash password
    const hashedPassword=await bcrypt.hash(password,10)
const profileDetails=await Profile.create({
    gender:null,
    dateofBirth:null,
    about:null,
    contactNumber:null,
})
    // entry create in Db
    const user=await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`
    })
    // return res
    return res.status(200).json({
        success:true,
        message:"User is registered Succesfully",
        user,
    })
}
catch(error){
    console.log(error);
    
    res.status(500).json({
        success:false,
        message:"User cannot be Reigester pls try again"
})
}
    // return res
}
// login

exports.login=async(req,res)=>{
    try{
        // get data from req ki body
         const {email,password}=req.body;

         
        // vaildation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        // user check exist or not
        const user =await User.findOne({email});
        if(!User){
            return res.status(401).json({
                success:false,
                message:"user is not regiterd please refister"
            })
        }
        // generate JWT,after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                user:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token=token;
            user.password=undefined;
            // createcookie
            const options={
                expiresIn:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Login successfully"
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        // create co0kie
    }
    catch(error){
     return res.status(500).json({
        success:false,
        message:"Login Failure,please try again",
     })

       

    }
}
// change password
exports.changePassword=async(req,res)=>{
    try{
        // get data from req body
                const { oldPassword, newPassword, confirmPassword } = req.body;
// validation
if (newPassword !=confirmPassword) {
            return res.status(400).json({ error: "New password and confirm new password don't match" });
        }
        // get old password new password ,confirm new password
const user = await User.findById(req.user._id); // Assuming you're using some form of authentication middleware that adds `user` to the request object
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }
        // update pwd in db
         const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Send email notification
        const transporter = nodemailer.createTransport({
            host:process.env.HOST ,// Use the service you want to send email from
    auth: {
        user: process.env.USER, // Your email address
        pass: process.env.PASSWORD // Your email password
    }
})
 const info = await transporter.sendMail({
    from: process.env.USER, // sender address
    to: "bar@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world?</b>" // html body
  });
    
        // return response
        return res.status(500).json({
            success:true,
            message:"Password changed successfully"
        })

    }
    catch(error){
console.log(error);
    }
}




