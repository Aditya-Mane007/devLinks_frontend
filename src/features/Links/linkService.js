import axios from "axios"

const URL = "http://localhost:5000/api/users/"

const getLink = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(URL + 'getlink',config)

  return response.data
}

const addLink = async (formData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(URL + 'addlink',formData,config)

  return response.data
}

const updateLink = async (formData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(URL + `updatelink/${formData.id}`,formData,config)

  return response.data
}

const deleteLink = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(URL + `deletelink/${id}`,config)

  return response.data
}

const userService = {
  getLink,
  addLink,
  updateLink,
  deleteLink
}

export default userService