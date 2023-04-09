import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";

function BoulderPage() {
  const [boulder, setBoulder] = useState({});
  const [comments, setComments] = useState([]);
  const { area, boulderId } = useParams();
  const [currentUser, setCurrentUser] = useState({ id: 0, name: "name" }); 

  useEffect(() => {
    fetch(`/boulders/${area}/${boulderId}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch boulder data.");
        }
        return r.json();
      })
      .then((data) => {
        setBoulder(data.boulder);
      })
      .catch((error) => console.log(error));
  }, [area, boulderId]);

  const validationSchema = yup.object().shape({
    comment: yup.string(),
  });

  // ...
    const formik = useFormik({
        initialValues: {
        comment: "",
        },
        validationSchema,
        onSubmit: (values) => {
        const comment = values.comment;
        const user_id = currentUser.id;
        const boulder_id = boulder.id;
        fetch("/comments", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment, user_id, boulder_id }),
        })
        .then((r) => r.json())
        .then((newComment) => {
            setComments([...comments, newComment]);
            formik.resetForm(); 
            })
            .catch((error) => console.log(error));
        },
    });
    
    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        // <StyledWrapper>
        {/* <Wrapper>
        <h1>{boulder.name}</h1>
          <img src={boulder.image} alt="boulders" />
          <p>Grade: {boulder.grade}</p>
          <p>Rating: {boulder.rating}</p>
          <p>Description: {boulder.description}</p>
        </Wrapper> */}
        // </StyledWrapper>
        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
            <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10" xl="8">
                <MDBCard>
                <MDBCardBody>
                   
                </MDBCardBody>
    
                <MDBCardFooter
                    className="py-3 border-0"
                    style={{ backgroundColor: "#f8f9fa" }}
                >
                    <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-start w-100">
                        <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                        />
                        <MDBTextArea
                        label="Message"
                        id="textAreaExample"
                        rows={4}
                        style={{ backgroundColor: "#fff" }}
                        wrapperClass="w-100"
                        name="comment"
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                        />
                    </div>
                    <div className="float-end mt-2 pt-1">
                        <MDBBtn size="sm" type="submit" className="me-1">
                        Post comment
                        </MDBBtn>
                        <MDBBtn outline size="sm">
                        Cancel
                        </MDBBtn>
                    </div>
                    </form>
                </MDBCardFooter>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </section>
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







