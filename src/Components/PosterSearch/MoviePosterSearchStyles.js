import styled, { css } from "styled-components";

export const PosterImage = styled.img`
  max-width: 70%;
  margin: 0 auto;
  margin-bottom: 1em;
  display: block;
  @media (min-width: 900px) {
    max-width: 100%;
  }
`;
export const SearchResultsControls = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PosterSearchGrid = styled.form`
  > button {
    margin-top: 1em;
  }
  @media (min-width: 900px) {
    grid-template-columns: 75% auto;
    column-gap: 1em;
  }
`;

export const SearchControlButtonBack = styled.button`
  ${({ step }) =>
    step === 0 &&
    css`
      visibility: hidden;
    `}
`;
export const SearchControlButtonNext = styled.button`
  ${({ step, searchResults }) =>
    step === searchResults.length - 1 &&
    css`
      visibility: hidden;
    `}
`;

export const SearchDisplay = styled.div`
  li::nth-of-type(3) {
    display: none;
  }
  li: {
    font-size: 1rem;
  }
  li + li {
    margin-top: 1em;
  }
  @media (min-width: 760px) {
    li:nth-of-type(3) {
      display: inherit;
    }
  }
`;

export const SearchDisplaySection = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
  }
  li {
    background-color: var(--white);
    color: var(--dark);
    padding: 10px;
  }
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.2em;
    margin-top: 2em;
  }
`;
export const Input = styled.input`
  width: 100%;
  margin-right: 1em;
`;
