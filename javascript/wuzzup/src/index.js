import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// All actions have "type"; other keys/values are optional
// e.g. let action = { type: 'CREATE_ZUP', body: "What's Up" };

let initialState = { zups: [] };

let reducer = (oldState = initialState, action) => {
  let zups;
  switch (action.type) {
    case 'CREATE_ZUP':
      zups = oldState.zups.concat(action.body);
      return { ...oldState, zups };
    case 'DELETE_ZUP':
      zups = oldState.zups.filter(zup => zup.id !== action.body);
      return { ...oldState, zups };
    default:
      return oldState;
  };
};

let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store;

let ScreenDumb = ({ zups, dispatch }) => <div><button onClick={() => dispatch({ type: 'CREATE_ZUP', body: "Hi there!" })}>Click me!</button><p>{zups.toString()}</p></div>

let mapStateToProps = (state) => {
  return { zups: state.zups };
};

let mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch };
};

let Screen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenDumb);

let ui =
  <Provider store={store}>
    <Screen />
  </Provider>

ReactDOM.render(ui, document.getElementById('root'));
