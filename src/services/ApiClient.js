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

export const login = ({ email, password }) => http.post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
export const signup = ({ name, email, password }) => http.post(`${process.env.REACT_APP_API_URL}/signup`, { name, email, password })
export const Logout = ( ) => http.get(`${process.env.REACT_APP_API_URL}/logout`)
export const editCar = ({ carBrand, model, id, registration, frameNumber, year }) => http.patch(`${process.env.REACT_APP_API_URL}/cars/${id}`, {  carBrand, model, id, registration, frameNumber, year })
export const eliminarCoche = ( carId ) => http.delete(`${process.env.REACT_APP_API_URL}/cars/${carId}`)
export const consultarPartes = ( user ) => http.get(`${process.env.REACT_APP_API_URL}/services-resume/${user}`)
export const addParte = ({ date, user, car, services, workshop, damagedParts }) => http.post(`${process.env.REACT_APP_API_URL}/services-resume`, { date, user, car, services, workshop, damagedParts })

export const deleteParte = (parteId) => http.delete(`${process.env.REACT_APP_API_URL}/services-resume/delete/${parteId}`, { parteId })
export const userProfile = ( userId ) => http.get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
export const editUser = ( { userId, name, email } ) => http.patch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{ name, email })
export const detalleParte = ( parteId ) => http.get(`${process.env.REACT_APP_API_URL}/services-resume/detail/${parteId}`)

export const workshops = ( ) => http.get(`${process.env.REACT_APP_API_URL}/workshops`)
export const listarPartes = ( ) => http.get(`${process.env.REACT_APP_API_URL}/services-resume`)
export const eliminarParte = ( parteId ) => http.delete(`${process.env.REACT_APP_API_URL}/services-resume/delete/${parteId}`)
export const cerrarParte = ( parteId, active ) => http.patch(`${process.env.REACT_APP_API_URL}/cerrar-parte/${parteId}`,{active})

