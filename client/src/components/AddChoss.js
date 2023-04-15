import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Error, Input, FormField, Textarea } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

function AddChoss() {
  const history = useHistory();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required(),
    grade: yup.string().required(),
    rating: yup.number().required(),
    description: yup.string().required(),
    image: yup.string(),
    state: yup.string().required(),
    region: yup.string().required(),
    area: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      grade: "",
      rating: "",
      description: "",
      image: "",
      state: "",
      region: "",
      area: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/boulders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (r.ok) {
            history.push("/");
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        })
        .catch((error) => {
          setSubmitting(false);
          console.error(error);
        });
    },
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <StyledWrapper>
    <Wrapper>
      <Button className="show-form" variant="outline" onClick={toggleFormVisibility}>
        {isFormVisible ? "Hide form" : "Show form"}
      </Button>
      {isFormVisible && (
        <form onSubmit={formik.handleSubmit}>
          <FormFields>
            <FormField>
              <CustomLabel htmlFor="name">Name</CustomLabel>
              <WhiteInput
                type="text"
                id="name"
                autoComplete="off"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </FormField>
            <FormField>
              <CustomLabel htmlFor="grade">Grade</CustomLabel>
              <WhiteInput
                type="text"
                id="grade"
                value={formik.values.grade}
                onChange={formik.handleChange}
              />
            </FormField>
            <FormField>
              <CustomLabel htmlFor="rating">Rating</CustomLabel>
              <WhiteInput
                type="text"
                id="rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
              />
            </FormField>


            <FormField>
              <CustomLabel htmlFor="image">Image</CustomLabel>
              <WhiteInput
                type="text"
                id="image"
                value={formik.values.image}
                onChange={formik.handleChange}
              />
            </FormField>

            <FormField>
              <CustomLabel htmlFor="state">State</CustomLabel>
              <WhiteInput
                type="text"
                id="state"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </FormField>

            <FormField>
              <CustomLabel htmlFor="region">Region</CustomLabel>
                <WhiteInput 
                type="text"
                id="region"
                value={formik.values.region}
                onChange={formik.handleChange}
                />
            </FormField>
            
            <FormField>
                <CustomLabel htmlFor="area">Area</CustomLabel>
                <WhiteInput 
                type="text"
                id="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                />
            </FormField>

            <FormField>
              <CustomLabel htmlFor="description">Description</CustomLabel>
              <WhiteTextarea
                rows="3"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </FormField>

            <FormField>
            <Button type="submit" variant="outline" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Loading..." : "Add Choss"}
                </Button>
            </FormField>
            <FormField>
                {formik.errors &&
                Object.values(formik.errors).map((err) => (
                    <Error key={err}>{err}</Error>
                ))
                }
                </FormField>

        </FormFields>
        </form>
      )}
       </Wrapper>
      </StyledWrapper>
      
    )

}



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;



const FormFields = styled.div`
  position: relative;
  top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 650px;
`;


const CustomLabel = styled.label`
  color: black;
  font-size: 2em;
  font-family: "cascadia";
  padding: .1em;
  
`;


const WhiteTextarea = styled(Textarea)`
  color: black;
`;


const WhiteInput = styled(Input)`
  color: black;
`;


const StyledWrapper = styled.div`
  background-image: url("https://i.pinimg.com/736x/65/36/67/653667e26bf65e8d42302cfad8da4769.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  
`;



export default AddChoss;


