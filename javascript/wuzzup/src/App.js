import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Greeting from './Greeting';
import ZupView from './ZupView';
import { reducer } from './reducers';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// All actions have "type"; other keys/values are optional
// e.g. let action = { type: 'CREATE_ZUP', body: "What's Up" };

// const FETCH_ALL_ZUPS = 'FETCH_ALL_ZUPS',
//   FETCH_USER_ZUPS = 'FETCH_USER_ZUPS',
//   DELETE_ZUP = 'DELETE_ZUP',
//   CHANGE_SORT = 'CHANGE_SORT',
//   CHANGE_ORDER = 'CHANGE_ORDER';

//   let newState;
//   let zups;
//   switch (action.type) {
//     case FETCH_ALL_ZUPS:
//       console.log('Triggered!');
//       // Async thing to fetch all data
//       console.log(newState);
//       break;
//     case FETCH_USER_ZUPS:
//       // TODO: fetch one user's zups
//       break;
//     case DELETE_ZUP:
//       zups = oldState.zups.filter(zup => zup.id !== action.payload);
//       newState = { ...oldState, zups };
//       break;

//     default:
//       newState = oldState;
//   };
//   return newState;
// };

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
