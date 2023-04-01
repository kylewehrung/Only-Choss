import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "../styles";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBContainer } from 'mdb-react-ui-kit';




function Home({ user }) {
    const [dropdownActive, setDropdownActive] = useState(false);
      const [locations, setLocations] = useState([]);

      useEffect(() => {
        fetch("/locations")
      .then((r) => r.json())
      .then(setLocations);
  }, []);



    return (
        <MDBContainer className="d-flex justify-content-center mt-5 basic">
          <MDBDropdown isOpen={dropdownActive}>
            <MDBDropdownToggle
              onMouseEnter={() => setDropdownActive(true)}
              onMouseLeave={() => setDropdownActive(false)}
            >
             Select a location
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>
                {/* <MDBDropdownLink href="#">Action</MDBDropdownLink>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBDropdownLink href="#">Another action</MDBDropdownLink>
              </MDBDropdownItem> */}
              {/* <MDBDropdownItem> */}
                <MDBDropdownLink href="#">Submenu &raquo;</MDBDropdownLink>
                <ul className="dropdown-menu dropdown-submenu">
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#">Submenu item 1</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#">Submenu item 2</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#">Submenu item 3 &raquo;</MDBDropdownLink>
                    <ul className="dropdown-menu dropdown-submenu">
                      <MDBDropdownItem>
                        <MDBDropdownLink href="#">Multi level 1</MDBDropdownLink>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <MDBDropdownLink href="#">Multi level 2</MDBDropdownLink>
                      </MDBDropdownItem>
                    </ul>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#">Submenu item 4</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#">Submenu item 5</MDBDropdownLink>
                  </MDBDropdownItem>
                </ul>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBContainer>
      );
    }



    
    export default Home;






    

















//   const [locations, setLocations] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");

//   useEffect(() => {
    //     fetch("/locations")
//       .then((r) => r.json())
//       .then(setLocations);
//   }, []);

//   const handleStateChange = (event) => {
    //     setSelectedState(event.target.value);
    //     setSelectedRegion("");
//     setSelectedArea("");
//   };

//   const handleRegionChange = (event) => {
//     setSelectedRegion(event.target.value);
//     setSelectedArea("");
//   };

//   const handleAreaChange = (event) => {
//     setSelectedArea(event.target.value);
//   };

//   const filteredRegions = locations.filter(
//     (location) => location.state === selectedState
//   );
//   const filteredAreas = filteredRegions.filter(
//     (location) => location.region === selectedRegion
//   );

//   return (
//     <Wrapper>
//       <h1 style={{ fontSize: "2em", fontFamily: "cascadia" }}>Locations</h1>
//       <select value={selectedState} onChange={handleStateChange}>
//         <option value="">Select a state</option>
//         {locations.map((location) => (
//           <option key={location.state} value={location.state}>
//             {location.state}
//           </option>
//         ))}
//       </select>
//       {selectedState && (
//         <select value={selectedRegion} onChange={handleRegionChange}>
//           <option value="">Select a region</option>
//           {filteredRegions.map((location) => (
//             <option key={location.region} value={location.region}>
//               {location.region}
//             </option>
//           ))}
//         </select>
//       )}
//       {selectedRegion && (
//         <select value={selectedArea} onChange={handleAreaChange}>
//           <option value="">Select an area</option>
//           {filteredAreas.map((location) => (
//             <option key={location.area} value={location.area}>
//               {location.area}
//             </option>
//           ))}
//         </select>
//       )}
//       {selectedArea && (
//         <Location>
//           <Box>
//             <h3>{"Location State: " + selectedState}</h3>
//             <h3>{"Location Region: " + selectedRegion}</h3>
//             <h3>{"Location Area: " + selectedArea}</h3>
//           </Box>
//         </Location>
//       )}
//     </Wrapper>
//   );
// const Wrapper = styled.section`
//   max-width: 800px;
//   margin: 40px auto;
//   transform: translate(0, 4.5%);
// `;

// const Location = styled.article`
//   margin-bottom: 24px;
//   margin-right: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
// `;