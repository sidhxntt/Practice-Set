import { useSelector } from 'react-redux'

const Navbar = () => {
    const count = useSelector(state => state.counter.value)
    
  return (
   <>
   {count>=0 ? <h1>Navbar Counter: {count} </h1> : <h1>Navbar Counter: INVALID </h1>}
   </>
  )
}

export default Navbar