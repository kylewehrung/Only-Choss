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
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editComment, setEditComment] = useState(null);
    const [boulderUpdated, setBoulderUpdated] = useState(false);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const { area, boulderId } = useParams();
    const { user } = useUser();
    const [rating, setRating] = useState(boulder.rating || 0);
    const [ratingCount, setRatingCount] = useState({
      1: 1,
      2: 1,
      3: 1,
    });
    const [mostRated, setMostRated] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

  
    useEffect(() => {
      const sumRatings =
        ratingCount[1] * 1 + ratingCount[2] * 2 + ratingCount[3] * 3;
      const averageRating =
        totalRatings > 0 ? sumRatings / totalRatings : 0;
      setAverageRating(averageRating);
      setMostRated(Math.floor(averageRating));
    }, [ratingCount, totalRatings]);


    // Handle rating change
    function handleRatingChange(value) {
      setRating(value);
      setRatingCount((prevCount) => ({
        ...prevCount,
        [value]: prevCount[value] + 1,
      }));
      setTotalRatings((prevTotal) => prevTotal + 1);
    
      fetch(`/boulders/${boulderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: value,
        }),
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error("Failed to update boulder rating.");
          }
        })
        .then(() => {
          // Update the mostRated state based on the updated ratingCount
          const maxRatingCount = Math.max(...Object.values(ratingCount));
          const maxRated = Object.keys(ratingCount).find(
            (key) => ratingCount[key] === maxRatingCount
          );
          setMostRated(parseInt(maxRated));
        })
        .catch((error) => console.log(error));
    }





    useEffect(() => {
      fetch(`/boulders/${area}/${boulderId}`)
        .then((r) => {
          if (!r.ok) {
            throw new Error("Failed to fetch boulder data.");
          }
          return r.json();
        })
        .then((data) => {
          setBoulder(data);
          setRating(data.rating || 0);

          setMostRated(data.rating || 0);
        })
        .catch((error) => console.log(error));





        
  
      fetch(`/comments/${boulderId}`)
        .then((r) => r.json())
        .then((data) => {
          const commentsWithPermissions = data.map((comment) => ({
            ...comment,
            canEdit: comment.user_id === user.id,
            canDelete: comment.user_id === user.id,
          }));
  
          const commentPromises = commentsWithPermissions.map((comment) =>
            fetch(`/users/${comment.user_id}`).then((r) => r.json())
          );
          Promise.all(commentPromises)
            .then((usernames) => {
              const commentsWithUsernames = commentsWithPermissions.map(
                (comment, index) => ({
                  ...comment,
                  username: usernames[index].username,
                })
              );
              setComment(commentsWithUsernames);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

    }, [area, boulderId, user.id, boulderUpdated]);
  

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
        .then((r) => r.json())
        .then((updatedComment) => {
          setComment((prevComments) =>
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
        .then((r) => r.json())
        .then((data) => {
          setComment([...comment, data]);
          setNewComment("");
        })
        .catch((error) => console.log(error));
    };
  
    function handleDeleteComment(id) {
      const commentToDelete = comment.find((comm) => comm.id === id);
  
      if (commentToDelete.user_id !== user.id) {
        console.log("You are not authorized to delete this comment.");
        return;
      }
  
      fetch(`/comments/${id}`, {
        method: "DELETE",
      })
        .then((r) => {
          if (r.ok) {
            setComment((comments) => comments.filter((comm) => comm.id !== id));
          } else {
            throw new Error("Failed to delete comment.");
          }
        })
        .catch((error) => console.log(error));
    }
  
    const handleImageClick = () => {
      setIsImageClicked(!isImageClicked);
    }
  
   
  







  return (
    
    <StyledWrapper>
      <Container>
      {boulder ? (
      <div class="dropdown-edit-form">
        <Button variant="outline" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Edit Boulder
        </Button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <div>
            <EditChoss area={area} boulderId={boulderId} onUpdate={handleUpdateBoulder}/>
          </div>
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}


        <h1 className="h1">{boulder.name}</h1>
        <ImageWrapper>
        {isImageClicked && (
          <EnlargedImage src={boulder.image} alt="boulders" 
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

        filled={value < mostRated}

        onClick={() => handleRatingChange(value + 1)}
        highlighted={mostRated === value + 1}
      />
    ))}
  </span>
  <p>
    Rating count: 1: {ratingCount[1]}, 2: {ratingCount[2]}, 3: {ratingCount[3]}
  </p>
  <p>Average rating: {averageRating.toFixed(1)}</p>
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

                {comment.map((comment) => (
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
                                <button type="submit" className="btn btn-primary me-2" onClick={handleUpdateComment}>
                                Update
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleCancelEdit}>
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

                                <button className="btn btn ms-2" onClick={() => handleDeleteComment(comment.id)}>Remove Comment</button>
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
  background-image: url("https://i.pinimg.com/736x/65/36/67/653667e26bf65e8d42302cfad8da4769.jpg");
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
  width: 500px; /* Adjust the width to fit your needs */
  height: auto; /* Adjust the height to fit your needs */
  border: 1px solid black; /* Add the border style */
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





