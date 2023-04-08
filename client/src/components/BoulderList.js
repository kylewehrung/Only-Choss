import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";


function BoulderList() {
    const [boulders, setBoulders] = useState([])

    useEffect(() => {
        fetch("boulders")
        .then((r) => r.json())
        .then(setBoulders)
    }, [])


    return (
       <div>
        {boulders.map((boulder) => (
            <div key={boulder.id}>
              <Link to={`/boulders/${boulder.id}`}>
                <h3>{boulder.name}</h3>
                <h3>{boulder.grade}</h3>
                <h3>{boulder.rating}</h3>
                <h3>{boulder.description}</h3>
              </Link>
            </div>
        ))}
       </div>
    )
}



export default BoulderList;



