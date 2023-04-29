import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  const history = useHistory();
  
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  const location = useLocation();
  const isBoulderPage = location.pathname.startsWith("/boulders");

  // Use a regular expression to extract :area and :boulderId values from the current URL
  const [_, area, boulderId] = location.pathname.match(/^\/boulders\/([^/]+)\/([^/]+)/) || [];

  const isChossPage = location.pathname.startsWith("/boulders");
  const addChossButton = isChossPage && <Button variant="outline" as={Link} to={`/boulders/${area}/${boulderId}/add-choss`}>Add Choss</Button>;

  // const boulderPageOnly = location.pathname.startsWith(`/boulders/${area}/${boulderId}`);
  // const addEditPage = boulderPageOnly && <Button variant="outline" as={Link} to={`/boulders/${area}/${boulderId}/edit-choss`}>Edit Choss</Button>;

  return (
    <Wrapper>
      <Logo isBoulderPage={isBoulderPage}>
        <Link to="/">Only Choss</Link>
      </Logo>
      <Nav>
        {/* {addEditPage} */}
        {addChossButton}
        <Button variant="outline" onClick={() => history.goBack()}>
          Go Back
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Logo = styled.h1`
  font-family: 'cascadia';
  font-size: 2.8rem;
  color: ${({ isBoulderPage }) => (isBoulderPage ? "#313639" : "#f8f0e3")};
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;








