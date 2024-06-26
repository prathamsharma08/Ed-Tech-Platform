const Course=require("../models/Course");
const User=require("../models/User")
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const Category=require("../models/Category"); 
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
// create handler function
exports.createCourse=async(req,res)=>{
    try{
        // fetch data
        const {courseName,courseDescription,category,whatYouWillLearn,price,tag}=req.body;
   
            
         // get thumbnail
const thumbnail=req.files.thumbnailImage;
if(!courseName || !courseDescription || !category || !whatYouWillLearn || !price || !tag || !thumbnail){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    })
}
    
    // check for instructor
    const userId=req.user.id;
    const instructorDetails=await User.findById(userId);
    console.log(instructorDetails)
    // verify userId and instructor deatils are same or different
    if(!instructorDetails){
        return res.status.json(404).json({
            success:false,
            message:"Instrcutor Deatils not found",

        })
        
       
    
    }
    // check given tag is valid or not
     const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    //  upload image to cloudinary
    const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
    // create an entry for new course
    const newCourse=await Course.create({
        courseName,courseDescription:instructorDetails._id,
        whatYouWillLearn,
        price, 
        tag,
        category:categoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
    })

    //   add theb new course to user 
    await User.findByIdAndUpdate({
        _id:instructorDetails._id
    },{
$push:{
    courses: newCourse._id}
},{new:true},)
// update the tag ka schema
const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  }
// todo


    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message:"Failed to create Course"
        })
        
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


// get all courses handler function
exports.showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({},{courseName:true,
            price:true,thumbnail:true,instructor:true,ratingAndReviews:true,
            studentEnrolled:true}  ).populate("instructor").exec();
            return res.status(200).json({
                success:true,
                message:"Data for all courses fetched successfully",
                data:allCourses,
            })
        }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"cannot Fetch course data",
            error:error.message,
        })
        
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}



// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnroled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}