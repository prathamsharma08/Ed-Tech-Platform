import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link ,matchPath} from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
const subLinks=[{
  title:"python",
  link:"/catalog/python"
},
{
  title:"webdev",
  link:"/catalog/webdev"
}]
const Navbar = () => {
   const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location=useLocation([]);
  // const [subLinks,setSubLinks]=useState([])
  // const fetchSublinks=async()=>{
  //     try{
  //       const result=await apiConnector("GET",categories.CATEGORIES_API);
  //     setSubLinks(result.data.data)
  //       console.log(result)
  //     }
  //     catch(error){
  //       console.log("Could not fetch the category list")
  //     }
  //   }
  
  // useEffect(()=>{
  //   fetchSublinks();
  // },[])
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div 
    className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ">
      <div  className="flex w-11/12 max-w-maxContent items-center justify-between">
      <Link to="/">
      <img src={logo} width={160} height={42} loading="lazy"/>
      </Link>
      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>{
          NavbarLinks.map((link,index)=>(
             <li key={index}>
              { 
                link.title === "Catalog "?(
                <div className='flex items-center gap-2 '>
                  <p>{link.title}</p> 
                  <IoIosArrowDropdownCircle/> 
                  <div className=''>
                  </div>
                </div>):(
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path)? "text-yellow-25" : "text-richblack-25"}`} >
                      {link.title}
                      
                    </p>
                  
                  </Link>
                )
              }
            </li>
          ))
        }
        
        </ul>
      </nav>
      {/* login signup dashboard */}
      <div className='flex gap-x-4 items-center'>
      
        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        
      </div>
      </div>
  )
}

export default Navbar



