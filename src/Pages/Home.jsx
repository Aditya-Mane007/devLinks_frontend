import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset } from "../features/Users/userSlice"

const Home = () => {
  return (
    <div>
      Hi,Welcome to DevLinks
      <Link to="/login">Please Login?</Link>
      <Link to="/register">Please Register?</Link>
    </div>
  )
}

export default Home
