import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LinkorAnchorTag = ({link, external, children}) => {
    return external ? <a href={link} className="projects__link">{children} 
    </a> :
    <Link to={link} className="projects__link">{children}</Link>
}

const ProjectLink = ({linkText, link, madeWith, external, description}) => {
    return <li>
            <LinkorAnchorTag link={link} external={external}>
                <div className="projects__item">
                    {linkText} {external && <FontAwesomeIcon icon={['fas', 'external-link-alt']} />}
                    <p className="projects__description">{description}</p>
                    <ul className="projects__made-with-list">
                        {madeWith.map((item, index) => <li className="projects__made-with-list-item" key={index}>{item}</li>)}
                    </ul>
                </div>
            </LinkorAnchorTag>
           </li>
 }

export default ProjectLink
