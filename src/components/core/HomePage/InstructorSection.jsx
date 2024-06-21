import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col lg:flex-row gap-20 items-center'>
   <div className='lg:w-[50%]'>
    <img src={Instructor}
    alt=""
         className="shadow-white shadow-[-20px_-20px_0_0]"/>
  </div>
   <div className='lg:w-[50%] flex flex-col gap-10'>
   <div classnName='text-4xl font-semibold lg:w-[50%]'>
    Become an 
    <HighlightText text={"Instructor"}/>
   </div>
   <p className="font-medium text-[16px] text-justify w-[80%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <div className='w-fit'>
                 <CTAButton active={true} linkto={"/signup"}>
          <div className='flex flex-row gap-3 items-center'>
            Start Learning Today
            <FaArrowRight/>
          </div>
            </CTAButton>
            </div>
           
    </div>
    </div>
    </div>
  )
}

export default InstructorSection
