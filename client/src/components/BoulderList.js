import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Table from "react-bootstrap/Table";

function BoulderList() {
  const [boulders, setBoulders] = useState([]);
  const { area } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`/boulders/${area}`)
      .then((r) => r.json())
      .then(setBoulders);
  }, [area]);

  const handleBoulderClick = (boulder) => {
    history.push(`/boulders/${area}/${boulder.id}`);
  }

  return (
    <Wrapper>
      <h1 className="header">Boulders in {area}</h1>
      <Table striped bordered hover variant="" className="table"> 
        <thead>
          <tr>
            <th>Name:</th>
            <th>Grade:</th>
            <th>Choss Rating:</th>
          </tr>
        </thead>
        <tbody>
          {boulders.map((boulder) => (
            <tr key={boulder.id}>
              <td onClick={() => handleBoulderClick(boulder)}>
                {boulder.name}
              </td>
              <td onClick={() => handleBoulderClick(boulder)}>
                {boulder.grade}
              </td>
              <td onClick={() => handleBoulderClick(boulder)}>
                {boulder.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  background-image: url("https://i.pinimg.com/736x/65/36/67/653667e26bf65e8d42302cfad8da4769.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;


export default BoulderList;



