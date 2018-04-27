import React from 'react';
import { NavLink } from 'react-router-dom';

let Dashboard = (props) =>
  <div className="Dashboard">
    <NavLink to="/profile" activeClassName="active" className="dash-link">Profile</NavLink>
    <NavLink to="/cart" activeClassName="active" className="dash-link">Cart</NavLink>
  </div>

export default Dashboard;
