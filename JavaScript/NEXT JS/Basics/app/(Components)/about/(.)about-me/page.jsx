'use client'

import { useState } from "react"
import Link from "next/link"

const page = () => {
    const [login , setLogin]= useState(false)
    const handleClick=()=>{
      setLogin(true)
    }
  
  return (
    <>
    <h2>Please Login (about-me Route Intercepted)</h2>
    <button onClick={()=>{handleClick}}>Login </button>
    {login && <h2>you are logged in</h2>}
    {login && <h2><Link href={'about-me'}>Click here</Link>to continue</h2>}
    </>
    
  )
}

export default page