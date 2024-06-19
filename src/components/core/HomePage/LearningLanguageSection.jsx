import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] mb-[36px]'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss knife for
          <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base font medium mt-3 w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img  src={Know_your_progress} 
          alt="Know Your ProgressImage"
          className='object-contain -mr-32'/>
           <img  src={Compare_with_others} 
           alt=""
          className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>
           <img  src={Plan_your_lessons} 
          alt="Know Your ProgressImage"
           className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"/>
          </div>
        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
          <div >
            Learn More</div></CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
