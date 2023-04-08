import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "../styles";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBContainer } from 'mdb-react-ui-kit';

function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/locations")
      .then((r) => r.json())
      .then(setLocations);
  }, []);

  // Get unique values of location state
  const uniqueStates = [...new Set(locations.map((location) => location.state))];

  return (
    <MDBContainer className="d-flex justify-content-center mt-5 basic">
      <MDBDropdown>
        <MDBDropdownToggle>Select Location</MDBDropdownToggle>
        <MDBDropdownMenu>
          {uniqueStates.map((state) => (
            <MDBDropdownItem key={state}>
              <MDBDropdownLink href="#">{state} &raquo;</MDBDropdownLink>
              <ul className="dropdown-menu dropdown-submenu">
                {[...new Set(locations.filter(loc => loc.state === state).map(loc => loc.region))].map((region) => (
                  <MDBDropdownItem key={region}>
                    <MDBDropdownLink href="#">{region} &raquo;</MDBDropdownLink>
                    <ul className="dropdown-menu dropdown-submenu">
                      {locations
                        .filter(
                          (loc) =>
                            loc.state === state && loc.region === region
                        )
                        .map((loc) => (
                          <MDBDropdownItem key={loc.area}>
                            <MDBDropdownLink href="#">{loc.area}</MDBDropdownLink>
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



    