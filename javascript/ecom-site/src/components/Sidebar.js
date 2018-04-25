import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import categories from '../json/categories.json';

let Sidebar = () =>
  <div className="Sidebar">
    <Logo />
    <nav className="side-menu">
      <ul>
        <li><NavLink exact to="/" activeClassName="active" className="listed">Frontpage</NavLink></li>
        <li><NavLink to="/categories" activeClassName="active" className="listed">Categories</NavLink></li>
        <ul>
          {categories.map((cat) =>
            <li key={'sidebar'+cat.id}>
              <NavLink exact to={'/categories/' + cat.id}
                activeClassName="active"
                className="sublisted">
                {cat.name}
              </NavLink>
            </li>)
          }
        </ul>
      </ul>
    </nav>
  </div>

export default Sidebar;
