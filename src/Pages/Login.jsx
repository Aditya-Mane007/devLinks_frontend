import React, { useEffect, useState } from "react"
import Logo from "../assets/images/logo-devlinks-large.svg"
import Email from "../assets/images/icon-email.svg"
import Password from "../assets/images/icon-password.svg"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../features/Users/userSlice"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  )

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const SubmitHandler = (e) => {
    e.preventDefault()

    const formData = {
      email,
      password
    }

    dispatch(login(formData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate(`/${user && user.username}/links`)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="w-screen h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="w-[476px] h-auto max-sm:w-[90%] ">
        <div className="w-full h-10 mx-auto">
          <img src={Logo} alt="devLinks" className="w-full h-full" />
        </div>
        <div className="w-full h-auto ">
          <div className="w-full h-auto my-[32px] flex flex-col justify-between">
            <div className="w-full text-[32px] h-[48px] text-zinc-800 font-bold leading-48">
              Login
            </div>
            <div className="w-full h-auto text-neutral-500 text-base font-normal">
              Add your details below to get back into the app
            </div>
          </div>
          <div className="w-full h-auto">
            <form className="w-full" onSubmit={SubmitHandler}>
              <div className="w-full h-auto">
                <label
                  htmlFor="email"
                  className="block w-full text-zinc-800 text-base font-normal my-1"
                >
                  Email Address
                </label>
                <div className="relative w-full flex items-center">
                  <div className="w-auto h-7 absolute inset-y-3 left-0 flex items-center px-2">
                    <img src={Email} alt="" className="w-full h-full" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full h-12 mb-4 border border-zinc-800 rounded-lg pl-10 text-lg outline-none focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40"
                    // required
                    placeholder="e.g. harryPotter7@email.com"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                {/* <p
                  className="w-full h-4 my-2 text-red-500 text-base"
                 
                >
                  Can’t be empty
                </p> */}
              </div>
              <div className="w-full h-auto mb-8">
                <label
                  htmlFor="email"
                  className="block w-full text-zinc-800 text-base font-normal my-2"
                >
                  Password
                </label>
                <div className="relative w-full flex items-center">
                  <div className="w-auto h-7 absolute inset-y-3 left-0 flex items-center px-2">
                    <img src={Password} alt="" className="w-full h-full" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full h-12 border border-zinc-800 rounded-lg pl-10 text-lg outline-none focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40"
                    // required
                    placeholder="Enter your password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                {/* <p className="w-full h-4 my-2 text-red-500 text-base">
                  Can’t be empty
                </p> */}
              </div>
              <div className="w-full h-[46px] bg-violet-600 hover:bg-violet-300 cursor-pointer   rounded-lg text-white text-[20px] font-semibold">
                <button type="submit" className="w-full h-full">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="w-full h-auto my-4 text-center text-[15px] text-neutral-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-violet-600">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
