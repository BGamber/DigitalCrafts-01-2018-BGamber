import React from 'react';
import { connect } from 'react-redux';

let Cart = ({ activeUser, cart }) => {
  console.log(activeUser, cart);
  return (
    <div className="Cart">
      <h2>Your Cart:</h2>

    </div>
  );
};

export default connect(
  (state, props) =>
    ({
      activeUser: state.activeUser,
      cart: state.cart
    })
)(Cart);
