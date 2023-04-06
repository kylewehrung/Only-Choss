import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box } from "../styles";


function Home({ user }) {
    const [locations, setLocations] = useState([])
    

    useEffect(() => {
    fetch("/locations")
    .then((r) => r.json())
    .then(setLocations)
    }, [])



    return (

        <Wrapper>
            <h1 style={{ fontSize: "2em", fontFamily: "cascadia" }}>Locations</h1>
            {locations.length > 0 ? (
                locations.map((location) => (
                    <Location key={location.id}>
                        <Box>
                            <h3>{"Location State: "+location.state}</h3>
                            <h3>{"Location Region: "+location.region}</h3>
                            <h3>{"Location Area: "+location.area}</h3>
                        </Box>

                    </Location>
                ))
                ) : (
                    <>
                        <h3>No Locations found</h3>
                    </>
            )}
        </Wrapper>

    )



}



const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  transform: translate(0, 4.5%);
`;


const Location = styled.article`
  margin-bottom: 24px;
  margin-right: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.2);
`;


export default Home;

