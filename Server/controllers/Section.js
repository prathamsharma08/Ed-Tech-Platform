const Section =require("../models/Section");
const Course=require("../models/Course");
exports.createSection=async(req,res)=>{
    try{
        // data fetch
        const {sectionName,courseId}=req.body;
        // data validation
        if(!sectionName || !courseName ){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
        })
        }
        // create section
        const newSection=await Section.create({sectionName})

        // update course with section Objectied
        const updatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,

                }
            },
            {new:true},
        )
        //  populate to replace setion/subsectioib both in the updated coursedeatils'
        // return response
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourseDetails
        })
        // return response

    }

    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Unable to create Section Successfully,please try again",
            error:error.message
        })
    }
}
exports.updateSection=async(req,res)=>{
    try{
       // data input
         const {sectionName,sectionId}=req.body;
        // data validation
        if(!sectionName || !courseName ){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
        })}
        // update data
     const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        // return response
return res.status(200).json({
    success:true,
    message:"Section Created Successfully"
    
})
    
    }
    catch(error){
       return res.status(400).json({
            success:false,
            message:"Unable to update Section Successfully,please try again",
            error:error.message
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        // get Id-assuming that we are sending Id in params
        const {sectionId}=req.params;
        // use FindByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // do we need to delete from schema
        // retrurn response
        return res.status(200).json({
            success:true,
            message:"Section Deleted successfully"
        })

    }
    catch(error){
   return res.status(400).json({
            success:false,
            message:"Unable to create Section Successfully,please try again",
            error:error.message
        })
    }
}

