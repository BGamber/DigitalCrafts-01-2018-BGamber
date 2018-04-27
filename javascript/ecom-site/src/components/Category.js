import React from 'react';
import ProductLink from './ProductLink';
import { connect } from 'react-redux';

let Category = ({ products }) =>
  <div className="Category">
    {
      products.map(item => <ProductLink key={'item' + item.id} item={item} />)
    }
  </div>

export default connect(
  (state, props) => {
    let categoryId = props.match.params.categoryId;
    let products = state.products.filter(item =>
      item.category.id === categoryId);
    return { products };
  }
)(Category);
