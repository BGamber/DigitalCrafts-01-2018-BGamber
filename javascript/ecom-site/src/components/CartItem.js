import React from 'react';

let CartItem = ({ selection }) =>
  <div className="CartItem">
    <img src={selection.item.images[0].url} alt={selection.item.title} height="100px" width="100px" />
    <p>{selection.item.title}</p>
    <p>{selection.quantity}</p>
  </div>

export default CartItem;
