import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Cart from './Cart';
import CategoryList from './CategoryList';
import ProductScreen from './ProductScreen';

let Content = () =>
  <div className="Content">
    <Route exact path="/" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/cart" component={Cart} />
    <Route path="/categories" component={CategoryList} />
    <Route path="/products/:productId?" component={ProductScreen} />
  </div>

export default Content;
