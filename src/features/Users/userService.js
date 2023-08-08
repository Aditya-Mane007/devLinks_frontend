import axios from "axios"

const URL = "http://localhost:5000/api/users/"


const register = async (formData) => {
  const response = await axios.post(URL + 'register',formData)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}

const login = async (formData) => {
  const response = await axios.post(URL + 'login',formData)

  console.log(response.data)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}

// const getUser = async () => {
//   const response = await axios.get(URL + "getUser")

//   localStorage.setItem("UserDate",JSON.stringify(response.data))
// }

const logout = () => {
  localStorage.removeItem("User")
}


const imageUpload = async (formData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(URL + 'imageUplaod',formData,config)

  return response.data
}



const userService = {
  register,
  login,
  logout,
  imageUpload
}

export default userService