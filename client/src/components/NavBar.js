import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";


function NavBar({ user, setUser }) {
    function handleLogoutClick() {
        fetch("/logout", {method: "DELETE"}).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }


    return (
        <Wrapper>
          <Logo>
            <Link to="/boulders">Only Choss</Link>
          </Logo>
          <Nav>
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
  ${'' /* background-color: rgba(111,111,111,0.8) */}
`;

const Logo = styled.h1`
  font-family: 'cascadia';
  font-size: 2.8rem;
  color: #f8f0e3;
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






