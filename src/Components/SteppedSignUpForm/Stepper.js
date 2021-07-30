import styled, { css } from "styled-components";

const StepperList = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-left: 0;
  list-style: none;
`;

const StepperListItem = styled.li`
  padding: 0.5em;
  font-size: 14px;
  border-radius: 1em;
  ${(props) =>
    props.highlight &&
    css`
      background-color: var(--white);
      color: var(--darker);
    `}
`;

export const Stepper = ({ array, currentStep }) => {
  return (
    <StepperList>
      {array.map(({ props }, index) => {
        return (
          <StepperListItem key={index} highlight={index <= currentStep}>
            {props.label}
          </StepperListItem>
        );
      })}
    </StepperList>
  );
};
