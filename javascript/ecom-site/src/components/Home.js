import React from 'react';
import { connect } from 'react-redux';

let Home = ({ user }) =>
  <div className="Home">
    <h1>Welcome to Et Setera, {user.username}!</h1>
  </div>

export default connect(
  (state, props) =>
    ({ user: state.user })
)(Home);
