import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Breadcrumbs from './Breadcrumbs';
import Content from './Content';

let Page = (props) => 
  <div className="Page">
    <Dashboard props={props}/>
    <Route path='/' component={Breadcrumbs} />
    <Content />
  </div>

export default Page;
