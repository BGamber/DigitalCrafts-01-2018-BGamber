import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Page from './Page';

import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer } from './reducers';

import {
  storeProducts,
  storeCategories,
  storeUser
} from '../actions/store';

// let App = () =>
//   <Router>
//     <div className="App">
//       <Sidebar />
//       <Page />
//     </div>
//   </Router>

class App extends Component {

  componentDidMount() {
    fetch('https://etsetera.herokuapp.com/product')
      .then(res => res.json())
      .then(products =>
        this.props.storeProducts(products));
    fetch('https://etsetera.herokuapp.com/category')
      .then(res => res.json())
      .then(categories =>
        this.props.storeCategories(categories));
    fetch('https://etsetera.herokuapp.com/auth/local', {
      method: 'POST', body: JSON.stringify({
        identifier: "dan@the.man",
        password: "papapapassword"
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem('token', user.jwt);
        this.props.storeUser(user.user);
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route component={Sidebar} />
          <Page />
        </div>
      </Router>
    );
  }
}

let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let AppConnected = connect(
  (store, props) =>
    ({ store }),
  dispatch => bindActionCreators({
    storeProducts,
    storeCategories,
    storeUser
  }, dispatch)
)(App);

let ReduxApp = () =>
  <Provider store={store}>
    <AppConnected />
  </Provider>

export default ReduxApp;
