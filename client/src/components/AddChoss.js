import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Error, Input, FormField } from "../styles";
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
    <Wrapper>
      <Button onClick={toggleFormVisibility}>
        {isFormVisible ? "Hide form" : "Show form"}
      </Button>
      {isFormVisible && (
        <form onSubmit={formik.handleSubmit}>
          <FormFields>
            <FormField>
              <CustomLabel htmlFor="name">name</CustomLabel>
              <WhiteInput
                type="text"
                id="name"
                autoComplete="off"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </FormField>
            <FormField>
              <CustomLabel htmlFor="grade">grade</CustomLabel>
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
              <CustomLabel htmlFor="description">Description</CustomLabel>
              <WhiteInput
                type="text"
                id="description"
                value={formik.values.description}
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
                <CustomLabel htmlFor="area">area</CustomLabel>
                <WhiteInput 
                type="text"
                id="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                />
            </FormField>

            <FormField>
            <Button type="submit" disabled={formik.isSubmitting}>
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
      
    )

}






const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormFields = styled.div`
  width: 400px;
`;


const CustomLabel = styled.label`
  color: #f8f0e3;
  font-size: 2em;
  font-family: "cascadia";
  ${'' /* background-color: rgba(255, 255, 255, 0.5); */}
  padding: .1em;
  
`;

const WhiteInput = styled(Input)`
  color: black;
`;




export default AddChoss;


