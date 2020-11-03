import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const RedirectToLogin = () => <Redirect to="/login"/>
const RedirectToHome = () => <Redirect to="/home"/>
// const RedirectToAdmin = () => <Redirect to="/dashboard"/>


export const AuthenticatedRoute = (props) => {
  
  const {user} = useAuthContext()
  // return user ? <Route {...props}/> : <Redirect to="/login" />
  return <Route {...props } component={user ? props.component : RedirectToLogin}/>
}

export const NotAuthenticatedRoute = (props) => {
  const { user } = useAuthContext()
  // const redirect = user && user.rol === "admin" ? RedirectToAdmin : user.rol === "client" && RedirectToHome
  // return <Route {...props } component={!user ? props.component : redirect}/>
  return <Route {...props } component={!user ? props.component : RedirectToHome}/>
 
}

// export default AuthenticatedRoute