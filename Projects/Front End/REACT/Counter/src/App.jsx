import { useState } from 'react'
import './App.css'


const App = () => {
  const [count, setCount] = useState(0)
  const handleclick1 = () => {
    setCount(count + 1)
  }
  const handleclick2 = () => {
    setCount(count - 1)
  }
  return (
    <>
    <button onClick={handleclick1}>Increment</button>
    <button onClick={handleclick2}>Decrement</button>
    {count>0 ? <p>Counter: {count}</p> : <p>Counter: Invalid</p>}
    </>
  )
}

export default App