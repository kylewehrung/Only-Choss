import React from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";



function SignUpForm({ onLogin }) {

    const validationSchema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
        passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required(),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordConfirmation: "",
        },
        validationSchema,
        onSubmit: (values, { setErrors, setSubmitting }) => {
            setSubmitting(true)
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => onLogin(user));
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
            .catch((error) => {
                setSubmitting(false);
                console.error(error);
            })
        }
    })





    return (
       <Wrapper>
        <form onSubmit={formik.handleSubmit} >
        <FormFields>
            <FormField>
                <CustomLabel htmlFor="username">Username</CustomLabel>
                <WhiteInput
                type="text"
                id="username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                />
            </FormField>
            <FormField>
                <CustomLabel htmlFor="password">Password</CustomLabel>
                <WhiteInput 
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="current-password"
                />
            </FormField>
            <FormField>
                <CustomLabel htmlFor="passwordConfirmation">Password Confirmation</CustomLabel>
                <WhiteInput 
                type="password"
                id="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                autoComplete="current-password"
                />
            </FormField>

            <FormField>
            <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Loading..." : "Sign Up"}
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
  color: #222;
  font-size: 2em;
  font-family: "cascadia";
  background-color: rgba(255, 255, 255, 0.5);
  padding: .1em;
  
`;



const WhiteInput = styled(Input)`
  color: black;
`;




export default SignUpForm;