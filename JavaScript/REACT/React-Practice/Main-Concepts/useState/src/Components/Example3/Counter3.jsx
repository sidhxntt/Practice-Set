import { useEffect } from "react"

const Counter3 = ({handleClick}) => {
    useEffect(() => {
        console.log("Child component Rendered")
    })
    
  return (
    <button onClick={handleClick}>Click me</button>
  )
}

export default Counter3