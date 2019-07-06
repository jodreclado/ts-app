import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Results from "./Results";
import Recorder from "./Recorder";
import './style.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <NavLink exact to='/'>Home</NavLink>{' | '}
          <NavLink to='/search'>Search</NavLink>{' | '}
          <NavLink to='/recorder'>Recorder</NavLink>{' | '}
          <NavLink to='/results'>Results</NavLink>
       </nav>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/recorder" component={Recorder} />
        <Route path="/results" component={Results} />
      </div>
    </Router>
  );
}

export default App;
