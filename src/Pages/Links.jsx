import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Screen from "../assets/images/illustration-phone-mockup.svg"
import Empty from "../assets/images/illustration-empty.svg"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import LinksComponent from "../components/Links"
import { addLink, getLink } from "../features/Links/linkSlice"
import { useNavigate } from "react-router-dom"

const Links = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [linkState, setLinkState] = useState({
    platform: "Github",
    url: ""
  })

  const { platform, url } = linkState

  const { user } = useSelector((state) => state.user)

  const { links, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.links
  )
  const onChange = (e) => {
    setLinkState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    // const regPattern = new RegExp(
    //   `^(https|http|ftp)?://?(www.)?(${platform})?(.com)?/([a-zA-Z0-9_.-]+)$i`
    // )
    // const isValidUrl = (url) => {
    //   console.log(url)
    //   console.log(regPattern.test(url))
    //   return regPattern.test(url)
    // }

    // if (isValidUrl(url)) {
    const formData = {
      platform,
      url
    }
    console.log(formData)
    dispatch(addLink(formData))
    // } else {
    // toast.error("Please add valid url")
    // }

    setLinkState({
      platform: "",
      url: ""
    })
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate("/login")
    }

    dispatch(getLink())

    return () => {
      // dispatch(reset())
    }
  }, [user, isError, isSuccess, message, dispatch, navigate])

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <header className="w-full h-[78px] px-[2rem] my-5 flex items-center">
        <Navbar />
      </header>
      <div className="w-full h-auto mt-16 flex relative">
        <div className="w-[35%] h-full flex items-center justify-evenly max-xl:hidden sticky top-20">
          <img src={Screen} alt="" className="w-auto h-[10%]" />
        </div>
        <div className="w-[60%] h-auto p-[40px] max-xl:w-full">
          <div className="w-full h-auto text-zinc-800 text-[32px] font-bold">
            Customize your links
          </div>
          <div className="w-full my-4 text-neutral-500 text-base font-normal leading-normal">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </div>
          <div
            className="add-link w-full h-[48px] my-4 text-violet-500 flex items-center justify-center border border-[#633CFF] hover:bg-violet-100 hover:text-violet-600 cursor-pointer rounded font-semibold"
            onClick={(e) => {
              e.target.style.display = "none"
              document.querySelector(".div").style.display = "block"
            }}
          >
            + Add new link
          </div>
          <div
            className="scale-up-ver-top div w-full h-auto border border-violet-300 p-5"
            style={{ display: "none" }}
            onDoubleClick={() => {
              document.querySelector(".div").style.display = "none"
              document.querySelector(".add-link").style.display = "flex"
            }}
          >
            <form onSubmit={submitHandler}>
              <div className="w-full h-auto py-1 ">
                <label
                  htmlFor="platforms"
                  className="w-full block mb-2 text-zinc-800 text-base font-normal "
                >
                  Choose a platform
                </label>
                <select
                  id="platforms"
                  name="platform"
                  className="w-full h-12 outline-none px-5 border  border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                  onChange={onChange}
                  value={platform}
                >
                  <option value="GitHub">GitHub</option>
                  <option value="Frontend Mentor">Frontend Mentor</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Dev.to">Dev.to</option>
                  <option value="Codewars">Codewars</option>
                  <option value="Codepen">Codepen</option>
                  <option value="freeCodeCamp">freeCodeCamp</option>
                  <option value="GitLab">GitLab</option>
                  <option value="Hashnode">Hashnode</option>
                  <option value="StackOverflow">Stack Overflow</option>
                </select>
              </div>
              <div className="w-full h-auto py-5 ">
                <label
                  htmlFor="url"
                  className="w-full block mb-1 text-zinc-800 text-base font-normal"
                >
                  Url :
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={url}
                  onChange={onChange}
                  className="w-full h-12 border outline-none px-5 border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full h-12 border text-violet-500 hover:text-white border-violet-500 hover:bg-violet-500 "
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          {links && links.length > 0 ? (
            <div className="w-full">
              <LinksComponent links={links} />
            </div>
          ) : (
            <div className="w-full h-[375px] ">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[488px] text-center">
                  <div className="flex justify-center my-4">
                    <img
                      src={Empty}
                      alt=""
                      className="w-auto h-auto flex items-center"
                    />
                  </div>
                  <div>
                    <div className="text-center text-zinc-800 text-[32px] font-bold ">
                      Let’s get you started
                    </div>
                    <div className="text-center text-neutral-500 text-base font-normal leading-normal">
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Links
