import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Greeting from './Greeting';
import ZupView from './ZupView';

let activeUser = { name: "bgamber", id: 2 };

let NavBar = () =>
    <ul className="navbar">
      <li>
        <NavLink to='/' exact activeClassName="active">Home</NavLink>
      </li>
      <li>
        <NavLink to='/posts' exact activeClassName="active">Posts</NavLink>
        <ul>
          <li>
            <NavLink to='/posts/nybblr' activeClassName="active">nybblr</NavLink>
          </li>
          <li>
            <NavLink to='/posts/bgamber' activeClassName="active">bgamber</NavLink>
          </li>
          <li>
            <NavLink to='/posts/robby' activeClassName="active">Robby</NavLink>
          </li>
        </ul>
      </li>
    </ul>

let App = () =>
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Greeting} />
      <Route path="/posts/:author?" component={(props) =>
         <ZupView {...props} activeUser={activeUser} />} />
    </div>
  </Router>

export default App;
