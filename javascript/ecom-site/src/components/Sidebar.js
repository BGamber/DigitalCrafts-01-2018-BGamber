import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

let Sidebar = ({ categories }) => {
  return (<div className="Sidebar">
    <Logo />
    <nav className="side-menu">
      <ul>
        <li><NavLink exact to="/" activeClassName="active" className="listed">Frontpage</NavLink></li>
        <li><NavLink to="/categories" activeClassName="active" className="listed">Categories</NavLink></li>
        <ul>
          {categories.map((cat) =>
            <li key={'sidebar' + cat.id}>
              <NavLink exact to={'/categories/' + cat._id}
                activeClassName="active"
                className="sublisted">
                {cat.title}
              </NavLink>
            </li>)
          }
        </ul>
        <li><NavLink exact to="/products" activeClassName="active" className="listed">All Products</NavLink></li>
      </ul>
    </nav>
  </div>);
};

export default connect(
  (store, props) =>
    ({ categories: store.categories })
)(Sidebar);
