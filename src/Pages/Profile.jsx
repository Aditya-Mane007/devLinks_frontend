import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Screen from "../assets/images/illustration-phone-mockup.svg"
import ImageUpload from "../assets/images/icon-upload-image.svg"
import { useSelector, useDispatch } from "react-redux"
import { imageUpload, logout } from "../features/Users/userSlice"
import { useNavigate } from "react-router-dom"

import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  // Image Upload
  const [files, setFiles] = useState([])

  console.log(files)

  const fileValidator = (file) => {
    if (file.size > 1024 ** 2 * 2) toast.error("File is larger than 30mb")
    else return null
  }
  const onDrop = React.useCallback((acceptedFiles) => {
    // const file = e.target.files[0]

    // if (file) {
    //   const reader = new FileReader()

    //   reader.readAsDataURL(file)

    //   reader.onload = () => {
    //     console.log(reader.result)
    //   }
    // }

    const reader = new FileReader()
    console.log(acceptedFiles)
    acceptedFiles.map((file) => {
      reader.readAsDataURL(file)
      reader.onload = () => {
        setFiles({ preview: reader.result })
      }
    })
    // setFiles()
    // console.log(acceptedFiles)
    // setFiles(
    //   acceptedFiles.map((file) =>
    //     Object.assign(file, {
    //       preview: URL.createObjectURL(file)
    //     })
    //   )
    // )
  }, [])

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: "image/jpeg,image/png",
      maxFiles: 1,
      validator: fileValidator
    })
  {
    fileRejections.map((errors) => {
      errors.map((e) => toast.error(e.message))
    })
  }

  const upload = () => {
    const formData = {
      image: files.preview
    }
    console.log(formData)
    dispatch(imageUpload(formData))
  }

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message)
  //     toast.error(message)
  //   }
  //   if (isSuccess) {
  //     toast.success(message)
  //   }
  // }, [isError, isSuccess, message, navigate, dispatch])

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
          <div className="w-full h-auto">
            <div className="w-full h-auto text-zinc-800 text-[32px] font-bold">
              Profile Details
            </div>
            <div className="w-full my-4 text-neutral-500 text-base font-normal leading-normal">
              Add your details to create a personal touch to your profile.
            </div>
          </div>
          <div className="w-full h-[193px] px-10 flex items-center justify-between my-10 max-md:flex-col max-md:px-5 max-md:h-auto max-md:items-start">
            <div className="w-60 h-full flex items-center max-md:my-2">
              Profile picture
            </div>
            {files && files.length !== 0 ? (
              <div className="w-[193px] h-[193px]">
                <img src={files.preview} className="w-full h-full z-1" />
              </div>
            ) : (
              // <h1>Hello</h1>
              <div className="relative w-[193px] h-full text-violet-600 bg-violet-200 rounded max-md:w-[193px] max-md:h-[193px] max-md:my-3">
                <div
                  className="w-full h-full flex flex-col items-center justify-center z-0"
                  {...getRootProps({ role: "button" })}
                >
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="w-full h-[193px] opacity-100 absolute left-0 right-0"
                    {...getInputProps()}
                  />
                  <img src={ImageUpload} alt="" className="w-10 h-10 z-1" />
                  <div className="z-1">+ Upload Image</div>
                </div>
              </div>
            )}

            <div className="w-auto h-full flex items-center mx-10 max-md:my-2 max-md:text-left max-md:mx-0">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </div>
          </div>
          <div className="w-full h-auto">
            <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3">
              <div className="w-[50%]">First Name</div>
              <div className="w-[50%]">{user && user.firstname}</div>
            </div>
            <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3">
              <div className="w-[50%]">Last Name</div>
              <div className="w-[50%]">{user && user.lastname}</div>
            </div>
            <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3">
              <div className="w-[50%]">Email Address</div>
              <div className="w-[50%]">{user && user.email}</div>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="logout-btn w-auto h-auto px-5 py-2 mx-3 text-white bg-violet-600 flex items-center justify-end rounded cursor-pointer"
              onClick={upload}
            >
              save
            </div>
            <div
              className="logout-btn w-auto h-auto px-5 py-2 text-white bg-violet-600 flex items-center justify-end rounded cursor-pointer"
              onClick={() => {
                dispatch(logout())
                navigate("/")
              }}
            >
              logout
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
