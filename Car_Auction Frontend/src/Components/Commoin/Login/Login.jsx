import React, { useContext } from 'react'
import AuthContext from '../../../Context/AuthContext'


const Login = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={loginUser}>
        <input type='text' name='username' placeholder='enter name'/>
        <input type='password' name='password' placeholder='Enter password'/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default Login