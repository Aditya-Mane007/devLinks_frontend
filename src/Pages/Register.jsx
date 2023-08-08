import React, { useState, useEffect } from "react"
import Logo from "../assets/images/logo-devlinks-large.svg"
import Email from "../assets/images/icon-email.svg"
import Password from "../assets/images/icon-password.svg"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { register, reset } from "../features/Users/userSlice"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
  })

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  )

  const { firstname, lastname, username, email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const SubmitHandler = (e) => {
    e.preventDefault()

    const formData = {
      firstname,
      lastname,
      username,
      email,
      password
    }

    dispatch(register(formData))
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
          <div className="w-full h-auto my-[10px] flex flex-col justify-between">
            <div className="w-full text-[32px] h-[48px] text-zinc-800 font-bold leading-48">
              Register
            </div>
            <div className="w-full h-auto text-neutral-500 text-base font-normal">
              Add your details below to get back into the app
            </div>
          </div>
          <div className="w-full h-auto">
            <form className="w-full" onSubmit={SubmitHandler}>
              <div className="w-full h-auto">
                <label
                  htmlFor="firstname"
                  className="block w-full text-zinc-800 text-base font-normal my-1"
                >
                  First Name
                </label>
                <div className="relative w-full flex items-center">
                  <div className="w-auto h-7 absolute inset-y-3 left-0 flex items-center px-2 mx-auto">
                    FN
                  </div>
                  <input
                    type="firstname"
                    name="firstname"
                    id="firstname"
                    className="w-full h-12 mb-4 border border-zinc-800 rounded-lg pl-10 text-lg outline-none focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40"
                    placeholder="e.g. Harry"
                    value={firstname}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="w-full h-auto">
                <label
                  htmlFor="lastname"
                  className="block w-full text-zinc-800 text-base font-normal my-1"
                >
                  Last Name
                </label>
                <div className="relative w-full flex items-center">
                  <div className="w-auto h-7 absolute inset-y-3 left-0 flex items-center px-2">
                    LN
                  </div>
                  <input
                    type="lastname"
                    name="lastname"
                    id="lastname"
                    className="w-full h-12 mb-4 border border-zinc-800 rounded-lg pl-10 text-lg outline-none focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40"
                    placeholder="e.g. Potter"
                    value={lastname}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="w-full h-auto">
                <label
                  htmlFor="username"
                  className="block w-full text-zinc-800 text-base font-normal my-1"
                >
                  Username
                </label>
                <div className="relative w-full flex items-center">
                  <div className="w-auto h-7 absolute inset-y-3 left-0 flex items-center px-2 text-[20px]">
                    @
                  </div>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="w-full h-12 mb-4 border border-zinc-800 rounded-lg pl-10 text-lg outline-none focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40"
                    placeholder="e.g. Potter"
                    value={username}
                    onChange={onChange}
                  />
                </div>
              </div>
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
                    placeholder="e.g. harryPotter7@email.com"
                    value={email}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="w-full h-auto mb-4">
                <label
                  htmlFor="password"
                  className="block w-full text-zinc-800 text-base font-normal my-1"
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
                    className="w-full h-12 mb-3 border border-zinc-800 rounded-lg pl-10 text-lg outline-none focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40"
                    placeholder="Enter your password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="w-full h-[46px] bg-violet-600 hover:bg-violet-300 cursor-pointer rounded-lg text-white text-[20px] font-semibold">
                <button type="submit" className="w-full h-full">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="w-full h-auto my-4 text-center text-[15px] text-neutral-500">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
