import { Formik, Form } from "formik";
import { Stepper } from "./Stepper";
import React from "react";
import styled, { css } from "styled-components";

const StepperForm = styled(Form)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;
const FormNavigation = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1em;
`;

const FormBackButton = styled.button`
  ${({ step }) =>
    step === 0 &&
    css`
      visibility: hidden;
    `}
`;
export const FormikStep = ({ children }) => <>{children}</>;

export const FormikStepper = ({ children, setStep, step, ...props }) => {
  const childrenArray = React.Children.toArray(children);
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
      {({ isSubmitting }) => (
        <StepperForm autoComplete="off">
          <Stepper array={childrenArray} currentStep={step} />
          <div>{currentStep}</div>
          <FormNavigation>
            <FormBackButton
              step={step}
              type="button"
              disabled={isSubmitting}
              onClick={() => setStep(step - 1)}
            >
              back
            </FormBackButton>
            <button type="submit" disabled={isSubmitting}>
              {step !== childrenArray.length - 1
                ? "Next"
                : `Submit${isSubmitting ? "ing" : ""}`}
            </button>
          </FormNavigation>
        </StepperForm>
      )}
    </Formik>
  );
};
