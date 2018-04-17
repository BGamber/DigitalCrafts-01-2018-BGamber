import React from 'react';

let ConfirmButton = ({ blog, confirmEdit }) =>
  <button onClick={() => confirmEdit(blog)} className="edit-btn"><i className="material-icons">check</i></button>

export default ConfirmButton;