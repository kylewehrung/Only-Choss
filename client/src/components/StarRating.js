// import React, { useState } from "react";
// import Star from "./Star";

// function StarRating({ value, onChange }) {
//     const [currentRating, setCurrentRating] = useState(value);
    
//     console.log(value)
  
//     const changeRating = (newRating) => {
//       setCurrentRating(newRating);
//       onChange?.(newRating);
//     };
  
//     return (
//       <span>
//         {[0, 1, 2].map((value) => (
//           <Star
//             key={value}
//             filled={value < currentRating}
//             onClick={() => changeRating(value + 1)}
//           />
//         ))}
//       </span>
//     );
//   }
  
//   export default StarRating;
  



