import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";

  function BoulderPage() {
    const [boulder, setBoulder] = useState({});
    const [comment, setComment] = useState([]);
    const { area, boulderId } = useParams();
  
    useEffect(() => {
      fetch(`/boulders/${area}/${boulderId}`)
        .then((r) => {
          if (!r.ok) {
            throw new Error("Failed to fetch boulder data.");
          }
          return r.json();
        })
        .then(setBoulder)
        .catch((error) => console.log(error));
  

      fetch(`/comments/${boulderId}`)
        .then((r) => r.json())
        .then(setComment)
        .catch((error) => console.log(error));
    }, [area, boulderId]);
  
    return (
      <StyledWrapper>
        <Wrapper>
          <h1>{boulder.name}</h1>
          <img src={boulder.image} alt="boulders" />
          <p>Grade: {boulder.grade}</p>
          <p>Rating: {boulder.rating}</p>
          <p>Description: {boulder.description}</p>
        </Wrapper>
  
        <MDBContainer className="mt-5" style={{ maxWidth: "1400px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="8" lg="6">
              <MDBCard
                className="shadow-0 border"
                style={{ backgroundColor: "#fff4ed" }}
              >
                <MDBCardBody>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Type comment..."
                    label="+ Add a comment"
                  />
  
                  {comment.map((comment) => (
                    <MDBCard key={comment.id} className="mb-4">
                      <MDBCardBody>
                        <p>{comment.comment}</p>
  
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <MDBCardImage
                              src="https://tse3.mm.bing.net/th?id=OIP.l08HuCelRHqEcW947tj82wHaJU&pid=Api&P=0"
                              alt="gumby"
                              width="25"
                              height="25"
                            />
                            <p className="small mb-0 ms-2">{`User Id: ${comment.user_id}`}</p>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <p className="small text-muted mb-0">Rating</p>
                            <MDBIcon
                              far
                              icon="star"
                              style={{ marginTop: "-0.16rem" }}
                            />
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </StyledWrapper>
    );
  }
  
  


    
    
    
    
const StyledWrapper = styled.div`
  background-image: url("https://www.color-hex.com/palettes/74642.png");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;


const Wrapper = styled.div`
position: absolute;
left: 50px;
top: 70px;`




export default BoulderPage;







// <StyledWrapper>
{/* <Wrapper>
  <h1>{boulder.name}</h1>
  <img src={boulder.image} alt="boulders" />
  <p>Grade: {boulder.grade}</p>
  <p>Rating: {boulder.rating}</p>
  <p>Description: {boulder.description}</p>
  </Wrapper> */}
// </StyledWrapper>