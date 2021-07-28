import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviePosterSearch from "./Components/MoviePosterSearch";
import SteppedSignUpForm from "./Components/SteppedSignUpForm/SteppedSignUpForm";
import CryptoPaymentApp from "./Components/CryptoPaymentApp";
import AboutMe from "./Components/AboutMe";
import ProjectLink from "./Components/ProjectLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const projects = [
    {
      linkText: "Comic Book Tracker",
      link: "https://comic-app-one.herokuapp.com/",
      madeWith: ["React", "Firebase", "Node"],
      description:
        "Search for and add comics to your collection using the ComicVine API.",
      external: true,
    },
    {
      linkText: "Not Date Night Movies",
      link: "https://movie-app-one.herokuapp.com/",
      madeWith: ["React", "Firebase", "Auth0"],
      description: "Sign in with your Google account to add and rate movies.",
      external: true,
    },
    {
      linkText: "Movie Poster Search",
      link: "/moviePosterSearch",
      madeWith: ["React"],
      description: "Search for movie posters from an API.",
      external: false,
    },
    {
      linkText: "Order a Pizza",
      link: "/steppedSignUpForm",
      madeWith: ["React", "Firebase"],
      description:
        "A stepped form to register an account and order a pizza. (sorry just mock data, a pizza will not come)",
      external: false,
    },
    {
      linkText: "Crypto Tracker",
      link: "/cryptoPaymentApp",
      madeWith: ["React", "local storage"],
      description:
        "Search for and add crypto tickers to keep track of the price. Saved in localStorage.",
      external: false,
    },
  ];
  return (
    <Router>
      <header>
        <nav>
          <ul className="header-nav">
            <li>Chad Bowen</li>
            <li>
              <a
                href="www.google.com"
                className="header-nav__link"
                aria-label="View source code on Github"
              >
                <span className="header-nav__link--text">Github</span>
                <FontAwesomeIcon
                  icon={["fab", "github"]}
                  className="header-nav__link--icon"
                />
              </a>
            </li>
            <li>
              <a
                href="www.google.com"
                className="header-nav__link"
                aria-label="View my Linkedin"
              >
                <span className="header-nav__link--text">Linkedin</span>
                <FontAwesomeIcon
                  icon={["fab", "linkedin-in"]}
                  className="header-nav__link--icon"
                />
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="intro">
        <p>Hey There,</p>
        <p className="intro__copy">
          I'm Chad, a web developer with a love for React, CSS, and advocate for
          a11y best practices, below are some of the projects I've worked on.
        </p>
      </div>
      <div className="grid-container">
        <nav>
          <ul className="projects">
            {projects.map((project) => (
              <ProjectLink {...project} key={project.linkText} />
            ))}
          </ul>
        </nav>
        <div className="about-me">
          <Switch>
            <Route exact path="/">
              <AboutMe />
            </Route>
            <Route path="/steppedSignUpForm">
              <SteppedSignUpForm />
            </Route>
            <Route path="/moviePosterSearch">
              <MoviePosterSearch />
            </Route>
            <Route path="/cryptoPaymentApp">
              <CryptoPaymentApp />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
