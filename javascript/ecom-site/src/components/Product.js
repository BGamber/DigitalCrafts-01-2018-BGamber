import React from 'react';
import { Link } from 'react-router-dom';

let Product = ({ item }) =>
  <div className="Product">
    <Link to={'/products/'+item.id}>{item.name}</Link>
  </div>

export default Product;
