import { useState } from "react";
import React from "react";
import { Field, ErrorMessage } from "formik";
import { Review } from "./Review";
import { FormikStep, FormikStepper } from "./FormikStepper";
import styled, { css } from "styled-components";
import valid from "card-validator";
import * as Yup from "yup";
import pizzaLogo from "../../img/pizza.png";
const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const PizzaLogo = styled.img`
  width: 100px;
  border: solid 7px black;
  border-radius: 100%;
  margin-right: 1em;
  padding: 5px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-self: normal;
  align-items: center;
  margin-top: 1em;
`;

const Error = styled(ErrorMessage)`
  position: absolute;
  background-color: var(--white);
  color: red;
  padding: 5px;
`;

const InputItem = styled.div`
  width: 100%;
  position: relative;
  margin-top: 2em;

  ${({noMargin}) => 
    noMargin && css`
    margin-top: 0;
    
    `
  }
`

const Container = styled.div`
  height: calc(90% - 3em);
`;

const SteppedSignUpForm = () => {
  const [showConfirm, setConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const [{ firstName, lastName, email }, getFormValues] = useState({});
  return (
    <Container>
      <LogoContainer>
        <PizzaLogo src={pizzaLogo} alt="pizza logo" />
        <h1>Hothot Slices</h1>
      </LogoContainer>
      {showConfirm && (
        <div>
          <h2>
            Hey thanks {firstName} {lastName}!
          </h2>
          <p>A reciept has been sent to {email}</p>
          <p>Your food's on the way!!</p>
        </div>
      )}
      {!showConfirm && (
        <FormikStepper
          setStep={setStep}
          step={step}
          getFormValues={getFormValues}
          showConfirm={showConfirm}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            pizzaType: "",
            pizzaSize: "",
            side: "",
            drink: "",
            creditCard: "",
            expDate: "",
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            getFormValues({ ...values });
            setConfirm(true);
          }}
        >
          <FormikStep
            label="Register"
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("First Name is required"),
              lastName: Yup.string().required("Last Name is required"),
              email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
          >
            <InputItem noMargin={true}>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" aria-required="true" />
              <Error component="div" name="firstName" />
            </InputItem>
            <InputItem>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" aria-required="true" />
              <Error component="div" name="lastName" />
            </InputItem>
            <InputItem>
              <label htmlFor="email">email</label>
              <Field name="email" type="email" aria-required="true" />
              <Error component="div" name="email" />
            </InputItem>
            <InputItem>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" aria-required="true" />
              <Error component="div" name="password" />
            </InputItem>
            <InputItem>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                aria-required="true"
              />
              <Error component="div" name="confirmPassword" />
            </InputItem>
          </FormikStep>
          <FormikStep
            label="Order"
            validationSchema={Yup.object().shape({
              pizzaType: Yup.string().required(),
              pizzaSize: Yup.string().required(),
              side: Yup.string().required(),
              drink: Yup.string().required(),
            })}
          >
            <InputItem noMargin={true}>
              <label htmlFor="pizzaType">Select Pizza</label>
              <Field name="pizzaType" as="select" aria-required="true">
                <option>Choose Pizza</option>
                <option value="Francesco">Francesco</option>
                <option value="Mona Lisa">Mona Lisa</option>
                <option value="Spartacus">Spartacus</option>
                <option value="Thai Kwon Dough">Thai Kwon Dough</option>
                <option value="Ray's">Ray's</option>
                <option value="Margherita">Margherita</option>
                <option value="Big Cheese">Big Cheese</option>
              </Field>
              <Error component="div" name="pizzaType" />
            </InputItem>
            <InputItem>
              <label htmlFor="pizzaSize">Select Size</label>
              <Field name="pizzaSize" as="select" aria-required="true">
                <option>Choose Size</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
                <option value="xtra-large">xtra-large</option>
              </Field>
              <Error component="div" name="pizzaSize" />
            </InputItem>
            <InputItem>
              <label htmlFor="side">Select side</label>
              <Field name="side" as="select" aria-required="true">
                <option>Choose Side</option>
                <option value="Chips">Chips</option>
                <option value="Scotcharoos">Scotcharoos</option>
                <option value="Caramelitas">Caramelitas</option>
                <option value="Double Fudge Brownies">
                  Double Fudge Brownies
                </option>
                <option value="Blonde Brownies">Blonde Brownies</option>
              </Field>
              <Error component="div" name="side" />
            </InputItem>
            <InputItem>
              <label htmlFor="drink">Choose Drink</label>
              <Field name="drink" as="select" aria-required="true">
                <option>Choose Drink</option>
                <option value="Pepsi">Pepsi</option>
                <option value="Mountain Dew">Mountain Dew</option>
                <option value="Sprite">Sprite</option>
                <option value="Dr. Pepper">Dr. Pepper</option>
                <option value="Smart Water">Smart Water</option>
              </Field>
              <Error component="div" name="drink" />
            </InputItem>
          </FormikStep>

          <FormikStep
            label="Payment"
            validationSchema={Yup.object().shape({
              creditCard: Yup.string()
                .test(
                  "test-number",
                  "Credit Card is invalid",
                  (value) => valid.number(value).isValid
                )
                .required(),
              expDate: Yup.string()
                .test(
                  "date-test",
                  "Please Check exp date.",
                  (value) => valid.expirationDate(value).isValid
                )
                .required(),
            })}
          >
            <InputItem noMargin={true}>
              <label htmlFor="creditCard">Credit Card</label>
              <Field name="creditCard" type="text" />
              <Error component="div" name="creditCard" />
            </InputItem>
            <InputItem>
              <label htmlFor="expDate">Exp Date</label>
              <Field name="expDate" type="text" placeholder="mm/yy" />
              <Error component="div" name="expDate" />
            </InputItem>
          </FormikStep>
          <FormikStep label="Review">
            <Review />
          </FormikStep>
        </FormikStepper>
      )}
    </Container>
  );
};

export default SteppedSignUpForm;
