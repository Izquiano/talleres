import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import './Confirmation.css'



const Confirmation = () => (

  <div className="confirmationContainer">
  
  
  <img src="/icons/ic_Check.svg" alt="icon"/>

  <Logo 
  size="small"
  />

  <p><b>
  Gracias por solicitar nuestro servicio.
  </b>
 </p>
 <p> En breve recibirá una notificación en su correo con la confirmación del mismo y la información asociada
  </p>
  <Link to='/home' className="buttonToHome">Ir a la home</Link>

 
</div>

)

export default Confirmation