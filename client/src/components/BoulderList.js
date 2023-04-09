import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";


function BoulderList() {
    const [boulders, setBoulders] = useState([])
    const { area } = useParams()

    useEffect(() => {
        fetch(`boulders?area=${area}`)
        .then((r) => r.json())
        .then(setBoulders)
    }, [area])


    return (
        <div>
          <h1>Boulders in {area}</h1>
          {boulders.map((boulder) => (
            <div key={boulder.id}>
              <h2>{boulder.name}</h2>
              <p>Grade: {boulder.grade}</p>
              <p>Rating: {boulder.rating}</p>
              <p>Description: {boulder.description}</p>
              <img src={boulder.image} alt={boulder.name} />
            </div>
          ))}
        </div>
      );
    }
    
    


export default BoulderList;



