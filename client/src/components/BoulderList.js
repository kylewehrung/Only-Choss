import { useEffect, useState } from "react";
import { Link, useParams, Route } from "react-router-dom";
import styled from "styled-components";
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
              <td>
                <Link to={`/boulders/${area}/${boulder.id}`}>
                  {boulder.name}
                </Link>
              </td>
              <td>
                <Link to={`/boulders/${area}/${boulder.id}`}>
                  {boulder.grade}
                </Link>
              </td>
              <td>
                <Link to={`/boulders/${area}/${boulder.id}`}>
                  {boulder.rating}
                </Link>
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



