import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  
  withCredentials: true
})

http.interceptors.response.use(function(response){
  return response.data
}, function(error) {
  if (error.response?.status === 401) {
    localStorage.clear()
    window.location.assign('/login')
  }
  return Promise.reject(error)
})

export const login = ({ email, password }) => http.post('http://localhost:3011/login', { email, password })
export const signup = ({ name, email, password }) => http.post('http://localhost:3011/signup', { name, email, password })
export const editCar = ({ user, carBrand, model, id, registration, frameNumber, year }) => http.patch(`http://localhost:3011/cars/${id}`, { user, carBrand, model, id, registration, frameNumber, year })

