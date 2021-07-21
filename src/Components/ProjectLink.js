import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LinkorAnchorTag = ({link, external, children}) => {
    return external ? <a href={link} className="projects__link">{children} 
    {external && <FontAwesomeIcon icon={['fas', 'external-link-alt']} />}</a> :
    <Link to={link} className="projects__link">{children}</Link>
}

const ProjectLink = ({linkText, link, madeWith, external}) => {
    return <li>
                <LinkorAnchorTag link={link} external={external}>
                    {/* more stuff goes here */}
                    {linkText}
                </LinkorAnchorTag>          
           </li>
 }

export default ProjectLink
