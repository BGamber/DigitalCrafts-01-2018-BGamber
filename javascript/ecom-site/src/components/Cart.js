import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import {
  storeCart
} from '../actions/store';
import { bindActionCreators } from 'redux';

let Cart = ({ user, cart, products, fetchCart }) => {
  return (
    <div className="Cart">
      <h2>Your Cart:</h2>
      <div className="cart-list">
        <p>Image</p>
        <p>Item</p>
        <p>Quantity</p>
      </div>
      {
        // console.log(cart)
        cart.length > 0 ?
          cart.map(listing => {
            let selection = {};
            selection.product = products.filter(product => listing.product._id === product._id)[0];
            selection.quantity = listing.quantity;
            return (<CartItem
              key={'cartitem-' + listing.id}
              selection={selection} />);
          })
          : []
      }
    </div>
  );
};

class CartSmart extends Component {

  fetchCart() {
    fetch('https://etsetera.herokuapp.com/cartItem?user._id=' + this.props.user._id,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(cart => this.props.storeCart(cart));
  }

  componentDidMount() {
    this.fetchCart();
  }

  render() {
    let props = this.props;
    return <Cart user={props.user}
      cart={props.cart}
      products={props.products}
      fetchCart={this.fetchCart} />;
  }
}

export default connect(
  (state, props) =>
    ({
      user: state.user,
      cart: state.cart,
      products: state.products
    }),
  dispatch => bindActionCreators({
    storeCart
  }, dispatch)
)(CartSmart);
