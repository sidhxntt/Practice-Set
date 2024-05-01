import  { useState , useEffect } from "react";

const hooks_samples=()=>{
    useEffect(() => {
    alert('Rendering will happen only the first time')
}, []);
    useEffect(() => {
    alert('Rendering will happen any time anything changes')
}, );
}

export default hooks_samples;