import React, { useEffect } from "react"
import Ben from "../assets/p4.jpeg"
import { useDispatch, useSelector } from "react-redux"
import PreviewLinks from "../components/PreviewLinks"
import { Link } from "react-router-dom"
import { getLink } from "../features/Links/linkSlice"

const Preview = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { links } = useSelector((state) => state.links)

  // const copyLink = (link) => {
  //   navigator.clipboard.writeText(link)
  // }

  useEffect(() => {
    dispatch(getLink())
  }, [dispatch])
  return (
    <div className="w-full h-full bg-neutral-50 relative">
      <div className="top-div bg-[#633CFF] w-full h-[375px] rounded-bl-[50px] rounded-br-[50px] py-5">
        <div className="navbar bg-white w-[98%] h-[78px] mx-auto rounded flex justify-between items-center px-8">
          <Link
            to={`/${user && user.username}/links`}
            className="btn rounded w-auto px-5 h-[46px] flex items-center cursor-pointer border border-[#633CFF] text-[#633CFF] font-bold"
          >
            Back to Editor
          </Link>
          <Link
            to={`/${user && user.username}`}
{/*             target="_blank" */}
            className="btn rounded w-auto px-5 h-[46px] flex items-center cursor-pointer text-white bg-violet-600 font-bold"
            // onClick={(e) => {
            //   e.target.innerHTML = "Copied!"
            //   copyLink(
            //     // `https://devlinks.onrender.com/${user && user.username}`
            //     `http://localhost:3000/${user && user.username}`
            //   )
            // }}
          >
            Share Link
          </Link>
        </div>
      </div>
      <div className="card bg-white w-[349px] h-auto absolute top-52 left-0 right-0 m-auto px-14 py-12  rounded-[15px] border">
        <div className="w-full h-auto flex flex-col justify-center items-center gap-5 bg-[#EEEEE]">
          <div className="image w-[104px] h-[104px]">
            <img src={Ben} alt="" className="w-full h-full rounded-full" />
          </div>
          <div className="name font-extrabold text-3xl">
            {user && user.firstname} {user && user.lastname}
          </div>
          <div className="email text-neutral-500">{user && user.email}</div>
        </div>
        <div className="w-full h-auto my-5">
          <PreviewLinks links={links} />
        </div>
      </div>
    </div>
  )
}

export default Preview
