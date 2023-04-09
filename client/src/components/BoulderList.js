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
  background-image: url("https://www.color-hex.com/palettes/74642.png");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

export default BoulderList;



