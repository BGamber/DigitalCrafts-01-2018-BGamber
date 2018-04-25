import React from 'react';
import Product from './Product';
import { connect } from 'react-redux';

let Category = ({ products }) =>
  <div className="Category">
    {
      products.map(item => <Product key={'item' + item.id} item={item} />)
    }
  </div>

export default connect(
  (state, props) => {
    let categoryId = Number(props.match.params.categoryId);
    let products = state.products.filter(item =>
      item.categoryId === categoryId);
    return { products };
  }
)(Category);
