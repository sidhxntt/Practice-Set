import "./App.css";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, multiply } from './redux/counter/counterSlice'



function App() {
    const dispatch = useDispatch()
    const count = useSelector(state => state.counter.value)

  return (
    <>
      <Navbar/>
      <div className="card">
        <button  onClick={() => dispatch(increment())}> + </button>
        <button  onClick={() => dispatch(decrement())}> - </button>
      </div>
      <h3>Counter: {count}</h3>
      <button onClick={()=>dispatch(multiply())}>*</button>
    </>
  );
}

export default App;
