import { useState } from "react";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";
import pizzaLogo from "../../img/pizza.png";

const SteppedSignUpForm = () => {
const [showConfirm, setConfirm] = useState(false);
const [{firstName, lastName, email}, getFormValues] = useState({})
  return (
    <div className="container">
      <h1>Hothot Slices</h1>
      <img src={pizzaLogo} alt="pizza logo" className="pizza-logo" />
      {showConfirm && 
      <div>
        <h2>Hey thanks {firstName} {lastName}!</h2>
        <p>A reciept has been sent to {email}</p>
        <p>Your food's on the way!!</p>
      </div>
      }
      {!showConfirm && 
      <FormikStepper
      getFormValues={getFormValues}
      showConfirm={showConfirm}
        initialValues={{
          firstName: "chad",
          lastName: "bowen",
          email: "asdf@af.com",
          password: "123456",
          confirmPassword: "123456",
          pizzaType: "",
          pizzaSize: "",
          side: "",
          drink: "",
          creditCard: "",
          expDate: ""
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            getFormValues({...values})
            setConfirm(true);
          }, 1500);
    }}>
        <FormikStep 
         validationSchema={Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    })}
        >
          <div className="input-item">
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />
          </div>
          <div className="input-item">
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />
          </div>
          <div className="input-item">
            <label htmlFor="email">email</label>
            <Field name="email" type="text" />
            <ErrorMessage name="email" />
          </div>
          <div className="input-item">
            <label htmlFor="password">Password</label>
            <Field name="password" type="text" />
            <ErrorMessage name="password" />
          </div>
          <div className="input-item">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="text" />
            <ErrorMessage name="confirmPassword" />
          </div>
        </FormikStep>
        <FormikStep
          validationSchema={Yup.object().shape({
            pizzaType: Yup.string().required(),
            pizzaSize: Yup.string().required(),
            side: Yup.string().required(),
            drink: Yup.string().required(),
          })}
        >
        <div className="input-item">
            <label htmlFor="pizzaType">Select Pizza</label>
            <Field name="pizzaType" as="select">
                <option>Choose Pizza</option>
                <option value="1">one</option>
                <option value="2">two</option>
            </Field>
            <ErrorMessage name="pizzaType" />
        </div>
        <div className="input-item">
            <label htmlFor="pizzaSize">Select Size</label>
            <Field name="pizzaSize" as="select">
                <option>Choose Size</option>
                <option value="small">small</option>
                <option value="large">large</option>
            </Field>
            <ErrorMessage name="pizzaSize" />
        </div>
        <div className="input-item">
            <label htmlFor="side">Select side</label>
            <Field name="side" as="select">
                <option>Choose Side</option>
                <option value="chips">chips</option>
                <option value="brownie">brownie</option>
            </Field>
            <ErrorMessage name="side" />
        </div>
        <div className="input-item">
            <label htmlFor="drink">Choose Drink</label>
            <Field name="drink" as="select">
                <option>Choose Drink</option>
                <option value="pepsi">pepsi</option>
                <option value="coke">coke</option>
            </Field>
            <ErrorMessage name="drink" />
        </div>
        </FormikStep>

        <FormikStep
          validationSchema={Yup.object().shape({
            creditCard: Yup.string().required(),
            expDate: Yup.date().required(),
          })}
        >
       <div className="input-item">
            <label htmlFor="creditCard">Credit Card</label>
            <Field name="creditCard" type="text" />
            <ErrorMessage name="creditCard" />
        </div>
       <div className="input-item">
            <label htmlFor="expDate">Exp Date</label>
            <Field name="expDate" type="date" />
            <ErrorMessage name="expDate" />
        </div>
        </FormikStep>
      </FormikStepper>}
    </div>
  );
};

const FormikStep = ({ children }) => <>{children}</>;

const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = childrenArray[step];
  return (
    <Formik
      {...props}
      validationSchema={currentStep.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (step === childrenArray.length - 1) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((state) => state + 1);
          helpers.setTouched({});
        }
      }}
    >
      <Form autoComplete="off">
        {currentStep}
        <div className="form-navigation">
          <button type="button"
            className={step === 0 ? "hidden" : ""}
            onClick={() => setStep(step - 1)}
          >
            back
          </button>
          <button type="submit">
            {step !== childrenArray.length - 1 ? "Next" : `Submit` }
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SteppedSignUpForm;
