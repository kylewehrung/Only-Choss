import React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import ChatBotHelper from "./ChatBotHelper"

function Home() {
  const [boulderLocations, setBoulderLocations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("/boulders")
      .then((r) => r.json())
      .then(setBoulderLocations)
  }, []);


  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Only Choss Info:</Popover.Header>
      <Popover.Body>
      Welcome to Only Choss, a user-filled database that only hosts climbs that are traditionally seen as painful, awkward, ugly, crumbly or contrived. Our rating system largely follows the fun-scale:
        <li>3 Band-Aids: Type III fun. Not fun during or after. A good time.</li>
       <li>2 Band-Aids: Type II fun. Not fun during, fun after you send.</li>
        <li>1 Band-Aid: Type I fun. Fun, although you feel strange afterwards.</li>
      </Popover.Body>
    </Popover>
  );





  const uniqueStates = [...new Set(boulderLocations.map((location) => location.state))];

  return (
    
   <StyledBox className="mt-5 basic">
   
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <StyledPopoverButton variant="success">What is Only Choss?</StyledPopoverButton>
      </OverlayTrigger>
      <MDBDropdown style={{ marginTop: '75px' }}>


        <MDBDropdownToggle>Select Location</MDBDropdownToggle>
        <MDBDropdownMenu>
          {uniqueStates.map((state) => (
            <MDBDropdownItem key={state}>
              <MDBDropdownLink href="#">{state} &raquo;</MDBDropdownLink>
              <ul className="dropdown-menu dropdown-submenu">
              {[...new Set(boulderLocations.filter(loc => loc.state === state).map(loc => loc.region))].map((region) => (
                <MDBDropdownItem key={region}>
                    <MDBDropdownLink href="#">{region} &raquo;</MDBDropdownLink>
                    <ul className="dropdown-menu dropdown-submenu">
                    {boulderLocations
                        .filter(
                        (loc) =>
                            loc.state === state && loc.region === region
                        )
                        .filter((loc, index, self) => self.findIndex(l => l.area === loc.area) === index) 
                        .map((loc) => (
                        <MDBDropdownItem key={loc.area}>
                            <MDBDropdownLink 
                            onClick={() => {
                                console.log(`Clicked ${loc.area}`)
                                history.push(`/boulders/${loc.area}`)}
                            }
                            >
                            {loc.area}</MDBDropdownLink>
                        </MDBDropdownItem>
                        ))}
                    </ul>
                </MDBDropdownItem>
                ))}

              </ul>
            </MDBDropdownItem>
          ))}
        </MDBDropdownMenu>
      </MDBDropdown>
      <ChatBotHelper/>
    </StyledBox>
  );
}


const StyledBox = styled.div`
  position: relative;
  background: transparent;
`;

const StyledPopoverButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -15px;
  padding: 13px;
 
`;
export default Home;



    