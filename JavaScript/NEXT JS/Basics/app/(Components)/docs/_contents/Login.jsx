import React from 'react'

const Login = ({setLogin}) => {
const handleclick=()=>{
    setLogin(false)
}
  return (
    <>
    <p>Login to continue</p>
    <button onClick={handleclick}>Login</button>
    </>
  )
}

export default Login