import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const NavLinkRouter = styled(Link)`
  color: var(--pink);
`;

const NavLinkExternal = styled.a`
  color: var(--pink);
`;

const FontAwesomeExternal = styled(FontAwesomeIcon)`
  font-size: 0.475em;
`;

const ProjectsDescrition = styled.p`
  display: none;
  @media (min-width: 768px) {
    display: inherit;
    color: var(--white);
    font-size: clamp(0.75rem, 1.75vw, 0.875rem);
    line-height: 1.5;
  }
`;

const ProjectItem = styled.div`
  @media (min-width: 760px) {
    background-color: var(--darker);
    border: 1px solid transparent;
    padding: 0.5em;
    :hover {
      border: var(--white) solid 1px;
    }
  }
`;
const ProjectItemContainer = styled.span`
  @media (min-width: 760px) {
    position: relative;
  }
`;

const MadeWithList = styled.ul`
  display: none;
  font-family: "Fira Sans";
  text-transform: uppercase;
  color: var(--gray);
  padding-left: 0;
  list-style: none;
  @media (min-width: 768px) {
    display: flex;
    > li + li {
      padding-left: 1.5em;
      ::before {
        content: "•";
        color: var(--pink);
        position: absolute;
        left: 7px;
      }
    }
  }
`;

const MadeWithListItem = styled.li`
  @media (min-width: 768px) {
    margin: 0;
    font-size: 0.675em;
    position: relative;
  }
`;

const LinkorAnchorTag = ({ link, external, children }) => {
  return external ? (
    <NavLinkExternal href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </NavLinkExternal>
  ) : (
    <NavLinkRouter to={link}>{children}</NavLinkRouter>
  );
};

const ProjectLink = ({ linkText, link, madeWith, external, description }) => {
  return (
    <li>
      <LinkorAnchorTag link={link} external={external}>
        <ProjectItem>
          <ProjectItemContainer>
            {linkText}{" "}
            {external && (
              <FontAwesomeExternal icon={["fas", "external-link-alt"]} />
            )}
          </ProjectItemContainer>
          <ProjectsDescrition>{description}</ProjectsDescrition>
          <MadeWithList>
            {madeWith.map((item, index) => (
              <MadeWithListItem key={index}>{item}</MadeWithListItem>
            ))}
          </MadeWithList>
        </ProjectItem>
      </LinkorAnchorTag>
    </li>
  );
};

export default ProjectLink;
