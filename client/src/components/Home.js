import React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box } from "../styles";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBContainer } from 'mdb-react-ui-kit';

function Home() {
  const [boulderLocations, setBoulderLocations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("/boulders")
      .then((r) => r.json())
      .then(setBoulderLocations)
      console.log("help me")
  }, []);


  const uniqueStates = [...new Set(boulderLocations.map((location) => location.state))];

  return (
    <MDBContainer className="d-flex justify-content-center mt-5 basic">
      <MDBDropdown>
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
    </MDBContainer>
  );
}

export default Home;



    