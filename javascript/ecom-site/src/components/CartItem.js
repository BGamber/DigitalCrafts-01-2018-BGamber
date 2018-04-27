import React from 'react';

let CartItem = ({ selection }) =>
  <div className="CartItem">
    <img src={selection.product.images[0].url} alt={selection.product.title} height="100px" width="100px" />
    <p>{selection.product.title}</p>
    <p>{selection.quantity}</p>
  </div>

export default CartItem;
