const Razorpay=require("razorpay");
exports.instance=new Razorpay({
    key_id:_process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})