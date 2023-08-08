import React from "react"
import Logo from "../assets/images/logo-devlinks-large.svg"
import Logo1 from "../assets/images/logo-devlinks-small.svg"
import Person from "../assets/images/icon-profile-details-header.svg"

import Link from "../assets/images/icon-link.svg"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  return (
    <div className="w-screen h-[48px] flex items-center justify-between max-md:w-full">
      <div className="w-full h-full flex justify-end items-center max-md:w-[30%]">
        <div className="w-full h-full flex justify-start items-center">
          <img src={Logo} alt="" className="w-auto h-full max-md:hidden" />
          <img
            src={Logo1}
            alt=""
            className="w-auto h-full max-md:visible md:hidden"
          />
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center gap-10 max-sm:gap-5 ">
        <NavLink
          to={`/${user && user.username}/links`}
          className="w-[122px] h-full ml-2 flex justify-center items-center rounded max-sm:w-14 max-sm:px-0"
        >
          <div className="w-full flex justify-center items-center">
            <img src={Link} alt="" className="w-auto mr-2 max-sm:mr-0" />
            <span className="max-sm:hidden">Links</span>
          </div>
        </NavLink>
        <NavLink
          to={`/${user && user.username}/profile`}
          className="w-[148px] h-full flex justify-center items-center rounded max-sm:w-14 max-sm:px-0"
        >
          <div className="w-full flex justify-center items-center">
            <img src={Person} alt="" className="" />
            <span className="max-sm:hidden">Profile Details</span>
          </div>
        </NavLink>
      </div>
      <div className="w-full h-full flex justify-end items-center max-sm:w-auto max-md:w-[30%]">
        <NavLink
          to={`/${user && user.username}/preview`}
          className="w-auto h-full px-10 text-[#633CFF] rounded border border-[#633CFF] flex items-center cursor-pointer max-sm:w-auto max-sm:px-2"
        >
          <div>Preview</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
