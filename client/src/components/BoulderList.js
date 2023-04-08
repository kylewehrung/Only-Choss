import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import Table from "react-bootstrap/Table";


function BoulderList() {
    const [boulders, setBoulders] = useState([]);
    const { area } = useParams();
  
    useEffect(() => {
      fetch(`/boulders/${area}`)
        .then((r) => r.json())
        .then(setBoulders);
    }, [area]);
  
    return (
      <div className="boulder-list-background">
        <h1 className="header">Boulders in {area}</h1>
        <Table striped bordered hover variant="light" className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {boulders.map((boulder) => (
              <tr key={boulder.id}>
                <td>{boulder.name}</td>
                <td>{boulder.grade}</td>
                <td>{boulder.rating}</td>
              </tr>
            ))}
           
          </tbody>
        </Table>
      </div>
    );
  }
  
  export default BoulderList;
  


