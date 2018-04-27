import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { storeCart } from '../actions/store';

let addToCart = ({ quantity, user, product }) => {
  fetch('https://etsetera.herokuapp.com/cartItem',
    {
      method: 'POST',
      body: { quantity, user, product },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(val => { console.log(val) });
};

let ProductScreen = ({ product, allProducts, user }) =>
  (product === undefined ? <div className="product-list">
    {_.sortBy(allProducts, ['title']).map(item =>
      <Link key={'link-' + item.title} to={'/products/' + item.id}>
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
      <form className="AddItemForm" onSubmit={(event) => {
        event.preventDefault(); addToCart({
          quantity: event.target.children[1].value,
          user: { _id: user._id },
          product: { _id: product._id }
        });
      }}>
        <button action="submit">Add to Cart</button> <input type="number" name="quantity" defaultValue="1" min="1" />
      </form>
    </div>)

export default connect(
  (state, props) => {
    let productId = props.match.params.productId;
    let product = state.products.find(product =>
      product.id === productId);
    return { product, allProducts: state.products, user: state.user };
  }, dispatch => bindActionCreators({
    addToCart
  }, dispatch)
)(ProductScreen);