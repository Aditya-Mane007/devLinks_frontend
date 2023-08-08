import React, { useEffect, useState } from "react"
import LinkIcon from "../assets/images/icon-link.svg"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { updateLink, deleteLink } from "../features/Links/linkSlice"
const Link = ({ link, index }) => {
  const [updateState, setUpdateState] = useState({
    platform: link.platform,
    url: link.url
  })
  const dispatch = useDispatch()
  const { isLoding, isError, isSucess, message } = useSelector(
    (state) => state.user
  )
  const onChange = (e) => {
    setUpdateState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    // console.log(
    //   e.target.parentElement.parentElement.parentElement.parentElement
    //     .firstChild.lastChild.firstChild.firstChild
    // )
    const btn =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.firstChild.lastChild.firstChild.firstChild
    // console.log(btn)
    btn.removeAttribute("disabled")
  }

  // console.log(updateState)

  const update = (e) => {
    e.preventDefault()
    const formData = {
      id: link._id,
      platform: updateState.platform,
      url: updateState.url
    }
    console.log(formData)
    dispatch(updateLink(formData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSucess) {
      toast.success(message)
    }
  }, [isError, isSucess, message, dispatch])
  if (isLoding) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <div className="link w-full h-auto my-20">
        <div className="title w-full h-6 flex justify-between my-3">
          <div className="title-text">#Link {index + 1}</div>
          <div className="function flex gap-5 cursor-pointer uppercase">
            <div>
              <input
                type="submit"
                value="update"
                className="update-btn w-full h-auto p-2 rounded uppercase text-white bg-violet-400 hover:bg-violet-500 enabled:cursor-pointer"
                onClick={update}
              />
            </div>
            <div>
              <input
                type="button"
                value="remove"
                className="remove-btn w-full h-auto p-2 rounded uppercase bg-red-500 text-white cursor-pointer"
                onClick={() => {
                  dispatch(deleteLink(link._id))
                }}
              />
            </div>
          </div>
        </div>
        <div className="link-div w-full my-2">
          <form>
            <div>
              <label htmlFor="platform">Platform</label>
              <select
                id="platforms"
                name="platform"
                className="w-full h-12 outline-none px-5 border  border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                required
                value={updateState.platform}
                onChange={onChange}
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
                <option value="Stack Overflow">Stack Overflow</option>
              </select>
            </div>
            <div className="w-auto h-auto my-4">
              <label htmlFor="url">Link</label>
              <div className="relative w-full">
                <div className="w-auto h-7 absolute inset-y-3 left-0 flex items-center px-2">
                  <img src={LinkIcon} alt="" className="w-full h-full" />
                </div>
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={updateState.url}
                  onChange={onChange}
                  required
                  className="w-full h-12 border outline-none px-10 border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Link
