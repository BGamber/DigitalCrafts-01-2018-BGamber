import React from 'react';
import { Link } from 'react-router-dom';

let Dashboard = (props) =>
  <div className="Dashboard">
    <Link to="/profile" className="dash-link">Profile</Link>
    <Link to="/cart" className="dash-link">Cart</Link>
  </div>

export default Dashboard;
