import React, { useState } from "react";
import Star from "./Star";


function StarRating({ onChange }) {
    const [rating, setRating] = useState(0);

    const changeRating = (newRating) => {
        setRating(newRating)
        onChange?.(newRating)
    }
    

    return (
        <span>
        {[0, 1, 2].map((value)=> (
            <Star 
            key={value}
            filled={value < rating} 
            onClick={() => changeRating(value + 1)} />
          ))}
        </span>
    );

}

export default StarRating;





