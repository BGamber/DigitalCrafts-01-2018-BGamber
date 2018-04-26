import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

let ProductScreen = ({ product, allProducts }) =>
  (product === undefined ? <div className="product-list">
    {_.sortBy(allProducts, ['title']).map(item =>
      <Link to={'/products/' + item.id}>
        {item.title}
      </Link>)}
  </div> :
    <div>
      <img src={product['images'].length > 0 ? product.images[0].url : "https://i.imgur.com/fVg2FFu.jpg"}
        alt={product.name}
        width="200px"
        height="200px"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = "https://i.imgur.com/fVg2FFu.jpg"
        }} />
      <p><span className="big">{product.title}</span> (Product ID: {product.id})</p>
      <p>{product.description}</p>
    </div>)

export default connect(
  (state, props) => {
    let productId = props.match.params.productId;
    let product = state.products.find(product =>
      product.id === productId);
    return { product, allProducts: state.products };
  }
)(ProductScreen);