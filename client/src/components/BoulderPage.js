import { useEffect, useState } from "react";
import { useUser } from "./context";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Draggable from 'react-draggable';
import Star from "./Star";
import { Button } from "../styles";
import EditChoss from "./EditChoss";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";
  

  function BoulderPage() {
    const [boulder, setBoulder] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editComment, setEditComment] = useState(null);
    const [boulderUpdated, setBoulderUpdated] = useState(false);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const { area, boulderId } = useParams();
    const { user } = useUser();
    const [rating, setRating] = useState(0);
    const [mostRated, setMostRated] = useState(0);
   
  
    useEffect(() => {
      fetch(`/boulders/${area}/${boulderId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch boulder data.");
          }
          return response.json();
        })
        .then((data) => {
          setBoulder(data);
          setRating(data.rating || 0);
          setMostRated(data.rating || 0);
        })
        .catch((error) => console.log(error));
  
      fetch(`/comments/${boulderId}`)
        .then((response) => response.json())
        .then((data) => {
          const commentsWithPermissions = data.map((comment) => ({
            ...comment,
            canEdit: comment.user_id === user.id,
            canDelete: comment.user_id === user.id,
          }));
  
          const commentPromises = commentsWithPermissions.map((comment) =>
            fetch(`/users/${comment.user_id}`).then((response) => response.json())
          );
  
          Promise.all(commentPromises)
            .then((usernames) => {
              const commentsWithUsernames = commentsWithPermissions.map(
                (comment, index) => ({
                  ...comment,
                  username: usernames[index].username,
                })
              );
              setComments(commentsWithUsernames);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }, [area, boulderId, user.id, boulderUpdated]);
  
    const handleRatingChange = (value) => {
      setRating(value);
  
      fetch(`/boulders/${boulderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: value,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update boulder rating.");
          }
        })
        .then(() => {
          setMostRated(parseInt(value));
        })
        .catch((error) => console.log(error));
    };
  
    const handleUpdateBoulder = () => {
      setBoulderUpdated(true);
    };
  
    const handleEditComment = (comment) => {
      if (comment.user_id === user.id) {
        setEditComment(comment);
        setNewComment(comment.comment);
      }
    };
  
    const handleCancelEdit = () => {
      setEditComment(null);
      setNewComment("");
    };
  
    const handleUpdateComment = (e) => {
      e.preventDefault();
      fetch(`/comments/${editComment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
        }),
      })
        .then((response) => response.json())
        .then((updatedComment) => {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === updatedComment.id ? updatedComment : comment
            )
          );
          setNewComment("");
          setEditComment(null);
        })
        .catch((error) => console.log(error));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`/comments/${boulderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
          user_id: user.id,
          boulder_id: boulderId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setComments([...comments, data]);
          setNewComment("");
        })
        .catch((error) => console.log(error));
    };
  
    const handleDeleteComment = (id) => {
      const commentToDelete = comments.find((comm) => comm.id === id);
  
      if (commentToDelete.user_id !== user.id) {
        console.log("You are not authorized to delete this comment.");
        return;
      }
  
      fetch(`/comments/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setComments((prevComments) =>
              prevComments.filter((comm) => comm.id !== id)
            );
          } else {
            throw new Error("Failed to delete comment.");
          }
        })
        .catch((error) => console.log(error));
    };
  
    const handleImageClick = () => {
      setIsImageClicked(!isImageClicked);
    };
  







    
    return (
      <StyledWrapper>
        <Container>
          {boulder ? (
            <div className="dropdown-edit-form">
              <Button
                variant="outline"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Edit Boulder
              </Button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <div>
                  <EditChoss
                    area={area}
                    boulderId={boulderId}
                    onUpdate={handleUpdateBoulder}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
  
          <h1 className="h1">{boulder.name}</h1>
          <ImageWrapper>
            {isImageClicked && (
              <EnlargedImage
                src={boulder.image}
                alt="boulders"
                onClick={handleImageClick}
              />
            )}
            <Image
              src={boulder.image}
              alt="boulders"
              onClick={handleImageClick}
            />
          </ImageWrapper>
  
          <TextWrapper>
            <h5><strong>Grade:</strong></h5>
            <p>{boulder.grade}</p>
            <h5><strong>Choss Rating:</strong></h5>
            {boulder.rating && (
              <p>
                <span>
                  {[0, 1, 2].map((value) => (
                    <Star
                      key={value}
                      filled={value < rating}
                      onClick={() => handleRatingChange(value + 1)}
                      highlighted={mostRated === value + 1}
                    />
                  ))}
                </span>
              </p>
            )}
            
            <h5><strong>Description:</strong></h5>
            <p>{boulder.description}</p>
          </TextWrapper>
        </Container>
  
        <Draggable
          handle=".comment-handle"
        >
          <MDBContainer className="mt-5" style={{ maxWidth: "1100px" }} >
            <div className="comment-handle"><strong>drag me</strong></div>
            <MDBRow className="justify-content-center">
              <MDBCol md="8" lg="6">
                <MDBCard
                  className="shadow-0 border"
                  style={{ backgroundColor: "#abb0ce" }}
                >
                  <MDBCardBody>
                    {editComment ? (
                      <form onSubmit={handleUpdateComment}>
                        <MDBInput
                          wrapperClass="mb-4"
                          placeholder="Type comment..."
                          label="Edit comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                      </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                          <MDBInput
                            wrapperClass="mb-4"
                            placeholder="Type comment..."
                            label="+ Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <button type="submit" className="btn btn-primary">
                            Post Comment
                      </button>
                        </form>
                      )}
  
                    {comments.map((comment) => (
                      <MDBCard key={comment.id} className="mb-4">
                        <MDBCardBody>
                          {editComment && editComment.id === comment.id ? (
                            <MDBInput
                              wrapperClass="mb-4"
                              placeholder="Type comment..."
                              label="Edit comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                          ) : (
                              <p>{comment.comment}</p>
                            )}
                          <div className="d-flex justify-content-between">
                            {editComment && editComment.id === comment.id ? (
                              <div className="d-flex flex-row align-items-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary me-2"
                                  onClick={handleUpdateComment}
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    {comment.user_id === user.id ? (
                                      <small>Posted by you</small>
                                    ) : (
                                        <small>Posted by {comment.username}</small>
                                      )}
                                  </div>
  
                                  <button
                                    className="btn btn ms-2"
                                    onClick={() => handleDeleteComment(comment.id)}
                                  >
                                    Remove Comment
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn ms-2"
                                    onClick={() => handleEditComment(comment)}
                                  >
                                    Edit Comment
                                  </button>
                                </div>
                              )}
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
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://i.pinimg.com/736x/65/36/67/653667e26bf65e8d42302cfad8da4769.jpg");
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
`;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 80px;
`;



const ImageWrapper = styled.div`
  position: relative;
`;



const Image = styled.img`
  max-width: 370px;
  height: auto;
  object-fit: cover;
  margin-bottom: 13px;
  border: 1px solid black;
  box-shadow: 0 0 10px rgba(0,0,0, 0.3);
`;



const EnlargedImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 500px; 
  height: auto; 
  border: 1px solid black; 
`;




const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "cascadia", sans-serif;
  max-width: 550px;
  display: block;
  margin-bottom: 10px;
  background-color: #abb0ce;
  padding: 15px;
  border: 1px solid black;
  box-shadow: 0 0 10px rgba(0,0,0, .7);
`;






export default BoulderPage;





