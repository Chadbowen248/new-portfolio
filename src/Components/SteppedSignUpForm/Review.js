import { useFormikContext } from "formik";
import styled from "styled-components";

const ReviewList = styled.dl`
  * {
    display: flex;
    font-size: 1.2em;
  }
`;

export const Review = () => {
  const { values } = useFormikContext();
  return (
    <div>
      <h1>Review Order</h1>
      <ReviewList>
        <div>
          <dt>Name:</dt>
          <dd>
            {values.firstName} {values.lastName}
          </dd>
        </div>
        <div>
          <dt>Pizza:</dt>
          <dd>
            A {values.pizzaSize} {values.pizzaType}
          </dd>
        </div>
        <div>
          <dt>Sides:</dt>
          <dd>{values.side}</dd>
        </div>
        <div>
          <dt>Drink:</dt>
          <dd>{values.drink}</dd>
        </div>
      </ReviewList>
    </div>
  );
};
