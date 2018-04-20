import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Greeting from './Greeting';
import ZupView from './ZupView';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// All actions have "type"; other keys/values are optional
// e.g. let action = { type: 'CREATE_ZUP', body: "What's Up" };

let initialState = { zups: [], activeUser: { name: "bgamber", id: 2 } };

let reducer = (oldState = initialState, action) => {
  let newState;
  let zups;
  switch (action.type) {
    case 'GET_ALL_ZUPS':
      // TODO: fetch all zups
      break;
    case 'GET_USER_ZUPS':
      // TODO: fetch one user's zups
      break;
    case 'CREATE_ZUP':
      zups = oldState.zups.concat(action.body);
      newState = { ...oldState, zups };
      break;
    case 'DELETE_ZUP':
      zups = oldState.zups.filter(zup => zup.id !== action.body);
      newState = { ...oldState, zups };
      break;
    default:
      newState = oldState;
  };
  return newState;
};

let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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

export let App = () =>
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Greeting} />
      <Route path="/posts/:author?" component={(props) =>
        <ZupView {...props} />} />
    </div>
  </Router>

export let ReduxApp = () =>
  <Provider store={store}>
    <App />
  </Provider>

export default ReduxApp;
