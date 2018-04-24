import React, { Component } from 'react';
import users from '../../DC-redux-shopping-site/json/users.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        {users}
      </div>
    );
  }
}

export default App;
