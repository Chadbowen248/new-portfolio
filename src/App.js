import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MoviePosterSearch from "./Components/MoviePosterSearch";
import SteppedSignUpForm from "./Components/SteppedSignUpForm";
import CryptoPaymentApp from "./Components/CryptoPaymentApp";
import AboutMe from "./Components/AboutMe";
import ProjectLink from "./Components/ProjectLink";

const App = () => {
  const projects = [
    {
      linkText: 'Comic Book Tracker',
      link:  'https://comic-app-one.herokuapp.com/',
      madeWith: 'React, Firebase',
      external: true
    },
    {
      linkText: 'Not Date Night Movies',
      link:  'https://movie-app-one.herokuapp.com/',
      madeWith: 'React, Firebase',
      external: true
    },
    {
      linkText: 'Movie Poster Search',
      link:  '/moviePosterSearch',
      madeWith: 'React, Firebase',
      external: false
    },
    {
      linkText: 'Stepped Sign up Form',
      link:  '/steppedSignUpForm',
      madeWith: 'React, Firebase',
      external: false
    },
    {
      linkText: 'Crypto Payment App',
      link:  '/cryptoPaymentApp',
      madeWith: 'React, Firebase',
      external: false
    },
  ]
  return (
    <Router>
      <div className="intro">
        <h1>Hey There</h1> 
        <p>I'm Chad, a web developer with a love for React, CSS, and advocate for a11y best practices, below are some of the projects I've worked on.</p>
      </div>
      <div className="projects">
        <ul className="projects-list">
            {projects.map((project) => <ProjectLink {...project} key={project.linkText}/>)}
        </ul>
      </div>
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
    </Router>
  );
}

export default App;