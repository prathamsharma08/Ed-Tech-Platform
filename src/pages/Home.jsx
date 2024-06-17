import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className='relative mx-auto  flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
        <Link to={"/signup"}>
        <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
        transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
            transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <FaArrowRight/>
            </div>
        </div>
        </Link>
        <div className='text-center text-4xl mt-7'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"}/>
        </div>
        <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active ={true} linkto={"/signup"}>Learn More</CTAButton>
           <CTAButton linkto={"/login"} active={false}>Book a Demo</CTAButton>
        </div>
        <div className='shadow-blue-200 mx-3 my-12 '>
          <video
          mutedloop
          autoPlay>
            <source src={Banner} type='video/mp4'/>
          </video>
        </div>
        {/* code section -1 */}
        <div>
          <CodeBlocks
           position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}/>
        </div>
         {/* code section -2 */}
        <div>
          <CodeBlocks
           position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}/>
        </div>

      </div>
      {/* section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700 '>
        <div className='homepage_bg h-[333px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between '>
          <div className='h-[100px]'></div>
          <div className='flex flex-row gap-7 text-white'>
            <CTAButton active={true} linkto={"/signup"}>
            <div className='flex items-center'>
              Explore Full Catalog
              <FaArrowRight/>
            </div>

            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
            <div>
              Learn More
            </div>
            </CTAButton>
          </div>

          </div>
        </div>
   
      <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
      <div className='flex flex-row gap-5 mb-10 mt-[60px]'>
        <div className='text-4xl font-semibold w-[45%]'>
          Get the Skills you need for a
          <HighlightText text={"Job that is in demand"}/>
        </div>
          <div className='flex flex-col gap-10 w-[40%] items-start'>
        <div className='text-[16px]'>
          The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
        </div>
        <CTAButton active={true} linkto={"/signup"}>
        <div>Learn More</div>
        </CTAButton>
      </div>
      </div>
    
      </div>
      <TimelineSection/>
      <LearningLanguageSection/>
      {/* section 3 */}
      {/* section 4 */}
    
    </div>
       </div>
  )
}

export default Home;