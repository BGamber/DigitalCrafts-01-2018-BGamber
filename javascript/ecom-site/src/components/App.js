import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import Page from './Page';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeUser: { "id": 2, "firstname": "Jonathan", "lastname": "Martin" } };
//   }

//   render() {
//     return (
//       <Router>
//         <div className="App">
//           <Sidebar />
//           <Page activeUser={this.state.activeUser} />
//         </div>
//       </Router>
//     );
//   }
// }

let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let App = () =>
  <Router>
    <div className="App">
      <Sidebar />
      <Page />
    </div>
  </Router>

let ReduxApp = () =>
<Provider store={store}>
  <App />
</Provider>

export default ReduxApp;
