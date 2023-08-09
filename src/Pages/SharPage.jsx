import React, { useEffect, useState } from "react"
import Ben from "../assets/p4.jpeg"
import { useDispatch, useSelector } from "react-redux"
import PreviewLinks from "../components/PreviewLinks"
import { Link, useParams } from "react-router-dom"
import { getLink } from "../features/Links/linkSlice"
import axios from "axios"

const SharPage = () => {
  let { username } = useParams()

  const userDetails = JSON.parse(localStorage.getItem("UserDetails"))

  // console.log(userDetails)

  const getUserDetails = async () => {
    const response = await axios.get(
      `https://devlinksbackend.onrender.com/api/users/getUser`
    )

    // console.log(response.data)
    localStorage.setItem("UserDetails", JSON.stringify(response.data))
  }

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
  }
  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="w-full h-full bg-neutral-50 relative">
      <div className="top-div bg-[#633CFF] w-full h-[375px] rounded-bl-[50px] rounded-br-[50px] py-5">
        <div className="navbar w-[98%] h-[78px] mx-auto rounded flex justify-between items-center px-8">
          <Link
            to={`/register`}
            target="_blank"
            className="btn rounded w-auto px-5 h-[46px] flex items-center cursor-pointer  text-white  text-[32px] font-bold"
          >
            DevLinks
          </Link>
          <div
            className="btn rounded w-auto px-5 h-[46px] flex items-center cursor-pointer text-[#633cff] bg-white font-bold"
            onClick={(e) => {
              e.target.innerHTML = "Copied!"
              copyLink(
                `https://devlinks.onrender.com/${
                  userDetails && userDetails.username
                }`
              )
            }}
          >
            Share
          </div>
        </div>
      </div>
      <div className="card bg-white w-[349px] h-auto absolute top-52 left-0 right-0 m-auto px-14 py-12  rounded-[15px] border">
        <div className="w-full h-auto flex flex-col justify-center items-center gap-5 bg-[#EEEEE]">
          <div className="image w-[104px] h-[104px]">
            <img src={Ben} alt="" className="w-full h-full rounded-full" />
          </div>
          <div className="name font-extrabold text-3xl">
            {userDetails && userDetails.firstname}{" "}
            {userDetails && userDetails.lastname}
          </div>
          <div className="email text-neutral-500">
            {userDetails && userDetails.email}
          </div>
        </div>
        <div className="w-full h-auto my-5">
          <PreviewLinks links={userDetails.links} />
        </div>
      </div>
    </div>
  )
}

export default SharPage
