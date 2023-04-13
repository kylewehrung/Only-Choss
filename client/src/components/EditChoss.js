// import { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import styled from "styled-components";
// import { Button, FormField, Input, Label } from "../styles";


// function EditChoss({user}) {
//   const [description, setDescription] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState(null);
//   const { id } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     fetch(`/boulders/${id}`)
//       .then((r) => r.json())
//       .then((boulder) => {
//         setDescription(boulder.description);
//       });
//   }, [id]);

//   function handleChange(e) {
//     const { value } = e.target;
//     setDescription(value);
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);
//     const updateData = {
//       description: description,
//     };
//     fetch(`/api/boulders/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updateData),
//     }).then((response) => {
//       setIsLoading(false);
//       if (response.ok) {
//         history.goBack();
//       } else {
//         response.json().then((err) => setErrors(err.errors));
//       }
//     });
//   }
  
//   return (
//     <Wrapper>
//       <Heading>Edit Boulder</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormField>
//           <Label htmlFor="description">Description:</Label>
//           <Input
//             type="text"
//             name="description"
//             id="description"
//             value={description}
//             onChange={handleChange}
//             required
//           />
//         </FormField>
//         <Button disabled={isLoading} type="submit">
//           {isLoading ? "Loading..." : "Update boulder"}
//         </Button>
//         {errors && (
//           <ul>
//             {errors.map((error) => (
//               <li key={error}>{error}</li>
//             ))}
//           </ul>
//         )}
//       </form>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100vh;
//   padding-top: 3rem;
// `;

// const Heading = styled.h1`
//   font-size: 2rem;
//   font-family: 'cascadia';
// `;

// export default EditChoss;






