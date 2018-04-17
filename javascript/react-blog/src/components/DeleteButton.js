import React from 'react';

let DeleteButton = ({ blog, removeBlog }) =>
  <button onClick={() => removeBlog(blog)} className="big-red"><i className="material-icons">delete</i></button>

export default DeleteButton;