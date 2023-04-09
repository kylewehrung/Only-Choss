
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Draggable from 'react-draggable';
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
  const [newComment, setNewComment] = useState(""); 
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


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/comments/${boulderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
        user_id: 1, //need a way to make this dynamic, we'll get that eventually
        boulder_id: boulderId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setComment([...comment, data]);
        setNewComment("");
      })
      .catch((error) => console.log(error));
  };



function handleDeleteComment(id) {
    fetch(`/comments/${boulderId}`, {
        method: "DELETE",
    }).then((r) => {
        if (r.ok) {
            setComment((comment) => 
            comment.filter((comm) => comm.id !==id))
        }
    })
}



  return (
    <StyledWrapper>
      <Container>
        <h1 className="h1">{boulder.name}</h1>
        <Image src={boulder.image} alt="boulders" />
        <TextWrapper>
        <li >Grade: {boulder.grade}</li>
        <li>Rating: {boulder.rating}</li>
        <li>Description: {boulder.description}</li>
        </TextWrapper>
      </Container>

    <Draggable handle=".comment-handle">
      <MDBContainer className="mt-5" style={{ maxWidth: "1100px" }}>
      <div className="comment-handle">drag me</div>
        <MDBRow className="justify-content-center">
          <MDBCol md="8" lg="6">
            <MDBCard
              className="shadow-0 border"
              style={{ backgroundColor: "#fff4ed" }}
            >
              <MDBCardBody>
                
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Type comment..."
                    label="+ Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    Post Commie
                  </button>
                </form>

                {comment.map((comment) => (
                  <MDBCard key={comment.id} className="mb-4">
                    <MDBCardBody>
                      <p>{comment.comment}</p>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <MDBCardImage
                            src="https://vignette1.wikia.nocookie.net/dreamworks/images/7/7b/Gumby-1-.jpg/revision/latest?cb=20150806012250"

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
                            <button onClick={() => handleDeleteComment(comment.id)}>
                                Remove Commie
                            </button>
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
        </Draggable>
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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 80px;
`;

const Image = styled.img`
  max-width: 350px;
  height: auto;
  object-fit: cover;
  margin-bottom: 16px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "cascadia", sans-serif;
  max-width: 350px;
  display: block;
  margin-bottom: 10px;
  background-color: #eee;
`;




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