import React from 'react';
import { Route } from 'react-router-dom';
import CatNav from './CatNav';
import Category from './Category';

let CategoryList = () =>
  <div className="CategoryList">
    <Route exact path="/categories" component={CatNav} />
    <Route exact path="/categories/:categoryId" component={Category} />
  </div>

export default CategoryList;
