import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectLink = ({linkText, link, external, madeWith}) => {
   const linkElement = external ? <a href={link} className="display">{linkText}</a> : <Link to={link} className="display">{linkText}</Link>
   return <li>
            <div className="funky">
                {linkElement}
                <p className="copy">Made with: {madeWith} </p>
                    <a href="#" className="display" aria-label="View source code on Github">
                    <FontAwesomeIcon icon={['fab', 'github']} />
                    </a>
            </div>
         </li>
}

export default ProjectLink