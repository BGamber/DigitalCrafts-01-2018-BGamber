import React from 'react';
import Dashboard from './Dashboard';
import Content from './Content';

let Page = (activeUser) => 
  <div className="Page">
    <Dashboard />
    <Content />
  </div>

export default Page;
