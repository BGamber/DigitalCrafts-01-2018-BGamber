import React from 'react';
import { Link } from 'react-router-dom';

let ProductLink = ({ item }) =>
  <div className="Product">
    <Link to={'/products/' + item.id}>{item.title}</Link>
  </div>

export default ProductLink;
