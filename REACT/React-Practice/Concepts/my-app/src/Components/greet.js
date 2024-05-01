import React, { useState } from "react";

const Greet = ({ name, children }) => {
    return ( 
        <>
            <h1>HEY {name}</h1>
            {children}
            <p>{name}</p>
        </>
    );
}
 
export default Greet;
