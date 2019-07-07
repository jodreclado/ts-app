import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './style.css';

const Home = lazy(() => import("./Home"));
const Search = lazy(() => import("./Search"));
const Results = lazy(() => import("./Results"));
const Recorder = lazy(() => import("./Recorder"));

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
        <Suspense fallback={<h1>loading…</h1>}>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/recorder" component={Recorder} />
          <Route path="/results" component={Results} />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
