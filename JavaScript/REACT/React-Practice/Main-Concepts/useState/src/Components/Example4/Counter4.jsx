import { useState, useEffect } from "react";


const Counter4 = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
     console.log('Child Component Rendered')
    })
    
    const handleClick = () => {
      setCount(count + 1);
    }
  return (
   <>
   <button onClick={handleClick}>{`Count is ${count}`}</button>
   </>
  )
}

export default Counter4