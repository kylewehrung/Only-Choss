import React, { useState } from "react";



function EditChoss({ boulderId, onUpdate }) {
    const [name, setName] = useState("")
    const [grade, setGrade] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")


  
    const handleUpdateBoulder = (e) => {
        e.preventDefault();
        const body = {};
        if (name) {
          body.name = name;
        }
        if (grade) {
          body.grade = grade;
        }
        if (description) {
          body.description = description;
        }
        if (image) {
          body.image = image;
        }
        fetch(`/boulders/${boulderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((r) => {
            if (r.ok) {
                onUpdate();
                setName("");
                setGrade("");
                setDescription("");
                setImage("");
            } else {
              r.json().then((err) => (err));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
          


return (

  
<form onSubmit={handleUpdateBoulder} class="edit-choss-form p-4">
  <div class="form-group">
    <label for="exampleDropdownFormEmail2">Name</label>
    <input 
    type="text" 
    class="form-control" 
    id="text" 
    placeholder=""
    value={name}
    onChange={(e) => setName(e.target.value)}

    />
  </div>
  <div class="form-group">
    <label for="exampleDropdownFormPassword2">Grade</label>
    <input 
    type="text" 
    class="form-control" 
    id="text" 
    placeholder=""
    value={grade}
    onChange={(e) => setGrade(e.target.value)}

    />
  </div>

  <div class="form-group">
    <label for="exampleDropdownFormPassword2">Description</label>
    <textArea 
    type="text" 
    class="form-control"
    rows="2"
    id="text" 
    placeholder=""
    value={description}
    onChange={(e) => setDescription(e.target.value)}

    />
  </div>

  <div class="form-group">
    <label for="exampleDropdownFormPassword2">Image</label>
    <textArea 
    type="text" 
    class="form-control"
    rows="2" 
    id="text" 
    placeholder=""
    value={image}
    onChange={(e) => setImage(e.target.value)}

    />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

)

}

export default EditChoss;









//integrate this to be in the above edit form


// import React, { useState } from "react";
// import { useHistory } from "react-router";
// import { Button, Error, Input, FormField, Textarea } from "../styles";
// import styled from "styled-components";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useParams } from "react-router-dom";

// function EditChoss() {
//   const history = useHistory();
//   const { area, boulderId } = useParams();

//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const validationSchema = yup.object({
//     name: yup.string(),
//     grade: yup.string(),
//     description: yup.string(),
//     image: yup.string(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       grade: "",
//       description: "",
//       image: "",
//     },
//     validateOnChange: false,
//     validateOnBlur: false,
//     validationSchema,
//     onSubmit: (values, { setErrors, setSubmitting }) => {
//       setSubmitting(true);
//       fetch(`boulders/${area}/${boulderId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       })
//         .then((r) => {
//           if (r.ok) {
//             history.push("/");
//           } else {
//             r.json().then((err) => setErrors(err.errors));
//           }
//         })
//         .catch((error) => {
//           setSubmitting(false);
//           console.error(error);
//         });
//     },
//   });

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   return (
//     <StyledWrapper>
//     <Wrapper>
//       <Button className="show-form" variant="outline" onClick={toggleFormVisibility}>
//         {isFormVisible ? "Hide form" : "Show form"}
//       </Button>
//       {isFormVisible && (
//         <form onSubmit={formik.handleSubmit}>
//           <FormFields>
//             <FormField>
//               <CustomLabel htmlFor="name">Name</CustomLabel>
//               <WhiteInput
//                 type="text"
//                 id="name"
//                 autoComplete="off"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//               />
//             </FormField>
//             <FormField>
//               <CustomLabel htmlFor="grade">Grade</CustomLabel>
//               <WhiteInput
//                 type="text"
//                 id="grade"
//                 value={formik.values.grade}
//                 onChange={formik.handleChange}
//               />
//             </FormField>

//             <FormField>
//               <CustomLabel htmlFor="image">Image</CustomLabel>
//               <WhiteInput
//                 type="text"
//                 id="image"
//                 value={formik.values.image}
//                 onChange={formik.handleChange}
//               />
//             </FormField>
            
//             <FormField>
//               <CustomLabel htmlFor="description">Description</CustomLabel>
//               <WhiteTextarea
//                 rows="3"
//                 id="description"
//                 value={formik.values.description}
//                 onChange={formik.handleChange}
//               />
//             </FormField>

//             <FormField>
//             <Button type="submit" variant="outline" disabled={formik.isSubmitting}>
//                 {formik.isSubmitting ? "Loading..." : "Edit Choss"}
//                 </Button>
//             </FormField>
//             <FormField>
//                 {formik.errors &&
//                 Object.values(formik.errors).map((err) => (
//                     <Error key={err}>{err}</Error>
//                 ))
//                 }
//                 </FormField>

//         </FormFields>
//         </form>
//       )}
//        </Wrapper>
//       </StyledWrapper>
      
//     )

// }



// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;



// const FormFields = styled.div`
//   position: relative;
//   top: 50px;
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 15px;
//   width: 650px;
// `;


// const CustomLabel = styled.label`
//   color: black;
//   font-size: 2em;
//   font-family: "cascadia";
//   padding: .1em;
  
// `;


// const WhiteTextarea = styled(Textarea)`
//   color: black;
// `;


// const WhiteInput = styled(Input)`
//   color: black;
// `;


// const StyledWrapper = styled.div`
//   background-image: url("https://i.pinimg.com/736x/65/36/67/653667e26bf65e8d42302cfad8da4769.jpg");
//   background-position: center;
//   background-size: cover;
//   width: 100%;
//   height: 100vh;
  
// `;



// export default EditChoss;