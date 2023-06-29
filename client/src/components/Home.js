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
  // Extract unique states from boulderLocations by mapping over the locations and collecting their states,
  // then converting the array to a Set to remove duplicates, and finally spreading it back into an array.
  
  return (
    <StyledBox className="mt-5 basic">
      {/* Render a styled box component */}
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        {/* Render an overlay trigger component with a popover */}
        <StyledPopoverButton variant="success">What is Only Choss?</StyledPopoverButton>
        {/* Render a styled button as the popover trigger */}
      </OverlayTrigger>
      <MDBDropdown style={{ marginTop: '75px' }}>
        {/* Render an MDB dropdown component */}
        <MDBDropdownToggle>Select Location</MDBDropdownToggle>
        {/* Render the dropdown toggle button */}
        <MDBDropdownMenu>
          {/* Render the dropdown menu */}
          {uniqueStates.map((state) => (
            // Iterate over the unique states and generate a dropdown item for each state
            <MDBDropdownItem key={state}>
              {/* Render a dropdown item with the state as the key */}
              <MDBDropdownLink href="#">{state} &raquo;</MDBDropdownLink>
              {/* Render a dropdown link with the state name */}
              <ul className="dropdown-menu dropdown-submenu">
                {/* Render a nested dropdown menu */}
                {[...new Set(boulderLocations.filter(loc => loc.state === state).map(loc => loc.region))].map((region) => (
                  // Filter boulderLocations based on the current state and collect unique regions
                  <MDBDropdownItem key={region}>
                    {/* Render a dropdown item with the region as the key */}
                    <MDBDropdownLink href="#">{region} &raquo;</MDBDropdownLink>
                    {/* Render a dropdown link with the region name */}
                    <ul className="dropdown-menu dropdown-submenu">
                      {/* Render a nested dropdown menu */}
                      {boulderLocations
                        .filter((loc) => loc.state === state && loc.region === region)
                        // Filter boulderLocations based on the current state and region
                        .filter((loc, index, self) => self.findIndex(l => l.area === loc.area) === index) 
                        // Filter out duplicate areas within the same state and region
                        .map((loc) => (
                          // Iterate over the filtered locations and generate a dropdown item for each area
                          <MDBDropdownItem key={loc.area}>
                            {/* Render a dropdown item with the area as the key */}
                            <MDBDropdownLink 
                              onClick={() => {
                                console.log(`Clicked ${loc.area}`)
                                history.push(`/boulders/${loc.area}`)
                              }}
                            >
                              {loc.area}
                            </MDBDropdownLink>
                            {/* Render a dropdown link with the area name */}
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
      {/* Render the ChatBotHelper component */}
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



    