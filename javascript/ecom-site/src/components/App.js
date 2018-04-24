import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeUser: { "id": 2, "firstname": "Jonathan", "lastname": "Martin" } };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Page activeUser={this.state.activeUser} />
        </div>
      </Router>
    );
  }
}

export default App;
