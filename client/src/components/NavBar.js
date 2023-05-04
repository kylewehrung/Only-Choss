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
  
  const isChossPage = location.pathname.startsWith("/boulders")
  const addChossButton = isChossPage && <Button  variant="outline" as={Link} to="/boulders/:area/:boulderId/:add-choss">Add Choss</Button>;
  

  return (
    <Wrapper>
      <Logo isBoulderPage={isBoulderPage}>
        <Link to="/">Only Choss</Link>
      </Logo>
      <Nav>
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
  z-index: 1;
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








