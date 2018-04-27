import React from 'react';
import { connect } from 'react-redux';

let Profile = ({ user }) =>
  <div className="Profile">
    <h2>{user.username || 'User'}'s Profile</h2>
  </div>

export default connect(
  (state, props) =>
    ({ user: state.user })
)(Profile);
