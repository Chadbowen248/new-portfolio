import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  padding-left: 1.675em;
  padding-right: 1.675em;
`

const HeaderNavigation = styled.ul`
  display: grid;
  grid-template-columns: 1fr auto auto;
  list-style-type: none;
  padding-left: 0;
  color: var(--white);
  a {
    color: var(--white);
  }

  @media (min-width: 760px) {
    li:last-child {
      margin-left: 1em;
    }
  }
`;

const HeaderLinkText = styled.span`
  display: none;
  @media (min-width: 760px) {
    display: inherit;
  }
`;

const IconStyle = styled.span`
  margin-left: 0.75rem;
  @media (min-width: 760px) {
    display: none;
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <nav>
        <HeaderNavigation>
          <li>Chad Bowen</li>
          <li>
            <a href="https://github.com/Chadbowen248" aria-label="View source code on Github" target="_blank" rel="noopener noreferrer">
              <HeaderLinkText>Github</HeaderLinkText>
              <IconStyle>
                <FontAwesomeIcon icon={["fab", "github"]} />
              </IconStyle>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/chad-bowen-096b97111/" aria-label="View my Linkedin" target="_blank" rel="noopener noreferrer">
              <HeaderLinkText>Linkedin</HeaderLinkText>
              <IconStyle>
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
              </IconStyle>
            </a>
          </li>
        </HeaderNavigation>
      </nav>
    </HeaderWrapper>
  );
};
