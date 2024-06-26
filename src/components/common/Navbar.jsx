
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
const staticsubLinks=[{
  title:"python",
  link:"/catalog/python"
},
{
  title:"webdev",
  link:"/catalog/webdev"
}]
const Navbar = () => {
  //  const { token } = useSelector((state) => state.auth)
  // const { user } = useSelector((state) => state.profile)
  // const { totalItems } = useSelector((state) => state.cart)
  const location=useLocation([]);
  const [subLinks,setSubLinks]=useState([])
//   const fetchSublinks=async()=>{
//       try{

//         const result=await apiConnector("GET",categories.CATEGORIES_API);
//       setSubLinks(result.data.data)
//         console.log(result)
//       }
//       catch(error){
//         console.log("Could not fetch the category list")
//       }
//     }
  
//  useEffect(()=>{
//     fetchSublinks();
//   },[]) 
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
return (
  <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
    <div className="flex w-11/12 max-w-maxContent items-center justify-between">
      <Link to="/">
        <img src={logo} width={160} height={42} loading="lazy" />
      </Link>
      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title.trim() === "Catalog" ? (
                <div className='relative flex items-center gap-2 group'>
                  <p>{link.title}</p>
                   <IoIosArrowDropdownCircle />
                                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                  </div>
                  {

                 subLinks.length ? (
                   staticsubLinks.map((subLink,index)=>(
                      <Link to={`${subLink.link}`} key={index}>
                        <p>{subLink.title}</p>
                      </Link>
                   ))
                ):(<div></div>)
                  }
                </div>
                </div>
              ) : (
                <Link to={link?.path}>
                  <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                    {link.title}
                  </p>
              
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
);
}
export default Navbar

