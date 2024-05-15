'use client'

import { useEffect,useState } from "react"

const page = () => {
  const [count ,setCount] = useState(0)
  useEffect(()=>{
    if(count==10){
      throw new Error("10 is an error element ")
    }
  },[count])
  return (
    <>
        <h1>Counter: {count}</h1>
        <button onClick={()=>setCount(count+1)}>Increment</button>
    </>

  )
}

export default page