import React from 'react';
import { BiBandAid } from "react-icons/bi";


function Star({ filled, onClick }) {
    return (
        <BiBandAid 
            size={27} // Change the size to 30
            color={filled ? "red" : "lightgray"}
            onClick={onClick}
        />
    )
}


export default Star;










