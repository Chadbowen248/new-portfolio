import { useState } from "react";
import React from "react";
import { Field, ErrorMessage } from "formik";
import { Review } from "./Review";
import { FormikStep, FormikStepper } from "./FormikStepper";
import valid from "card-validator";
import * as Yup from "yup";
import "./style.css";
import pizzaLogo from "../../img/pizza.png";
const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const SteppedSignUpForm = () => {
  const [showConfirm, setConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const [{ firstName, lastName, email }, getFormValues] = useState({});
  return (
    <div className="container">
      <div className="pizza-logo-container">
        <img src={pizzaLogo} alt="pizza logo" className="pizza-logo" />
        <h1>Hothot Slices</h1>
      </div>
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
            <div className="input-item">
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" aria-required="true" />
              <ErrorMessage
                className="error"
                component="div"
                name="firstName"
              />
            </div>
            <div className="input-item">
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" aria-required="true" />
              <ErrorMessage className="error" component="div" name="lastName" />
            </div>
            <div className="input-item">
              <label htmlFor="email">email</label>
              <Field name="email" type="email" aria-required="true" />
              <ErrorMessage className="error" component="div" name="email" />
            </div>
            <div className="input-item">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" aria-required="true" />
              <ErrorMessage className="error" component="div" name="password" />
            </div>
            <div className="input-item">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                aria-required="true"
              />
              <ErrorMessage
                className="error"
                component="div"
                name="confirmPassword"
              />
            </div>
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
            <div className="input-item">
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
              <ErrorMessage
                className="error"
                component="div"
                name="pizzaType"
              />
            </div>
            <div className="input-item">
              <label htmlFor="pizzaSize">Select Size</label>
              <Field name="pizzaSize" as="select" aria-required="true">
                <option>Choose Size</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
                <option value="xtra-large">xtra-large</option>
              </Field>
              <ErrorMessage
                className="error"
                component="div"
                name="pizzaSize"
              />
            </div>
            <div className="input-item">
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
              <ErrorMessage className="error" component="div" name="side" />
            </div>
            <div className="input-item">
              <label htmlFor="drink">Choose Drink</label>
              <Field name="drink" as="select" aria-required="true">
                <option>Choose Drink</option>
                <option value="Pepsi">Pepsi</option>
                <option value="Mountain Dew">Mountain Dew</option>
                <option value="Sprite">Sprite</option>
                <option value="Dr. Pepper">Dr. Pepper</option>
                <option value="Smart Water">Smart Water</option>
              </Field>
              <ErrorMessage className="error" component="div" name="drink" />
            </div>
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
            <div className="input-item">
              <label htmlFor="creditCard">Credit Card</label>
              <Field name="creditCard" type="text" />
              <ErrorMessage
                className="error"
                component="div"
                name="creditCard"
              />
            </div>
            <div className="input-item">
              <label htmlFor="expDate">Exp Date</label>
              <Field name="expDate" type="text" placeholder="mm/yy" />
              <ErrorMessage className="error" component="div" name="expDate" />
            </div>
          </FormikStep>
          <FormikStep label="Review">
            <Review />
          </FormikStep>
        </FormikStepper>
      )}
    </div>
  );
};

export default SteppedSignUpForm;
