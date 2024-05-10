import { useEffect } from "react"

const Counter2 = ({handleClick , count}) => {
    useEffect(() => {
        console.log("Child component Rendered")
    })
  return (
    <>
    <button onClick={handleClick}> count is {count}</button>
  </>
  )
}

export default Counter2