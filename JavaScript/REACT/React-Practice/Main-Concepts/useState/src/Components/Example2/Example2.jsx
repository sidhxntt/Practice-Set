import { useState, useEffect } from "react"
import Counter2 from "./Counter2"

const Example2 = () => {
    let [count, setCount] = useState(0)

    useEffect(() => {
        console.log('Parent Component Rendered')
    })

    function handleClick() {
        setCount(count + 1)
    }
  return (
    <>
      <h1>Example 2</h1>
      <p>Tranfer of Entire handleclick function and count(state) of the parent to children component where the function is getting triggered </p>
      <p>Therefore on changing state of parent from child will trigger re-rendering of both </p>
      <p>Parent will re-render because its state got changed by it child</p>
      <p>child will re-render coz props got updated</p>
      <Counter2 handleClick={handleClick} count={count} />
      <p><b>Doesnt matter where the state changes ie child or parent what matters is whose state got changed</b></p>
    </>
  )
}

export default Example2