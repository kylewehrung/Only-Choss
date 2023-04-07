import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "../styles";



function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetch("/locations")
      .then((r) => r.json())
      .then(setLocations);
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredRegions = locations.filter(
    (location) => location.state === selectedLocation.split(",")[0]
  );
  const filteredAreas = filteredRegions.filter(
    (location) => location.region === selectedLocation.split(",")[1]
  );

  return (
    <Wrapper>
      <h1 style={{ fontSize: "2em", fontFamily: "cascadia" }}>Locations</h1>
      <DropdownWrapper>
        <DropdownLabel>State:</DropdownLabel>
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Select a State</option>
          {locations.map((location) => (
            <option
              key={`${location.state},${location.region},${location.area}`}
              value={`${location.state},${location.region},${location.area}`}
            >
              {location.state}
            </option>
          ))}
        </select>
      </DropdownWrapper>
      {selectedLocation && (
        <DropdownWrapper>
          <DropdownLabel>Region:</DropdownLabel>
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select a region</option>
            {filteredRegions.map((location) => (
              <option
                key={`${location.state},${location.region},${location.area}`}
                value={`${location.state},${location.region},${location.area}`}
              >
                {location.region}
              </option>
            ))}
          </select>
        </DropdownWrapper>
      )}
      {selectedLocation && (
        <DropdownWrapper>
          <DropdownLabel>Area:</DropdownLabel>
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select an area</option>
            {filteredAreas.map((location) => (
              <option
                key={`${location.state},${location.region},${location.area}`}
                value={`${location.state},${location.region},${location.area}`}
              >
                {location.area}
              </option>
            ))}
          </select>
        </DropdownWrapper>
      )}
      {selectedLocation && (
        <Location>
       
        </Location>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 80px auto;
  transform: translate(0, 4.5%);

`;

const DropdownWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const DropdownLabel = styled.label`
  margin-right: 10px;
  font-size: 1.2em;
  font-weight: bold;
`;

const Location = styled.article`
  margin-bottom: 24px;
  margin-right: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export default Home;


    
