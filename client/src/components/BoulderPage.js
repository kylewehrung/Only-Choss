import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function BoulderPage() {
  const [boulder, setBoulder] = useState({});
  const { area, boulderId } = useParams();

  useEffect(() => {
    fetch(`/boulders/${area}/${boulderId}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch boulder data.");
        }
        return r.json();
      })
      .then(setBoulder)
      .catch((error) => console.log(error));
  }, [area, boulderId]);
  
    
  
  return (
    <Wrapper >
      <h1>{boulder.name}</h1>
      <p>Grade: {boulder.grade}</p>
      <p>Rating: {boulder.rating}</p>
      <p>Description: {boulder.description}</p>
      <p>Image: {boulder.image}</p>
    </Wrapper>
  );
}



const Wrapper = styled.div`
  background-image: url("https://www.color-hex.com/palettes/74642.png");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;


export default BoulderPage;






