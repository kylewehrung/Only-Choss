import React from 'react';
import { BiBandAid } from "react-icons/bi";


function Star({ filled, onClick, onHover }) {
    
    return (
        <BiBandAid 
            size={28} // Change the size to 30
            color={filled ? "red" : "lightgray"}
            onClick={onClick}
        />
    )
}


export default Star;










