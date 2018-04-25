import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Cart from './Cart';
import CategoryList from './CategoryList';

let Content = () =>
  <div className="Content">
    <Route exact path="/" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/cart" component={Cart} />
    <Route path="/categories" component={CategoryList} />
  </div>

export default Content;
