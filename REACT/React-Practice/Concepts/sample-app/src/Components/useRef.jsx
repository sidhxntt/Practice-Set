import { useRef, useEffect, useState } from "react";

const Example1 = () => {
    const [count,setCount] = useState(0)
    //PROBLEM
    // useEffect(()=>{
    // let a=0
    // a=a+1
    //    console.log(`Example component is rendering... and a:${a}`) 
    //    // output will be a=1 on every render if useref() is not used because as the component re-renders due to change of its state
    //    // a will again be initialised as 0 then increamented to 1 and logged to make sure 'a' persisits its value we will use useRef().
    // })


    // SOLUTION
    const a = useRef(0); //Usage number 1 ie to solve the above problem
    const btnRef = useRef(); //usage number 2 ie to reference DOM element directly ie to make sure the reference value ie btnRef persits irresepective of any number of renders.
    useEffect(() => {
        a.current = a.current + 1;
        console.log(`Example component is rendering... and a: ${a.current}`);
    },[count]);
   
    return (
        <div>
            <button ref={btnRef} onClick={()=>{setCount(count+1)}}>Click me</button>
            <button onClick={()=>{btnRef.current.style.backgroundColor ='red'}}>Colour Change</button>
        </div>
     );
}
 
export default Example1;