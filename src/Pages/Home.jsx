// import React, { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { reset } from "../features/Users/userSlice"

// const Home = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.user)

//   useEffect(() => {
//     if (!user) {
//       navigate("/login")
//     }
//     // if (user) {
//     //   navigate(`/${user && user.user && user.user.username}/links`)
//     // }

//     return () => {
//       dispatch(reset())
//     }
//   }, [user, dispatch, navigate])
//   return <h1>Home</h1>
// }

// export default Home
