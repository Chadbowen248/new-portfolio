import { Formik, Form } from "formik";
import { Stepper } from "./Stepper";
import React from "react";

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
        <Form autoComplete="off" className="stepper-form">
          <Stepper array={childrenArray} currentStep={step} />
          <div>{currentStep}</div>
          <div className="form-navigation">
            <button
              type="button"
              disabled={isSubmitting}
              className={step === 0 ? "hidden" : ""}
              onClick={() => setStep(step - 1)}
            >
              back
            </button>
            <button type="submit" disabled={isSubmitting}>
              {step !== childrenArray.length - 1
                ? "Next"
                : `Submit${isSubmitting ? "ing" : ""}`}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
