import { useEffect, useState } from "react";
import { useUser } from "./context";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Draggable from 'react-draggable';
import StarRating from "./StarRating";
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
    const [editComment, setEditComment] = useState(null);
    const { area, boulderId } = useParams();
    const { user } = useUser();
    // const [rating, setRating] = useState(boulder.rating || 0);


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
        .then((data) => {
        
            const commentsWithPermissions = data.map((comment) => ({
            ...comment,
            canEdit: comment.user_id === user.id,
            canDelete: comment.user_id === user.id,
            }));
            setComment(commentsWithPermissions);
        })
        .catch((error) => console.log(error));
    }, [area, boulderId, user.id]);

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


  console.log(boulder.rating)

  return (
    <StyledWrapper>
      <Container>
        <h1 className="h1">{boulder.name}</h1>
        <Image src={boulder.image} alt="boulders" />
        <TextWrapper>
        <h5><strong>Grade:</strong></h5>
        <p >{boulder.grade}</p>
        <h5><strong>Choss Rating:</strong></h5>
        {boulder.rating && (
        <p>
          <StarRating value={parseInt(boulder.rating)} />
        </p>
          )}
        <h5><strong>Description:</strong></h5>
        <p>{boulder.description}</p>
        </TextWrapper>
      </Container>

    <Draggable handle=".comment-handle">
      <MDBContainer className="mt-5" style={{ maxWidth: "1100px" }}>
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

const Image = styled.img`
  max-width: 450px;
  height: auto;
  object-fit: cover;
  margin-bottom: 13px;
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
`;




export default BoulderPage;




